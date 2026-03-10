/**
 * RPL Score Engine — Test Suite
 *
 * Covers the six canonical cases documented in the MVP spec plus
 * edge-case validation tests. All rules are sourced from:
 *
 *   docs/RPL_SCORING_MODEL.md
 *   docs/RPL_STAGE_TRANSITIONS.md
 */

import { evaluate } from '../src/domain/rpl/stage-transition-engine';
import {
  calculateTotalScore,
  validateAreaScores,
  getZeroAreas,
  getAreasBelowHalfMax,
  AREA_MAX_SCORES,
  THRESHOLDS,
} from '../src/domain/rpl/score-engine';
import { AreaScores, RPLScoreInput } from '../src/domain/rpl/scoring-types';

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

/** Builds a minimal valid metadata object with sensible defaults. */
function meta(overrides: Partial<RPLScoreInput['metadata']> = {}): RPLScoreInput['metadata'] {
  return {
    selfAssessmentSubmitted: true,
    monthsInLite: 0,
    kpiImprovementsCount: 0,
    ethicalViolationConfirmed: false,
    fraudulentAuditDocuments: false,
    undeclaredLaborConfirmed: false,
    criminalInvestigationActive: false,
    ...overrides,
  };
}

// ------------------------------------------------------------------
// score-engine unit tests
// ------------------------------------------------------------------

describe('score-engine primitives', () => {
  describe('validateAreaScores', () => {
    it('accepts a fully valid score set', () => {
      const scores: AreaScores = { A1: 20, A2: 20, A3: 15, A4: 15, A5: 10, A6: 10, A7: 10 };
      expect(validateAreaScores(scores)).toHaveLength(0);
    });

    it('accepts zero scores (structurally valid, semantically blocked at stage level)', () => {
      const scores: AreaScores = { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 0, A7: 0 };
      expect(validateAreaScores(scores)).toHaveLength(0);
    });

    it('rejects a score exceeding the area maximum', () => {
      const scores: AreaScores = { A1: 21, A2: 20, A3: 15, A4: 15, A5: 10, A6: 10, A7: 10 };
      const errors = validateAreaScores(scores);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]).toContain('A1');
    });

    it('rejects a negative score', () => {
      const scores: AreaScores = { A1: -1, A2: 20, A3: 15, A4: 15, A5: 10, A6: 10, A7: 10 };
      expect(validateAreaScores(scores)).toHaveLength(1);
    });
  });

  describe('calculateTotalScore', () => {
    it('sums all seven areas correctly', () => {
      const scores: AreaScores = { A1: 20, A2: 20, A3: 15, A4: 15, A5: 10, A6: 10, A7: 10 };
      expect(calculateTotalScore(scores)).toBe(100);
    });

    it('returns 0 when all areas are 0', () => {
      const scores: AreaScores = { A1: 0, A2: 0, A3: 0, A4: 0, A5: 0, A6: 0, A7: 0 };
      expect(calculateTotalScore(scores)).toBe(0);
    });

    it('does not exceed TOTAL_MAX_SCORE for max inputs', () => {
      const scores: AreaScores = {
        A1: AREA_MAX_SCORES.A1,
        A2: AREA_MAX_SCORES.A2,
        A3: AREA_MAX_SCORES.A3,
        A4: AREA_MAX_SCORES.A4,
        A5: AREA_MAX_SCORES.A5,
        A6: AREA_MAX_SCORES.A6,
        A7: AREA_MAX_SCORES.A7,
      };
      expect(calculateTotalScore(scores)).toBe(100);
    });
  });

  describe('getZeroAreas', () => {
    it('returns empty array when no area is zero', () => {
      const scores: AreaScores = { A1: 1, A2: 1, A3: 1, A4: 1, A5: 1, A6: 1, A7: 1 };
      expect(getZeroAreas(scores)).toHaveLength(0);
    });

    it('identifies all zero areas', () => {
      const scores: AreaScores = { A1: 0, A2: 5, A3: 0, A4: 5, A5: 5, A6: 5, A7: 5 };
      expect(getZeroAreas(scores)).toEqual(['A1', 'A3']);
    });
  });

  describe('getAreasBelowHalfMax', () => {
    it('flags areas below 50% of their maximum', () => {
      // A1 max = 20, score 9 is below 10 (50%)
      const scores: AreaScores = { A1: 9, A2: 20, A3: 15, A4: 15, A5: 10, A6: 10, A7: 10 };
      expect(getAreasBelowHalfMax(scores)).toContain('A1');
    });

    it('does not flag areas at exactly 50%', () => {
      // A1 max = 20, score 10 = 50%, should NOT be flagged
      const scores: AreaScores = { A1: 10, A2: 20, A3: 15, A4: 15, A5: 10, A6: 10, A7: 10 };
      expect(getAreasBelowHalfMax(scores)).not.toContain('A1');
    });
  });

  describe('THRESHOLDS constant', () => {
    it('Lite total threshold is 35', () => {
      expect(THRESHOLDS.LITE.totalScore).toBe(35);
    });
    it('Lite A1 floor is 14', () => {
      expect(THRESHOLDS.LITE.A1_MIN).toBe(14);
    });
    it('Standard total threshold is 60', () => {
      expect(THRESHOLDS.STANDARD.totalScore).toBe(60);
    });
    it('Standard A1 floor is 16', () => {
      expect(THRESHOLDS.STANDARD.A1_MIN).toBe(16);
    });
    it('Excellence total threshold is 85', () => {
      expect(THRESHOLDS.EXCELLENCE.totalScore).toBe(85);
    });
  });
});

