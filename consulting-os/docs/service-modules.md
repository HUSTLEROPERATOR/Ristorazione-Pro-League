# Service Modules — Le 7 fasi del metodo

## Struttura del metodo di trasformazione

Ogni ristorante cliente percorre 7 fasi in sequenza. Alcune fasi si sovrappongono;
l'ordine garantisce che ogni sistema sia costruito su basi solide.

---

## Fase 1 — Audit Diagnostico

**Obiettivo:** capire lo stato reale del ristorante prima di toccare qualsiasi cosa.

**Attività:**
- Sopralluogo fisico (cucina, sala, ufficio)
- Analisi P&L degli ultimi 3–6 mesi
- Intervista titolare e responsabili
- Osservazione diretta di un turno completo
- Analisi menu (prezzi, mix, margini)
- Analisi review online (Google, TripAdvisor)

**Output:** `templates/audit-report/template.md`

**KPI di riferimento:** food cost %, labor cost %, scontrino medio, pax/giorno, review score

---

## Fase 2 — Operating Systems

**Obiettivo:** documentare e standardizzare come funziona il ristorante.

**Attività:**
- Mappare tutti i processi chiave (apertura, chiusura, ordini, servizio)
- Scrivere le SOP per ogni processo critico
- Creare checklist operative giornaliere
- Definire mansionari per ogni ruolo

**Output:** `templates/sop/`, `templates/checklist-opening/`, `templates/checklist-closing/`, `templates/mansionario/`

---

## Fase 3 — Menu & Profitabilità

**Obiettivo:** trasformare il menu in uno strumento di profitto.

**Attività:**
- Calcolo food cost per piatto
- Classificazione menu (star, plow horse, puzzle, dog)
- Ridefinizione prezzi
- Ingegnerizzazione del menu (layout, descrizioni, ancoraggio prezzi)
- Eliminazione piatti improduttivi

**Output:** `templates/menu-engineering/template.md`

---

## Fase 4 — Team

**Obiettivo:** costruire un team autonomo e responsabile.

**Attività:**
- Definire organigramma
- Creare mansionari dettagliati per ogni ruolo
- Definire processo di selezione e onboarding
- Creare piano di formazione
- Definire sistema di feedback e valutazione

**Output:** `templates/mansionario/template.md`

---

## Fase 5 — Marketing

**Obiettivo:** costruire un sistema di acquisizione e fidelizzazione clienti.

**Attività:**
- Definire posizionamento e target
- Creare piano editoriale social
- Impostare Google Business Profile
- Creare sistema di raccolta recensioni
- Definire offerte e eventi
- Strutturare CRM base (lista contatti, newsletter, WhatsApp)

**Output:** `templates/marketing-playbook/`, `templates/crm-base/`, `templates/event-format/`, `templates/upselling-scripts/`

---

## Fase 6 — Automazioni

**Obiettivo:** eliminare lavoro manuale ripetitivo.

**Attività:**
- Mappare processi automatizzabili
- Implementare automazioni prenotazioni (es. Google Forms + foglio)
- Automazioni review request post-pasto
- Automazioni newsletter/WhatsApp
- Integrazioni tra strumenti (Zapier/Make)

**Output:** `automation/` — flussi e documentazione

---

## Fase 7 — KPI & Data Loop

**Obiettivo:** creare un sistema di misurazione che alimenta le decisioni.

**Attività:**
- Definire KPI chiave per ogni area (massimo 5–7 per area)
- Creare dashboard di monitoraggio
- Definire cadenza review (settimanale, mensile, trimestrale)
- Addestrare il titolare alla lettura dei dati
- Impostare ciclo: misura → analisi → azione → verifica

**Output:** `templates/kpi-dashboard/template.md`, `kpi/`

---

## Matrice fasi × strumenti

| Fase | Template | Cartella cliente | Automazioni |
|------|----------|-----------------|-------------|
| 1 Audit | audit-report | 01-audit | — |
| 2 OS | sop, checklist, mansionario | 02-operating-systems | — |
| 3 Menu | menu-engineering | 03-menu-profit | — |
| 4 Team | mansionario | 04-team | — |
| 5 Marketing | marketing-playbook, crm-base, event-format | 05-marketing | newsletter, review |
| 6 Automazioni | — | 06-automations | Zapier/Make |
| 7 KPI | kpi-dashboard | 07-kpi | report auto |
