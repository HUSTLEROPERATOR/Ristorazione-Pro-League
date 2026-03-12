---
stepsCompleted:
  - step-01-init
  - step-02-context
  - step-03-starter
  - step-04-decisions
  - step-05-patterns
  - step-06-structure
  - step-07-validation
  - step-08-complete
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - backend/src/index.ts
  - backend/src/domain/rpl/scoring-types.ts
  - backend/src/domain/rpl/stage-transition-engine.ts
  - backend/src/domain/rpl/score-engine.ts
  - backend/src/middleware/auth.ts
  - backend/src/controllers/authController.ts
  - backend/src/routes/auth.ts
  - backend/src/routes/restaurants.ts
  - backend/src/routes/workers.ts
  - backend/src/config/config.ts
  - backend/src/types/auth.ts
  - backend/tsconfig.json
  - backend/prisma/schema.prisma
  - backend/package.json
  - docs/03_Architettura_Tecnica.md
  - docs/00_RPL_Strategic_Update_2025.md
workflowType: architecture
projectName: Ristorazione-Pro-League
author: BMad Architect Agent (Claude Code session)
date: 2026-03-11
status: draft-v1
---
 
# Architecture Decision Document — Ristorazione Pro League (RPL)
 
**Autore:** BMad Architect Agent
**Data:** 2026-03-11
**Versione:** 1.0 — Draft
**PRD di riferimento:** `_bmad-output/planning-artifacts/prd.md`
**Branch:** `claude/debug-setup-bmad-n1bNG`
 
---
 
## 0. Note sul Contesto (Brownfield)
 
Questo documento è scritto per un progetto **brownfield**: esiste già un backend TypeScript/Express parzialmente implementato, un domain layer puro (Score Engine) completo e testato, e un frontend mock statico. Le decisioni architetturali riflettono questo stato reale e definiscono il percorso verso l'architettura target.
 
**Principio guida:** Non distruggere ciò che funziona. Il Score Engine è il gold standard — tutto il nuovo codice segue il suo pattern (puro, testato, tipizzato strict).
 
---
 
## 1. Contesto di Sistema (System Context)
 
### 1.1 Diagramma di Contesto
 
```
┌─────────────────────────────────────────────────────────────────┐
│                    SISTEMA RPL                                   │
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │   Frontend   │    │   Backend    │    │  Score Engine    │  │
│  │ React + TS   │◄──►│ Express + TS │◄──►│  (Domain Layer)  │  │
│  │   (SPA)      │    │  REST API    │    │  Pure Functions  │  │
│  └──────────────┘    └──────┬───────┘    └──────────────────┘  │
│                              │                                   │
│                       ┌──────▼───────┐                          │
│                       │   Database   │                          │
│                       │  PostgreSQL  │                          │
│                       │  (Prisma)    │                          │
│                       └──────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
         ▲                                          ▲
         │                                          │
   ┌─────┴──────┐                          ┌────────┴─────┐
   │  Utenti    │                          │  Servizi     │
   │ Ristoratore│                          │  Esterni     │
   │ Lavoratore │                          │ Email (SMTP) │
   │ Consulente │                          │ File Storage │
   │ Admin      │                          │ (futuro)     │
   └────────────┘                          └──────────────┘
```
 
### 1.2 Utenti del Sistema
 
| Utente | Canale | Ruolo nel Sistema |
|--------|--------|------------------|
| Ristoratore | Web browser (desktop/mobile) | Gestisce il proprio ristorante, auto-valutazione, richiede upgrade |
| Lavoratore | Web browser (mobile-first) | Gestisce iProfile, cerca offerte, si candida |
| Consulente RPL | Web browser (desktop) | Monitora clienti, conduce audit, genera scorecard |
| Admin RPL | Web browser (desktop) | Governance, approvazione upgrade, report aggregati |
| Pubblico | Web browser | Visualizza profili pubblici e badge ristoranti |
 
---
 
## 2. Architettura Target
 
### 2.1 Stack Decisioni (Confirmed)
 
| Layer | Tecnologia | Motivazione |
|-------|-----------|-------------|
| **Frontend** | React 18 + TypeScript + Vite | Confermato dai docs strategici; Vite per DX ottimale |
| **UI Components** | shadcn/ui + Tailwind CSS | Componenti accessibili, customizzabili, zero lock-in |
| **State Management** | Zustand (client state) + TanStack Query (server state) | Leggero, senza boilerplate, ottimo per REST API |
| **Routing (FE)** | React Router v6 | Standard de facto per React SPA |
| **Backend** | Node.js ≥18 + Express.js + TypeScript | Già implementato, strict mode, funziona |
| **ORM** | Prisma 5.x | Già configurato; schema Prisma è il contratto del DB |
| **Database (dev)** | SQLite | Solo per sviluppo locale senza dipendenze esterne |
| **Database (prod)** | PostgreSQL 15+ | Target di produzione; Prisma gestisce la differenza |
| **Auth** | JWT (access 15m + refresh 7d) + bcrypt(12) | Già implementato in `AuthUtils`; confermato |
| **Validation** | Zod (backend) + React Hook Form + Zod (frontend) | Schema condiviso possibile tra FE e BE |
| **Testing (BE)** | Jest + ts-jest | Già configurato e funzionante |
| **Testing (FE)** | Vitest + React Testing Library | Compatibile con Vite, API identica a Jest |
| **Deployment** | Docker + Docker Compose + Hetzner Cloud | Standard owner; infra target |
| **CI/CD** | GitHub Actions | Repository già su GitHub |
| **Reverse Proxy** | Nginx (in Docker Compose) | Termina SSL, serve static FE, proxying BE |
| **Email** | Nodemailer + SMTP | Già installato; da configurare per notifiche |
 