// ------------------------------------------------------------------
// Canonical evaluation scenarios
// ------------------------------------------------------------------

describe('evaluate — canonical cases', () => {
  // ----------------------------------------------------------------
  // Case 1: Pre-RPL — does not qualify for Lite
  // ----------------------------------------------------------------
  describe('Case 1: Pre-RPL (rejected)', () => {
    it('returns Pre-RPL with blocking issues when score is too low', () => {
      const result = evaluate({
        areaScores: { A1: 10, A2: 8, A3: 5, A4: 5, A5: 3, A6: 3, A7: 3 },
        // Total = 37, A1 = 10 — fails A1 floor of 14
        metadata: meta({ selfAssessmentSubmitted: true }),
      });

      expect(result.totalScore).toBe(37);
      expect(result.recommendedStage).toBe('Pre-RPL');
      expect(result.outcome).toBe('accepted');
      expect(result.upgradeEligible).toBe(false);
      expect(result.blockingIssues.length).toBeGreaterThan(0);
      // A1 floor violation must be surfaced
      expect(result.blockingIssues.some(i => i.includes('A1'))).toBe(true);
    });

    it('returns Pre-RPL when total score is genuinely below 35', () => {
      const result = evaluate({
        areaScores: { A1: 14, A2: 5, A3: 3, A4: 3, A5: 3, A6: 3, A7: 3 },
        // Total = 14+5+3+3+3+3+3 = 34 → below 35
        metadata: meta({ selfAssessmentSubmitted: true }),
      });

      expect(result.totalScore).toBe(34);
      expect(result.recommendedStage).toBe('Pre-RPL');
      expect(result.outcome).toBe('accepted');
      expect(result.blockingIssues.some(i => i.includes('35'))).toBe(true);
    });

    it('returns Pre-RPL when self-assessment not submitted on a fresh Lite-level assessment', () => {
      const result = evaluate({
        areaScores: { A1: 16, A2: 14, A3: 8, A4: 8, A5: 5, A6: 5, A7: 5 },
        // Total = 61, A1=16 — scores look good, but:
        // Standard check fails: monthsInLite=0 (needs 12)
        // Lite check fails: selfAssessmentSubmitted=false
        // → falls to Pre-RPL
        metadata: meta({ selfAssessmentSubmitted: false, monthsInLite: 0, kpiImprovementsCount: 0 }),
      });

      expect(result.recommendedStage).toBe('Pre-RPL');
      expect(result.blockingIssues.some(i => i.toLowerCase().includes('self-assessment'))).toBe(true);
    });
  });

  // ----------------------------------------------------------------
  // Case 2: RPL Lite — accepted
  // ----------------------------------------------------------------
  describe('Case 2: RPL Lite (accepted)', () => {
    it('accepts a restaurant that meets all Lite entry conditions', () => {
      const result = evaluate({
        areaScores: { A1: 15, A2: 12, A3: 8, A4: 7, A5: 5, A6: 5, A7: 5 },
        // Total = 57, A1=15 ≥ 14, no zeros
        metadata: meta({ selfAssessmentSubmitted: true }),
      });

      expect(result.totalScore).toBe(57);
      expect(result.recommendedStage).toBe('RPL Lite');
      expect(result.outcome).toBe('accepted');
      expect(result.upgradeEligible).toBe(false);
      expect(result.recoveryRequired).toBe(false);
      expect(result.immediateActionRequired).toBe(false);
      expect(result.blockingIssues).toHaveLength(0);
    });

    it('is accepted as Lite even with 0 months in Lite (fresh entry assessment)', () => {
      const result = evaluate({
        areaScores: { A1: 14, A2: 10, A3: 7, A4: 7, A5: 4, A6: 4, A7: 4 },
        // Total = 50, meets Lite minimums
        metadata: meta({ selfAssessmentSubmitted: true, monthsInLite: 0 }),
      });

      expect(result.recommendedStage).toBe('RPL Lite');
      expect(result.outcome).toBe('accepted');
    });
  });

  // ----------------------------------------------------------------
  // Case 3: RPL Lite — warning (currently in Lite, score dropped)
  // ----------------------------------------------------------------
  describe('Case 3: RPL Lite (warning)', () => {
    it('issues a warning when a Lite restaurant drops below Lite thresholds', () => {
      const result = evaluate({
        areaScores: { A1: 12, A2: 10, A3: 6, A4: 5, A5: 3, A6: 3, A7: 3 },
        // Total = 42, A1=12 — fails A1 floor of 14
        metadata: meta({
          selfAssessmentSubmitted: true,
          currentStage: 'RPL Lite',
        }),
      });

      expect(result.outcome).toBe('warning');
      expect(result.recoveryRequired).toBe(true);
      expect(result.recommendedStage).toBe('Pre-RPL');
      expect(result.blockingIssues.some(i => i.includes('A1'))).toBe(true);
      // Recovery plan steps should be in reasons
      expect(result.reasons.some(r => r.includes('90-day'))).toBe(true);
    });

    it('routes to direct downgrade if recovery already exhausted within 12 months', () => {
      const result = evaluate({
        areaScores: { A1: 12, A2: 10, A3: 6, A4: 5, A5: 3, A6: 3, A7: 3 },
        metadata: meta({
          selfAssessmentSubmitted: true,
          currentStage: 'RPL Lite',
          previousRecoveryWithin12Months: true,
        }),
      });

      expect(result.outcome).toBe('downgrade');
      expect(result.recoveryRequired).toBe(false);
      expect(result.reasons.some(r => r.toLowerCase().includes('downgrade'))).toBe(true);
    });
  });

  // ----------------------------------------------------------------
  // Case 4: Lite → Standard upgrade eligible
  // ----------------------------------------------------------------
  describe('Case 4: Lite → Standard upgrade eligible', () => {
    it('marks upgrade_eligible when a Lite restaurant meets all Standard conditions', () => {
      const result = evaluate({
        areaScores: { A1: 18, A2: 16, A3: 12, A4: 11, A5: 7, A6: 7, A7: 7 },
        // Total = 78, A1=18 ≥ 16, no area below 50%, all Standard conditions met
        metadata: meta({
          selfAssessmentSubmitted: true,
          monthsInLite: 14,
          kpiImprovementsCount: 4,
          currentStage: 'RPL Lite',
        }),
      });

      expect(result.totalScore).toBe(78);
      expect(result.recommendedStage).toBe('RPL Standard');
      expect(result.outcome).toBe('upgrade_eligible');
      expect(result.upgradeEligible).toBe(true);
      expect(result.blockingIssues).toHaveLength(0);
    });

    it('blocks Standard upgrade when months in Lite is below 12', () => {
      const result = evaluate({
        areaScores: { A1: 18, A2: 16, A3: 12, A4: 11, A5: 7, A6: 7, A7: 7 },
        metadata: meta({
          selfAssessmentSubmitted: true,
          monthsInLite: 8, // too few
          kpiImprovementsCount: 4,
          currentStage: 'RPL Lite',
        }),
      });

      // Qualified stage is still Lite (Standard unmet due to monthsInLite)
      expect(result.recommendedStage).toBe('RPL Lite');
      expect(result.outcome).toBe('accepted'); // maintains current Lite stage
      expect(result.upgradeEligible).toBe(false);
    });

    it('blocks Standard upgrade when KPI improvements are insufficient', () => {
      const result = evaluate({
        areaScores: { A1: 18, A2: 16, A3: 12, A4: 11, A5: 7, A6: 7, A7: 7 },
        metadata: meta({
          selfAssessmentSubmitted: true,
          monthsInLite: 14,
          kpiImprovementsCount: 2, // need 3
          currentStage: 'RPL Lite',
        }),
      });

      expect(result.recommendedStage).toBe('RPL Lite');
      expect(result.outcome).toBe('accepted');
      expect(result.upgradeEligible).toBe(false);
    });
  });

  // ----------------------------------------------------------------
  // Case 5: Standard — downgrade case
  // ----------------------------------------------------------------
  describe('Case 5: RPL Standard downgrade', () => {
    it('warns a Standard restaurant that falls below Standard thresholds', () => {
      // Mirrors "Osteria Verdi" case from docs/RPL_STAGE_TRANSITIONS.md
      // Standard restaurant, score 68 but A1 = 13 (below Standard floor of 16)
      const result = evaluate({
        areaScores: { A1: 13, A2: 16, A3: 12, A4: 10, A5: 6, A6: 6, A7: 5 },
        // Total = 68, A1=13 fails Standard floor of 16
        metadata: meta({
          selfAssessmentSubmitted: true,
          monthsInLite: 18,
          kpiImprovementsCount: 4,
          currentStage: 'RPL Standard',
        }),
      });

      expect(result.outcome).toBe('warning');
      expect(result.recoveryRequired).toBe(true);
      // A1=13 fails both Standard floor (≥16) and Lite floor (≥14)
      // Qualified stage is Pre-RPL; actual downgrade is applied one step at a time by the RPL process
      expect(result.recommendedStage).toBe('Pre-RPL');
      expect(result.blockingIssues.some(i => i.includes('A1'))).toBe(true);
    });

    it('downgrades directly when second recovery within 12 months', () => {
      const result = evaluate({
        areaScores: { A1: 13, A2: 16, A3: 12, A4: 10, A5: 6, A6: 6, A7: 5 },
        metadata: meta({
          selfAssessmentSubmitted: true,
          monthsInLite: 18,
          kpiImprovementsCount: 4,
          currentStage: 'RPL Standard',
          previousRecoveryWithin12Months: true,
        }),
      });

      expect(result.outcome).toBe('downgrade');
      expect(result.recoveryRequired).toBe(false);
    });

    it('warns when total score drops below Standard threshold', () => {
      const result = evaluate({
        areaScores: { A1: 16, A2: 10, A3: 7, A4: 7, A5: 5, A6: 5, A7: 5 },
        // Total = 55 — below Standard floor of 60
        metadata: meta({
          selfAssessmentSubmitted: true,
          monthsInLite: 18,
          kpiImprovementsCount: 4,
          currentStage: 'RPL Standard',
        }),
      });

      expect(result.totalScore).toBe(55);
      expect(result.outcome).toBe('warning');
      expect(result.blockingIssues.some(i => i.includes('60'))).toBe(true);
    });
  });

  // ----------------------------------------------------------------
  // Case 6: Immediate suspension
  // ----------------------------------------------------------------
  describe('Case 6: Immediate suspension', () => {
    it('suspends immediately on confirmed undeclared labor', () => {
      const result = evaluate({
        areaScores: { A1: 18, A2: 18, A3: 14, A4: 14, A5: 9, A6: 9, A7: 9 },
        // Score = 91, excellent — but undeclared labor override
        metadata: meta({
          selfAssessmentSubmitted: true,
          monthsInLite: 24,
          kpiImprovementsCount: 5,
          currentStage: 'RPL Standard',
          undeclaredLaborConfirmed: true,
        }),
      });

      expect(result.outcome).toBe('immediate_suspension');
      expect(result.recommendedStage).toBe('Pre-RPL');
      expect(result.immediateActionRequired).toBe(true);
      expect(result.upgradeEligible).toBe(false);
      expect(result.blockingIssues.some(i => i.toLowerCase().includes('undeclared labor'))).toBe(true);
    });

    it('suspends immediately on fraudulent audit documents', () => {
      const result = evaluate({
        areaScores: { A1: 18, A2: 18, A3: 14, A4: 14, A5: 9, A6: 9, A7: 9 },
        metadata: meta({
          selfAssessmentSubmitted: true,
          fraudulentAuditDocuments: true,
          currentStage: 'RPL Excellence',
        }),
      });

      expect(result.outcome).toBe('immediate_suspension');
      expect(result.blockingIssues.some(i => i.toLowerCase().includes('fraudulent'))).toBe(true);
    });

    it('suspends immediately on active criminal investigation', () => {
      const result = evaluate({
        areaScores: { A1: 18, A2: 18, A3: 14, A4: 14, A5: 9, A6: 9, A7: 9 },
        metadata: meta({
          selfAssessmentSubmitted: true,
          criminalInvestigationActive: true,
          currentStage: 'RPL Lite',
        }),
      });

      expect(result.outcome).toBe('immediate_suspension');
      expect(result.blockingIssues.some(i => i.toLowerCase().includes('criminal'))).toBe(true);
    });

    it('suspension overrides excellent scores — score is still reported', () => {
      const result = evaluate({
        areaScores: { A1: 20, A2: 20, A3: 15, A4: 15, A5: 10, A6: 10, A7: 10 },
        metadata: meta({ ethicalViolationConfirmed: true }),
      });

      expect(result.totalScore).toBe(100);
      expect(result.outcome).toBe('immediate_suspension');
      expect(result.recommendedStage).toBe('Pre-RPL');
    });

    it('reports multiple simultaneous suspension triggers', () => {
      const result = evaluate({
        areaScores: { A1: 16, A2: 14, A3: 10, A4: 10, A5: 6, A6: 6, A7: 6 },
        metadata: meta({
          undeclaredLaborConfirmed: true,
          fraudulentAuditDocuments: true,
        }),
      });

      expect(result.blockingIssues).toHaveLength(2);
    });
  });

  // ----------------------------------------------------------------
  // Case 7: RPL Excellence — upgrade eligible
  // ----------------------------------------------------------------
  describe('Case 7: RPL Excellence upgrade eligible', () => {
    it('marks upgrade_eligible for Standard restaurant meeting all Excellence conditions', () => {
      const result = evaluate({
        areaScores: { A1: 19, A2: 19, A3: 14, A4: 14, A5: 9, A6: 9, A7: 9 },
        // Total = 93, A7=9 ≥ 8
        metadata: meta({
          selfAssessmentSubmitted: true,
          monthsInLite: 24,
          kpiImprovementsCount: 5,
          currentStage: 'RPL Standard',
          consecutiveYearsAbove85: 2,
          communityContributionActive: true,
          ethicalViolationConfirmed: false,
        }),
      });

      expect(result.totalScore).toBe(93);
      expect(result.recommendedStage).toBe('RPL Excellence');
      expect(result.outcome).toBe('upgrade_eligible');
      expect(result.upgradeEligible).toBe(true);
    });

    it('blocks Excellence upgrade when consecutive years requirement is not met', () => {
      const result = evaluate({
        areaScores: { A1: 19, A2: 19, A3: 14, A4: 14, A5: 9, A6: 9, A7: 9 },
        metadata: meta({
          selfAssessmentSubmitted: true,
          monthsInLite: 24,
          kpiImprovementsCount: 5,
          currentStage: 'RPL Standard',
          consecutiveYearsAbove85: 1, // needs 2
          communityContributionActive: true,
        }),
      });

      expect(result.recommendedStage).toBe('RPL Standard');
      expect(result.outcome).toBe('accepted');
      expect(result.upgradeEligible).toBe(false);
    });
  });
});

