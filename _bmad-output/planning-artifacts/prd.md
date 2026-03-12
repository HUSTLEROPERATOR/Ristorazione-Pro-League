---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-vision
  - step-04-users
  - step-05-domain
  - step-06-features
  - step-07-metrics
  - step-08-constraints
  - step-09-risks
  - step-10-openquestions
  - step-11-complete
inputDocuments:
  - docs/RPL_OPERATIONAL_CORE.md
  - docs/01_Introduzione_e_Visione.md
  - docs/02_Piano_di_Fattibilita.md
  - docs/03_Architettura_Tecnica.md
  - docs/05_Piano_B_RPL_Lite.md
  - docs/00_RPL_Strategic_Update_2025.md
  - docs/RESTAURANT_LIFECYCLE.md
  - docs/RPL_SCORING_MODEL.md
  - docs/RPL_STAGE_TRANSITIONS.md
  - docs/RPL_SCORE_ENGINE_MVP.md
  - docs/RPL_AUDIT_PROCESS.md
  - docs/Regolamento_Generale/02_iProfile_e_Gestione_Personale.md
  - docs/Regolamento_Generale/03_Mercato_e_Fair_Play_Finanziario.md
  - backend/prisma/schema.prisma
  - backend/package.json
  - ROADMAP.md
workflowType: prd
projectName: Ristorazione-Pro-League
author: BMad PM Agent (Claude Code session)
date: 2026-03-11
status: draft-v1
---

# Product Requirements Document — Ristorazione Pro League (RPL)

**Autore:** BMad PM Agent
**Data:** 2026-03-11
**Versione:** 1.0 — Draft
**Stato:** In revisione — pronto per architettura formale
**Branch:** `claude/debug-setup-bmad-n1bNG`

---

## 0. Nota sul Contesto (Brownfield)

Questo PRD descrive un **progetto brownfield**: esiste già codice operativo (`backend/`), documentazione strategica completa (`docs/`), e un modulo consulenziale funzionante (`consulting-os/`). Il PRD riflette la **realtà attuale del repository** e pianifica i passi successivi per arrivare a un prodotto digitale completo.

> **Stato attuale confermato da audit del codebase (2026-03-11):**
> - Backend TypeScript/Express: funzionante con Score Engine MVP testato
> - Frontend: solo mock statico (vanilla JS + HTML)
> - Database: SQLite (dev) — PostgreSQL è target di produzione
> - CI/CD: assente
> - Autenticazione: JWT implementato ma rotte non complete

---

## 1. Executive Summary

Ristorazione Pro League (RPL) è un **ecosistema meritocratico** per il settore della ristorazione italiana. Non è un software fine a sé stesso: è un **sistema operativo collettivo** che stabilisce standard condivisi, crea meccanismi di reputazione verificabile, e guida i ristoranti in un percorso di crescita progressivo (Pre-RPL → Lite → Standard → Excellence).

La **web application RPL** è il fulcro digitale di questo ecosistema: gestisce profili verificati (iProfile), calcola e pubblica punteggi meritocratici, supporta il workflow di auditing, e abilita il mercato dei talenti (Draft e Trasferimenti).

Il progetto si trova nella **fase di transizione da documentazione strategica completa a implementazione tecnica operativa**. Il Score Engine (il motore di calcolo del merito) è già implementato e testato. L'obiettivo di questo PRD è definire i requisiti della web application completa, per poi procedere con architettura, epics e sprint.

---

## 2. Problema

### 2.1 Il Problema di Settore

Il settore della ristorazione italiana soffre di sei patologie strutturali:

| Problema | Impatto Concreto |
|----------|-----------------|
| Contratti irregolari e poca trasparenza | Alta conflittualità, rischio legale per ristoratori e lavoratori |
| Turnover elevato del personale (stimato >50%/anno) | Costi di selezione, perdita di know-how operativo |
| Nessun sistema di reputazione professionale verificabile | Concorrenza sleale, cliente disorientato, lavoratori non valorizzati |
| Margini compressi senza controllo sistematico dei costi | Chiusure premature, stagnazione economica |
| Formazione assente o episodica | Team dipendenti, bassa autonomia, nessuna crescita |
| Digitale frammentato o inesistente | Decisioni a intuito, zero dati, nessun benchmark |

