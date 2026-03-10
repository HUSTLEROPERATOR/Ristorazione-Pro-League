/**
 * RPL Score Engine — Type Definitions
 *
 * Source of truth:
 *   docs/RPL_SCORING_MODEL.md
 *   docs/RPL_STAGE_TRANSITIONS.md
 *   docs/RESTAURANT_LIFECYCLE.md
 */

export type AreaKey = 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7';

/**
 * The seven scoring areas and their submitted scores.
 *
 * Max values per area (total = 100):
 *   A1 = 20, A2 = 20, A3 = 15, A4 = 15, A5 = 10, A6 = 10, A7 = 10
 */
export interface AreaScores {
  /** Contratti e Compliance — max 20 */
  A1: number;
  /** Team e Formazione — max 20 */
  A2: number;
  /** Operazioni e Sistemi — max 15 */
  A3: number;
  /** KPI e Disciplina dei Dati — max 15 */
  A4: number;
  /** Sostenibilità — max 10 */
  A5: number;
  /** Reputazione Cliente — max 10 */
  A6: number;
  /** Cultura ed Etica — max 10 */
  A7: number;
}

/**
 * Metadata flags that govern stage transition decisions.
 * See docs/RPL_STAGE_TRANSITIONS.md for full rule definitions.
 */
export interface RPLMetadata {
  /** Whether the annual self-assessment checklist has been submitted */
  selfAssessmentSubmitted: boolean;

  /** Number of months the restaurant has been active in RPL Lite */
  monthsInLite: number;

  /** Number of KPIs with documented measurable improvement (required for Lite→Standard) */
  kpiImprovementsCount: number;

  /** Serious ethical violation confirmed by RPL — triggers immediate suspension */
  ethicalViolationConfirmed: boolean;

  /** Fraudulent documentation discovered during audit — triggers immediate suspension */
  fraudulentAuditDocuments: boolean;

  /** Confirmed undeclared labor (lavoro sommerso) — triggers immediate suspension */
  undeclaredLaborConfirmed: boolean;

  /** Active criminal investigation for labor or food safety — triggers immediate suspension */
  criminalInvestigationActive: boolean;

  /**
   * Consecutive years the restaurant scored ≥85/100.
   * Must be ≥2 for Excellence upgrade. Defaults to 0 if omitted.
   */
  consecutiveYearsAbove85?: number;

  /**
   * Whether the restaurant actively contributes to the RPL community
   * (mentoring Lite restaurants, attending events, publishing case studies).
   * Required for Excellence.
   */
  communityContributionActive?: boolean;

  /**
   * The restaurant's current RPL stage.
   * When provided, determines whether the outcome is a warning, downgrade,
   * or upgrade rather than a plain acceptance.
   * Omit for fresh assessments (no current stage context).
   */
  currentStage?: RPLStage;

  /**
   * True if the restaurant already exhausted a recovery plan within the last
   * 12 months. A second failure within 12 months skips the recovery window
   * and triggers a direct downgrade.
   */
  previousRecoveryWithin12Months?: boolean;
}

export interface RPLScoreInput {
  areaScores: AreaScores;
  metadata: RPLMetadata;
}

export type RPLStage = 'Pre-RPL' | 'RPL Lite' | 'RPL Standard' | 'RPL Excellence';

/**
 * The action outcome produced by a scoring assessment.
 *
 * - accepted            — Restaurant meets all requirements for its current or target stage
 * - warning             — Score dropped below thresholds; 90-day recovery window opened
 * - recovery_plan       — Formal 90-day recovery plan is in progress
 * - downgrade           — Recovery failed or second failure within 12 months; stage reduced
 * - immediate_suspension — Suspension override; no warning or recovery window applies
 * - upgrade_eligible    — Restaurant qualifies for the next stage above its current one
 */
export type RPLOutcome =
  | 'accepted'
  | 'warning'
  | 'recovery_plan'
  | 'downgrade'
  | 'immediate_suspension'
  | 'upgrade_eligible';

export interface RPLScoreResult {
  /** Numeric total out of 100 */
  totalScore: number;

  /** The individual area scores as submitted */
  areaScores: AreaScores;

  /** The highest RPL stage the submitted scores currently qualify for */
  recommendedStage: RPLStage;

  /** The action outcome for this assessment */
  outcome: RPLOutcome;

  /** Human-readable explanations for the outcome and next steps */
  reasons: string[];

  /** Hard blockers that must be resolved to enter or maintain a stage */
  blockingIssues: string[];

  /** True if the restaurant qualifies to move to the next stage */
  upgradeEligible: boolean;

  /** True if the restaurant must follow a 90-day recovery plan to avoid downgrade */
  recoveryRequired: boolean;

  /** True if an immediate intervention is required (suspension or critical violation) */
  immediateActionRequired: boolean;
}
