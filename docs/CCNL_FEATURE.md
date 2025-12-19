# Sistema CCNL - Contratti Collettivi Nazionali di Lavoro

## Panoramica

Il sistema CCNL (Contratti Collettivi Nazionali di Lavoro) è stato integrato nella piattaforma Ristorazione Pro League per fornire trasparenza e conformità contrattuale nel settore della ristorazione e turismo.

## Struttura del Database

### Modelli Principali

#### 1. **CCNL**
Tabella principale che contiene i contratti collettivi disponibili.

**Campi:**
- `id`: Identificativo univoco
- `name`: Nome del CCNL (es. "Turismo", "Pubblici Esercizi")
- `description`: Descrizione del contratto
- `sector`: Settore di riferimento
- `isActive`: Stato attivo/inattivo
- `createdAt`, `updatedAt`: Timestamp

#### 2. **CCNLLevel**
Livelli contrattuali all'interno di ogni CCNL (1°, 2°, 3°, 4°, 5°, 6°, 7°, Quadro).

**Campi:**
- `id`: Identificativo univoco
- `level`: Livello (es. "3°", "4°", "Quadro")
- `description`: Descrizione delle mansioni e competenze richieste
- `ccnlId`: Riferimento al CCNL
- `createdAt`, `updatedAt`: Timestamp

**Esempio di livelli:**
- **1°**: Lavoratori addetti a mansioni semplici (es. Lavapiatti)
- **3°**: Personale qualificato (es. Cuoco, Cameriere, Barista)
- **5°**: Personale con funzioni di coordinamento (es. Sous chef, Maître)
- **Quadro**: Quadri direttivi con funzioni strategiche

#### 3. **CCNLVariant**
Varianti annuali dei CCNL (2025, 2026, ecc.) con periodi di validità.

**Campi:**
- `id`: Identificativo univoco
- `year`: Anno di riferimento (2025, 2026)
- `name`: Nome completo (es. "CCNL Turismo 2025")
- `validFrom`: Data inizio validità
- `validTo`: Data fine validità (null se aperto)
- `description`: Note e modifiche rispetto alla versione precedente
- `isActive`: Stato attivo/inattivo
- `ccnlId`: Riferimento al CCNL
- `createdAt`, `updatedAt`: Timestamp

#### 4. **CCNLVariantLevel**
Dettagli salariali e normativi per ogni livello in una specifica variante.

**Campi:**
- `id`: Identificativo univoco
- `minimumSalary`: Retribuzione minima mensile lorda (€)
- `hourlyRate`: Paga oraria (€)
- `overtimeRate`: Maggiorazione straordinario (€/ora)
- `holidayRate`: Maggiorazione festivi (€/ora)
- `nightShiftRate`: Maggiorazione notturno (€/ora)
- `mealAllowance`: Indennità pasto giornaliera (€)
- `accommodationInfo`: Informazioni su alloggio
- `otherBenefits`: Altri benefit (welfare, assicurazioni, auto aziendale)
- `variantId`: Riferimento alla variante
- `levelId`: Riferimento al livello
- `createdAt`, `updatedAt`: Timestamp

### Relazioni

```
CCNL
  ├── CCNLLevel (1:N)
  └── CCNLVariant (1:N)
       └── CCNLVariantLevel (N:N con CCNLLevel)

JobOffer
  └── CCNLVariant (N:1)
```

## CCNL Implementati

### 1. CCNL Turismo

**Settore:** Turismo e Pubblici Esercizi

**Livelli:**
1. **1°** - Ausiliario di cucina, Addetto pulizie
2. **2°** - Aiuto cuoco, Cameriere ai piani
3. **3°** - Cuoco, Cameriere di sala, Barista, Receptionist
4. **4°** - Chef de partie, Capo cameriere, Barman
5. **5°** - Sous chef, Maître, Front office manager
6. **6°** - Executive chef, Restaurant manager, F&B manager
7. **7°** - Executive chef stelle Michelin, General manager
8. **Quadro** - Quadri con funzioni direttive

**Varianti:**

#### CCNL Turismo 2025
- **Validità:** 01/01/2025 - 31/12/2025
- **Adeguamento salariale:** +3.2% rispetto all'anno precedente
- **Retribuzioni (livello 3°):** €1,620.00/mese, €10.15/ora
- **Benefit:** Assicurazione sanitaria integrativa, Welfare aziendale €200-€1500/anno

#### CCNL Turismo 2026
- **Validità:** Dal 01/01/2026
- **Adeguamento salariale:** +2.8% rispetto al 2025
- **Retribuzioni (livello 3°):** €1,665.00/mese, €10.43/ora
- **Novità:** Nuovi benefit welfare aziendale incrementati

### 2. CCNL Pubblici Esercizi

**Settore:** Pubblici Esercizi e Ristorazione

**Livelli:**
1. **1°** - Lavapiatti, Addetto alle pulizie
2. **2°** - Aiuto cuoco, Commis di sala
3. **3°** - Cuoco, Pizzaiolo, Cameriere qualificato, Barista
4. **4°** - Chef de partie, Sommelier, Capo sala
5. **5°** - Sous chef, Maître de salle, Responsabile bar
6. **6°** - Executive chef, Direttore di sala, F&B Manager
7. **7°** - Executive chef alta cucina, Restaurant director
8. **Quadro** - Quadri direttivi strategici

**Varianti:**