### 2.2 Il Problema di Prodotto (Gap Attuale)

Attualmente non esiste in Italia una piattaforma che:
1. **Misuri in modo oggettivo e verificabile** la qualità operativa di un ristorante su criteri standardizzati
2. **Attribuisca e pubblicizzi** un punteggio/badge di reputazione professionale a ristoranti e lavoratori
3. **Supporti un percorso di crescita progressivo** con strumenti concreti (playbook, SOP, KPI)
4. **Gestisca il mercato del lavoro** nella ristorazione con regole di fair play e clausole etiche

---

## 3. Visione e Obiettivo

### 3.1 Visione

> "Ogni ristorante italiano può dimostrare quanto vale. Ogni lavoratore può costruire una carriera documentata. RPL è l'infrastruttura che rende questo possibile."

### 3.2 Obiettivo della Web Application

Creare la **piattaforma digitale di RPL** — un sistema integrato che:

1. **Digitalizza il ciclo di vita RPL** (Pre-RPL → Lite → Standard → Excellence) con regole chiare, automatizzate e pubbliche
2. **Gestisce i profili iProfile** — identità professionale digitale e portabile per ogni lavoratore
3. **Calcola e pubblica il punteggio RPL** — score composito su 7 aree (già implementato come Score Engine)
4. **Supporta il flusso di auditing** — workflow end-to-end dall'auto-valutazione all'audit esterno
5. **Abilita il mercato dei talenti** — Draft e Finestre di Trasferimento con regole di fair play
6. **Alimenta il consulting-os** — fornisce dati e scorecard ai consulenti RPL

### 3.3 Non-Goal (Fuori Scope per MVP)

- ❌ Integrazione con sistemi di pagamento (fatturazione, stripe) — **Fase 3+**
- ❌ App mobile nativa — web responsive è sufficiente per MVP
- ❌ Moduli AI avanzati (raccomandazioni, previsioni turnover) — **Fase 4**
- ❌ Integrazioni con POS/gestionali ristoranti — **Fase 3+**
- ❌ Sistema di messaggistica in-app — **Fase 3**
- ❌ Marketplace servizi terzi — **Fase 4**
- ❌ Blockchain per certificazioni — **visione futura, non MVP**

---

## 4. Utenti e Personas

### 4.1 Ristoratore (Persona Primaria)

**Chi è:** Titolare o manager di un ristorante indipendente italiano. Dimensioni: 5-30 dipendenti. Spesso tradizionalista, scettico verso il digitale, ma consapevole dei problemi strutturali del settore.

**Goals:**
- Dimostrare ai clienti la qualità e l'eticità del proprio locale
- Trovare e trattenere personale qualificato
- Crescere in modo strutturato, non per intuito
- Accedere a benchmark e strumenti che altri hanno pagato consulenti per avere

**Pain Points:**
- Non sa come misurare le proprie performance in modo oggettivo
- Fatica a trovare personale qualificato e fidato
- Teme la burocrazia e i sistemi complessi
- Ha poco tempo per formazione e digitalizzazione

**Journey in RPL:** Pre-RPL → auto-valutazione → ingresso Lite → supporto consulente → Standard → Excellence

### 4.2 Lavoratore della Ristorazione (Persona Secondaria)

**Chi è:** Chef, sous chef, cameriere, sommelier, barman — profilo junior o senior. Spesso cambia lavoro per mancanza di prospettive, non per scelta.

**Goals:**
- Costruire una carriera documentata e portabile
- Trovare ristoranti che rispettino i lavoratori (contratti regolari, formazione)
- Essere riconosciuto per il proprio valore professionale
- Accedere a opportunità migliori

**Pain Points:**
- Nessun "curriculum verificato" riconosciuto dal settore
- Incertezza contrattuale e lavorativa
- Poche opportunità di crescita strutturata
- Difficoltà a confrontare offerte di lavoro in modo trasparente

**Funzionalità chiave:** iProfile, auto-gestione del profilo, candidatura a offerte, partecipazione al Draft

### 4.3 Consulente RPL (Persona Operativa)

**Chi è:** Professionista che utilizza il `consulting-os/` per guidare i ristoranti nel percorso RPL. Può essere interno all'organizzazione RPL o accreditato come consulente esterno.