### 2.2 Struttura Repository Target
 
```
Ristorazione-Pro-League/
├── backend/                          # ← ESISTE (parzialmente implementato)
│   ├── src/
│   │   ├── domain/rpl/               # ← PRODUCTION READY — non toccare
│   │   │   ├── score-engine.ts
│   │   │   ├── scoring-types.ts
│   │   │   └── stage-transition-engine.ts
│   │   ├── config/                   # ← FUNZIONANTE
│   │   ├── middleware/               # ← FUNZIONANTE (auth, error, notFound)
│   │   ├── controllers/              # ← DA COMPLETARE (solo SimpleAuth funziona)
│   │   │   ├── authController.ts     # (Prisma — commentato, da ripristinare)
│   │   │   ├── restaurantController.ts  # DA CREARE
│   │   │   ├── workerController.ts      # DA CREARE
│   │   │   ├── auditController.ts       # DA CREARE (Fase 2)
│   │   │   └── adminController.ts       # DA CREARE
│   │   ├── routes/                   # ← DA COMPLETARE
│   │   │   ├── auth.ts               # (parziale — register/login ok)
│   │   │   ├── restaurants.ts        # (501 stubs — da implementare)
│   │   │   ├── workers.ts            # (501 stubs — da implementare)
│   │   │   ├── users.ts              # (501 stubs — da implementare)
│   │   │   ├── score.ts              # DA CREARE — espone Score Engine via API
│   │   │   ├── audit.ts              # DA CREARE — Fase 2
│   │   │   └── admin.ts              # DA CREARE
│   │   ├── services/                 # DA CREARE — business logic layer
│   │   │   ├── restaurantService.ts
│   │   │   ├── workerService.ts
│   │   │   ├── scoreService.ts       # wrappa domain/rpl
│   │   │   ├── auditService.ts
│   │   │   └── emailService.ts
│   │   ├── types/                    # ← PARZIALE — espandere
│   │   └── utils/                    # ← FUNZIONANTE
│   ├── prisma/
│   │   ├── schema.prisma             # ← DA ESPANDERE (vedi sezione 5)
│   │   └── migrations/               # DA CREARE (con PostgreSQL)
│   └── tests/                        # ← PARZIALE (2 test files)
├── frontend/                         # DA CREARE (Fase 1)
│   ├── src/
│   │   ├── components/               # UI components (shadcn/ui base)
│   │   ├── pages/                    # Route-level components
│   │   ├── features/                 # Feature modules
│   │   │   ├── auth/
│   │   │   ├── restaurant/
│   │   │   ├── worker/
│   │   │   ├── score/
│   │   │   └── admin/
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── lib/                      # API client, utils
│   │   │   └── api.ts                # TanStack Query + fetch wrapper
│   │   ├── store/                    # Zustand stores
│   │   └── types/                    # Shared types (da sync con backend)
│   ├── public/
│   ├── vite.config.ts
│   └── package.json
├── _bmad/                            # ← ESISTE (BMad v6 installato)
├── _bmad-output/                     # ← ESISTE
│   └── planning-artifacts/
│       ├── prd.md
│       └── architecture.md           # ← QUESTO FILE
├── docs/                             # ← ESISTE (completo)
├── consulting-os/                    # ← ESISTE (operativo)
├── docker-compose.yml                # DA CREARE (Fase 1)
├── .github/
│   └── workflows/
│       └── ci.yml                    # DA CREARE (Fase 1)
└── CLAUDE.md                         # ← ESISTE
```
 
---
 
## 3. Stato Attuale vs. Target (Gap Map)
 
### 3.1 Backend Gap
 
| Componente | Stato Attuale | Target | Priorità |
|-----------|--------------|--------|----------|
| Domain / Score Engine | ✅ Production-ready | Stabile — non modificare | — |
| Auth (register/login) | ✅ Funzionante via SimpleAuthController | Migrare a AuthController (Prisma) | Fase 1 |
| Auth (refresh/logout/profile) | ❌ 501 stubs | CRUD completo + refresh token store | Fase 1 |
| Ruoli utente | ⚠️ USER/ADMIN/MODERATOR (generico) | RISTORATORE/LAVORATORE/CONSULENTE/ADMIN | Fase 1 |
| Restaurant CRUD | ❌ 501 stubs (solo mock con Prisma diretto) | Controller + Service + Route complete | Fase 1 |
| Worker/iProfile CRUD | ❌ 501 stubs | Controller + Service + Route complete | Fase 1 |
| Score API | ❌ Non esiste | `POST /api/score/evaluate` che chiama `evaluate()` | Fase 1 |
| Audit workflow | ❌ Non esiste | Workflow completo con stati e transizioni | Fase 2 |
| Job Market (offerte) | ⚠️ Schema presente, rotte 501 | CRUD offerte + candidature | Fase 2 |
| Notifiche email | ❌ Non configurate | Nodemailer per warning, scadenze, upgrade | Fase 2 |
| Admin API | ❌ Non esiste | Dashboard aggregata + governance | Fase 1 |
| File upload | ⚠️ Multer installato, non usato | Upload documenti per audit | Fase 2 |
| Test coverage | ⚠️ Solo Score Engine (2 file) | ≥ 80% domain + controllers | Continuo |
 
