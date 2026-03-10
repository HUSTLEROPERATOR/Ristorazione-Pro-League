# RPL KPI Tracking Sheet — Weekly Performance Monitor

> Operational template. Version 1.0

---

## 1. Purpose of This KPI Sheet

### What it is

This template is the **minimum viable tracking tool** used by consultants and restaurant owners during the Pre-RPL → RPL Lite transformation phase. It is intentionally simple. It captures the seven most important weekly KPIs for a small independent restaurant and nothing more.

It is designed to be implemented in:

- **Google Sheets** — duplicate the tab each week, lock the header row
- **Excel** — same structure, add a summary tab for monthly averages
- **Notion** — use a database with weekly entries; add a formula property for average ticket

### How it helps

| Function | How this sheet delivers it |
|----------|---------------------------|
| **Track improvements** | Side-by-side weekly data makes trends visible at a glance |
| **Support audits** | Filled sheets are direct evidence for A4 (KPI & Data) in the RPL Scoring Model |
| **Document transformation progress** | Completed weeks create a timestamped record of the restaurant's journey from Pre-RPL toward Lite readiness |

### When to start

Start filling this sheet at the beginning of **Days 31–60** of the Pre-RPL → Lite transformation (see `consulting-os/playbooks/pre-rpl-to-lite-playbook.md`, Section 4). The first full month of data is required as minimum evidence for the Lite application package.

### Filling rules

- **Owner fills the sheet** — not the consultant. The consultant reviews and interprets.
- Fill once per week, on Monday, using the previous week's data.
- Use estimates if exact figures are not available — a consistent estimate is more useful than a missing cell.
- Never leave a cell blank. Use `—` if a value genuinely cannot be obtained.

---

## 2. Core KPIs

These seven KPIs are the minimum set for RPL tracking. They cover the areas most relevant for the Pre-RPL → Lite transition.

| # | KPI | Definition | How to measure | Benchmark (small restaurant) |
|---|-----|------------|---------------|:-----------------------------:|
| 1 | **Revenue** | Total weekly receipts (cash + card + delivery) | POS daily totals or register summary | — (establish baseline first) |
| 2 | **Covers** | Total paying guests served during the week | Reservation system, manual count, or POS covers field | — (establish baseline first) |
| 3 | **Average Ticket** | Revenue ÷ Covers | Calculated automatically from columns 1 and 2 | Varies by segment |
| 4 | **Food Cost %** | Food purchases ÷ Revenue × 100 | Weekly food invoice total ÷ revenue | 28–34% |
| 5 | **Labor Cost %** | Total staff cost ÷ Revenue × 100 | Weekly payroll total ÷ revenue | 30–35% |
| 6 | **Waste Estimation** | Qualitative or quantitative estimate of food waste | Count of binned portions, weight of discarded food, or qualitative scale (Low / Medium / High) | Low |
| 7 | **Online Review Score** | Current average star rating on primary review platform (Google) | Check Google Business profile weekly | > 4.0 |

> **A note on Waste Estimation:** at Pre-RPL stage, exact waste measurement is rarely possible. Use a simple qualitative scale (Low / Medium / High) until a more precise method is established. Consistency matters more than precision at this stage.

---

## 3. Weekly Tracking Table

### How to use this table

Copy this table structure into your tracking tool. Add one row per week. The **Week** column should contain the starting date of that week (Monday).

The **Avg Ticket** column can be auto-calculated: `Revenue ÷ Covers`.

| Week (Mon) | Revenue (€) | Covers | Avg Ticket (€) | Food Cost % | Labor Cost % | Waste (L/M/H) | Google Score |
|:----------:|:-----------:|:------:|:--------------:|:-----------:|:------------:|:-------------:|:------------:|
| YYYY-MM-DD | | | *(auto)* | | | | |
| YYYY-MM-DD | | | *(auto)* | | | | |
| YYYY-MM-DD | | | *(auto)* | | | | |
| YYYY-MM-DD | | | *(auto)* | | | | |

### Example — Trattoria Lo Scoglio (Weeks 5–8 of transformation)

