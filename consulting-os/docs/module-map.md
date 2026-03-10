# Module Map — Mappa dei moduli

## Separazione riutilizzabile vs cliente-specifico

| Componente | Riutilizzabile | Cliente-specifico |
|-----------|---------------|------------------|
| Metodo (7 fasi) | ✅ Sempre uguale | — |
| Template documenti | ✅ Master in `templates/` | Copia in `clients/NOME/` |
| SOP generiche | ✅ Come template | Personalizzate per cliente |
| Checklist | ✅ Come template | Adattate al ristorante |
| Dati audit | — | ✅ Solo del cliente |
| KPI storici | — | ✅ Solo del cliente |
| Menu analizzato | — | ✅ Solo del cliente |
| Automazioni | ✅ Flusso generico | Setup specifico per cliente |
| Prompt AI | ✅ Libreria in `prompts/` | Dati cliente nei prompt |
| Case study | ✅ Template | Contenuto specifico |

---

## Mappa visiva dei moduli

```
CORE (non cambia mai)
├── Il metodo in 7 fasi
├── La struttura repo
└── Le naming conventions

RIUTILIZZABILE (migliora con ogni cliente)
├── templates/           → document templates
├── prompts/             → AI prompt library
├── automation/          → flow documentation
├── kpi/                 → KPI framework
├── marketing/           → marketing assets
└── ops/                 → internal procedures

CLIENTE-SPECIFICO (creato per ogni cliente)
└── clients/NOME/
    ├── 00-dashboard    → stato progetto
    ├── 01-audit        → diagnosi specifica
    ├── 02-ops          → SOP personalizzate
    ├── 03-menu         → analisi menu reale
    ├── 04-team         → organigramma e mansionari
    ├── 05-marketing    → piano marketing
    ├── 06-automations  → automazioni attive
    ├── 07-kpi          → dati KPI storici
    ├── 08-events       → eventi realizzati
    └── 09-archive      → materiali archiviati
```

---

## Convenzioni di naming

### Cartelle
- `kebab-case` minuscolo per tutto
- Prefisso numerico `00-`, `01-` per ordinare le fasi cliente
- Prefisso `_` per template e file speciali (`_CLIENT-TEMPLATE`)

### File
- `kebab-case.md` per documenti
- `template.md` come nome standard per i template
- `README.md` come punto di ingresso di ogni cartella

### Clienti
- `NOME-RISTORANTE` in maiuscolo con trattino
- Esempi: `OSTERIA-DA-MARIO`, `PIZZERIA-NAPOLI-2`, `BAR-CENTRALE`

---

## Flusso di un deliverable

```
1. Consulente identifica il bisogno
        ↓
2. Apre il template da templates/
        ↓
3. Crea il file in clients/NOME/0X-fase/
        ↓
4. Popola con dati reali (manuale o AI-assisted)
        ↓
5. Revisione interna
        ↓
6. Presentazione al cliente
        ↓
7. Aggiustamenti post-feedback
        ↓
8. File definitivo in cartella cliente
        ↓
9. (Opzionale) Aggiornamento template se ha imparato qualcosa
```

---

## Quando creare un nuovo template

Crea un nuovo template quando:
- Hai prodotto lo stesso tipo di documento per 2+ clienti
- Il documento è strutturalmente uguale ma cambia nei dati
- Prevedi di usarlo regolarmente

Non creare un template quando:
- È specifico per quel cliente
- Lo farai una volta sola
- La struttura cambia completamente ogni volta