### 3.2 Frontend Gap
 
| Componente | Stato Attuale | Target | Priorità |
|-----------|--------------|--------|----------|
| Framework | ❌ Solo vanilla JS mock | React 18 + TypeScript + Vite | 🔴 Fase 1 — CRITICO |
| Auth UI | ❌ HTML statico | Login, Register, Protected Routes | Fase 1 |
| Dashboard Ristorante | ❌ Non esiste | Score, badge, KPI, storico | Fase 1 |
| iProfile | ❌ Non esiste | Form profilo, skills, storico | Fase 1 |
| Auto-valutazione form | ❌ Non esiste | Wizard 7 aree con Score Engine live | Fase 1 |
| Profilo pubblico ristorante | ❌ Non esiste | Badge RPL, scorecard pubblica | Fase 1 |
| Offerte di lavoro | ❌ Non esiste | CRUD offerte + candidature | Fase 2 |
| Audit workflow UI | ❌ Non esiste | Stepper upload evidenze, stato audit | Fase 2 |
| Admin panel | ❌ Non esiste | Dashboard governance | Fase 1 |
| Mobile responsive | ⚠️ HTML statico responsive | React responsive (Tailwind) | Fase 1 |
 
### 3.3 Infrastruttura Gap
 
| Componente | Stato Attuale | Target | Priorità |
|-----------|--------------|--------|----------|
| Database | SQLite (dev.db) | PostgreSQL 15+ | 🔴 Pre-launch |
| Docker | ❌ Non esiste | docker-compose.yml (be + fe + db + nginx) | Fase 1 |
| CI/CD | ❌ Non esiste | GitHub Actions (test + build + deploy) | Fase 1 |
| Reverse proxy | ❌ Non esiste | Nginx (SSL termination + static FE) | Fase 1 |
| Monitoring | ❌ Non esiste | Health check (già presente) + logging centralizzato | Fase 2 |
| Backup DB | ❌ Non esiste | Backup automatico PostgreSQL | Pre-launch |
 
---
 
## 4. Decisioni Architetturali (ADR)
 
### ADR-001: Mantieni il pattern Pure Domain Layer
 
**Contesto:** Il Score Engine esiste come modulo puro in `backend/src/domain/rpl/`. È l'unico componente production-ready.
 
**Decisione:** Il pattern puro (no side effects, no HTTP, no DB) è il gold standard. Tutta la nuova business logic deve seguire questo pattern nel layer `domain/`. I controller chiamano i service; i service chiamano il domain layer.
 
**Conseguenze:**
- ✅ Testabilità massima — ogni funzione di business è testabile senza mocking
- ✅ Separazione netta tra infrastruttura e logica di business
- ✅ Il Score Engine resta immutabile — viene solo wrappato da `scoreService.ts`
- ⚠️ Richiede disciplina — i controller non devono contenere business logic
 
**Implementazione:**
```
HTTP Request → Route → Controller (validation only) → Service → Domain → Service → Response
```
 
---
 
### ADR-002: Architettura a layer (no microservizi per ora)
 
**Contesto:** La documentazione strategica menziona microservizi. Il codebase attuale è un monolite Express. Il team è piccolo.
 
**Decisione:** Architettura a layer nel monolite Express, con separazione esplicita `routes → controllers → services → domain`. No microservizi in Fase 1 o 2.
 
**Motivazione:** La complessità operativa dei microservizi (service discovery, circuit breakers, distributed tracing) non è giustificata per un pilot con 10-100 ristoranti. Il monolite è sufficiente e deployabile più facilmente su Hetzner.
 
**Boundary preparatoria:** I services sono classi/moduli con interfacce chiare — in Fase 4 ogni service può diventare un microservizio senza riscrivere la business logic.
 
**Revisione:** Rivalutare quando si superano 500 ristoranti attivi o quando emergono bottleneck specifici misurabili.
 
---
 
### ADR-003: PostgreSQL come database di produzione
 
**Contesto:** Il `schema.prisma` attuale usa `provider = "sqlite"`. I docs strategici indicano PostgreSQL come target.
 
**Decisione:** PostgreSQL 15+ è il database di produzione. SQLite rimane solo per sviluppo locale senza dipendenze esterne (es. mobile/Termux).
 
**Piano di migrazione (dettaglio in sezione 6):**
1. Aggiungere `provider = "postgresql"` con variabile d'ambiente
2. Creare migrations Prisma (non usare `db push` in produzione)
3. Testare schema su PostgreSQL in ambiente di staging
4. Aggiornare seed data per PostgreSQL
 
**Attenzione:** Nessun dato reale è nel SQLite attuale — la migrazione è una questione di configurazione, non di data migration.
 
---
 
### ADR-004: JWT con access token corto + refresh token
 
**Contesto:** `AuthUtils` genera access token (15m) e refresh token (config `JWT_EXPIRES_IN`, default 7d). Il refresh endpoint è attualmente un 501 stub.
 
