/**
 * RPL Stage Transition Engine
 *
 * The single entry point for evaluating a restaurant's RPL score submission.
 * Implements all stage entry, upgrade, warning, downgrade, and suspension
 * rules documented in:
 *
 *   docs/RPL_STAGE_TRANSITIONS.md
 *   docs/RESTAURANT_LIFECYCLE.md
 *   docs/RPL_SCORING_MODEL.md
 *
 * Design principles:
 *   - Pure function: same input → same output, no side effects
 *   - Suspension always overrides — checked first, returns immediately
 *   - Outcome is derived from qualified stage vs current stage delta
 *   - blockingIssues always explains exactly what the restaurant must fix
 */

import {
  RPLScoreInput,
  RPLScoreResult,
  RPLStage,
  RPLOutcome,
} from './scoring-types';

import {
  THRESHOLDS,
  calculateTotalScore,
  getZeroAreas,
  getAreasBelowHalfMax,
  validateAreaScores,
} from './score-engine';

// ------------------------------------------------------------------
// Stage ordering — used to compare stages numerically
// ------------------------------------------------------------------

const STAGE_ORDER: RPLStage[] = ['Pre-RPL', 'RPL Lite', 'RPL Standard', 'RPL Excellence'];

function stageIndex(stage: RPLStage): number {
  return STAGE_ORDER.indexOf(stage);
}

function stageAbove(stage: RPLStage): RPLStage | undefined {
  const idx = stageIndex(stage);
  return idx < STAGE_ORDER.length - 1 ? STAGE_ORDER[idx + 1] : undefined;
}

// ------------------------------------------------------------------
// Immediate suspension — overrides all normal flow
// Source: docs/RPL_STAGE_TRANSITIONS.md — "Immediate Suspension" section
// ------------------------------------------------------------------

function checkImmediateSuspension(input: RPLScoreInput): string[] {
  const { metadata } = input;
  const triggers: string[] = [];

  if (metadata.undeclaredLaborConfirmed) {
    triggers.push('Confirmed undeclared labor (lavoro sommerso)');
  }
  if (metadata.fraudulentAuditDocuments) {
    triggers.push('Fraudulent documentation submitted during audit');
  }
  if (metadata.ethicalViolationConfirmed) {
    triggers.push('Serious ethical violation confirmed by RPL');
  }
  if (metadata.criminalInvestigationActive) {
    triggers.push('Active criminal investigation for labor or food safety violations');
  }

  return triggers;
}

// ------------------------------------------------------------------
// Per-stage requirement checkers
// Each function returns unmet conditions for entering that specific stage.
// ------------------------------------------------------------------

function unmetForLite(input: RPLScoreInput, totalScore: number): string[] {
  const { areaScores, metadata } = input;
  const issues: string[] = [];

  if (totalScore < THRESHOLDS.LITE.totalScore) {
    issues.push(
      `Total score ${totalScore}/100 — minimum ${THRESHOLDS.LITE.totalScore} required for RPL Lite`
    );
  }
  if (areaScores.A1 < THRESHOLDS.LITE.A1_MIN) {
    issues.push(
      `A1 (Contracts & Compliance) score ${areaScores.A1}/20 — minimum ${THRESHOLDS.LITE.A1_MIN} required (hard floor for Lite)`
    );
  }
  const zeros = getZeroAreas(areaScores);
  if (zeros.length > 0) {
    issues.push(`Area(s) with zero score: ${zeros.join(', ')} — every area must score above 0`);
  }
  if (!metadata.selfAssessmentSubmitted) {
    issues.push('Annual self-assessment checklist has not been submitted');
  }

  return issues;
}

function unmetForStandard(input: RPLScoreInput, totalScore: number): string[] {
  const { areaScores, metadata } = input;
  const issues: string[] = [];

  if (totalScore < THRESHOLDS.STANDARD.totalScore) {
    issues.push(
      `Total score ${totalScore}/100 — minimum ${THRESHOLDS.STANDARD.totalScore} required for RPL Standard`
    );
  }
  if (areaScores.A1 < THRESHOLDS.STANDARD.A1_MIN) {
    issues.push(
      `A1 (Contracts & Compliance) score ${areaScores.A1}/20 — minimum ${THRESHOLDS.STANDARD.A1_MIN} required (hard floor for Standard)`
    );
  }
  const belowHalf = getAreasBelowHalfMax(areaScores);
  if (belowHalf.length > 0) {
    issues.push(
      `Area(s) below 50% of their maximum: ${belowHalf.join(', ')} — no area may fall below half its max for Standard`
    );
  }
  if (metadata.monthsInLite < THRESHOLDS.STANDARD.MIN_MONTHS_IN_LITE) {
    issues.push(
      `${metadata.monthsInLite} month(s) in RPL Lite — minimum ${THRESHOLDS.STANDARD.MIN_MONTHS_IN_LITE} required before Standard upgrade`
    );
  }
  if (metadata.kpiImprovementsCount < THRESHOLDS.STANDARD.MIN_KPI_IMPROVEMENTS) {
    issues.push(
      `${metadata.kpiImprovementsCount} KPI improvement(s) documented — minimum ${THRESHOLDS.STANDARD.MIN_KPI_IMPROVEMENTS} metrics must show measurable improvement`
    );
  }

  return issues;
}

