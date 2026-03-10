# CRM Base — Gestione Clienti e Contatti
<!-- Template v1.0 — aggiornato: 2025-03 -->

**Ristorante:** [NOME RISTORANTE]
**Aggiornato il:** [DATA]
**Responsabile:** [NOME]

---

## Istruzioni d'uso

Questo template definisce la struttura CRM base. In pratica può essere implementato con:
- Google Sheets (soluzione immediata, gratuita)
- Notion database
- Airtable
- CRM specifico (es. HubSpot free, Brevo)

Il criterio di scelta: quello che il team usa davvero.

---

## Struttura contatti

### Campi per ogni contatto

| Campo | Obbligatorio | Tipo |
|-------|-------------|------|
| Nome | sì | testo |
| Cognome | sì | testo |
| Telefono | sì | telefono |
| Email | no | email |
| Data prima visita | sì | data |
| N. visite totali | sì | numero (auto) |
| Data ultima visita | sì | data (auto) |
| Tipo cliente | sì | tag: nuovo / ricorrente / VIP / dormiente |
| Fonte acquisizione | sì | tag: passaparola / Google / social / evento |
| Preferenze | no | testo libero |
| Note | no | testo libero |
| Consenso marketing | sì | sì / no |
| Newsletter | no | iscritto / non iscritto |
| WhatsApp | no | iscritto / non iscritto |

---

## Segmentazione clienti

### Definizioni

| Tipo | Criteri | Azione |
|------|---------|--------|
| **Nuovo** | Prima visita negli ultimi 30 giorni | Invia messaggio di benvenuto |
| **Ricorrente** | 2+ visite totali | Mantieni contatto regolare |
| **VIP** | 6+ visite/anno o spesa > €[X]/visita | Trattamento preferenziale, inviti eventi |
| **Dormiente** | Nessuna visita negli ultimi 90 giorni | Campagna riattivazione |

---

## Workflow raccolta contatti

### Al tavolo (metodo consigliato)
1. A fine pasto, cameriere porta il conto + piccolo questionario QR code
2. Il cliente scansiona → compila nome + telefono + consenso
3. Dati entrano nel CRM

### Con prenotazione
1. Al momento della prenotazione raccogliere nome + telefono
2. Aggiungere al CRM con fonte "prenotazione"

### Con eventi
1. Iscrizione evento → raccolta dati obbligatoria
2. Fonte "evento [NOME]"

---

## Comunicazioni programmate

### Nuovi clienti (entro 48h dalla visita)
```
Messaggio WhatsApp/SMS:
"Ciao [NOME], grazie per aver scelto [NOME RISTORANTE]!
Speriamo ti sia piaciuto. Ci fa piacere se vuoi lasciarci
una recensione su Google: [LINK]
A presto! 🍽️"
```

### Clienti ricorrenti (mensile)
```
Newsletter/WhatsApp:
- Speciale del mese
- Evento in arrivo
- Piatto stagionale nuovo
- Offerta riservata ai clienti abituali
```

### Clienti dormienti (ogni 90 giorni)
```
Messaggio riattivazione:
"Ciao [NOME], sono passati un po' di mesi! Ti aspettiamo
da [NOME RISTORANTE] con [SPECIALE/NOVITÀ].
Prenota il tuo tavolo: [CONTATTO/LINK]"
```

### VIP — eventi esclusivi
- Invito preview nuovo menu
- Evento riservato (cena, degustazione)
- Sconto compleanno

---

## KPI CRM

| KPI | Target | Note |
|-----|--------|------|
| Nuovi contatti/mese | > [N] | Raccolta attiva |
| % clienti nel CRM vs coperti | > 30% | Crescita progressiva |
| Tasso apertura newsletter | > 35% | |
| Tasso risposta WhatsApp | > 60% | |
| Clienti riattivati/mese | > [N] | Da segmento dormiente |

---

## Privacy e GDPR

- Raccogliere sempre il consenso esplicito
- Specificare: "Utilizzo per comunicazioni promozionali da [NOME RISTORANTE]"
- Fornire opzione di cancellazione facile
- Non cedere dati a terzi
- Conservare i dati in modo sicuro (Google Sheets con accesso ristretto)

---

*Template CRM preparato da [CONSULENTE] per [NOME RISTORANTE] — [DATA]*