**Decisione:** Mantenere il pattern access/refresh. Implementare il refresh endpoint con blacklist dei refresh token revocati su PostgreSQL (tabella `RefreshToken`).
 
**Schema aggiuntivo necessario:**
```prisma
model RefreshToken {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  expiresAt DateTime
  revokedAt DateTime?
  createdAt DateTime @default(now())
  @@map("refresh_tokens")
}
```
 
**Rotazione:** Ogni refresh genera un nuovo access token E un nuovo refresh token (rolling). Il vecchio refresh token viene revocato immediatamente.
 
---
 
### ADR-005: Ruoli utente aggiornati
 
**Contesto:** Lo schema attuale ha `role: String @default("USER")` e `types/auth.ts` definisce `'USER' | 'ADMIN' | 'MODERATOR'`. Il PRD richiede `RISTORATORE`, `LAVORATORE`, `CONSULENTE`, `ADMIN`.
 
**Decisione:** Espandere i ruoli al set RPL specifico. Mantenere compatibilità con l'enum scelto.
 
**Nuovi ruoli definiti:**
 
| Ruolo | Descrizione | Accesso |
|-------|-------------|---------|
| `RISTORATORE` | Titolare/manager di un ristorante | Dashboard ristorante, auto-valutazione, richiesta upgrade |
| `LAVORATORE` | Professionista della ristorazione | iProfile, offerte di lavoro, candidature |
| `CONSULENTE` | Consulente RPL accreditato | Dashboard clienti, conduzione audit, report |
| `ADMIN` | Amministratore RPL | Tutto — governance completa |
| `PUBLIC` | (non autenticato) | Solo profili pubblici, badge ristoranti |
 
**Implementazione:** Aggiornare `types/auth.ts`, `schema.prisma`, e il middleware `authorizeRoles` già presente.
 
**Retrocompatibilità:** `SimpleAuthController` accetta `role: 'USER' | 'ADMIN' | 'MODERATOR'` per i test — da aggiornare prima del pilot.
 
---
 
### ADR-006: Score Engine esposto tramite API dedicata
 
**Contesto:** Il Score Engine (`evaluate()`) è una funzione pura in `domain/rpl/`. Attualmente non è esposto via HTTP.
 
**Decisione:** Creare `POST /api/score/evaluate` come endpoint dedicato che chiama `evaluate()`. L'endpoint è autenticato (solo RISTORATORE, CONSULENTE, ADMIN).
 
**Endpoint design:**
```
POST /api/score/evaluate
Authorization: Bearer <token>
Body: { restaurantId, areaScores, metadata }
Response: RPLScoreResult + saved to DB (ScoreCard model)
```
 
**Separazione delle responsabilità:**
- `domain/rpl/` — logica pura, zero side effects
- `services/scoreService.ts` — chiama `evaluate()`, persiste il risultato, emette notifiche
- `routes/score.ts` — HTTP interface, validazione Zod, autenticazione
 
---
 
### ADR-007: Frontend separato come SPA in `/frontend`
 
**Contesto:** Attualmente il backend serve file statici da `backend/public/`. Il frontend mock è in `src/` e `mock-ui/`.
 
**Decisione:** Il frontend React viene creato come directory separata `/frontend` nella root del repo (non dentro `/backend`). In produzione, viene buildato e servito da Nginx.
 
**Motivazione:**
- Separazione netta tra frontend e backend deployabili indipendentemente
- Build pipeline distinte (Vite per FE, tsc per BE)
- Il backend non deve servire il frontend in produzione (Nginx lo fa)
- Il backend continua a servire `backend/public/` solo in sviluppo (test, favicons)
 
**Sviluppo locale:** Frontend su porta 5173 (Vite default), backend su porta 3000. CORS già configurato via `ALLOWED_ORIGINS`.
 
---
 
### ADR-008: Nessun monorepo tooling — struttura flat semplice
 
**Contesto:** Repo ha `backend/` e target `frontend/` ma nessun root `package.json`. Potrebbe usare nx, turborepo, npm workspaces.
 
**Decisione:** No monorepo tooling. Due `package.json` separati (`backend/` e `frontend/`). Un `docker-compose.yml` nella root per orchestrazione locale.
 
**Motivazione:** Complessità non giustificata per un team piccolo in fase MVP. La semplicità vince.
 
**CI/CD:** GitHub Actions usa matrix strategy per buildare BE e FE in parallelo.
 
---
 
### ADR-009: Audit workflow come state machine
 
**Contesto:** Il processo di auditing (pre-audit → upload evidenze → valutazione → scorecard → decisione) è un workflow multi-step con stati precisi definiti in `docs/RPL_AUDIT_PROCESS.md` e `docs/RPL_STAGE_TRANSITIONS.md`.
 
**Decisione:** Modellare il workflow di audit come state machine nel domain layer. Ogni audit ha uno `status` enum con transizioni definite.
 
**Stati audit:**
```
INITIATED → SELF_ASSESSMENT → EVIDENCE_UPLOAD → UNDER_REVIEW → VALIDATED → CLOSED
                                                       ↓
                                              REJECTED (richiede correzioni)
```
 