**Goals:**
- Avere strumenti digitali per monitorare il progresso dei clienti
- Generare scorecard e report in modo automatizzato
- Tracciare le 7 fasi del metodo di trasformazione operativa

**Funzionalità chiave:** Dashboard clienti, scorecard generation, audit workflow, report export

### 4.4 Amministratore RPL (Persona di Governance)

**Chi è:** Membro del team centrale RPL. Responsabile della governance del sistema, validazione degli audit, gestione delle transizioni di stadio.

**Goals:**
- Gestire il catalogo dei ristoranti certificati
- Approvare upgrade/downgrade di lega
- Monitorare KPI aggregati del sistema
- Gestire utenti, ruoli e permessi

**Funzionalità chiave:** Admin dashboard, gestione stadi, approvazione audit, report di sistema

### 4.5 Cliente/Pubblico (Utente Passivo)

**Chi è:** Cliente del ristorante che vuole verificare la reputazione RPL prima di prenotare.

**Goals:**
- Verificare se un ristorante è certificato RPL
- Leggere il punteggio e il badge del ristorante
- Lasciare un feedback verificato dopo la visita

**Funzionalità chiave:** Profilo pubblico ristorante, verifica badge, feedback

---

## 5. Flussi Core e Requisiti Funzionali

### 5.1 Ciclo di Vita RPL (Core Flow)

```
RISTORANTE INTERESSATO
        ↓
[1] Registrazione + Auto-valutazione (Score Engine)
        ↓
[2] Audit documentale leggero (RPL Consultant)
        ↓
[3] Ingresso RPL Lite (Badge + Profilo Pubblico)
        ↓
[4] Monitoraggio periodico (self-assessment semestrale)
        ↓
[5] Richiesta Upgrade → Audit di Upgrade
        ↓
[6] RPL Standard (Dashboard KPI, accesso mercato)
        ↓
[7] RPL Excellence (mentorship, visibilità nazionale)
```

### 5.2 Modulo Auth e Gestione Utenti [PARZIALMENTE IMPLEMENTATO]

**Requisiti:**

| ID | Requisito | Priorità | Stato Backend |
|----|-----------|----------|---------------|
| AUTH-01 | Registrazione utente con email/password | Must | ✅ Implementato (JWT + bcryptjs) |
| AUTH-02 | Login / refresh token | Must | ✅ Implementato |
| AUTH-03 | Ruoli: RISTORATORE, LAVORATORE, CONSULENTE, ADMIN | Must | ⚠️ Schema presente, logica incompleta |
| AUTH-04 | Recupero password via email | Should | ❌ Non implementato |
| AUTH-05 | Profilo utente modificabile | Must | ⚠️ Routes stub (501) |
| AUTH-06 | 2FA per ADMIN e CONSULENTE | Could | ❌ Non implementato |

### 5.3 Modulo Ristorante [PARZIALMENTE IMPLEMENTATO]

**Requisiti:**

| ID | Requisito | Priorità | Stato Backend |
|----|-----------|----------|---------------|
| REST-01 | Registrazione ristorante (dati anagrafici base) | Must | ✅ Schema Prisma completo |
| REST-02 | Profilo pubblico ristorante con badge RPL | Must | ❌ Non implementato |
| REST-03 | Gestione stadi RPL (Lite/Standard/Excellence) | Must | ❌ Non implementato |
| REST-04 | Auto-valutazione (7 aree Score Engine) | Must | ✅ Score Engine implementato e testato |
| REST-05 | Scorecard RPL con storico punteggi | Must | ❌ Non implementato |
| REST-06 | Dashboard KPI ristorante | Should | ❌ Non implementato |
| REST-07 | Richiesta formale di upgrade | Should | ❌ Non implementato |
| REST-08 | Recovery Plan workflow (90 giorni) | Should | ❌ Non implementato |
| REST-09 | Badge "RPL Lite / Standard / Excellence" pubblico | Must | ❌ Non implementato |
| REST-10 | Ricerca e filtraggio ristoranti pubblici | Should | ❌ Non implementato |

### 5.4 Modulo iProfile (Lavoratore) [NON IMPLEMENTATO]

**Requisiti:**