| Week (Mon) | Revenue (€) | Covers | Avg Ticket (€) | Food Cost % | Labor Cost % | Waste (L/M/H) | Google Score |
|:----------:|:-----------:|:------:|:--------------:|:-----------:|:------------:|:-------------:|:------------:|
| 2025-04-07 | 4,850 | 143 | 33.92 | 36% | 31% | H | 4.1 |
| 2025-04-14 | 5,120 | 158 | 32.41 | 34% | 30% | M | 4.1 |
| 2025-04-21 | 4,960 | 151 | 32.85 | 33% | 32% | M | 4.2 |
| 2025-04-28 | 5,380 | 167 | 32.22 | 31% | 30% | L | 4.2 |

*Observation: food cost dropped from 36% to 31% over 4 weeks as portion review was implemented. Waste trend improved from High to Low.*

---

## 4. Monthly Summary

At the end of each calendar month, calculate the monthly summary from the individual weekly rows.

### Monthly summary table

| Month | Avg Weekly Revenue (€) | Total Covers | Avg Ticket (€) | Avg Food Cost % | Avg Labor Cost % | Waste Trend | Avg Google Score |
|:-----:|:----------------------:|:------------:|:--------------:|:---------------:|:----------------:|:-----------:|:----------------:|
| Month 1 | | | | | | | |
| Month 2 | | | | | | | |
| Month 3 | | | | | | | |

### How to calculate each column

| Column | Calculation |
|--------|------------|
| Avg Weekly Revenue | Sum of all weekly revenue values ÷ number of weeks in the month |
| Total Covers | Sum of all weekly cover counts for the month |
| Avg Ticket | Total monthly revenue ÷ Total monthly covers |
| Avg Food Cost % | Average of all weekly Food Cost % values |
| Avg Labor Cost % | Average of all weekly Labor Cost % values |
| Waste Trend | Narrative summary: e.g. "Improving — moved from H to M over the month" |
| Avg Google Score | Average of all weekly Google Score readings |

> **Minimum required for RPL Lite application:** two completed monthly summaries (Months 1 and 2). See `consulting-os/playbooks/pre-rpl-to-lite-playbook.md`, Section 6.

---

## 5. KPI Improvement Tracking

This section documents the transformation progress for each KPI. It is updated at the end of the transformation phase and forms part of the RPL Lite application evidence package.

### Improvement tracking table

Fill in the **Baseline** column at the start of tracking (Week 1 data or best available estimate). Update **Current** monthly. **Target** is set by the consultant at the start of the transformation.

| KPI | Baseline | Target | Month 1 | Month 2 | Month 3 | Status |
|-----|:--------:|:------:|:-------:|:-------:|:-------:|:------:|
| Revenue (€/week) | | | | | | |
| Covers (weekly) | | | | | | |
| Avg Ticket (€) | | | | | | |
| Food Cost % | | ≤ 32% | | | | |
| Labor Cost % | | ≤ 35% | | | | |
| Waste | | Low | | | | |
| Google Score | | ≥ 4.0 | | | | |

### Status key

| Symbol | Meaning |
|--------|---------|
| ✅ | At or better than target |
| 🟡 | Improving but not yet at target |
| 🔴 | Not improving or worsening — needs consultant attention |
| — | Insufficient data |

### Example — Trattoria Lo Scoglio improvement summary

| KPI | Baseline | Target | Month 1 | Month 2 | Status |
|-----|:--------:|:------:|:-------:|:-------:|:------:|
| Revenue (€/week) | 4,850 | 5,500 | 5,078 | 5,620 | ✅ |
| Covers (weekly) | 143 | 170 | 155 | 172 | ✅ |
| Avg Ticket (€) | 33.92 | 34.00 | 32.76 | 32.67 | 🟡 |
| Food Cost % | 36% | ≤ 32% | 33.5% | 31% | ✅ |
| Labor Cost % | 31% | ≤ 35% | 30.8% | 31.2% | ✅ |
| Waste | High | Low | Medium | Low | ✅ |
| Google Score | 4.1 | ≥ 4.2 | 4.15 | 4.2 | ✅ |

