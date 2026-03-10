# Consulting OS — Restaurant Transformation System

Sistema operativo riutilizzabile per la trasformazione di ristoranti indipendenti.

Costruito secondo il **BMAD Method v6** come modulo operativo del progetto Ristorazione Pro League.

---

## Struttura del modulo

```
consulting-os/
├── docs/                    # Documentazione di sistema e metodo
├── playbooks/               # Playbook operativi per ogni transizione di stadio RPL
├── templates/               # Template riutilizzabili per ogni fase
├── clients/                 # Un cartella per ogni cliente ristorante
│   └── _CLIENT-TEMPLATE/    # Template struttura cliente (da copiare)
├── ops/                     # Procedure operative interne
├── automation/              # Automazioni e script
├── kpi/                     # Framework KPI e dashboard
├── marketing/               # Materiali marketing riutilizzabili
└── prompts/                 # Libreria prompt AI per il lavoro consulenziale
```

---

## Le 7 fasi del metodo di trasformazione

| # | Fase | Output principale |
|---|------|------------------|
| 1 | Audit | Report diagnostico completo |
| 2 | Operating Systems | SOP, mansionari, checklist |
| 3 | Menu & Profitabilità | Analisi menu, prezzi, margini |
| 4 | Team | Organigramma, mansionari, formazione |
| 5 | Marketing | Playbook, piano editoriale, CRM |
| 6 | Automazioni | Flussi automatici, integrazioni |
| 7 | KPI & Data Loop | Dashboard, reportistica, ciclo dati |

---

## Come iniziare con un nuovo cliente

1. Copia `clients/_CLIENT-TEMPLATE/` → `clients/NOME-RISTORANTE/`
2. Completa `clients/NOME-RISTORANTE/00-dashboard/README.md`
3. Parti dall'audit (cartella `01-audit/`)
4. Segui l'ordine delle fasi 1→7
5. Usa i template in `templates/` per ogni deliverable

Vedi: `docs/client-onboarding-workflow.md`

---

## Documentazione di riferimento

- [Project Overview](docs/project-overview.md)
- [Service Modules](docs/service-modules.md)
- [Repo Architecture](docs/repo-architecture.md)
- [BMAD Workflow](docs/bmad-workflow.md)
- [Client Onboarding](docs/client-onboarding-workflow.md)
- [Template System](docs/template-system.md)
- [Module Map](docs/module-map.md)
- [Implementation Phases](docs/implementation-phases.md)

## Playbook

| Playbook | Transizione | Descrizione |
|----------|------------|-------------|
| [`playbooks/pre-rpl-to-lite-playbook.md`](playbooks/pre-rpl-to-lite-playbook.md) | Pre-RPL → RPL Lite | Guida pratica 90 giorni per portare un ristorante all'idoneità RPL Lite |