| ID | Requisito | Priorità | Stato Backend |
|----|-----------|----------|---------------|
| IPROF-01 | Creazione profilo lavoratore (ruolo, skills, esperienza) | Must | ⚠️ Schema `WorkerProfile` presente, rotte stub |
| IPROF-02 | Storico esperienze verificate | Must | ❌ Non implementato |
| IPROF-03 | Skill tags e competenze certificate | Must | ❌ Non implementato |
| IPROF-04 | Feedback da ristoratori (anonimizzato) | Should | ❌ Non implementato |
| IPROF-05 | Portabilità iProfile (export PDF / link pubblico) | Should | ❌ Non implementato |
| IPROF-06 | Registro formazione e certificazioni | Must | ❌ Non implementato |
| IPROF-07 | Disponibilità e preferenze lavorative | Must | ⚠️ Schema presente |
| IPROF-08 | Visibilità nel mercato RPL | Should | ❌ Non implementato |

### 5.5 Modulo Score Engine e Auditing [PARZIALMENTE IMPLEMENTATO]

**Requisiti:**

| ID | Requisito | Priorità | Stato Backend |
|----|-----------|----------|---------------|
| SCORE-01 | Calcolo punteggio su 7 aree (100 punti totali) | Must | ✅ Implementato e testato (TypeScript puro) |
| SCORE-02 | Verifica transizione di stadio (Lite/Standard/Excellence) | Must | ✅ StageTransitionEngine implementato |
| SCORE-03 | Warning automatico sotto soglia | Must | ✅ Logica presente nel Score Engine |
| SCORE-04 | Self-assessment form (checklist 7 aree) | Must | ❌ Non implementato (solo logica backend) |
| SCORE-05 | Workflow audit esterno (assegnazione, upload evidenze, validazione) | Must | ❌ Non implementato |
| SCORE-06 | Report audit PDF/export | Should | ❌ Non implementato |
| SCORE-07 | Storico audit per ristorante | Must | ❌ Non implementato |
| SCORE-08 | Scorecard pubblica sul portale | Must | ❌ Non implementato |
| SCORE-09 | Notifiche automatiche (warning, scadenze, upgrade disponibile) | Should | ❌ Non implementato |

### 5.6 Modulo Mercato dei Talenti [NON IMPLEMENTATO]

**Requisiti:**

| ID | Requisito | Priorità | Stato Backend |
|----|-----------|----------|---------------|
| MARKET-01 | Offerte di lavoro pubblicate dai ristoranti | Must | ⚠️ Schema `JobOffer` presente, rotte stub |
| MARKET-02 | Candidatura lavoratore a offerta | Must | ⚠️ Schema `JobApplication` presente, rotte stub |
| MARKET-03 | Draft giovani talenti (sessione primaverile) | Should | ❌ Non implementato |
| MARKET-04 | Finestra di trasferimento professionisti (sessione autunnale) | Should | ❌ Non implementato |
| MARKET-05 | Fair Play Finanziario — validazione offerte vs. soglie | Should | ❌ Non implementato |
| MARKET-06 | Notifiche ristoratore/lavoratore per candidature | Should | ❌ Non implementato |
| MARKET-07 | Gestione proposta contrattuale (bozza, invio, accettazione) | Could | ❌ Non implementato |

### 5.7 Modulo Premi e Riconoscimenti [NON IMPLEMENTATO]

**Requisiti:**

| ID | Requisito | Priorità | Stato Backend |
|----|-----------|----------|---------------|
| BADGE-01 | Badge RPL automatici (Lite / Standard / Excellence) | Must | ❌ Non implementato |
| BADGE-02 | Award annuali (RPL Excellence Award) | Could | ❌ Non implementato |
| BADGE-03 | Riconoscimenti per lavoratori (iProfile achievements) | Could | ❌ Non implementato |
| BADGE-04 | Pubblicazione badge su profilo pubblico e su web | Must | ❌ Non implementato |

### 5.8 Modulo Admin e Governance [NON IMPLEMENTATO]

**Requisiti:**