function unmetForExcellence(input: RPLScoreInput, totalScore: number): string[] {
  const { areaScores, metadata } = input;
  const issues: string[] = [];

  if (totalScore < THRESHOLDS.EXCELLENCE.totalScore) {
    issues.push(
      `Total score ${totalScore}/100 — minimum ${THRESHOLDS.EXCELLENCE.totalScore} required for RPL Excellence`
    );
  }
  if (areaScores.A7 < THRESHOLDS.EXCELLENCE.A7_MIN) {
    issues.push(
      `A7 (Culture & Ethics) score ${areaScores.A7}/10 — minimum ${THRESHOLDS.EXCELLENCE.A7_MIN} required for Excellence`
    );
  }
  const years = metadata.consecutiveYearsAbove85 ?? 0;
  if (years < THRESHOLDS.EXCELLENCE.CONSECUTIVE_YEARS) {
    issues.push(
      `${years} consecutive year(s) scoring ≥85 — ${THRESHOLDS.EXCELLENCE.CONSECUTIVE_YEARS} consecutive years required for Excellence`
    );
  }
  if (!metadata.communityContributionActive) {
    issues.push(
      'Active community contribution required for Excellence (mentoring Lite restaurants, RPL events, published case studies)'
    );
  }
  if (metadata.ethicalViolationConfirmed) {
    issues.push('Zero confirmed ethical violations required for Excellence');
  }

  return issues;
}

// ------------------------------------------------------------------
// Qualified stage — highest stage all scoring requirements are met for
// ------------------------------------------------------------------

function determineQualifiedStage(
  input: RPLScoreInput,
  totalScore: number
): RPLStage {
  if (unmetForExcellence(input, totalScore).length === 0) return 'RPL Excellence';
  if (unmetForStandard(input, totalScore).length === 0) return 'RPL Standard';
  if (unmetForLite(input, totalScore).length === 0) return 'RPL Lite';
  return 'Pre-RPL';
}

// ------------------------------------------------------------------
// Main evaluation function — public API of this module
// ------------------------------------------------------------------

/**
 * Evaluates a restaurant's RPL score submission and returns a full
 * assessment result with outcome, reasons, and blocking issues.
 *
 * Throws if area scores are numerically invalid (out of range).
 *
 * @example
 * ```ts
 * import { evaluate } from './stage-transition-engine';
 *
 * const result = evaluate({
 *   areaScores: { A1: 16, A2: 16, A3: 12, A4: 10, A5: 7, A6: 7, A7: 7 },
 *   metadata: {
 *     selfAssessmentSubmitted: true,
 *     monthsInLite: 14,
 *     kpiImprovementsCount: 4,
 *     ethicalViolationConfirmed: false,
 *     fraudulentAuditDocuments: false,
 *     undeclaredLaborConfirmed: false,
 *     criminalInvestigationActive: false,
 *     currentStage: 'RPL Lite',
 *   },
 * });
 * // result.outcome === 'upgrade_eligible'
 * // result.recommendedStage === 'RPL Standard'
 * ```
 */