---

## 6. Relationship With the RPL System

This KPI sheet is not a standalone document. It connects to three core parts of the RPL system.

### Connection to `docs/RPL_SCORING_MODEL.md`

The data collected in this sheet provides direct evidence for **Area A4 — KPI & Data Discipline** in the RPL Scoring Model. A filled and consistent KPI sheet, covering at least two months, demonstrates that the restaurant is tracking operational data systematically — which is the primary criterion for A4.

| A4 scoring criterion | How this sheet addresses it |
|---------------------|----------------------------|
| Food cost monitored | ✅ Weekly Food Cost % column |
| At least one KPI recorded monthly | ✅ Monthly Summary section |
| Data-driven improvement documented | ✅ KPI Improvement Tracking section |
| Dashboard or tracking tool in active use | ✅ This sheet is the tracking tool |

The data in columns 6 (Labor Cost %) and 7 (Waste) also contributes evidence to **A5 — Sustainability** (via waste trend) when presented alongside other sustainability actions.

### Connection to `docs/RPL_AUDIT_PROCESS.md`

During the RPL Lite entry audit, the auditor will request evidence of KPI tracking. This sheet — printed, exported to PDF, or shared as a spreadsheet link — is the primary evidence document for A4.

| What the auditor checks | Where to find it in this sheet |
|------------------------|-------------------------------|
| That food cost is being tracked | Section 3 (weekly table), Food Cost % column |
| That data has been collected for at least 1 month | Section 4 (monthly summary), Month 1 row |
| That improvement is visible | Section 5 (improvement tracking), Status column |
| That the restaurant owner is doing the tracking | Consultant confirms during audit debrief |

### Connection to `consulting-os/playbooks/pre-rpl-to-lite-playbook.md`

The playbook prescribes two specific KPI deliverables:

| Playbook milestone | What this sheet delivers |
|-------------------|-------------------------|
| Days 31–60: "Record first monthly KPI snapshot" | Section 3 weekly rows + Section 4 Month 1 summary |
| Days 61–90: "Record second monthly KPI snapshot" | Section 4 Month 2 summary |
| Application package: "Monthly KPI sheet (2 months minimum)" | Completed Sections 3, 4, and 5 |

This sheet satisfies all three milestones in a single document.

---

## Proposed Cross-Reference Updates

After creating this document, the following minor updates are recommended in existing files:

1. **`consulting-os/README.md`** — Add a `templates/rpl_kpi_tracking_sheet.md` entry in the templates section.
2. **`consulting-os/playbooks/pre-rpl-to-lite-playbook.md`** — In the Days 31–60 action table, replace the generic "Monthly food cost template" output with a direct link to this sheet: `consulting-os/templates/rpl_kpi_tracking_sheet.md`.
3. **`consulting-os/kpi/kpi-master-list.md`** — Add a note at the top linking to this sheet as the standard RPL tracking tool for the Pre-RPL → Lite phase.

---

## Next 3 Repository Tasks

| Priority | Task | Rationale |
|----------|------|-----------|
| 1 | **Create `consulting-os/playbooks/lite-to-standard-playbook.md`** | The Pre-RPL → Lite playbook is complete. The next transformation stage (Lite → Standard) involves all 7 consulting-os phases and a 12-month timeline. It requires its own playbook with the same 90-day structure adapted for a more complex engagement. |
| 2 | **Create `consulting-os/kpi/rpl-scoring-dashboard-template.md`** | Consultants need a working template to translate the weekly and monthly KPI data collected in this sheet into an updated RPL score for each area. This closes the loop between raw operational data and the scoring model. |
| 3 | **Add stage transition fields to `templates/RPL_SCORECARD_TEMPLATE.md`** | The scorecard currently records scores but does not include fields for the application status (submitted / pending / approved) or the KPI evidence package status. Aligning the scorecard template with this KPI sheet and the playbook closes the documentation loop for the Lite application workflow. |
