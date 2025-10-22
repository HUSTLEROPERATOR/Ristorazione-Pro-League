# RPL Strategic Update 2025

## 1. Executive Summary
- Consolidare la coerenza tra visione strategica e implementazione tecnica affrontando le discrepanze rilevate fra documentazione e codice.
- Accelerare la maturità del backend Express/TypeScript portando in produzione i flussi core (auth, profili, auditing) basati su schema Prisma e policy di sicurezza consolidate.
- Pianificare la migrazione del frontend verso un framework modulare (React/TypeScript) predisposto a dashboard analytics e componenti AI-driven.
- Introdurre un framework operativo di AI Governance, metriche condivise e cicli di miglioramento continuo per soddisfare gli obiettivi di reputazione, sostenibilità e compliance previsti per il 2025.

## 2. Stato Attuale del Sistema
- **Backend**: server Express con middleware di sicurezza e router modulari; gran parte delle rotte resta un placeholder 501, mentre Prisma è configurato su SQLite per sviluppo locale.
- **Frontend**: prototipo in JavaScript vanilla con routing hash-based e dataset mock; assente l'infrastruttura component-based prevista nelle linee guida.
- **Documentazione**: ampia produzione strategica (vision, roadmap, architettura, governance) non ancora tramutata in implementazioni operative.
- **Governance tecnica**: strumenti di auth (JWT, bcrypt) e middleware già presenti, ma privi di integrazione con ruoli, audit trail e processi etici descritti nei documenti.

## 3. Gap Tecnologici e Strutturali
1. **Frontend** non allineato allo stack target React/TypeScript, limitando scalabilità e componentizzazione necessarie per moduli analytics/AI.
2. **Servizi backend** incompleti: controller mock e assenza di logica CRUD reale su Prisma impediscono il rispetto dei requisiti di reputazione e auditing.
3. **Database** in SQLite single-node, in contrasto con l'indicazione PostgreSQL per ambienti cloud-ready e reporting avanzato.
4. **Pipeline dati** non definita: mancano flussi ETL/API per alimentare metriche condivise e modelli AI.
5. **Governance** non implementata in codice: ruoli, permessi, logging etico e processi di escalation sono solo documentati.

## 4. Piano di Allineamento 2025
- **Q1-Q2 2024**: completare i servizi core backend (auth, utenti, ristoranti, worker) con Prisma/PostgreSQL e test automatizzati; introdurre audit logging centralizzato.
- **Q3 2024**: migrazione graduale del frontend a React/TypeScript, riutilizzando i mock attuali come fixture Storybook; definizione design system.
- **Q4 2024**: attivare pipeline dati per KPI e moduli AI (ingestione da frontend, integrazioni esterne); predisporre microservizi analytics.
- **2025**: roll-out delle funzionalità avanzate (indice reputazione, raccomandazioni AI, marketplace tematici) e piena integrazione con governance etica e reporting.

## 5. AI Governance e Data Ethics
- Istituire un **Comitato AI** composto da responsabile tecnico, referente etico e stakeholder legali con mandato di oversight sui modelli.
- Redigere un **AI Model Register** con descrizione, dataset, metriche di equità e cicli di revisione, integrato in `RPL_Web_App_Project_Structure.md`.
- Implementare **audit trail** obbligatori per ogni decisione automatizzata, con log firmati e consultabili dai ruoli autorizzati.
- Stabilire policy di **data minimization e consensi espliciti** per tutti i dataset utilizzati in training/inferenza, con tracciamento in `docs/03_Architettura_Tecnica.md` (sezione Data Flow).
- Adottare checklist di **bias & fairness** da eseguire prima del deploy di qualsiasi modello AI, con esito archiviato in repository compliance.

## 6. KPI e Metriche di Sostenibilità
- **Indice di Reputazione RPL**: punteggio composito basato su feedback verificati, audit di conformità e segnalazioni etiche.
- **Sostenibilità Ambientale**: metriche su sprechi ridotti, uso di ingredienti locali, energia rinnovabile nei ristoranti affiliati.
- **Welfare e Formazione**: percentuale di lavoratori certificati, ore di formazione continua, retention post-placement.
- **Inclusione e Diversità**: rappresentanza di categorie protette, gender balance nei ruoli chiave, adozione di politiche inclusive.
- **Time-to-Audit**: tempo medio tra richiesta e completamento audit, con soglia target <30 giorni.

## 7. Azioni Imminenti (Next 90 Days)
1. Implementare CRUD reali per autenticazione, profili utenti e offerte di lavoro collegando i controller a Prisma, con test Jest end-to-end.
2. Configurare ambienti PostgreSQL (dev/staging) con migrazioni e variabili `.env` separate; introdurre seed dati coerenti con KPI.
3. Definire blueprint React (routing, state management, component library) e migrare le prime viste (dashboard ristoratori, elenco lavoratori).
4. Documentare in `docs/03_Architettura_Tecnica.md` il nuovo Data Flow includendo origini, trasformazioni e consumatori AI.
5. Avviare il registro AI Governance e predisporre template di audit/log in `templates/`.
6. Emettere report baseline sulle metriche di sostenibilità/KPI utilizzando dataset mock per validare le formule.

## 8. Allegati e riferimenti interni
- `README.md` – Visione generale, roadmap sprint e componenti core.
- `ROADMAP.md` – Evoluzione funzionale con milestone auditing, badge, analytics.
- `docs/03_Architettura_Tecnica.md` – Stack target, componenti architetturali e spazio Data Flow.
- `docs/06_Sviluppi_Futuri_e_Moduli_Avanzati.md` – Moduli avanzati 2025 (AI gestionale, blockchain, certificazioni).
- `RPL_Web_App_Project_Structure.md` – Governance interna, organi decisionali, linee guida compliance.