export function evaluate(input: RPLScoreInput): RPLScoreResult {
  // ── 1. Validate input ─────────────────────────────────────────
  const validationErrors = validateAreaScores(input.areaScores);
  if (validationErrors.length > 0) {
    throw new Error(`Invalid area scores:\n${validationErrors.join('\n')}`);
  }

  const totalScore = calculateTotalScore(input.areaScores);
  const reasons: string[] = [];
  const blockingIssues: string[] = [];

  // ── 2. Immediate suspension — overrides everything ────────────
  const suspensionTriggers = checkImmediateSuspension(input);
  if (suspensionTriggers.length > 0) {
    blockingIssues.push(...suspensionTriggers);
    reasons.push(
      'Immediate suspension triggered — no warning or recovery window applies.',
      'Stage revoked effective immediately.',
      'Re-admission possible only after a minimum of 6 months and full resolution of all violations.'
    );
    return {
      totalScore,
      areaScores: input.areaScores,
      recommendedStage: 'Pre-RPL',
      outcome: 'immediate_suspension',
      reasons,
      blockingIssues,
      upgradeEligible: false,
      recoveryRequired: false,
      immediateActionRequired: true,
    };
  }

  // ── 3. Determine the highest stage the scores qualify for ─────
  const qualifiedStage = determineQualifiedStage(input, totalScore);
  const currentStage = input.metadata.currentStage;

  // ── 4. Derive outcome from stage delta ────────────────────────
  let outcome: RPLOutcome;
  let upgradeEligible = false;
  let recoveryRequired = false;
  const immediateActionRequired = false;

  if (currentStage === undefined) {
    // Fresh assessment — no existing stage context
    if (qualifiedStage === 'Pre-RPL') {
      outcome = 'accepted';
      reasons.push('Restaurant is currently Pre-RPL. Entry requirements for RPL Lite are not yet met.');
      blockingIssues.push(...unmetForLite(input, totalScore));
    } else {
      outcome = 'accepted';
      reasons.push(`Restaurant qualifies for ${qualifiedStage} based on submitted scores.`);
    }
  } else {
    const currentIdx = stageIndex(currentStage);
    const qualifiedIdx = stageIndex(qualifiedStage);

    if (qualifiedIdx > currentIdx) {
      // Scores qualify for a stage above the current one
      outcome = 'upgrade_eligible';
      upgradeEligible = true;
      reasons.push(
        `Current stage: ${currentStage}. Submitted scores qualify for ${qualifiedStage}.`,
        'All entry conditions for the higher stage are met. A formal upgrade audit is required to confirm.'
      );
    } else if (qualifiedIdx === currentIdx) {
      // Scores sustain the current stage
      outcome = 'accepted';
      reasons.push(`${currentStage} requirements are maintained. No issues found.`);

      // Check if the next stage is within reach (informational)
      const next = stageAbove(currentStage);
      if (next !== undefined) {
        const nextUnmet = getUnmetForStage(next, input, totalScore);
        upgradeEligible = nextUnmet.length === 0;
      }
    } else {
      // Scores have fallen below the current stage threshold
      if (input.metadata.previousRecoveryWithin12Months === true) {
        // Second failure within 12 months — no second recovery window
        outcome = 'downgrade';
        recoveryRequired = false;
        reasons.push(
          `Score no longer meets ${currentStage} requirements and a recovery plan was already exhausted within the last 12 months.`,
          `Stage downgraded from ${currentStage} to ${qualifiedStage}.`,
          'Re-advancement is possible once entry conditions are met again (maximum one stage per year).',
          'If downgraded from RPL Lite, the restaurant returns to Pre-RPL and the 12-month minimum in Lite applies again upon re-entry.'
        );
      } else {
        // First failure — open the 90-day recovery window
        outcome = 'warning';
        recoveryRequired = true;
        reasons.push(
          `Score no longer meets the minimum requirements for ${currentStage}. A 90-day recovery plan has been initiated.`,
          'Day 0: RPL consultant assigned; critical areas identified; corrective action plan documented.',
          'Day 45: Progress check-in — plan adjusted if needed.',
          'Day 90: Extraordinary on-site audit. Outcome: stage maintained OR downgraded by one level.',
          `Note: A second failure within 12 months will remove the recovery window and trigger a direct downgrade.`
        );
      }
      blockingIssues.push(...getUnmetForStage(currentStage, input, totalScore));
    }
  }

  return {
    totalScore,
    areaScores: input.areaScores,
    recommendedStage: qualifiedStage,
    outcome,
    reasons,
    blockingIssues,
    upgradeEligible,
    recoveryRequired,
    immediateActionRequired,
  };
}

// ------------------------------------------------------------------
// Internal helper — routes to the right unmet checker by stage
// ------------------------------------------------------------------

function getUnmetForStage(
  stage: RPLStage,
  input: RPLScoreInput,
  totalScore: number
): string[] {
  switch (stage) {
    case 'RPL Lite':
      return unmetForLite(input, totalScore);
    case 'RPL Standard':
      return unmetForStandard(input, totalScore);
    case 'RPL Excellence':
      return unmetForExcellence(input, totalScore);
    default:
      return [];
  }
}
