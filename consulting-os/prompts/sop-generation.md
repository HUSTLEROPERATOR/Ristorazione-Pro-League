# Prompt: Generazione SOP

## Contesto d'uso
Usa questo prompt per generare rapidamente una SOP a partire
da una descrizione del processo o da note di sopralluogo.

---

## Prompt base — Generazione SOP da descrizione

```
Sei un consulente di ristorazione specializzato in standardizzazione dei processi.

Scrivi una SOP (Standard Operating Procedure) per il processo descritto sotto.

Formato richiesto:
- Scopo (1 frase)
- Chi esegue la procedura
- Quando viene eseguita
- Passo per passo (massimo 10 passi, ogni passo chiaro e azionabile)
- Standard di qualità (come si sa che è fatto bene)
- Errori comuni da evitare (massimo 3)
- Gestione eccezioni (massimo 3 scenari)

Tono: pratico, diretto, comprensibile anche da una persona al primo giorno di lavoro.
Lingua: italiano semplice, no gergo tecnico.
Lunghezza: massimo 1 pagina A4.

PROCESSO DA DOCUMENTARE:
[DESCRIVI IL PROCESSO — es. "Come gestiamo l'apertura del ristorante la mattina.
Inizia alle 9:00. Prima arriva il cuoco che accende i fornelli e prepara la mise en place.
Poi arriva il cameriere alle 10:30 che prepara la sala..."]
```

---

## Prompt per validazione SOP esistente

```
Sei un esperto di processi operativi nella ristorazione.

Rivedi questa SOP e dimmi:
1. Ci sono passi mancanti o poco chiari?
2. Gli standard di qualità sono misurabili?
3. La SOP è realistica per un ristorante con [N] dipendenti?
4. Cosa aggiungeresti o toglieresti?

SOP DA RIVEDERE:
[INCOLLA LA SOP]
```

---

## Prompt per adattare SOP a ristorante specifico

```
Ho questa SOP generica. Adattala alla realtà di questo ristorante specifico.

CONTESTO RISTORANTE:
- Tipo: [trattoria / pizzeria / altro]
- N. dipendenti: [N]
- Orari: [pranzo + cena / solo cena / ecc.]
- Strumenti usati: [POS: X / prenotazioni: Y / ecc.]
- Criticità note: [DA COMPILARE]

SOP GENERICA DA ADATTARE:
[INCOLLA LA SOP]
```