| ID | Requisito | Priorità | Stato Backend |
|----|-----------|----------|---------------|
| ADMIN-01 | Dashboard aggregata ristoranti per lega | Must | ❌ Non implementato |
| ADMIN-02 | Approvazione/rifiuto upgrade di stadio | Must | ❌ Non implementato |
| ADMIN-03 | Gestione audit straordinari e sospensioni | Must | ❌ Non implementato |
| ADMIN-04 | Report KPI sistema (aderenti, punteggi medi, formazione) | Should | ❌ Non implementato |
| ADMIN-05 | Gestione utenti e ruoli | Must | ❌ Non implementato |
| ADMIN-06 | Audit trail di ogni decisione di sistema | Should | ❌ Non implementato |

---

## 6. Requisiti Non Funzionali

| Area | Requisito | Target |
|------|-----------|--------|
| **Performance** | Tempo di risposta API | < 300ms per il 95% delle request |
| **Scalabilità** | Ristoranti supportati in MVP | 50–500 ristoranti (pilota Sardegna) |
| **Sicurezza** | Autenticazione | JWT con refresh token, BCRYPT_ROUNDS=12 |
| **Sicurezza** | Dati sensibili (contratti, iProfile) | Crittografia in transit (HTTPS), no plaintext |
| **Sicurezza** | GDPR compliance | Consenso esplicito, data minimization, export/delete |
| **Sicurezza** | Rate limiting | 100 req/15 min per IP (già configurato) |
| **Disponibilità** | Uptime target | 99% (no SLA formale in MVP) |
| **Manutenibilità** | Test coverage | ≥ 80% per domain layer (Score Engine già coperto) |
| **Accessibilità** | Standard web | WCAG 2.1 Level AA per il frontend |
| **Internazionalizzazione** | Lingue iniziali | Italiano (solo — MVP) |
| **Mobile** | Responsive | Sì — web app responsive (no app nativa) |
| **Infrastruttura** | Target deployment | Docker su Hetzner Cloud |
| **Database** | Dev | SQLite (attuale) |
| **Database** | Production | PostgreSQL (migrazione richiesta prima del launch) |

---

## 7. Fasi di Sviluppo (Feature Scope per Fase)

### Fase 0 — Fondamenta (COMPLETATA)
- ✅ Documentazione strategica (`docs/`)
- ✅ Score Engine MVP (TypeScript puro, testato)
- ✅ Backend scaffold (Express + Prisma + JWT)
- ✅ Schema dati base (User, Restaurant, WorkerProfile, JobOffer, JobApplication)
- ✅ Mock routes per sviluppo frontend
- ✅ BMad v6 installato + CLAUDE.md

### Fase 1 — MVP Core (PROSSIMA)
**Obiettivo:** Backend completo per auth, ristoranti, profili + frontend React funzionale

Deliverable:
- [ ] CRUD completo backend (auth, users, restaurants, workers) su Prisma/PostgreSQL
- [ ] Frontend React + TypeScript scaffold (routing, state, component library)
- [ ] Auto-valutazione form (7 aree Score Engine) collegata al backend
- [ ] Profilo pubblico ristorante con badge RPL
- [ ] iProfile lavoratore (base)
- [ ] Admin panel base (gestione utenti, lista ristoranti)
- [ ] Pipeline CI/CD (GitHub Actions)
- [ ] Migrazione SQLite → PostgreSQL (ambiente dev/staging)
- [ ] Test Jest coverage ≥ 80% per domain layer

### Fase 2 — Auditing e Mercato
**Obiettivo:** Workflow di auditing operativo + mercato dei talenti base

Deliverable:
- [ ] Workflow audit completo (self-assessment → audit esterno → scorecard)
- [ ] Notifiche automatiche (email: warning, scadenze, upgrade)
- [ ] Offerte di lavoro (CRUD completo con `JobOffer` e `JobApplication`)
- [ ] Candidatura lavoratori a offerte
- [ ] Dashboard KPI ristorante
- [ ] Report scorecard PDF/export
- [ ] Pilot Sardegna: onboarding 10-20 ristoranti reali

### Fase 3 — Advanced Features
**Obiettivo:** Draft, Fair Play Finanziario, Premi, Community

