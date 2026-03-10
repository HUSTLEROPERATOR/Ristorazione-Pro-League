# RPL Score Engine — MVP Usage Guide

**Version:** 1.0.0-MVP
**Location:** `backend/src/domain/rpl/`
**Tests:** `backend/tests/rpl-score-engine.test.ts`

---

## What this is

The RPL Score Engine is the first code-based operational tool for Ristorazione Pro League. It converts the governance rules documented in `docs/RPL_SCORING_MODEL.md` and `docs/RPL_STAGE_TRANSITIONS.md` into deterministic, testable TypeScript functions.

It is a **pure domain module** — no HTTP, no database, no auth. It takes structured input and returns a structured result. It can be embedded into any API endpoint, CLI script, or audit workflow.

---

## Files

```
backend/src/domain/rpl/
├── scoring-types.ts          Input/output type definitions
├── score-engine.ts           Numeric scoring primitives
└── stage-transition-engine.ts  Main evaluation function

backend/tests/
└── rpl-score-engine.test.ts  Full test suite
```

---

## Quick start

```typescript
import { evaluate } from './src/domain/rpl/stage-transition-engine';

const result = evaluate({
  areaScores: {
    A1: 18,  // Contracts & Compliance  (max 20)
    A2: 16,  // Team & Training         (max 20)
    A3: 12,  // Operations & Systems    (max 15)
    A4: 11,  // KPI & Data Discipline   (max 15)
    A5: 7,   // Sustainability          (max 10)
    A6: 7,   // Customer Reputation     (max 10)
    A7: 7,   // Culture & Ethics        (max 10)
  },
  metadata: {
    selfAssessmentSubmitted: true,
    monthsInLite: 14,
    kpiImprovementsCount: 4,
    ethicalViolationConfirmed: false,
    fraudulentAuditDocuments: false,
    undeclaredLaborConfirmed: false,
    criminalInvestigationActive: false,
    currentStage: 'RPL Lite',
  },
});

console.log(result);
```

**Output:**
```json
{
  "totalScore": 78,
  "areaScores": { "A1": 18, "A2": 16, "A3": 12, "A4": 11, "A5": 7, "A6": 7, "A7": 7 },
  "recommendedStage": "RPL Standard",
  "outcome": "upgrade_eligible",
  "reasons": [
    "Current stage: RPL Lite. Submitted scores qualify for RPL Standard.",
    "All entry conditions for the higher stage are met. A formal upgrade audit is required to confirm."
  ],
  "blockingIssues": [],
  "upgradeEligible": true,
  "recoveryRequired": false,
  "immediateActionRequired": false
}
```

---

## Input schema

### `AreaScores`

| Field | Area Name (Italian) | Max |
|-------|---------------------|-----|
| `A1`  | Contratti e Compliance | 20 |
| `A2`  | Team e Formazione | 20 |
| `A3`  | Operazioni e Sistemi | 15 |
| `A4`  | KPI e Disciplina dei Dati | 15 |
| `A5`  | Sostenibilità | 10 |
| `A6`  | Reputazione Cliente | 10 |
| `A7`  | Cultura ed Etica | 10 |

All scores must be `>= 0` and `<= max`. The engine throws if this is violated.

### `RPLMetadata`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `selfAssessmentSubmitted` | `boolean` | Yes | Must be `true` for Lite entry |
| `monthsInLite` | `number` | Yes | Minimum 12 for Standard upgrade |
| `kpiImprovementsCount` | `number` | Yes | Minimum 3 for Standard upgrade |
| `ethicalViolationConfirmed` | `boolean` | Yes | Triggers immediate suspension |
| `fraudulentAuditDocuments` | `boolean` | Yes | Triggers immediate suspension |
| `undeclaredLaborConfirmed` | `boolean` | Yes | Triggers immediate suspension |
| `criminalInvestigationActive` | `boolean` | Yes | Triggers immediate suspension |
| `currentStage` | `RPLStage` | No | Omit for fresh assessments |
| `consecutiveYearsAbove85` | `number` | No | Defaults to 0; minimum 2 for Excellence |
| `communityContributionActive` | `boolean` | No | Required for Excellence |
| `previousRecoveryWithin12Months` | `boolean` | No | Skips recovery window on second failure |

---

## Output schema

| Field | Type | Description |
|-------|------|-------------|
| `totalScore` | `number` | Sum of all area scores (0–100) |
| `areaScores` | `AreaScores` | Scores as submitted (unchanged) |
| `recommendedStage` | `RPLStage` | Highest stage the scores qualify for |
| `outcome` | `RPLOutcome` | Action decision for this assessment |
| `reasons` | `string[]` | Explanations and next steps |
| `blockingIssues` | `string[]` | Hard conditions that must be resolved |
| `upgradeEligible` | `boolean` | True if next stage is within reach |
| `recoveryRequired` | `boolean` | True if 90-day recovery plan is active |
| `immediateActionRequired` | `boolean` | True for suspension cases |

