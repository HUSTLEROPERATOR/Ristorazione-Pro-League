# Implementation Phases — Piano milestone pratico

## Visione d'insieme

Questo piano trasforma il repo da struttura vuota a sistema operativo consulenziale
pienamente funzionante. Segue l'ordine BMAD: prima la fondamenta, poi gli strumenti,
poi il primo cliente, poi la scalabilità.

---

## Fase A — Foundation (completata)
*Durata: 1 giorno | Prerequisito: nessuno*

**Obiettivo:** repo strutturato e documentato, pronto per il lavoro.

- [x] Struttura directory `consulting-os/`
- [x] `docs/` — tutti i file di sistema
- [x] Template folders create
- [x] `clients/_CLIENT-TEMPLATE/` pronto
- [x] `ops/`, `automation/`, `kpi/`, `marketing/`, `prompts/` create

**Criterio di completamento:** puoi spiegare a qualcuno la struttura del repo in 5 minuti.

---

## Fase B — Template Library
*Durata: 2–3 giorni | Prerequisito: Fase A*

**Obiettivo:** tutti i template compilati e pronti all'uso nel primo cliente.

- [ ] `templates/audit-report/template.md`
- [ ] `templates/mansionario/template.md`
- [ ] `templates/checklist-opening/template.md`
- [ ] `templates/checklist-closing/template.md`
- [ ] `templates/sop/template.md`
- [ ] `templates/menu-engineering/template.md`
- [ ] `templates/kpi-dashboard/template.md`
- [ ] `templates/crm-base/template.md`
- [ ] `templates/event-format/template.md`
- [ ] `templates/upselling-scripts/template.md`
- [ ] `templates/marketing-playbook/template.md`
- [ ] `prompts/` — libreria prompt AI

**Criterio di completamento:** puoi usare ogni template senza guardare il doc.

---

## Fase C — Primo Cliente (Cliente #1)
*Durata: 4–8 settimane | Prerequisito: Fase B (almeno audit + SOP)*

**Obiettivo:** testare il sistema end-to-end con un cliente reale.

**Settimana 1–2: Audit**
- [ ] Discovery call
- [ ] Proposta e firma
- [ ] Setup `clients/NOME-1/`
- [ ] Kickoff meeting
- [ ] Sopralluogo e audit
- [ ] Report audit consegnato

**Settimana 3–4: Operating Systems**
- [ ] SOP processo di apertura
- [ ] SOP processo di chiusura
- [ ] Checklist giornaliere
- [ ] Mansionari ruoli chiave

**Settimana 5–6: Menu & Profitabilità**
- [ ] Calcolo food cost tutti i piatti
- [ ] Analisi menu engineering
- [ ] Raccomandazioni prezzi e rimozioni
- [ ] Nuova versione menu

**Settimana 7–8: Team & KPI**
- [ ] Organigramma definitivo
- [ ] Mansionari aggiornati
- [ ] Dashboard KPI impostata
- [ ] Training titolare su KPI

**Criterio di completamento:** il cliente ha almeno 3 sistemi funzionanti e misura i KPI.

---

## Fase D — Ottimizzazione Template
*Durata: 2–3 giorni | Prerequisito: Fase C completata*

**Obiettivo:** migliorare i template con i learnings del primo cliente.

- [ ] Review di ogni template usato
- [ ] Aggiornamento v1.1 dei template modificati
- [ ] Aggiunta di esempi reali (anonimizzati)
- [ ] Aggiornamento `docs/template-system.md`
- [ ] Case study Cliente #1 in `marketing/`

**Criterio di completamento:** i template v1.1 sono migliori delle v1.0.

---

## Fase E — Automazioni & Prompt Library
*Durata: 3–5 giorni | Prerequisito: Fase C*

**Obiettivo:** ridurre il tempo di produzione documenti con AI e automazioni.

- [ ] Libreria prompt `prompts/` completa (5–10 prompt testati)
- [ ] Automazione review request documentata
- [ ] Automazione prenotazioni documentata
- [ ] Flusso newsletter documentato
- [ ] `kpi/kpi-master-list.md` definitivo

**Criterio di completamento:** produci un SOP completo in <30 minuti con AI.

---

## Fase F — Scalabilità (3+ clienti)
*Prerequisito: Fase D + Fase E*

**Obiettivo:** sistema pronto per 5–10 clienti simultanei senza caos.

- [ ] Processo onboarding standardizzato e testato
- [ ] Proposta commerciale template definitiva
- [ ] KPI di progetto (non solo del cliente): ore/cliente, margine, NPS
- [ ] Guida per aggiungere un secondo consulente (se necessario)
- [ ] Aggiornamento `docs/implementation-phases.md` con learnings

---

## KPI del sistema consulenziale

Misura anche la salute del tuo sistema, non solo di quello del cliente:

| KPI | Target | Note |
|-----|--------|------|
| Tempo audit → report | <3 giorni | Con template e AI |
| Riutilizzo template | >80% | Quante parti sono già pronte |
| Ore/cliente/mese | <10h retainer | Dopo implementazione |
| NPS cliente | >8/10 | Feedback strutturato |
| Template aggiornati dopo ogni cliente | 100% | Ciclo di miglioramento |