**Schema necessario (sezione 5):** Modello `Audit` con campi `status`, `auditType`, `auditorId`, `restaurantId`, `scoreSnapshot`, `evidenceFiles[]`.
 
---
 
### ADR-010: File upload per documenti di audit
 
**Contesto:** Multer è installato (`^1.4.5-lts.1`). I file di evidenza per gli audit devono essere caricati e conservati.
 
**Decisione (MVP):** Upload su filesystem locale nella cartella `uploads/` (già configurata via `UPLOAD_PATH`). In produzione, migrare a S3-compatible storage (es. Hetzner Object Storage).
 
**Limiti:** `MAX_FILE_SIZE=5MB`, tipi consentiti: PDF, JPG, PNG. Un audit può avere fino a 20 documenti allegati.
 
**Rinvio:** La migrazione a object storage è Fase 3. Per il pilot Sardegna (10-20 ristoranti), il filesystem locale è accettabile.
 
---
 
## 5. Schema Database Target
 
### 5.1 Schema Prisma Espanso
 
Di seguito le aggiunte/modifiche necessarie rispetto allo schema attuale:
 
```prisma
// NUOVO — Aggiungere a schema.prisma
 
// Refresh token store per rotazione JWT
model RefreshToken {
  id        String    @id @default(cuid())
  token     String    @unique
  userId    String
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  revokedAt DateTime?
  createdAt DateTime  @default(now())
  @@map("refresh_tokens")
}
 
// Scorecard — snapshot di ogni valutazione RPL
model ScoreCard {
  id           String   @id @default(cuid())
  restaurantId String
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])
  // Punteggi 7 aree
  scoreA1      Float    // Contratti e Compliance (max 20)
  scoreA2      Float    // Team e Formazione (max 20)
  scoreA3      Float    // Operazioni e Sistemi (max 15)
  scoreA4      Float    // KPI e Disciplina dei Dati (max 15)
  scoreA5      Float    // Sostenibilità (max 10)
  scoreA6      Float    // Reputazione Cliente (max 10)
  scoreA7      Float    // Cultura ed Etica (max 10)
  totalScore   Float    // Somma (max 100)
  // Metadata di valutazione
  outcome      String   // RPLOutcome enum: accepted/warning/downgrade/etc.
  recommendedStage String // RPLStage
  selfAssessmentSubmitted Boolean @default(false)
  monthsInLite    Int   @default(0)
  kpiImprovements Int   @default(0)
  // Relazioni
  auditId      String?
  audit        Audit?   @relation(fields: [auditId], references: [id])
  evaluatedBy  String?  // userId del consulente o null per auto-valutazione
  createdAt    DateTime @default(now())
  @@map("score_cards")
}
 
// Audit workflow
model Audit {
  id           String   @id @default(cuid())
  restaurantId String
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])
  auditorId    String?  // userId del consulente; null per self-assessment
  auditType    String   // SELF_ASSESSMENT | REMOTE_DOCUMENTARY | ON_SITE | UPGRADE | RECOVERY
  status       String   @default("INITIATED")
  // INITIATED | SELF_ASSESSMENT | EVIDENCE_UPLOAD | UNDER_REVIEW | VALIDATED | REJECTED | CLOSED
  notes        String?
  rejectionReason String?
  scheduledAt  DateTime?
  completedAt  DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  // Relazioni
  scorecards   ScoreCard[]
  documents    AuditDocument[]
  @@map("audits")
}
 
// Documenti allegati agli audit
model AuditDocument {
  id        String   @id @default(cuid())
  auditId   String
  audit     Audit    @relation(fields: [auditId], references: [id])
  filename  String
  storagePath String  // path relativo in uploads/
  mimeType  String
  sizeBytes Int
  area      String?  // quale area A1-A7 documenta
  uploadedBy String  // userId
  createdAt DateTime @default(now())
  @@map("audit_documents")
}
 
// Stadio RPL corrente del ristorante
model RestaurantStage {
  id           String   @id @default(cuid())
  restaurantId String   @unique
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])
  currentStage String   @default("Pre-RPL")
  // Pre-RPL | RPL Lite | RPL Standard | RPL Excellence
  enteredAt    DateTime @default(now())
  lastAuditAt  DateTime?
  nextReviewAt DateTime?
  warningActive Boolean @default(false)
  warningIssuedAt DateTime?
  recoveryPlanActive Boolean @default(false)
  recoveryPlanStartedAt DateTime?
  recoveryPlanDeadline DateTime?
  suspendedAt  DateTime?
  suspensionReason String?
  updatedAt    DateTime @updatedAt
  @@map("restaurant_stages")
}
 
// Notifiche di sistema
model Notification {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  type      String   // WARNING | UPGRADE_ELIGIBLE | REVIEW_DUE | AUDIT_ASSIGNED | etc.
  title     String
  message   String
  isRead    Boolean  @default(false)
  metadata  String?  // JSON blob per dati extra
  createdAt DateTime @default(now())
  @@map("notifications")
}
```
 
### 5.2 Modifiche ai Modelli Esistenti
 