#### CCNL Pubblici Esercizi 2025
- **Validità:** 01/01/2025 - 31/12/2025
- **Adeguamento salariale:** +3.5%
- **Retribuzioni (livello 3°):** €1,680.00/mese, €10.52/ora
- **Miglioramenti:** Miglioramenti normativi

#### CCNL Pubblici Esercizi 2026
- **Validità:** Dal 01/01/2026
- **Adeguamento salariale:** +3.0% rispetto al 2025
- **Retribuzioni (livello 3°):** €1,730.00/mese, €10.84/ora
- **Focus:** Sostenibilità e formazione

## API Endpoints

### Ottenere tutti i CCNL
```http
GET /api/ccnl
```

**Risposta:**
```json
[
  {
    "id": "ccnl_id",
    "name": "Turismo",
    "description": "Contratto Collettivo Nazionale di Lavoro per il settore Turismo",
    "sector": "Turismo e Pubblici Esercizi",
    "isActive": true,
    "_count": {
      "levels": 8,
      "variants": 2
    }
  }
]
```

### Ottenere un CCNL specifico
```http
GET /api/ccnl/:id
```

### Ottenere i livelli di un CCNL
```http
GET /api/ccnl/:id/levels
```

### Ottenere le varianti di un CCNL
```http
GET /api/ccnl/:id/variants?year=2025
```

### Ottenere dettagli di una variante
```http
GET /api/ccnl/variants/:variantId
```

**Risposta esempio:**
```json
{
  "id": "variant_id",
  "year": 2025,
  "name": "CCNL Turismo 2025",
  "validFrom": "2025-01-01T00:00:00.000Z",
  "validTo": "2025-12-31T00:00:00.000Z",
  "description": "Rinnovo contrattuale 2025 con adeguamento salariale inflazione +3.2%",
  "ccnl": {
    "name": "Turismo"
  },
  "variantLevels": [
    {
      "level": {
        "level": "3°",
        "description": "Lavoratori qualificati - es. Cuoco, Cameriere..."
      },
      "minimumSalary": "1620.00",
      "hourlyRate": "10.15",
      "overtimeRate": "12.69",
      "holidayRate": "14.21",
      "nightShiftRate": "11.17",
      "mealAllowance": "5.29",
      "otherBenefits": "Assicurazione sanitaria integrativa, Welfare aziendale €200/anno"
    }
  ]
}
```

### Ottenere dettagli salariali per un livello specifico
```http
GET /api/ccnl/variants/:variantId/levels/:levelId
```

### Cercare CCNL
```http
GET /api/ccnl/search?q=turismo
```

### Confrontare due varianti
```http
GET /api/ccnl/compare/:ccnlId/:year1/:year2
```

**Risposta esempio:**
```json
{
  "variant1": { ... },
  "variant2": { ... },
  "differences": [
    {
      "level": "3°",
      "year1Salary": "1620.00",
      "year2Salary": "1665.00",
      "difference": 45,
      "differencePercent": "2.78"
    }
  ]
}
```

## Integrazione con JobOffer

Il modello `JobOffer` ora include:
- `ccnlVariantId`: Riferimento alla variante CCNL applicata
- `contractLevel`: Livello contrattuale (es. "3°", "4°")

Questo permette di:
1. Associare ogni offerta di lavoro a un CCNL specifico
2. Garantire trasparenza salariale
3. Verificare conformità contrattuale
4. Tracciare evoluzione contratti nel tempo

## Setup e Migrazione

### 1. Generare il client Prisma
```bash
cd backend
npm run db:generate
```

### 2. Applicare le migrazioni
```bash
npm run db:push
```

### 3. Popolare i dati CCNL
```bash
npm run db:seed
```

Questo comando creerà:
- 2 CCNL (Turismo, Pubblici Esercizi)
- 8 livelli per ogni CCNL
- 4 varianti (2025 e 2026 per entrambi)
- 64 record di dettagli salariali (8 livelli × 4 varianti × 2 CCNL)

## Dati di Esempio

### Retribuzioni CCNL Turismo 2025

| Livello | Retribuzione Mensile | Paga Oraria | Straordinario | Welfare Aziendale |
|---------|---------------------|-------------|---------------|-------------------|
| 1°      | €1,350.00           | €8.50       | €10.63        | €0                |
| 3°      | €1,620.00           | €10.15      | €12.69        | €200/anno         |
| 5°      | €2,050.00           | €12.85      | €16.06        | €500/anno         |
| Quadro  | €3,350.00           | €20.95      | €26.19        | €1,500/anno + Auto|

### Confronto 2025 vs 2026 (CCNL Turismo, Livello 3°)

| Anno | Retribuzione | Variazione |
|------|--------------|------------|
| 2025 | €1,620.00    | -          |
| 2026 | €1,665.00    | +2.78%     |

## Benefici del Sistema

1. **Trasparenza**: Retribuzioni e benefit chiaramente definiti
2. **Conformità**: Aderenza ai contratti collettivi nazionali
3. **Tracciabilità**: Storico delle variazioni contrattuali
4. **Flessibilità**: Supporto per multiple varianti e anni
5. **Analisi**: Possibilità di confrontare evoluzione salariale

## Roadmap Future

- [ ] Sistema di notifiche per rinnovi CCNL
- [ ] Calcolatore retribuzione automatico basato su ore/livello
- [ ] Export dati CCNL in formato PDF
- [ ] Integrazione con sistema di payroll
- [ ] Dashboard analytics per confronti multi-anno
- [ ] API per verificare conformità offerte di lavoro
