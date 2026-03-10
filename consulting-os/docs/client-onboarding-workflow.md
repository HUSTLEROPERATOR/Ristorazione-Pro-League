# Client Onboarding Workflow

## Processo standard per avviare un nuovo cliente ristorante

---

## Pre-onboarding (prima della firma)

### Discovery call (30–60 min)
- [ ] Capire la situazione attuale del ristorante
- [ ] Identificare i 3 problemi principali percepiti dal titolare
- [ ] Capire la disponibilità (tempo, budget, team)
- [ ] Valutare fit: vuole davvero cambiare o solo uno sfogo?
- [ ] Proposta verbale e next step

### Proposta formale
- [ ] Usa `marketing/proposal-template.md`
- [ ] Definisci chiaramente: fasi, tempi, costi, aspettative
- [ ] Invia via email con scadenza 5 giorni

### Firma e acconto
- [ ] Contratto firmato (template disponibile)
- [ ] Acconto ricevuto (almeno 30-50%)
- [ ] Kickoff schedulato

---

## Kickoff (giorno 1)

### Setup repo cliente
```bash
cp -r clients/_CLIENT-TEMPLATE clients/NOME-RISTORANTE
```

### Completa il dashboard
Apri `clients/NOME-RISTORANTE/00-dashboard/README.md` e compila:
- Nome e indirizzo ristorante
- Nome titolare e contatti
- Data avvio progetto
- Fasi concordate
- KPI di partenza (anche se stimati)
- Note iniziali

### Prima riunione di kickoff (1–2 ore)
- [ ] Presentare il metodo in 7 fasi
- [ ] Spiegare cosa serve dal loro lato (dati, accesso, tempo)
- [ ] Definire il calendario delle fasi
- [ ] Raccogliere: P&L ultimi 3 mesi, menu attuale, organigramma
- [ ] Schedulare sopralluogo audit

---

## Fase 1 — Audit (settimana 1–2)

### Sopralluogo
- [ ] Osserva un turno completo (pranzo o cena)
- [ ] Visita cucina, magazzino, ufficio
- [ ] Intervista titolare (1h strutturata)
- [ ] Intervista responsabile di sala e/o chef (30 min)
- [ ] Raccogli: menu completo, listino fornitori, P&L, contratti

### Analisi
- [ ] Compila `clients/NOME/01-audit/audit-report.md` da template
- [ ] Calcola KPI base: food cost %, labor cost %, scontrino medio
- [ ] Analizza mix menu (quali piatti vendono, quali no)
- [ ] Leggi le ultime 20 recensioni Google/TripAdvisor
- [ ] Identifica i 5 problemi prioritari

### Report e presentazione
- [ ] Presenta il report al titolare (1h)
- [ ] Valida le priorità insieme
- [ ] Definisce il piano d'azione per le prossime fasi
- [ ] Ottieni buy-in su fase 2

---

## Fasi 2–7 (settimane 3–24)

Ogni fase segue questo schema:

```
1. Brief → cosa si fa in questa fase
2. Raccolta dati → informazioni dal cliente
3. Produzione → usa i template, genera i deliverable
4. Review → valida col cliente
5. Implementazione → il cliente implementa, tu supporti
6. Verifica → controlla che funzioni
7. Passa alla fase successiva
```

Per i dettagli di ogni fase → `docs/service-modules.md`

---

## Comunicazione durante il progetto

### Canali
- Email: aggiornamenti formali e invio documenti
- WhatsApp: comunicazioni rapide e urgenti
- Riunioni: settimanale (30 min) + mensile (1h)

### Cadenza riunioni
| Frequenza | Tipo | Durata |
|-----------|------|--------|
| Settimanale | Check-in avanzamento | 30 min |
| Mensile | Review KPI + priorità | 60 min |
| Fine fase | Presentazione deliverable | 90 min |
| Trimestrale | Review strategica | 2h |

---

## Chiusura progetto (o fine fase)

### Handoff
- [ ] Tutti i documenti sono in `clients/NOME/`
- [ ] Il cliente ha ricevuto tutte le versioni finali
- [ ] Il team del cliente sa usare SOP e checklist
- [ ] Dashboard KPI è impostata e capita

### Feedback e case study
- [ ] Raccogli feedback strutturato dal titolare
- [ ] Documenta risultati ottenuti (KPI prima vs dopo)
- [ ] Scrivi case study in `marketing/case-study-template.md`
- [ ] Aggiorna i template se hai imparato qualcosa di utile

### Proposta retainer
- [ ] Proponi monitoraggio mensile (2-4h/mese)
- [ ] KPI review + aggiornamenti sistema
- [ ] Eventuali nuove fasi (es. aggiungere automazioni)
