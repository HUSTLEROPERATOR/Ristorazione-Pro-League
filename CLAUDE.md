# CLAUDE.md — Ristorazione-Pro-League

## Project Overview

Ristorazione Pro League (RPL) è un ecosistema meritocratico per il settore della ristorazione italiana: profili verificati (iProfile), sistema di auditing e reputazione, fair play finanziario, premi e riconoscimenti, formazione e crescita professionale. Il progetto è strutturato come una "lega" con regole chiare, incentivi e strumenti digitali moderni. Lo stato attuale include documentazione strategica completa in `docs/`, un backend TypeScript/Express funzionante in `backend/`, un modulo consulenziale operativo in `consulting-os/`, e un Score Engine MVP testato e funzionante. Il frontend è allo stato di mock statico HTML/CSS/JS.

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
- **CI/CD**: GitHub Issues/PR templates present; no automated CI pipeline yet

## Directory Structure

```
Ristorazione-Pro-League/
├── backend/                    # TypeScript/Express API server
│   ├── src/
│   │   ├── config/             # App config, DB connection
│   │   ├── controllers/        # Auth controllers (Prisma + in-memory)
│   │   ├── domain/rpl/         # RPL Score Engine (pure domain logic)
│   │   │   ├── score-engine.ts
│   │   │   ├── scoring-types.ts
│   │   │   └── stage-transition-engine.ts
│   │   ├── middleware/         # Auth, errorHandler, notFound
│   │   ├── routes/             # REST routes (auth, users, restaurants, workers, mock*)
│   │   ├── scripts/            # DB seed, test-api
│   │   ├── types/              # TypeScript type definitions
│   │   └── utils/              # auth helpers, validation, math
│   ├── tests/                  # Jest test suite
│   │   ├── math.test.ts
│   │   └── rpl-score-engine.test.ts
│   ├── prisma/
│   │   ├── schema.prisma       # Models: User, Restaurant, WorkerProfile, JobOffer, JobApplication
│   │   └── dev.db              # SQLite dev database
│   ├── public/                 # Static files served by backend
│   ├── .env.example            # Environment variable template
│   └── package.json
├── consulting-os/              # BMAD-powered consulting operating system
│   ├── docs/                   # Methodology docs, BMAD workflow
│   ├── playbooks/              # Pre-RPL→Lite, Lite→Standard playbooks
│   ├── templates/              # KPI tracking, client templates
│   ├── prompts/                # AI prompts for consulting work
│   ├── kpi/                    # KPI framework
│   ├── ops/                    # Sales, delivery quality
│   ├── marketing/              # Proposals, case studies
│   └── automation/             # Review request flows
├── docs/                       # Strategic & technical documentation
│   ├── RPL_OPERATIONAL_CORE.md
│   ├── RPL_SCORING_MODEL.md
│   ├── RPL_SCORE_ENGINE_MVP.md
│   ├── RPL_STAGE_TRANSITIONS.md
│   ├── RPL_AUDIT_PROCESS.md
│   ├── RESTAURANT_LIFECYCLE.md
│   ├── 01_Introduzione_e_Visione.md
│   ├── 02_Piano_di_Fattibilita.md
│   ├── 03_Architettura_Tecnica.md
│   ├── 04_Progetto_Pilota_Sardegna.md
│   ├── 05_Piano_B_RPL_Lite.md
│   ├── 06_Sviluppi_Futuri_e_Moduli_Avanzati.md
│   └── Regolamento_Generale/   # Full league regulations (6 chapters)
├── src/                        # Frontend mock (vanilla JS)
│   ├── main.js
│   ├── api.js
│   └── components.js
├── styles/style.css            # Frontend styles
├── mock-ui/index.html          # Mock UI static page
├── index.html                  # Main landing page (static)
├── templates/                  # RPL forms & contract templates
├── .github/                    # Issue templates, PR template
├── README.md
├── ROADMAP.md
├── REPOSITORY_MAP.md
└── CLAUDE.md                   # This file
```

## Modules & Components

| Module | Description | Status |
|--------|-------------|--------|
| `backend/src/domain/rpl/` | RPL Score Engine — pure TypeScript scoring & stage transition logic | **done** |
| `backend/src/routes/` | REST API routes (auth, users, restaurants, workers, mock data) | **wip** |
| `backend/src/controllers/` | Auth controllers (Prisma DB + in-memory fallback) | **wip** |
| `backend/prisma/schema.prisma` | Data models: User, Restaurant, WorkerProfile, JobOffer, JobApplication | **wip** |
| `consulting-os/` | 7-phase consulting operating system (BMAD Method v6) | **wip** |
| `consulting-os/playbooks/` | Pre-RPL→Lite and Lite→Standard transformation playbooks | **done** |
| `docs/Regolamento_Generale/` | Full RPL league regulations (6 chapters) | **done** |
| `docs/RPL_SCORING_MODEL.md` | Scoring model documentation (7 areas, 100 pts) | **done** |
| `docs/RPL_AUDIT_PROCESS.md` | Audit process documentation | **done** |
| Frontend (React) | React + TypeScript SPA — NOT started; currently only vanilla JS mock | **planned** |
| iProfile system | Professional profile management for workers & restaurants | **planned** |
| Audit workflow API | Automated audit endpoints | **planned** |
| Badge / Awards system | Gamification layer for recognition | **planned** |
| Pilot — Sardegna | Regional pilot project | **planned** |