```prisma
// MODIFICHE a schema.prisma esistente
 
model User {
  // Aggiungere relazioni per nuovi modelli:
  refreshTokens   RefreshToken[]
  notifications   Notification[]
  conductedAudits Audit[]       @relation("AuditorAudits")
  // Modificare role enum (stringa):
  // 'USER' | 'ADMIN' | 'MODERATOR'  →  'RISTORATORE' | 'LAVORATORE' | 'CONSULENTE' | 'ADMIN'
}
 
model Restaurant {
  // Aggiungere:
  stage        RestaurantStage?
  scorecards   ScoreCard[]
  audits       Audit[]
  // Rimuovere: workers WorkerProfile[] (gestito via JOIN)
}
```
 
### 5.3 Indici Raccomandati
 
```prisma
// Indici per performance sulle query più frequenti
@@index([restaurantId, createdAt]) // su ScoreCard
@@index([restaurantId, status])     // su Audit
@@index([userId, isRead])           // su Notification
@@index([token])                    // su RefreshToken (già unique)
```
 
---
 
## 6. Strategia di Migrazione SQLite → PostgreSQL
 
### 6.1 Piano a 3 Step
 
**Step 1 — Configurazione parallela (Fase 1, Sprint 1)**
 
Modificare `schema.prisma` per supportare entrambi i database via variabile d'ambiente:
 
```prisma
datasource db {
  provider = env("DATABASE_PROVIDER")  // "sqlite" o "postgresql"
  url      = env("DATABASE_URL")
}
```
 
File `.env.development`:
```
DATABASE_PROVIDER=sqlite
DATABASE_URL=file:./dev.db
```
 
File `.env.staging` / `.env.production`:
```
DATABASE_PROVIDER=postgresql
DATABASE_URL=postgresql://user:pass@host:5432/rpl_db?schema=public
```
 
**Step 2 — Migrations (Fase 1, Sprint 2)**
 
Eseguire su PostgreSQL di staging:
```bash
# Generare la migration iniziale
cd backend && npx prisma migrate dev --name init --schema=prisma/schema.prisma
 
# Verificare su PostgreSQL
npx prisma migrate deploy
```
 
**Step 3 — Validazione (Pre-launch)**
 
- Test di integrazione completi su PostgreSQL staging
- Verifica performance con dataset seed (100 ristoranti fittizi)
- Backup automatico configurato prima del go-live
 
### 6.2 Attenzioni Specifiche SQLite → PostgreSQL
 
| Aspetto | SQLite | PostgreSQL | Azione |
|---------|--------|-----------|--------|
| `Decimal` type | Simulato | Nativo | Nessuna — Prisma gestisce |
| Case sensitivity | Insensitive | Sensitive | Verificare query con ILIKE |
| Boolean | 0/1 integer | Boolean nativo | Nessuna — Prisma gestisce |
| DateTime precision | Limitata | Millisecondi | Verificare comparazioni |
| Concurrent writes | Lock globale | MVCC | Performance migliora in prod |
| Array fields | Non supportati | Nativi | `String` → `String[]` per skills/languages |
 
**Nota su `skills` e `languages` in `WorkerProfile`:** Attualmente sono `String` (comma-separated). In PostgreSQL, migrare a `String[]` per query efficienti.
 
---
 
## 7. Design API (REST)
 
### 7.1 Convenzioni
 
```
Base URL: /api/v1/
Auth: Authorization: Bearer <access_token>
Content-Type: application/json
Response envelope: { success: boolean, data?: T, error?: { message, code } }
Pagination: { page, limit, total, items }
```
 
### 7.2 Endpoint Target per Fase 1
 
```
# AUTH
POST   /api/v1/auth/register          → { user, tokens }
POST   /api/v1/auth/login             → { user, tokens }
POST   /api/v1/auth/refresh           → { tokens }
POST   /api/v1/auth/logout            → 204
GET    /api/v1/auth/me                → { user }
 
# RESTAURANTS
GET    /api/v1/restaurants            → { items[], total } [PUBLIC - paginato]
GET    /api/v1/restaurants/:id        → { restaurant, stage, latestScore } [PUBLIC]
POST   /api/v1/restaurants            → { restaurant } [RISTORATORE]
PUT    /api/v1/restaurants/:id        → { restaurant } [RISTORATORE - owner only]
GET    /api/v1/restaurants/:id/score  → { scorecards[] } [RISTORATORE, CONSULENTE]
 
# WORKERS / iPROFILE
GET    /api/v1/workers/me             → { profile } [LAVORATORE]
PUT    /api/v1/workers/me             → { profile } [LAVORATORE]
GET    /api/v1/workers/:id            → { profile } [PUBLIC - parziale]
GET    /api/v1/workers                → { items[] } [CONSULENTE, ADMIN]
 
# SCORE ENGINE
POST   /api/v1/score/evaluate         → { result: RPLScoreResult } [RISTORATORE, CONSULENTE]
POST   /api/v1/score/save             → { scorecard } [CONSULENTE, ADMIN]
GET    /api/v1/score/history/:restaurantId → { scorecards[] } [autenticato]
 
# JOB MARKET
GET    /api/v1/jobs                   → { items[] } [PUBLIC]
POST   /api/v1/jobs                   → { job } [RISTORATORE]
PUT    /api/v1/jobs/:id               → { job } [RISTORATORE - owner only]
DELETE /api/v1/jobs/:id               → 204 [RISTORATORE - owner only]
POST   /api/v1/jobs/:id/apply         → { application } [LAVORATORE]
 
# ADMIN
GET    /api/v1/admin/restaurants      → { items[], stats } [ADMIN]
POST   /api/v1/admin/restaurants/:id/stage → { stage } [ADMIN]
GET    /api/v1/admin/stats            → { system KPIs } [ADMIN]
```
 
