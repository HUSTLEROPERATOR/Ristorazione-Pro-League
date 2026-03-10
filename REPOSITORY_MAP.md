# RPL Repository Map

> Generato con **BMAD Method v6** — Workflow: Greenfield Documentation System

---

## ACTIVE AGENTS

| Agente | Ruolo | Stato |
|--------|-------|-------|
| `bmad-product-analyst` | Definizione core operativo e valore del prodotto | ✅ Completato |
| `bmad-system-architect` | Lifecycle ristorante e modello di entrata RPL Lite | ✅ Completato |
| `bmad-repository-architect` | Struttura e mappa del repository | ✅ Completato |
| `bmad-documentation-engineer` | Consolidamento e pulizia documentazione | ✅ Completato |
| `bmad-operational-designer` | Posizionamento modulo consulting come supporto | ✅ Completato |

---

## ACTIVE WORKFLOW

**Greenfield Documentation System**

Sequenza di esecuzione:

```
bmad-product-analyst
        ↓
bmad-system-architect
        ↓
bmad-repository-architect
        ↓
bmad-documentation-engineer
        ↓
bmad-operational-designer
```

Obiettivo: definire un sistema operativo pratico per RPL prima di qualsiasi sviluppo software.

---

## REPOSITORY MAP

### Struttura ad alto livello

```
Ristorazione-Pro-League/
│
├── REPOSITORY_MAP.md              ← Questo file. BMAD output + mappa navigazione
├── README.md                      ← Punto di ingresso principale del progetto
├── ROADMAP.md                     ← Roadmap evolutiva (Sprint 0→3 e oltre)
│
├── docs/                          ← Sistema documentale principale RPL
│   ├── Indice.md                  ← Indice navigabile di tutti i documenti
│   ├── RPL_OPERATIONAL_CORE.md    ← [NUOVO] Core operativo reale di RPL
│   ├── RESTAURANT_LIFECYCLE.md    ← [NUOVO] Ciclo di vita ristorante + RPL Lite
│   ├── RPL_SCORING_MODEL.md       ← [NUOVO] Modello di punteggio: aree, pesi, soglie
│   ├── RPL_AUDIT_PROCESS.md       ← [NUOVO] Procedura operativa di audit sul campo
│   ├── 01_Introduzione_e_Visione.md
│   ├── 02_Piano_di_Fattibilita.md
│   ├── 03_Architettura_Tecnica.md
│   ├── 04_Progetto_Pilota_Sardegna.md
│   ├── 05_Piano_B_RPL_Lite.md
│   ├── 06_Sviluppi_Futuri_e_Moduli_Avanzati.md
│   ├── 00_RPL_Strategic_Update_2025.md
│   ├── DATI_STATISTICI_RISTORAZIONE_2025.md
│   └── Regolamento_Generale/      ← Regolamento e governance RPL
│
├── consulting-os/                 ← Modulo supporto: trasformazione ristoranti
│   ├── README.md                  ← Punto di ingresso modulo consulting
│   ├── docs/                      ← Metodo, workflow, architettura
│   ├── templates/                 ← 11 template riutilizzabili
│   ├── clients/                   ← Un folder per ogni cliente ristorante
│   ├── ops/                       ← Processi operativi interni consulente
│   ├── automation/                ← Flussi automatici
│   ├── kpi/                       ← Framework KPI
│   ├── marketing/                 ← Materiali marketing consulenza
│   └── prompts/                   ← Libreria prompt AI
│
├── templates/                     ← Template contratto e checklist RPL
│   ├── Checklist_Adesione_RPL.md
│   ├── Modello_Contratto_Etico.md
│   └── Piano_Sostenibilita_Base.md
│
└── backend/                       ← Infrastruttura tecnica (fase futura)
    ├── src/                       ← Codice sorgente TypeScript/Express
    └── prisma/                    ← Schema database
```

---

### Gerarchia documentale per priorità operativa

| Priorità | File | Descrizione |
|----------|------|-------------|
| 🔴 Core | `docs/RPL_OPERATIONAL_CORE.md` | Cosa è RPL, come funziona, chi serve |
| 🔴 Core | `docs/RESTAURANT_LIFECYCLE.md` | Ciclo di vita ristorante e modelli di entrata |
| 🔴 Core | `docs/RPL_SCORING_MODEL.md` | Modello di punteggio: aree, pesi, soglie Lite/Standard/Excellence |
| 🔴 Core | `docs/RPL_AUDIT_PROCESS.md` | Procedura operativa di audit: fasi, evidenze, output |
| 🟡 Strategico | `docs/01_Introduzione_e_Visione.md` | Visione e obiettivi fondatori |
| 🟡 Strategico | `docs/05_Piano_B_RPL_Lite.md` | Modello entry-level RPL Lite |
| 🟡 Strategico | `docs/04_Progetto_Pilota_Sardegna.md` | Pilot regionale |
| 🟢 Operativo | `consulting-os/` | Sistema di supporto trasformazione |
| 🟢 Operativo | `templates/` | Template contratti e checklist |
| 🔵 Tecnico | `backend/` | Infrastruttura software (futuro) |
| 🔵 Tecnico | `docs/03_Architettura_Tecnica.md` | Stack tecnico previsto |

---

### Decisioni di consolidamento BMAD

I seguenti file sono stati identificati come con sovrapposizioni concettuali:

| File | Stato | Note |
|------|-------|------|
| `docs/02_Analisi_Settore_Approfondimenti.md` | Mantenuto | Integra `DATI_STATISTICI_RISTORAZIONE_2025.md` |
| `docs/02_Regolamento_Generale/04_Premi_e_Riconoscimenti.md` | Duplicato | Stessa versione in `docs/Regolamento_Generale/04_Premi_e_Riconoscimenti.md` |
| `DATI_STATISTICI_ISTRUZIONE_ALBERGHIERA_2025.md` (root) | Archiviare | Spostate in `docs/` |
| `BUILD_PUBLIC_POST.md` | Log storico | Mantenuto come cronaca pubblica |
| `RPL_Web_App_Project_Structure.md` | Governance tecnica | Mantenuto come riferimento governance |

---

### Dipendenze tra documenti

```
RPL_OPERATIONAL_CORE.md
        ↓ definisce il sistema
RESTAURANT_LIFECYCLE.md
        ↓ specifica il percorso
RPL_SCORING_MODEL.md            → traduce il percorso in punteggi verificabili
RPL_AUDIT_PROCESS.md            → applica il modello sul campo con procedura riproducibile
05_Piano_B_RPL_Lite.md          → entry model dettagliato
04_Progetto_Pilota_Sardegna.md  → applicazione pratica
        ↓ supporto attivo
consulting-os/                  → trasformazione operativa per ristorante
        ↓ infrastruttura futura
backend/                        → piattaforma digitale
```
