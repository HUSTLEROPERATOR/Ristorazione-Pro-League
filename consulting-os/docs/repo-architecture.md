# Repo Architecture — Struttura del Repository

## Albero completo

```
consulting-os/
│
├── README.md                          # Punto di ingresso del modulo
│
├── docs/                              # Documentazione di sistema
│   ├── project-overview.md            # Cos'è, perché, per chi
│   ├── service-modules.md             # Le 7 fasi del metodo
│   ├── repo-architecture.md           # Questo file
│   ├── bmad-workflow.md               # Workflow BMAD v6 applicato
│   ├── client-onboarding-workflow.md  # Come avviare un nuovo cliente
│   ├── template-system.md             # Come usare i template
│   ├── module-map.md                  # Mappa moduli riutilizzabili
│   └── implementation-phases.md      # Piano milestone pratico
│
├── templates/                         # Template riutilizzabili (master copies)
│   ├── audit-report/
│   │   └── template.md
│   ├── mansionario/
│   │   └── template.md
│   ├── checklist-opening/
│   │   └── template.md
│   ├── checklist-closing/
│   │   └── template.md
│   ├── sop/
│   │   └── template.md
│   ├── menu-engineering/
│   │   └── template.md
│   ├── kpi-dashboard/
│   │   └── template.md
│   ├── crm-base/
│   │   └── template.md
│   ├── event-format/
│   │   └── template.md
│   ├── upselling-scripts/
│   │   └── template.md
│   └── marketing-playbook/
│       └── template.md
│
├── clients/                           # Un folder per ogni cliente
│   └── _CLIENT-TEMPLATE/              # Copia questo per ogni nuovo cliente
│       ├── 00-dashboard/              # Vista generale del progetto cliente
│       ├── 01-audit/                  # Report audit e diagnosi
│       ├── 02-operating-systems/      # SOP, checklist, mansionari
│       ├── 03-menu-profit/            # Analisi e ingegnerizzazione menu
│       ├── 04-team/                   # Organigramma, formazione, mansionari
│       ├── 05-marketing/              # Playbook, CRM, piano editoriale
│       ├── 06-automations/            # Flussi e documentazione automazioni
│       ├── 07-kpi/                    # Dashboard e tracking KPI
│       ├── 08-events/                 # Format eventi, promozioni
│       └── 09-archive/               # Versioni precedenti, file storici
│
├── ops/                               # Procedure operative interne (consulente)
│   ├── sales-process.md               # Come acquisire un cliente
│   ├── project-kickoff.md             # Checklist avvio progetto
│   └── delivery-quality-check.md     # Verifica qualità deliverable
│
├── automation/                        # Automazioni e flussi
│   ├── review-request-flow.md         # Flusso richiesta recensione
│   ├── reservation-automation.md      # Automazione prenotazioni
│   └── newsletter-flow.md             # Flusso newsletter
│
├── kpi/                               # Framework KPI globale
│   ├── kpi-master-list.md             # Lista KPI per area
│   └── review-cadence.md             # Cadenza review settimanale/mensile
│
├── marketing/                         # Materiali marketing consulenza
│   ├── case-study-template.md         # Template case study cliente
│   └── proposal-template.md          # Template proposta commerciale
│
└── prompts/                           # Libreria prompt AI
    ├── audit-analysis.md              # Prompt per analisi audit
    ├── sop-generation.md              # Prompt per generare SOP
    ├── menu-engineering.md            # Prompt per analisi menu
    └── kpi-interpretation.md         # Prompt per interpretare KPI
```

---

## Regole architetturali

### 1. Separazione template / cliente
- `templates/` = master copies, **non modificare** per adattarle al cliente
- `clients/NOME/` = versione personalizzata per quel cliente

### 2. Naming conventions
- Cartelle: `kebab-case` minuscolo
- File documenti: `kebab-case.md`
- Cartelle cliente: `NOME-RISTORANTE` (maiuscolo, trattino)
- Template folder: `_CLIENT-TEMPLATE` (prefisso `_` per ordinamento)

### 3. File obbligatori per ogni modulo
Ogni cartella cliente deve contenere almeno un `README.md` con:
- Nome ristorante
- Data avvio
- Fase corrente
- Link ai documenti principali

### 4. Versionamento
- I template evolvono nel tempo: aggiornare `templates/` non rompe i clienti esistenti
- I file cliente sono snapshot: non aggiornati automaticamente

### 5. Accesso
- Il consulente ha accesso all'intero repo
- Il cliente vede solo la propria cartella `clients/NOME/`
- I template e i docs sono interni al consulente