Deliverable:
- [ ] Draft giovani talenti (sessione primaverile)
- [ ] Finestra di trasferimento professionisti (sessione autunnale)
- [ ] Fair Play Finanziario (validazione offerte vs. soglie)
- [ ] Sistema badge/premi (Excellence Award)
- [ ] Community features (forum, mentorship matching)
- [ ] Analytics e benchmark comparativi
- [ ] Integrazione pagamenti (fee di adesione)

### Fase 4 — Scale e AI
**Obiettivo:** Scalabilità nazionale + moduli AI

Deliverable:
- [ ] Raccomandazioni AI (percorsi formativi, abbinamenti menu)
- [ ] Analisi predittiva (rischio turnover, trend punteggi)
- [ ] Marketplace servizi consulenziali
- [ ] Internazionalizzazione (multi-lingua)

---

## 8. Metriche di Successo

### 8.1 Metriche di Adozione (Fase 1 + Pilot)

| Metrica | Target Fase 1 | Target 12 mesi |
|---------|--------------|----------------|
| Ristoranti registrati | ≥ 10 (pilota Sardegna) | ≥ 100 (regionali) |
| Ristoranti attivi (almeno 1 auto-valutazione) | ≥ 80% dei registrati | ≥ 70% |
| Lavoratori con iProfile creato | ≥ 30 (pilota) | ≥ 500 |
| Tasso di completamento auto-valutazione | ≥ 60% | ≥ 75% |

### 8.2 Metriche di Qualità del Sistema

| Metrica | Target |
|---------|--------|
| % ristoranti RPL con contratti regolari (A1 ≥ 14) | 100% (prerequisito di ingresso) |
| % ristoranti che migliorano il punteggio a 6 mesi | ≥ 40% |
| % upgrade Lite → Standard in 18 mesi | ≥ 20% dei ristoranti Lite |
| Time-to-Audit (richiesta → completamento) | < 30 giorni |

### 8.3 Metriche Tecniche

| Metrica | Target |
|---------|--------|
| API response time (p95) | < 300ms |
| Test coverage (domain layer) | ≥ 80% |
| Uptime | ≥ 99% |
| Critical bug rate (post-launch) | < 2/mese |

---

## 9. Vincoli e Dipendenze

### 9.1 Vincoli Tecnici