// ------------------------------------------------------------------
// Input validation
// ------------------------------------------------------------------

describe('evaluate — input validation', () => {
  it('throws on out-of-range area score', () => {
    expect(() =>
      evaluate({
        areaScores: { A1: 25, A2: 20, A3: 15, A4: 15, A5: 10, A6: 10, A7: 10 },
        metadata: meta(),
      })
    ).toThrow('Invalid area scores');
  });

  it('throws on negative area score', () => {
    expect(() =>
      evaluate({
        areaScores: { A1: -5, A2: 20, A3: 15, A4: 15, A5: 10, A6: 10, A7: 10 },
        metadata: meta(),
      })
    ).toThrow();
  });
});

// ------------------------------------------------------------------
// Output structure invariants
// ------------------------------------------------------------------

describe('evaluate — output structure', () => {
  const baseInput: RPLScoreInput = {
    areaScores: { A1: 16, A2: 14, A3: 10, A4: 10, A5: 6, A6: 6, A7: 6 },
    metadata: meta({ selfAssessmentSubmitted: true, monthsInLite: 5 }),
  };

  it('always returns a totalScore between 0 and 100', () => {
    const result = evaluate(baseInput);
    expect(result.totalScore).toBeGreaterThanOrEqual(0);
    expect(result.totalScore).toBeLessThanOrEqual(100);
  });

  it('always returns a valid recommendedStage', () => {
    const validStages = ['Pre-RPL', 'RPL Lite', 'RPL Standard', 'RPL Excellence'];
    const result = evaluate(baseInput);
    expect(validStages).toContain(result.recommendedStage);
  });

  it('always returns a valid outcome', () => {
    const validOutcomes = [
      'accepted', 'warning', 'recovery_plan', 'downgrade',
      'immediate_suspension', 'upgrade_eligible',
    ];
    const result = evaluate(baseInput);
    expect(validOutcomes).toContain(result.outcome);
  });

  it('always returns arrays for reasons and blockingIssues', () => {
    const result = evaluate(baseInput);
    expect(Array.isArray(result.reasons)).toBe(true);
    expect(Array.isArray(result.blockingIssues)).toBe(true);
  });

  it('returns the submitted areaScores unchanged', () => {
    const result = evaluate(baseInput);
    expect(result.areaScores).toEqual(baseInput.areaScores);
  });
});
