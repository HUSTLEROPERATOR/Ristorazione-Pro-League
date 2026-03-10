# Template System — Come funzionano i template

## Principio base

I template sono **master copy** riutilizzabili. Non vengono mai modificati per il singolo cliente.
Per ogni cliente si crea una **copia** del template e la si personalizza.

```
templates/audit-report/template.md    ← master, non toccare
clients/NOME/01-audit/audit-report.md ← copia personalizzata
```

---

## I 11 template del sistema

| Template | Fase | Uso |
|----------|------|-----|
| `audit-report` | 1 — Audit | Report diagnostico completo |
| `mansionario` | 2 & 4 | Mansionario per ogni ruolo |
| `checklist-opening` | 2 — OS | Checklist apertura giornaliera |
| `checklist-closing` | 2 — OS | Checklist chiusura giornaliera |
| `sop` | 2 — OS | Procedura operativa standard |
| `menu-engineering` | 3 — Menu | Analisi e ingegnerizzazione menu |
| `kpi-dashboard` | 7 — KPI | Dashboard KPI periodica |
| `crm-base` | 5 — Marketing | Registro contatti e CRM base |
| `event-format` | 5 & 8 | Format per eventi e promozioni |
| `upselling-scripts` | 5 — Marketing | Script upselling per il personale |
| `marketing-playbook` | 5 — Marketing | Playbook marketing completo |

---

## Come usare un template

### Metodo manuale
1. Apri il template in `templates/[NOME]/template.md`
2. Copia il contenuto
3. Crea il file nella cartella cliente: `clients/NOME/0X-fase/[nome-file].md`
4. Sostituisci tutti i segnaposto `[NOME RISTORANTE]`, `[DATA]`, ecc.
5. Compila le sezioni con i dati reali

### Metodo con AI (Claude Code / ChatGPT)
1. Copia il template nel prompt
2. Aggiungi i dati del cliente
3. Chiedi di compilarlo
4. Rivedi e aggiusta

Prompt base:
```
Sei un consulente di ristorazione. Usa questo template e compilalo con i dati forniti.
Non inventare dati: lascia [DA COMPILARE] dove non hai informazioni.

TEMPLATE:
[incolla il template]

DATI CLIENTE:
[incolla i dati]
```

---

## Come aggiornare un template

Quando hai imparato qualcosa di nuovo lavorando con un cliente:

1. Apri `templates/[NOME]/template.md`
2. Aggiungi o modifica solo la struttura (non i dati del cliente)
3. Aggiorna la sezione `Versione` in cima al template
4. Nota il motivo del cambiamento in un commento `<!-- ... -->`

I clienti esistenti mantengono la versione che avevano al momento della copia.
Non è necessario aggiornare le copie già create.

---

## Segnaposto standard

Usa sempre questi segnaposto per facilitare la compilazione:

| Segnaposto | Significato |
|-----------|-------------|
| `[NOME RISTORANTE]` | Nome del ristorante cliente |
| `[DATA]` | Data del documento |
| `[CONSULENTE]` | Nome del consulente |
| `[DA COMPILARE]` | Campo da riempire con dati reali |
| `[DA DEFINIRE]` | Campo che richiede una decisione |
| `[ESEMPIO]` | Testo di esempio da sostituire |

---

## Stato dei template

| Template | Versione | Stato |
|----------|----------|-------|
| audit-report | v1.0 | Pronto |
| mansionario | v1.0 | Pronto |
| checklist-opening | v1.0 | Pronto |
| checklist-closing | v1.0 | Pronto |
| sop | v1.0 | Pronto |
| menu-engineering | v1.0 | Pronto |
| kpi-dashboard | v1.0 | Pronto |
| crm-base | v1.0 | Pronto |
| event-format | v1.0 | Pronto |
| upselling-scripts | v1.0 | Pronto |
| marketing-playbook | v1.0 | Pronto |
