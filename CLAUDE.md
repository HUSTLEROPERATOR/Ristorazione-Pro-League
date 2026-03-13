# CLAUDE.md — Ristorazione-Pro-League

_Last updated: 2026-03-13_

## Project Overview

Ristorazione Pro League (RPL) è un ecosistema meritocratico per il settore della ristorazione italiana: profili verificati (iProfile), sistema di auditing e reputazione, fair play finanziario, premi e riconoscimenti, formazione e crescita professionale. Il progetto è strutturato come una "lega" con regole chiare, incentivi e strumenti digitali moderni.

**Current state (as of 2026-03-13):**
- Strategic documentation complete in `docs/`
- Backend TypeScript/Express functional in `backend/`
- Consulting OS operational in `consulting-os/`
- RPL Score Engine MVP fully tested and working in `backend/src/domain/rpl/`
- BMad Method v6 CLI tooling installed in `_bmad/`
- Formal PRD and Architecture docs generated in `_bmad/planning-artifacts/`
- Frontend is static HTML/CSS/JS mock only — React SPA not yet started

## Tech Stack

- **Language**: TypeScript (backend), JavaScript + HTML/CSS (frontend mock)
- **Framework**: Express.js (Node.js >=18)
- **ORM**: Prisma 5.x
- **Database**: SQLite (dev) → PostgreSQL (production target)
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **Validation**: Zod
- **Testing**: Jest + ts-jest
- **Build**: tsc (TypeScript compiler)
- **Dev server**: tsx watch
- **Infrastructure**: Docker / Hetzner Cloud (owner's standard stack — target)
- **CI/CD**: GitHub Issue/PR templates present; no automated GitHub Actions pipeline yet

## Directory Structure

```
Ristorazione-Pro-League/
├── backend/                    # TypeScript/Express API server
│   ├── src/
│   │   ├── config/             # config.ts, database.ts (Prisma client)
│   │   ├── controllers/        # authController.ts (Prisma), simpleAuthController.ts (in-memory)
│   │   ├── domain/rpl/         # ⭐ RPL Score Engine — pure domain logic (reference implementation)
│   │   │   ├── score-engine.ts           # Scoring primitives, AREA_MAX_SCORES, THRESHOLDS
│   │   │   ├── scoring-types.ts          # AreaKey, RPLStage, RPLOutcome, RPLScoreResult types
│   │   │   └── stage-transition-engine.ts # Main evaluate() function
│   │   ├── middleware/         # auth.ts, errorHandler.ts, notFound.ts
│   │   ├── routes/             # 9 route files: auth, users, restaurants, workers + mock/in-memory variants
│   │   ├── scripts/            # seed.ts, test-api.ts
│   │   ├── types/              # auth.ts interfaces
│   │   └── utils/              # auth.ts, validation.ts, validators.ts, math.ts
│   ├── tests/                  # Jest test suite
│   │   ├── math.test.ts
│   │   └── rpl-score-engine.test.ts  # 566 lines, 8 suites, comprehensive coverage
│   ├── prisma/
│   │   ├── schema.prisma       # 5 models: User, Restaurant, WorkerProfile, JobOffer, JobApplication
│   │   └── dev.db              # SQLite dev database (committed to git — see Known Issues)
│   ├── public/                 # Static files served by backend (index.html, favicons, images)
│   ├── .env.example            # Environment variable template (15 variables)
│   ├── package.json            # Node.js >=18, 25+ prod deps, 18 dev deps
│   ├── tsconfig.json           # Strict mode, ES2022 target, experimentalDecorators
│   └── jest.config.js          # ts-jest, Node environment
│
├── _bmad/                      # ⭐ BMad Method v6 CLI tooling (INSTALLED)
│   ├── _config/                # manifest.yaml, agent-manifest.csv, workflow configs
│   ├── _memory/                # Agent memory/state
│   ├── bmm/
│   │   ├── agents/             # 9 agents: analyst, architect, dev, pm, qa, sm, ux-designer,
│   │   │                       #           quick-flow-solo-dev, tech-writer
│   │   └── workflows/
│   │       └── 2-plan-workflows/create-prd/  # PRD creation & validation (13+ steps)
│   ├── core/                   # Core BMad tooling
│   └── planning-artifacts/     # ⭐ Generated outputs: prd.md, architecture.md
│
├── _bmad-output/               # Additional generated BMAD output (76 KB)
│   └── planning-artifacts/     # (currently empty — _bmad/planning-artifacts is the active location)
│
├── consulting-os/              # BMAD-powered consulting operating system
│   ├── README.md               # Module entry point
│   ├── docs/                   # Methodology docs, BMAD workflow
│   ├── playbooks/              # pre-rpl-to-lite-playbook.md, lite-to-standard-playbook.md
│   ├── templates/              # 11 reusable templates (audit, checklist, CRM, KPI, menu, SOP, etc.)
│   ├── clients/                # Per-restaurant folders, _CLIENT-TEMPLATE
│   ├── prompts/                # AI prompt library
│   ├── kpi/                    # KPI framework
│   ├── ops/                    # Internal operations (sales, delivery quality)
│   ├── marketing/              # Proposals, case studies
│   └── automation/             # Review request flows
│
├── docs/                       # Strategic & technical documentation
│   ├── RPL_OPERATIONAL_CORE.md       # ⭐ Core operational definition
│   ├── RPL_SCORING_MODEL.md          # ⭐ 7 areas, 100 pts, thresholds
│   ├── RPL_STAGE_TRANSITIONS.md      # ⭐ Upgrade/downgrade/suspension rules
│   ├── RPL_AUDIT_PROCESS.md          # ⭐ On-site audit procedures
│   ├── RESTAURANT_LIFECYCLE.md       # Complete restaurant journey Pre-RPL → Excellence
│   ├── RPL_SCORE_ENGINE_MVP.md       # MVP specification
│   ├── 00_RPL_Strategic_Update_2025.md
│   ├── 01_Introduzione_e_Visione.md
│   ├── 02_Piano_di_Fattibilita.md
│   ├── 02_Analisi_Settore_Approfondimenti.md
│   ├── 03_Architettura_Tecnica.md    # Target: React + Node.js + PostgreSQL
│   ├── 04_Progetto_Pilota_Sardegna.md
│   ├── 05_Piano_B_RPL_Lite.md
│   ├── 06_Sviluppi_Futuri_e_Moduli_Avanzati.md
│   ├── DATI_STATISTICI_RISTORAZIONE_2025.md
│   ├── Indice.md                     # Navigable documentation index
│   └── Regolamento_Generale/         # Full league regulations (6 chapters)
│
├── src/                        # Frontend mock (vanilla JS)
│   ├── main.js
│   ├── api.js
│   └── components.js
│
├── styles/style.css            # Frontend styles
├── mock-ui/index.html          # Mock UI static page
├── index.html                  # Main landing page (53 KB static)
├── RESTAURANT_PRO_LEAGUE.HTML  # Alternative static version
├── templates/                  # RPL forms & contract templates
│   ├── Checklist_Adesione_RPL.md
│   ├── Modello_Contratto_Etico.md
│   ├── Piano_Sostenibilita_Base.md
│   └── RPL_SCORECARD_TEMPLATE.md
├── .github/                    # GitHub configuration
│   ├── ISSUE_TEMPLATE/         # bug_report, feature_request, good_first_issue, config.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── README.md
├── ROADMAP.md
├── REPOSITORY_MAP.md           # BMAD-generated navigation map
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── SECURITY.md
├── BUILD_PUBLIC_POST.md
├── RPL_Web_App_Project_Structure.md
├── DATI_STATISTICI_ISTRUZIONE_ALBERGHIERA_2025.md
├── LICENSE                     # MIT
└── CLAUDE.md                   # This file
```

## Modules & Components

| Module | Description | Status |
|--------|-------------|--------|
| `backend/src/domain/rpl/` | RPL Score Engine — pure TypeScript scoring & stage transition logic | **done** |
| `_bmad/planning-artifacts/` | Formal PRD v1.0 and Architecture doc (BMad-generated) | **done** |
| `consulting-os/playbooks/` | Pre-RPL→Lite and Lite→Standard transformation playbooks | **done** |
| `docs/Regolamento_Generale/` | Full RPL league regulations (6 chapters) | **done** |
| `docs/RPL_SCORING_MODEL.md` | Scoring model (7 areas, 100 pts, thresholds) | **done** |
| `docs/RPL_AUDIT_PROCESS.md` | Audit process documentation | **done** |
| `backend/src/routes/` | REST API routes (auth, users, restaurants, workers, mock data) | **wip** |
| `backend/src/controllers/` | Auth controllers (Prisma DB + in-memory fallback) | **wip** |
| `backend/prisma/schema.prisma` | Data models: User, Restaurant, WorkerProfile, JobOffer, JobApplication | **wip** |
| `consulting-os/` | 7-phase consulting operating system (BMAD Method v6) | **wip** |
| Frontend (React) | React + TypeScript SPA — NOT started; only vanilla JS mock exists | **planned** |
| iProfile system | Professional profile management for workers & restaurants | **planned** |
| Audit workflow API | Automated audit endpoints | **planned** |
| Badge / Awards system | Gamification layer for recognition | **planned** |
| Pilot — Sardegna | Regional pilot project | **planned** |

## Development Commands

```bash
# Install backend dependencies
cd backend && npm install

# Run dev server (with Prisma/SQLite) — port 3000
cd backend && npm run dev

# Run simple in-memory server (no DB needed) — port 4000
cd backend && npm run simple

# Run tests
cd backend && npm test

# Run tests in watch mode
cd backend && npm run test:watch

# Build TypeScript
cd backend && npm run build

# Code quality
cd backend && npm run lint
cd backend && npm run format

# Database operations
cd backend && npm run db:generate   # generate Prisma client
cd backend && npm run db:push       # push schema to DB
cd backend && npm run db:migrate    # run migrations
cd backend && npm run db:studio     # open Prisma Studio
cd backend && npm run db:seed       # seed with test data
```

## RPL Score Engine — Domain Model

The Score Engine (`backend/src/domain/rpl/`) is the reference implementation for all business logic. It is pure TypeScript — no HTTP, no DB, fully testable.

### Scoring Areas (100 pts total)

| Area | Description | Max Points |
|------|-------------|-----------|
| A1 | Compliance & Legality | 20 |
| A2 | Service Quality | 20 |
| A3 | Team & HR | 15 |
| A4 | Financial Management | 15 |
| A5 | Sustainability | 10 |
| A6 | Digital & Innovation | 10 |
| A7 | Community & Reputation | 10 |

### Stage Thresholds

| Stage | Min Total | Min A1 | Additional Requirements |
|-------|-----------|--------|------------------------|
| Pre-RPL | < 35 | — | Entry denied |
| RPL Lite | ≥ 35 | ≥ 14 | Self-assessment submitted |
| RPL Standard | ≥ 60 | ≥ 16 | ≥ 12 months in Lite, ≥ 3 KPI improvements |
| RPL Excellence | ≥ 85 | ≥ 8 (A1 %) | ≥ 2 consecutive years in Standard |

### RPLOutcome Values

`accepted` | `warning` | `recovery_plan` | `downgrade` | `immediate_suspension` | `upgrade_eligible`

### Immediate Suspension Triggers (override all scores)

Undeclared labor · Fraud · Ethical violations · Criminal investigation

### Key Files

- `scoring-types.ts` — `AreaKey`, `AreaScores`, `RPLMetadata`, `RPLStage`, `RPLOutcome`, `RPLScoreResult`
- `score-engine.ts` — `AREA_MAX_SCORES`, `THRESHOLDS`, validation & calculation functions
- `stage-transition-engine.ts` — `evaluate(input): RPLScoreResult` main function

## Backend Architecture

### Dual Server Strategy

| Server | File | Port | DB | Use case |
|--------|------|------|----|----------|
| Full server | `src/index.ts` | 3000 | Prisma/SQLite | Normal development |
| Simple server | `src/simple-server.ts` | 4000 | In-memory | No DB (Termux, CI) |

### Routes (9 files)

| File | Prefix | Notes |
|------|--------|-------|
| `auth.ts` | `/api/auth` | register, login, refresh, profile (Prisma) |
| `authInMemory.ts` | `/api/auth` | In-memory variant |
| `users.ts` | `/api/users` | Full CRUD (Prisma) |
| `inMemoryUsers.ts` | `/api/users` | In-memory variant |
| `restaurants.ts` | `/api/restaurants` | Full CRUD (Prisma) |
| `mockRestaurants.ts` | `/api/restaurants` | Mock data |
| `inMemoryRestaurants.ts` | `/api/restaurants` | In-memory variant |
| `workers.ts` | `/api/workers` | Worker profiles (Prisma) |

### Prisma Schema (5 models)

`User` · `Restaurant` · `WorkerProfile` · `JobOffer` · `JobApplication`

Provider: `sqlite` (dev) → change to `postgresql` for production

### Middleware

- `auth.ts` — `authenticateToken`, `authorizeRoles`, `optionalAuth` (JWT verification)
- `errorHandler.ts` — Global error handler
- `notFound.ts` — 404 handler

## Architecture Decisions

- **Pure Domain Layer**: `backend/src/domain/rpl/` contains pure, side-effect-free TypeScript — no HTTP, no DB. Follow this pattern for all new business logic.
- **Dual server strategy**: Full Prisma-backed + in-memory fallback maintained in parallel. Prefer in-memory for rapid frontend development.
- **Mock routes**: `routes/mock*.ts` and `routes/inMemory*.ts` allow frontend development without a running database.
- **Monorepo-style flat structure**: No npm workspaces; root has no package.json. All backend commands require `cd backend/` first.
- **Target architecture**: React SPA + Node.js API + PostgreSQL. See `docs/03_Architettura_Tecnica.md`.
- **TypeScript strict mode**: `noImplicitAny`, `noUnusedLocals`, `exactOptionalPropertyTypes` all enforced.

## Environment Variables

From `backend/.env.example` — create `backend/.env` (NEVER commit `.env`):

```
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://username:password@localhost:5432/rpl_db?schema=public"
JWT_SECRET=<strong random secret>
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<email>
EMAIL_PASS=<app password>
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
BCRYPT_ROUNDS=12
```

**SECURITY CHECK**: No `.env` committed. `backend/.env.example` is clean. JWT falls back to `'fallback_secret_key'` if `JWT_SECRET` unset (warning is logged). Status: CLEAN.

## BMad Method v6 Integration

- **Installed**: Yes — `_bmad/` directory present with full CLI tooling
- **Config location**: `_bmad/_config/` (manifest.yaml, agent-manifest.csv, etc.)
- **Available agents** (9): `analyst`, `architect`, `dev`, `pm`, `qa`, `sm`, `ux-designer`, `quick-flow-solo-dev`, `tech-writer`
- **Workflows**: `2-plan-workflows/create-prd/` with 13+ validation steps (E-steps: discovery, review, edit, complete; V-steps 1–13: density, coverage, measurability, traceability, etc.)
- **Generated outputs**: `_bmad/planning-artifacts/prd.md`, `_bmad/planning-artifacts/architecture.md`
- **Next step**: Use BMad agents to generate Stories from the existing PRD + Architecture

## Known Issues

1. **No React frontend**: The planned React + TypeScript SPA does not exist yet. Only vanilla JS mock in `src/` and static `index.html`.
2. **SQLite in dev, PostgreSQL in prod**: `schema.prisma` has `provider = "sqlite"` hardcoded. Migration to PostgreSQL requires changing the provider and updating the schema.
3. **No CI/CD pipeline**: `.github/` has issue/PR templates but no GitHub Actions workflows.
4. **No root package.json**: Cannot run commands from root; must `cd backend/` first.
5. **`backend/prisma/dev.db` committed to git**: SQLite dev database is tracked in git. Add `*.db` to `backend/.gitignore` if it contains real data or grows large.

## Development Conventions

- **Branch naming**: `claude/<feature-slug>-<short-hash>` (or `copilot/<feature>`)
- **Commit style**: Conventional commits — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
- **Code style**: TypeScript strict mode; ESLint + Prettier configured in `backend/`
- **Language**: Italian for business/strategic docs, English for code, API responses, and comments

## Quick Start for AI Agents

1. Read this `CLAUDE.md` first
2. Check `_bmad/planning-artifacts/prd.md` for the formal product requirements
3. Check `_bmad/planning-artifacts/architecture.md` for the technical architecture
4. Use `_bmad/` BMad agents to create stories and drive implementation
5. The RPL Score Engine in `backend/src/domain/rpl/` is the **reference implementation** — follow its pure-domain pattern for all new business logic
6. Use `npm run simple` for backend development without a database dependency
7. Strategic docs: `docs/` | Consulting methodology: `consulting-os/` | League regulations: `docs/Regolamento_Generale/`
8. All backend commands must be run from the `backend/` directory
