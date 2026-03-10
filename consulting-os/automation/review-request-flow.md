# Automazione: Review Request Post-Pasto

**Obiettivo:** generare più recensioni Google in modo sistematico e non invasivo.

---

## Flusso manuale (da fare subito, prima dell'automazione)

1. A fine pasto il cameriere dice:
   > "Se vi è piaciuto, ci farebbe molto piacere una recensione su Google —
   > basta scansionare questo QR."
2. Il QR code porta direttamente alla pagina recensioni Google

**Come creare il link diretto alla recensione:**
- Cerca il ristorante su Google Maps
- Copia l'URL → usa un generatore di QR code gratuito (es. qr-code-generator.com)
- Stampa il QR su cartoncino da mettere sul tavolo o sul conto

---

## Flusso semi-automatico (WhatsApp/SMS — 24h dopo la visita)

### Prerequisito
- Avere il numero del cliente (da prenotazione o CRM)
- Consenso al contatto (raccolto al momento della prenotazione)

### Messaggio WhatsApp (inviare manualmente o tramite Brevo/Wati)

```
Ciao [NOME] 👋

Grazie per essere stato/a da noi ieri sera!
Speriamo che l'esperienza sia stata all'altezza delle aspettative.

Se hai piacere, lasciaci una recensione su Google — ci aiuta tantissimo:
👉 [LINK DIRETTO RECENSIONE GOOGLE]

Grazie di cuore,
[NOME RISTORANTE]
```

### Strumenti per automatizzare
- **Brevo** (ex Sendinblue) — WhatsApp + email, piano free disponibile
- **Wati** — WhatsApp Business API, a pagamento
- **Zapier** — trigger da Google Sheets (quando aggiungi un contatto → invia messaggio)

---

## Flusso automatico completo (avanzato)

```
Cliente prenota (Google Forms / TheFork / altro)
        ↓
Dati salvati in Google Sheets
        ↓
Zapier / Make: trigger "nuova riga"
        ↓
Attesa: 24h dopo la data prenotazione
        ↓
Brevo: invia WhatsApp / email con link recensione
        ↓
Se nessuna risposta dopo 3 giorni: fine (non insistere)
```

---

## KPI da monitorare

| KPI | Prima | Dopo 30gg | Dopo 90gg |
|-----|-------|-----------|----------|
| N. recensioni/mese | N | N | N |
| Rating medio | X.X | X.X | X.X |