| Vincolo | Dettaglio |
|---------|-----------|
| **Stack obbligatorio** | TypeScript/Express backend, React frontend, Prisma ORM |
| **Infrastruttura** | Docker + Hetzner Cloud (standard dell'owner) |
| **Database prod** | PostgreSQL — migrazione da SQLite obbligatoria pre-launch |
| **Node.js** | ≥ 18.0.0 (dichiarato in package.json) |
| **Score Engine** | Non modificare senza test — è l'unico componente production-ready |
| **GDPR** | Tutti i dati personali (iProfile, contratti) soggetti a normativa europea |

### 9.2 Dipendenze Esterne

| Dipendenza | Stato | Criticità |
|-----------|-------|-----------|
| Consulenti RPL accreditati | Da reclutare — necessari per audit | 🔴 Alta |
| Enti di formazione (per Draft) | Da definire partnership | 🟡 Media |
| Provider email (Nodemailer) | Configurabile via .env | 🟢 Bassa |
| Provider hosting (Hetzner) | Da configurare in Fase 1 | 🟡 Media |
| SMTP / email service | Da configurare | 🟡 Media |

### 9.3 Vincoli di Business

| Vincolo | Dettaglio |
|---------|-----------|
| **Adesione volontaria** | Nessun ristorante può essere obbligato ad aderire |
| **Audit indipendenti** | Gli audit non possono essere condotti da chi ha interesse nel risultato |
| **A1 non negoziabile** | Nessun ristorante con lavoro irregolare può aderire (gate assoluto) |
| **Progressione graduale** | Non si può saltare di stadio (Pre-RPL → Lite → Standard → Excellence) |
| **Trasparenza pubblica** | Punteggi e badge devono essere visibili pubblicamente |

---

## 10. Rischi

| # | Rischio | Probabilità | Impatto | Mitigazione |
|---|---------|:-----------:|:-------:|-------------|
| R1 | **Bassa adozione ristoranti** — resistenza al cambiamento | Alta | Alto | Fase pilota Sardegna a basso rischio; RPL Lite con barriera minima; consulenti come acceleratori |
| R2 | **Credibilità degli audit** — dubbi sull'imparzialità | Media | Alto | Audit condotti da enti terzi; pubblicazione trasparente dei criteri e dei risultati |
| R3 | **Complessità tecnica** — Gap tra documentazione e implementazione | Alta | Alto | BMad workflow per pianificazione strutturata; Score Engine come riferimento di qualità |
| R4 | **GDPR e dati sensibili** — iProfile contengono dati personali sensibili | Media | Alto | Privacy by design; data minimization; DPO se > 5000 utenti |
| R5 | **Sostenibilità finanziaria** — costi di sviluppo pre-revenue | Alta | Medio | Piano B (RPL Lite first); bandi pubblici; fee simbolica in Fase 2 |
| R6 | **Migrazione PostgreSQL** — breaking changes da SQLite | Media | Medio | Test di integrazione completi; ambiente staging dedicato |
| R7 | **Frontend non esiste** — gap tra backend e UI | Alta | Alto | Priorità Fase 1; React scaffold come primo deliverable |
| R8 | **Consulenti RPL non disponibili** — collo di bottiglia sul workflow audit | Media | Medio | Self-assessment remoto per Lite; audit in presenza solo per Standard+ |

---

## 11. Domande Aperte

| # | Domanda | Owner | Scadenza |
|---|---------|-------|---------|
| Q1 | **Modello di governance**: chi compone il "Comitato RPL" che approva gli upgrade? È già definito? | Owner progetto | Prima di Fase 2 |
| Q2 | **Fee di adesione**: qual è l'importo definitivo per Lite, Standard, Excellence? Gratuito per periodo pilota? | Owner progetto | Prima del pilot Sardegna |
| Q3 | **Accreditamento consulenti**: come si accredita un consulente RPL? Esiste un processo formale? | Owner progetto | Prima di Fase 2 |
| Q4 | **Integrazione `consulting-os/`**: il consulente usa il portale web o strumenti separati? Come si connette il consulting-os al backend? | Architect | Prima di Fase 2 |
| Q5 | **Portabilità iProfile**: il profilo è esportabile anche fuori da RPL (PDF, open format)? Chi controlla la verifica? | Owner progetto | Prima di IPROF-05 |
| Q6 | **Pilot Sardegna — tempistiche**: quando inizia il pilot? Quanti ristoranti target? Chi gestisce l'onboarding fisico? | Owner progetto | Urgente — definisce Fase 1 timeline |
| Q7 | **{output_folder} bug**: il BMad installer ha creato una cartella letterale `{output_folder}` invece di `_bmad-output`. Serve pulizia del repo? | Tech lead | Prima del prossimo sprint |
| Q8 | **Lingua frontend**: il portale è solo in italiano in MVP o supporta anche l'inglese? | Owner progetto | Prima dello scaffold React |

---

## 12. Analisi Gap — Realtà vs. Documentazione

### 12.1 Implementato e Documentato (✅ Match)

| Componente | Dettaglio |
|-----------|-----------|
| Score Engine (7 aree, 100 punti) | `backend/src/domain/rpl/` — puro, testato, corrispondente a `docs/RPL_SCORING_MODEL.md` |
| Stage Transition Engine | `backend/src/domain/rpl/stage-transition-engine.ts` — corrisponde a `docs/RPL_STAGE_TRANSITIONS.md` |
| Schema dati base | `backend/prisma/schema.prisma` — User, Restaurant, WorkerProfile, JobOffer, JobApplication |
| JWT Authentication | `backend/src/controllers/authController.ts` — corrisponde alla vision di sicurezza |
| Documentazione strategica | `docs/` — completa e coerente |

### 12.2 Documentato ma Non Implementato (⚠️ Gap Critico)

| Gap | Documenti di Riferimento | Priorità |
|----|--------------------------|----------|
| Frontend React (nessun componente esistente) | `docs/03_Architettura_Tecnica.md` | 🔴 CRITICO - Fase 1 |
| Workflow audit end-to-end | `docs/RPL_AUDIT_PROCESS.md`, `docs/RPL_STAGE_TRANSITIONS.md` | 🔴 CRITICO - Fase 2 |
| iProfile (logica di business) | `docs/Regolamento_Generale/02_iProfile_e_Gestione_Personale.md` | 🟡 Fase 1 |
| Sistema badge/stadi RPL | `docs/RESTAURANT_LIFECYCLE.md` | 🟡 Fase 1 |
| Mercato dei talenti (Draft, Trasferimenti) | `docs/Regolamento_Generale/03_Mercato_e_Fair_Play_Finanziario.md` | 🟡 Fase 2 |
| Notifiche automatiche | `docs/RPL_STAGE_TRANSITIONS.md` (Section 5, warning ops) | 🟡 Fase 2 |
| Dashboard KPI ristorante | `docs/RPL_OPERATIONAL_CORE.md` (Section 7) | 🟡 Fase 2 |
| Admin panel e governance | `RPL_Web_App_Project_Structure.md` | 🟡 Fase 1 |

### 12.3 Implementato ma Non Documentato nel PRD (Aggiunto qui)

| Componente | Nota |
|-----------|------|
| `backend/src/routes/mock*.ts` — mock routes | Utili per sviluppo frontend, da rimuovere in produzione |
| `backend/src/simple-server.ts` — server in-memory | Utile per mobile/Termux dev, da mantenere per developer experience |
| `backend/src/utils/math.ts` — funzioni matematiche | Testate; part of domain layer |
| Dual server strategy (Prisma + in-memory) | Pattern architetturale confermato, da documentare in Architecture doc |

### 12.4 Contraddizioni Identificate

| # | Contraddizione | Impatto | Risoluzione Proposta |
|---|---------------|---------|---------------------|
| C1 | `prisma/schema.prisma` usa SQLite; docs indicano PostgreSQL come target | Medio | Migrazione esplicita in Fase 1 — aggiungere task nel backlog |
| C2 | Il `{output_folder}` del BMad installer non è stato risolto (cartella letterale) | Basso | Aggiungere `_bmad-output/` al .gitignore o rinominare la cartella |
| C3 | `docs/00_RPL_Strategic_Update_2025.md` riferisce "Q1-Q2 2024" come target per backend completo — già passato | Basso | Aggiornare le date nel documento strategico |

---

## Appendice A — Struttura Score Engine (Riferimento)

Il Score Engine è il componente production-ready più avanzato del progetto:

```typescript
// backend/src/domain/rpl/stage-transition-engine.ts
evaluate(input: EvaluationInput): EvaluationResult {
  // Input: areaScores (7 aree, max 100 punti totali)
  // Output: { stage, totalScore, warnings[], canUpgrade, suspensionRequired }
}
```

**Aree di valutazione:**
- A1: Contratti e Compliance (max 20 pt)
- A2: Team e Formazione (max 20 pt)
- A3: Operazioni e Sistemi (max 15 pt)
- A4: KPI e Disciplina dei Dati (max 15 pt)
- A5: Sostenibilità (max 10 pt)
- A6: Reputazione Cliente (max 10 pt)
- A7: Cultura ed Etica (max 10 pt)

**Soglie di stadio:**
- RPL Lite: ≥ 35/100 + A1 ≥ 14/20
- RPL Standard: ≥ 60/100 + A1 ≥ 16/20
- RPL Excellence: ≥ 85/100 + A7 ≥ 8/10

---

## Appendice B — Stack Tecnico Confermato

| Layer | Tecnologia | Versione | Stato |
|-------|-----------|---------|-------|
| Backend | TypeScript + Express.js | Node.js ≥ 18 | ✅ Funzionante |
| ORM | Prisma | 5.x | ✅ Funzionante (SQLite dev) |
| Auth | JWT + bcryptjs | - | ✅ Implementato |
| Validation | Zod | 3.22.x | ✅ Installato |
| Testing | Jest + ts-jest | 29.x | ✅ Test passano |
| Frontend | React + TypeScript | - | ❌ Da scaffoldare |
| Database (dev) | SQLite | - | ✅ Attivo |
| Database (prod) | PostgreSQL | - | ❌ Da configurare |
| Infrastruttura | Docker + Hetzner Cloud | - | ❌ Da configurare |
| CI/CD | GitHub Actions | - | ❌ Da creare |

---

*Fine PRD v1.0 — Ristorazione Pro League*
*Generato da BMad PM Agent in modalità brownfield — 2026-03-11*
