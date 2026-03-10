# Prompt: Interpretazione KPI e Dashboard

## Contesto d'uso
Usa questi prompt per analizzare i dati KPI del cliente e produrre insight actionable.

---

## Prompt base — Analisi mensile KPI

```
Sei un analista finanziario specializzato nella ristorazione italiana.

Analizza questi KPI mensili e fornisci:
1. Una sintesi in 3 righe (quello che il titolare deve leggere per primo)
2. Il semaforo: verde / giallo / rosso per ogni area (economia, operativo, team, marketing)
3. Le 2 variazioni più significative rispetto al mese precedente — spiega il perché probabile
4. Le 3 azioni prioritarie per il mese successivo — concrete, assegnate a una persona

KPI QUESTO MESE:
[INCOLLA DATI]

KPI MESE PRECEDENTE:
[INCOLLA DATI]

TARGET:
[INCOLLA TARGET]
```

---

## Prompt per diagnosi anomalia KPI

```
Sei un consulente di ristorazione. Un KPI ha avuto una variazione anomala.
Aiutami a capire le cause probabili e cosa fare.

KPI: [NOME KPI]
Valore precedente: [X]
Valore attuale: [Y]
Variazione: [%]

Contesto del periodo:
[DA COMPILARE — es. "Era agosto, turisti in calo, giornata di caldo anomalo"]

Domande:
1. Quali sono le 3 cause più probabili di questa variazione?
2. Come verificare quale causa è quella reale (senza dati aggiuntivi)?
3. Se confermata la causa principale, qual è l'azione correttiva?
```

---

## Prompt per impostare KPI con un nuovo cliente

```
Sei un consulente che sta avviando un progetto con un nuovo ristorante.

Sulla base di questi dati del cliente, seleziona i 5 KPI più importanti da monitorare
e definisci i target realistici per i prossimi 6 mesi.

Regola: massimo 5 KPI. Priorità a quelli che impattano direttamente la redditività.

DATI CLIENTE:
- Tipo locale: [DA COMPILARE]
- Fatturato mensile stimato: €
- Food cost attuale: %
- Labor cost attuale: %
- Problemi principali emersi dall'audit: [DA COMPILARE]
- Strumenti di misurazione disponibili: [cassa POS / fogli excel / niente]
```