### 7.3 Versioning Strategy
 
Versione API nel path (`/v1/`). La versione attuale del codice usa `/api/` senza versione — **da aggiornare prima del primo release pubblico**.
 
Strategia di deprecation: una versione rimane supportata per almeno 6 mesi dopo il rilascio della successiva.
 
---
 
## 8. Auth, Ruoli e Permessi
 
### 8.1 Matrice di Autorizzazione
 
| Risorsa / Azione | PUBLIC | LAVORATORE | RISTORATORE | CONSULENTE | ADMIN |
|------------------|:------:|:----------:|:-----------:|:----------:|:-----:|
| Profilo ristorante (lettura) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Badge e scorecard pubblica | ✅ | ✅ | ✅ | ✅ | ✅ |
| Gestione proprio ristorante | ❌ | ❌ | ✅ | ❌ | ✅ |
| Auto-valutazione | ❌ | ❌ | ✅ | ✅ | ✅ |
| iProfile (proprio) | ❌ | ✅ | ❌ | ❌ | ✅ |
| iProfile (altri) | ❌ | ❌ | ✅ (parziale) | ✅ | ✅ |
| Offerte di lavoro (CRUD) | ❌ | ❌ | ✅ | ❌ | ✅ |
| Candidatura a offerta | ❌ | ✅ | ❌ | ❌ | ✅ |
| Conduzione audit | ❌ | ❌ | ❌ | ✅ | ✅ |
| Approvazione upgrade | ❌ | ❌ | ❌ | ❌ | ✅ |
| Sospensione ristorante | ❌ | ❌ | ❌ | ❌ | ✅ |
| Report aggregati | ❌ | ❌ | ❌ | ✅ (propri clienti) | ✅ |
| Gestione utenti | ❌ | ❌ | ❌ | ❌ | ✅ |
 
### 8.2 Middleware Stack (per request protette)
 
```typescript
// Ordine di applicazione middleware per route protette:
router.post('/score/evaluate',
  authenticateToken,          // verifica JWT, popola req.user
  authorizeRoles('RISTORATORE', 'CONSULENTE', 'ADMIN'),  // controlla ruolo
  validateBody(evaluateScoreSchema),  // Zod validation
  scoreController.evaluate    // business logic
);
```
 
### 8.3 Owner Check Pattern
 
Per risorse owned (ristorante del ristoratore, iProfile del lavoratore):
 
```typescript
// In restaurantController.ts
static async update(req: Request, res: Response) {
  const restaurant = await restaurantService.findById(req.params.id);
  if (restaurant.ownerId !== req.user!.userId && req.user!.role !== 'ADMIN') {
    return res.status(403).json({ error: { code: 'FORBIDDEN' } });
  }
  // proceed
}
```
 
---
 
## 9. Strategia di Deployment
 
### 9.1 Docker Compose (Sviluppo Locale + Staging)
 
```yaml
# docker-compose.yml (struttura — da creare in Fase 1)
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: rpl_db
      POSTGRES_USER: rpl_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
 
  backend:
    build: ./backend
    depends_on: [postgres]
    environment:
      DATABASE_PROVIDER: postgresql
      DATABASE_URL: postgresql://rpl_user:${DB_PASSWORD}@postgres:5432/rpl_db
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    ports:
      - "3000:3000"
 
  frontend:
    build: ./frontend
    # Build React app, serve via Nginx static
    # Output: /usr/share/nginx/html
 
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./frontend/dist:/usr/share/nginx/html
      - ssl_certs:/etc/nginx/certs
    depends_on: [backend]
 
volumes:
  postgres_data:
  ssl_certs:
```
 
### 9.2 Nginx Config (Pattern)
 
```nginx
# nginx.conf — pattern base
server {
  listen 443 ssl;
  server_name rpl.example.com;
 
  # Serve frontend SPA
  location / {
    root /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;  # SPA fallback
  }
 
  # Proxy backend API
  location /api/ {
    proxy_pass http://backend:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
 
  # Health check
  location /health {
    proxy_pass http://backend:3000/health;
  }
}
```
 
### 9.3 GitHub Actions CI/CD (Schema)
 
```yaml
# .github/workflows/ci.yml — struttura
on: [push, pull_request]
jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: cd backend && npm ci
      - run: cd backend && npm test
      - run: cd backend && npm run build
 
  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: cd frontend && npm ci
      - run: cd frontend && npm test
      - run: cd frontend && npm run build
 
  deploy:
    needs: [test-backend, test-frontend]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Hetzner
        # SSH + docker-compose pull && up -d
```
 
---
 
## 10. Observability
 
### 10.1 Logging
 
**Attuale:** Morgan per HTTP logging in dev/prod — già configurato.
 
**Target (Fase 2):**
- Structured logging con `pino` (sostituzione Morgan) — JSON in produzione
- Log levels: error, warn, info, debug
- Ogni request logga: method, path, statusCode, duration, userId (se auth)
- Ogni decisione audit logga: restaurantId, outcome, auditorId, timestamp
 
### 10.2 Health Check
 
