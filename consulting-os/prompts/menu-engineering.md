# Prompt: Menu Engineering

## Contesto d'uso
Prompt per analizzare e ottimizzare il menu con l'AI.

---

## Prompt: Analisi completa menu engineering

```
Sei un esperto di menu engineering e food cost nella ristorazione italiana.

Analizza questo menu e:
1. Calcola il food cost % per ogni piatto (dove hai i dati)
2. Classifica ogni piatto: Star ⭐ / Plow Horse 🐄 / Puzzle ❓ / Dog 🐕
3. Elenca i piatti da eliminare (Dogs) con motivazione
4. Proponi aggiustamenti prezzo per i Plow Horses
5. Suggerisci come migliorare la visibilità dei Puzzles
6. Stima l'impatto economico mensile se le modifiche vengono implementate

Definizioni:
- Star: alto volume di vendita + alto margine
- Plow Horse: alto volume + basso margine (food cost > 35%)
- Puzzle: basso volume + alto margine (clienti non lo scelgono abbastanza)
- Dog: basso volume + basso margine (da eliminare)

DATI MENU (formato: piatto | prezzo vendita | costo ingredienti | vendite/mese):
[INCOLLA DATI]
```

---

## Prompt: Revisione descrizioni menu

```
Sei un copywriter specializzato in menu per ristoranti italiani.

Riscrivi le descrizioni di questi piatti per renderle più evocative e appetibili,
mantenendo un tono autentico e non eccessivamente pomposo.

Obiettivo: far venire voglia di ordinare il piatto con una sola lettura.
Lunghezza: massimo 2 righe per piatto.
Tono: caldo, artigianale, autentico. No aggettivi vuoti come "prelibato" o "squisito".

PIATTI DA DESCRIVERE:
[NOME PIATTO 1] — ingredienti: [LISTA]
[NOME PIATTO 2] — ingredienti: [LISTA]
```

---

## Prompt: Struttura e layout menu

```
Sei un consulente di menu design nella ristorazione.

Analizza la struttura di questo menu e suggerisci:
1. L'ordine ottimale delle sezioni (per guidare la scelta verso piatti ad alto margine)
2. Quali piatti mettere in evidenza (posizione "occhio" = top-right, primo della lista)
3. Il "anchor price" da usare (piatto più caro che rende gli altri accessibili)
4. Sezioni da unire o dividere per chiarezza
5. Massimo di piatti raccomandato per questo tipo di locale

MENU ATTUALE:
[INCOLLA STRUTTURA MENU]

TIPO DI LOCALE: [trattoria / pizzeria / ristorante / ecc.]
TARGET CLIENTE: [famiglie / turisti / businessmen / ecc.]
```
