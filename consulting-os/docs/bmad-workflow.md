# BMAD Workflow v6 — Applicazione al Restaurant Consulting OS

## Cos'è BMAD Method v6

BMAD (Business Method for Agile Development) v6 è un framework per strutturare
progetti complessi con agenti AI. Fornisce ruoli, workflow e documenti standard
per costruire sistemi operativi in modo iterativo e scalabile.

**Punto di ingresso:** `bmad-help` per orientarsi nel metodo.
**Installazione:** `npx bmad-method install` (Node.js 20+ richiesto)

---

## Ruoli BMAD applicati a questo progetto

| Ruolo BMAD | Equivalente nel Consulting OS |
|-----------|-------------------------------|
| Product Manager | Fondatore/consulente — definisce il metodo |
| Architect | Consulente — progetta il sistema per ogni cliente |
| Developer | Consulente + AI — produce i deliverable |
| Scrum Master | Consulente — gestisce le fasi con ogni cliente |
| Analyst | Consulente — raccoglie e interpreta i dati |

---

## Sequenza workflow BMAD per questo progetto

### Workflow scelto: **Greenfield Documentation System**
*(sistema documentale nuovo su dominio reale non-software)*

```
STEP 1: Product Brief
  → Definire il metodo di trasformazione (7 fasi)
  → Output: docs/project-overview.md + docs/service-modules.md

STEP 2: Architecture Design
  → Progettare la struttura repo e i moduli
  → Output: docs/repo-architecture.md + docs/module-map.md

STEP 3: Template System
  → Creare i template riutilizzabili per ogni fase
  → Output: templates/*/template.md

STEP 4: Client Onboarding
  → Definire il processo di onboarding cliente
  → Output: docs/client-onboarding-workflow.md + clients/_CLIENT-TEMPLATE/

STEP 5: Operationalise
  → Definire processi interni, automazioni, KPI
  → Output: ops/, automation/, kpi/, prompts/

STEP 6: Iterate
  → Con ogni cliente reale, migliorare template e processi
  → Output: versioni aggiornate dei template
```

---

## Milestone pratiche BMAD

### Milestone 1 — Foundation (ora)
**Obiettivo:** repo strutturato, documentazione di sistema completa

- [x] Struttura directory creata
- [x] `docs/project-overview.md`
- [x] `docs/service-modules.md`
- [x] `docs/repo-architecture.md`
- [x] `docs/bmad-workflow.md`
- [x] `docs/client-onboarding-workflow.md`
- [x] `docs/template-system.md`
- [x] `docs/module-map.md`
- [x] `docs/implementation-phases.md`

### Milestone 2 — Template Library (prossimo sprint)
**Obiettivo:** tutti i template pronti per essere usati con un cliente

- [ ] `templates/audit-report/template.md` — completo e testato
- [ ] `templates/sop/template.md` — con esempi reali
- [ ] `templates/checklist-opening/template.md`
- [ ] `templates/checklist-closing/template.md`
- [ ] `templates/mansionario/template.md`
- [ ] `templates/menu-engineering/template.md`
- [ ] `templates/kpi-dashboard/template.md`
- [ ] `templates/crm-base/template.md`
- [ ] `templates/event-format/template.md`
- [ ] `templates/upselling-scripts/template.md`
- [ ] `templates/marketing-playbook/template.md`

### Milestone 3 — Client #1 (primo cliente reale)
**Obiettivo:** testare il sistema end-to-end con un ristorante reale

- [ ] Crea `clients/NOME-RISTORANTE/` da `_CLIENT-TEMPLATE`
- [ ] Completa audit (fase 1)
- [ ] Consegna SOP base (fase 2)
- [ ] Analisi menu (fase 3)
- [ ] Nota: cosa ha funzionato, cosa migliorare nei template

### Milestone 4 — Automations & KPI (dopo M3)
**Obiettivo:** sistema semi-automatico per i clienti ricorrenti

- [ ] Automazione review request
- [ ] Dashboard KPI collegata a dati reali
- [ ] Prompt library completa per generazione AI-assisted

### Milestone 5 — Scale (3+ clienti)
**Obiettivo:** sistema replicabile senza riscrivere nulla

- [ ] Template v2 aggiornati con learnings
- [ ] Case study primo cliente
- [ ] Proposta commerciale standardizzata
- [ ] Onboarding nuovo consulente (se team cresce)

---

## I 5 prossimi step concreti

### Step 1 — Usa i template subito
Apri `templates/audit-report/template.md` e usalo nel primo sopralluogo.
Non aspettare che sia perfetto: il template migliora con l'uso.

### Step 2 — Crea la tua prima cartella cliente
```
cp -r clients/_CLIENT-TEMPLATE clients/NOME-RISTORANTE
```
Poi completa `clients/NOME-RISTORANTE/00-dashboard/README.md`.

### Step 3 — Esegui l'audit (fase 1)
Usa `templates/audit-report/template.md`. Porta il documento al sopralluogo.
Compila sul campo o subito dopo.

### Step 4 — Scrivi la prima SOP
Scegli il processo più critico (es. apertura o chiusura).
Usa `templates/sop/template.md`. Fai validare dal team del ristorante.

### Step 5 — Imposta 3 KPI di partenza
Scegli: food cost %, scontrino medio, coperti/giorno.
Misurali per 4 settimane prima di agire.

---

## Come usare BMAD con Claude Code

Quando lavori su questo repo con Claude Code, usa questi prompt di ruolo:

**Per generare documenti:**
> "Sei un consulente esperto di ristorazione. Usa il template in `templates/[X]/template.md`
> e crea la versione per il cliente `[NOME]` con questi dati: [DATI]"

**Per analizzare dati:**
> "Sei un analista di ristorazione. Analizza questi dati KPI e proponi 3 azioni prioritarie:
> [DATI]"

**Per migliorare template:**
> "Sei un systems designer. Rivedi `templates/[X]/template.md` e migliora la struttura
> basandoti su questo feedback dal cliente reale: [FEEDBACK]"