`GET /health` — già implementato. Estendere in Fase 2 per includere:
```json
{
  "status": "OK",
  "db": "connected",
  "scoreEngine": "operational",
  "version": "1.0.0",
  "uptime": 12345
}
```
 
### 10.3 Error Tracking (Fase 2)
 
Considerare Sentry (self-hosted su Hetzner o cloud) per error tracking in produzione.
 
---
 
## 11. Gestione del Frontend State
 
### 11.1 Separazione Server State / Client State
 
```
Server State (TanStack Query):
- Dati dal backend (ristoranti, iProfile, scorecard, offerte)
- Cache automatica, invalidazione, refetch on focus
- Ottimistic updates per UX fluida
 
Client State (Zustand):
- Auth (user, tokens) — persistito in localStorage con sicurezza
- UI state (sidebar open, modal state, theme)
- Draft form state prima del submit
```
 
### 11.2 Token Storage
 
**Decisione:** Access token in memoria (Zustand store — non persistito). Refresh token in `httpOnly cookie` (sicuro vs XSS).
 
**Trade-off:** Richiede che il backend imposti il cookie del refresh token. Alternativa accettabile per MVP: entrambi in localStorage con consapevolezza del rischio XSS (mitigabile con CSP strict).
 
**MVP target:** localStorage con CSP header strict — rivalutare prima di Fase 3 se dati sensibili crescono.
 
---
 
## 12. Rischi Architetturali
 
| # | Rischio | Probabilità | Impatto | Mitigazione |
|---|---------|:-----------:|:-------:|-------------|
| RA-01 | **Schema Prisma SQLite/PostgreSQL incompatibilità** — tipo `String` per array (skills, languages) | Alta | Medio | Migrare a `String[]` prima di prime migration PostgreSQL |
| RA-02 | **Score Engine coupling** — qualcuno modifica il domain layer senza test | Bassa | Alto | Test Jest obbligatori; CI blocca merge se test falliscono |
| RA-03 | **Auth roles mismatch** — vecchi token con ruolo `USER` in sistema con `RISTORATORE` | Media | Medio | Invalidare tutti i token esistenti alla migrazione dei ruoli |
| RA-04 | **CORS mal configurato** — frontend su dominio diverso dal backend | Media | Basso | ALLOWED_ORIGINS via env; test CORS in staging |
| RA-05 | **File upload filesystem** — uploads/ non persistiti tra restart Docker | Media | Medio | Volume Docker per uploads/ in Fase 1; migrazione a object storage in Fase 3 |
| RA-06 | **JWT_SECRET in env non rotato** — stessa chiave dev/prod | Alta | Alto | Secret diversi per ogni ambiente; rotazione policy definita pre-launch |
| RA-07 | **frontend/backend desync** — API cambia senza aggiornare FE | Alta | Medio | Contratto API documentato; versioning `/v1/`; integration tests |
| RA-08 | **Monolite diventa collo di bottiglia** — non prima di 500+ ristoranti | Bassa | Medio | ADR-002 prevede boundary netti per futura estrazione |
 
---
 
## 13. Decisioni Pendenti (Open Architecture Questions)
 
| # | Domanda | Impatto | Chi decide | Scadenza |
|---|---------|---------|-----------|---------|
| OA-01 | **Token storage strategy** — localStorage vs httpOnly cookie per refresh token | Sicurezza FE | Tech lead | Prima dello scaffold React |
| OA-02 | **File storage MVP** — filesystem locale vs. object storage (Hetzner) fin da subito | Deployment | Owner + Tech | Prima di Fase 2 |
| OA-03 | **Real-time notifications** — polling vs. WebSocket vs. SSE per alert di sistema | UX, complessità | Tech lead | Fase 2 |
| OA-04 | **Audit trail completeness** — ogni cambio di stato deve avere un log immutabile? | Compliance | Owner | Fase 1 |
| OA-05 | **Multi-tenancy** — un consulente può gestire ristoranti di regioni diverse? | Auth, data isolation | Owner | Prima di Fase 2 |
| OA-06 | **API versioning attivazione** — quando aggiungere `/v1/` al path? | Breaking change | Tech lead | Prima del primo beta pubblico |
 
---
 
## 14. Riferimenti
 
| Documento | Ruolo |
|-----------|-------|
| `_bmad-output/planning-artifacts/prd.md` | Requisiti funzionali che questa architettura serve |
| `backend/src/domain/rpl/` | Implementazione di riferimento (gold standard) |
| `backend/prisma/schema.prisma` | Schema attuale da estendere |
| `docs/RPL_SCORING_MODEL.md` | Definisce le 7 aree e le soglie — implementate in Score Engine |
| `docs/RPL_STAGE_TRANSITIONS.md` | Decision framework — implementato in Stage Transition Engine |
| `docs/RPL_AUDIT_PROCESS.md` | Definisce il workflow audit che l'ADR-009 modella come state machine |
| `docs/03_Architettura_Tecnica.md` | Architettura di alto livello (visione strategica, ora formalizzata qui) |
| `CLAUDE.md` | Convenzioni di sviluppo per agenti AI |
 
---
 
*Fine Architecture Decision Document v1.0 — Ristorazione Pro League*
*Generato da BMad Architect Agent in modalità brownfield — 2026-03-11*
 