## Development Commands

```bash
# Install backend dependencies
cd backend && npm install

# Run dev server (with Prisma/SQLite)
cd backend && npm run dev

# Run simple in-memory server (no DB needed)
cd backend && npm run simple

# Run tests
cd backend && npm test

# Run tests in watch mode
cd backend && npm run test:watch

# Build TypeScript
cd backend && npm run build

# Database operations
cd backend && npm run db:generate   # generate Prisma client
cd backend && npm run db:push       # push schema to DB
cd backend && npm run db:migrate    # run migrations
cd backend && npm run db:studio     # open Prisma Studio
cd backend && npm run db:seed       # seed with test data
```

## Architecture Decisions

- **Pure Domain Layer**: `backend/src/domain/rpl/` contains the RPL Score Engine as a pure, side-effect-free TypeScript module — no HTTP, no DB, fully testable. This is the correct pattern to follow for all business logic.
- **Dual server strategy**: `src/index.ts` is the full Prisma-backed server; `src/simple-server.ts` is an in-memory fallback for environments without DB (e.g., mobile/Termux). Both are maintained in parallel.
- **Mock routes**: `routes/mock*.ts` and `routes/inMemory*.ts` provide data for frontend development without requiring a running DB.
- **Monorepo-style flat structure**: No npm workspaces; root has no package.json. Backend is self-contained in `backend/`.
- **Target architecture**: Microservices / modular services with React frontend + Node.js backend + PostgreSQL (see `docs/03_Architettura_Tecnica.md`).

## Environment Variables

From `backend/.env.example` — create `backend/.env` with these values (NEVER commit `.env`):

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

**SECURITY CHECK**: No `.env` file found committed to git. `backend/.env.example` is safe (no real secrets). Status: CLEAN.

## BMad Method v6 Integration

- **Installed**: Partially — `consulting-os/` is structured per BMAD v6 methodology, but the `_bmad/` CLI tooling folder does NOT exist
- **Config location**: `_bmad/` — NOT PRESENT (needs installation)
- **Available agents**: None installed via CLI; BMAD concepts are embedded in `consulting-os/docs/bmad-workflow.md`
- **Current workflow state**: `_bmad-output/` does NOT exist — no formal BMAD output generated yet
- **Action required**: Run `npx bmad-method@latest install` to install CLI tooling

## Known Issues

1. **No `_bmad/` folder**: BMAD CLI not installed. The project references BMAD Method v6 conceptually (in `consulting-os/`) but lacks the formal agent/workflow tooling.
2. **No frontend framework**: The planned React frontend does not exist yet. Only vanilla JS mock in `src/` and static `index.html`.
3. **SQLite in dev, PostgreSQL in prod**: Schema has `provider = "sqlite"` hardcoded. Migration to PostgreSQL requires schema update.
4. **No CI/CD pipeline**: `.github/` has issue/PR templates but no GitHub Actions workflows.
5. **No root package.json**: Cannot run commands from root; must `cd backend/` first.
6. **`backend/prisma/dev.db` committed to git**: SQLite dev database is tracked in git (no `*.db` in backend `.gitignore`). Consider adding `*.db` to `.gitignore` if it grows or contains real data.

## Development Conventions

- **Branch naming**: `claude/<feature-slug>-<short-hash>` (detected from git branches)
- **Commit style**: `feat:`, `fix:`, `chore:` prefix (conventional commits — detected from git log)
- **Code style**: TypeScript strict mode; ESLint + Prettier configured in backend
- **Language**: Italian for business docs, English for code and API responses

## Quick Start for AI Agents

1. Read this `CLAUDE.md` first
2. Check `_bmad/` for active workflow state (currently absent — install needed)
3. Check `_bmad-output/` for latest generated documents (currently absent)
4. Follow BMad v6 lifecycle: PRD → Architecture → Stories → Implementation
5. The RPL Score Engine in `backend/src/domain/rpl/` is the reference implementation — follow its pure-domain pattern for new features
6. Use `npm run simple` for backend development without a database dependency
7. Strategic docs live in `docs/`; consulting methodology in `consulting-os/`; league regulations in `docs/Regolamento_Generale/`