### `RPLOutcome` values

| Value | Meaning |
|-------|---------|
| `accepted` | Restaurant meets requirements for its current or target stage |
| `warning` | Score dropped below threshold; 90-day recovery window opened |
| `recovery_plan` | Formal recovery plan is in progress |
| `downgrade` | Recovery failed or second failure within 12 months |
| `immediate_suspension` | Hard override — no warning or recovery window |
| `upgrade_eligible` | All conditions for the next stage are met |

---

## Scoring thresholds (source: `docs/RPL_SCORING_MODEL.md`)

### RPL Lite entry
- Total score ≥ 35
- A1 (Contracts & Compliance) ≥ 14/20 — **hard floor**
- No area with score = 0
- `selfAssessmentSubmitted` = true

### RPL Standard upgrade (from Lite)
- Total score ≥ 60
- A1 ≥ 16/20 — **hard floor**
- No area below 50% of its maximum
- ≥ 12 months in RPL Lite
- ≥ 3 documented KPI improvements
- Light upgrade audit required (not enforced in engine — external process)

### RPL Excellence upgrade (from Standard)
- Total score ≥ 85 for **2 consecutive years**
- A7 (Culture & Ethics) ≥ 8/10
- Zero confirmed ethical violations
- Active community contribution (mentoring, events, case studies)

### Immediate suspension (overrides all stages)
Any one of:
- `undeclaredLaborConfirmed` = true
- `fraudulentAuditDocuments` = true
- `ethicalViolationConfirmed` = true
- `criminalInvestigationActive` = true

Re-admission: minimum 6 months + full violation resolution.

### 90-day recovery plan
Triggered when a restaurant's score falls below its current stage threshold.

- Day 0: RPL consultant assigned, corrective plan documented
- Day 45: Progress check-in, plan adjusted if needed
- Day 90: Extraordinary on-site audit
  - Pass → stage maintained
  - Fail → downgrade by one level

Second failure within 12 months: `previousRecoveryWithin12Months = true` skips the recovery window and triggers direct downgrade.

---

## Running the tests

From the `backend/` directory:

```bash
npm test
# or watch mode:
npm run test:watch
```

The test file covers:

| Test case | Scenario |
|-----------|----------|
| Pre-RPL rejected | Score below Lite threshold, A1 floor failure, missing checklist |
| Lite accepted | Fresh entry meeting all Lite conditions |
| Lite warning | Currently in Lite, score dropped below thresholds |
| Lite → Standard eligible | All Standard conditions met, upgrade flagged |
| Standard downgrade | A1 below Standard floor, second failure → direct downgrade |
| Immediate suspension | Undeclared labor, fraudulent docs, criminal investigation |
| Excellence upgrade eligible | All Excellence conditions met from Standard |
| Input validation | Out-of-range scores throw with clear errors |
| Output invariants | Structure always consistent regardless of input |

---

## Extending the engine

### Add a new scoring rule
Edit the relevant `unmetFor*` function in `stage-transition-engine.ts` and add a corresponding test case. The thresholds themselves live in `score-engine.ts → THRESHOLDS`.

### Expose via HTTP
Wrap `evaluate()` in an Express route handler:

```typescript
import { evaluate } from '../domain/rpl/stage-transition-engine';

router.post('/rpl/evaluate', (req, res) => {
  try {
    const result = evaluate(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});
```

### Add Zod validation
The engine trusts its input after the internal `validateAreaScores()` check. For HTTP boundaries, add a Zod schema on top:

```typescript
import { z } from 'zod';

const AreaScoresSchema = z.object({
  A1: z.number().min(0).max(20),
  A2: z.number().min(0).max(20),
  A3: z.number().min(0).max(15),
  A4: z.number().min(0).max(15),
  A5: z.number().min(0).max(10),
  A6: z.number().min(0).max(10),
  A7: z.number().min(0).max(10),
});
```

---

## Intentionally left out of MVP

The following are not implemented in this engine and are noted for future development:

| Feature | Reason |
|---------|--------|
| HTTP API endpoint | Separation of concerns — engine is pure domain logic |
| Database persistence | Out of scope for scoring logic |
| Authentication & authorization | Not required for the domain layer |
| Audit trail / event logging | Future: attach to an audit service |
| PDF scorecard generation | Future: use `templates/RPL_SCORECARD_TEMPLATE.md` as source |
| iProfile integration | Future: worker profiles are a separate domain |
| Consecutive year tracking | Engine accepts `consecutiveYearsAbove85` as an input flag — tracking across time is a persistence concern |
| Recovery plan scheduling | Engine flags `recoveryRequired = true` — plan lifecycle management is external |
| Multi-restaurant batch processing | Future: thin wrapper calling `evaluate()` in a loop |
