# Restaurant Lifecycle — Ciclo di Vita del Ristorante in RPL

> Documento prodotto da `bmad-system-architect` nel workflow **Greenfield Documentation System**.

---

## Panoramica del ciclo

Ogni ristorante percorre un ciclo di vita all'interno dell'ecosistema RPL composto da quattro stadi progressivi. L'avanzamento è volontario e verificato. Non è mai forzatamente irreversibile: si può sempre progredire, e in caso di difficoltà è previsto un processo di recovery prima di qualsiasi declassamento.

```
[ Stadio 0 ]      [ Stadio 1 ]       [ Stadio 2 ]        [ Stadio 3 ]
Pre-RPL      →    RPL Lite       →   RPL Standard    →   RPL Excellence
(indipendente)    (entry model)      (full program)       (mentorship)
```

---

## Stadio 0 — Pre-RPL (Ristorante Indipendente)

**Profilo:** ristorante non ancora aderente, che opera autonomamente senza standard RPL.

**Caratteristiche tipiche:**
- Contratti di lavoro non sempre documentati o conformi
- Nessun sistema SOP formale
- Gestione basata sull'esperienza del titolare, non su dati
- Margini non controllati sistematicamente
- Formazione episodica o assente

**Punto di contatto con RPL:**
- Contatto iniziale tramite consulente, evento o campagna
- Audit diagnostico gratuito o a basso costo
- Presentazione del modello RPL Lite

---

## Stadio 1 — RPL Lite (Entry Model)

> RPL Lite è il **modello di entrata** progettato per abbattere la barriera di ingresso e rendere RPL accessibile anche ai ristoranti più piccoli e tradizionali.

**Requisiti minimi di adesione:**

| Requisito | Standard minimo |
|-----------|----------------|
| Contratti personale | 100% regolari e documentati |
| Formazione staff | Almeno 20 ore/anno per addetto |
| Piano sprechi | Almeno un'azione attiva (doggy bag, menu stagionale) |
| Self-assessment | Compilazione checklist RPL-Lite una volta all'anno |
| Fee di adesione | Simbolica o periodo prova gratuito (6 mesi) |

**Cosa riceve il ristorante:**
- Label "RPL-Lite" da esporre ai clienti
- Accesso al portale base con profilo pubblico
- Kit di formazione iniziale (template SOP, checklist)
- Supporto consulenziale semplificato
- Rete di peer learning con altri ristoranti RPL-Lite

**Durata tipica in Stadio 1:** 6–18 mesi

**Trigger di avanzamento allo Stadio 2:**
- Completamento audit leggero con esito positivo
- Almeno 12 mesi di partecipazione attiva
- Dimostrazione di miglioramento su almeno 3 KPI
- Richiesta volontaria del ristorante

---

## Stadio 2 — RPL Standard (Full Program)

**Profilo:** ristorante che ha superato i requisiti base e aderisce al programma completo.

**Requisiti aggiuntivi rispetto a RPL Lite:**

| Area | Standard richiesto |
|------|-------------------|
| Sistema operativo | SOP documentate per i processi principali |
| Menu | Analisi food cost e ingegnerizzazione menu completata |
| Team | Mansionari scritti, processo di onboarding formale |
| Marketing | Piano editoriale attivo, gestione Google Business |
| KPI | Dashboard dati aggiornata mensilmente |
| Audit | Audit esterno annuale da valutatore accreditato RPL |

**Cosa riceve il ristorante:**
- Badge "RPL Verified" con punteggio pubblico
- Partecipazione al sistema di leghe e classifiche
- Accesso al mercato dei lavoratori (Draft e Trasferimenti)
- Visibilità premium sul portale RPL
- Accesso a sponsor e partnership RPL
- Report benchmark rispetto ad altri ristoranti della stessa lega

**Durata tipica in Stadio 2:** Permanente con revisione annuale

**Trigger di avanzamento allo Stadio 3:**
- Punteggio RPL ≥ 85/100 per due anni consecutivi
- Zero violazioni del codice etico
- Contributo attivo alla community (mentoring, eventi, case study)

---

## Stadio 3 — RPL Excellence

**Profilo:** ristorante d'eccellenza che funge da riferimento per l'intero ecosistema.

**Riconoscimenti:**
- Trofeo "RPL Excellence Award" (annuale)
- Ruolo di mentor per ristoranti in Stadio 1
- Co-creazione di standard e best practice RPL
- Visibilità mediatica e istituzionale

**Obblighi aggiuntivi:**
- Partecipazione attiva a eventi RPL (almeno 2/anno)
- Accoglienza di almeno un ristorante Lite in percorso di mentorship
- Pubblicazione di almeno un case study documentato/anno

---

## Recovery Path — Gestione del declassamento

Se un ristorante non mantiene i requisiti del proprio stadio:

```
[ Warning ] → [ Piano di Recovery 90 giorni ] → [ Audit Straordinario ]
                                                         ↓
                                              Superato: mantiene stadio
                                              Non superato: declassamento
                                              allo stadio precedente
```

Il declassamento non è una sanzione definitiva: il ristorante può re-avanzare appena soddisfa nuovamente i requisiti.

---

## Ruolo del consulting-os nel lifecycle

Il modulo `consulting-os/` è il **supporto operativo** per accompagnare il ristorante attraverso il lifecycle:

| Fase consulting | Stadio RPL supportato |
|----------------|----------------------|
| Audit diagnostico | Pre-RPL → RPL Lite |
| Operating Systems (SOP, checklist) | RPL Lite → Standard |
| Menu & Profitabilità | RPL Lite → Standard |
| Team (mansionari, formazione) | RPL Lite → Standard |
| Marketing (playbook, CRM) | RPL Standard |
| Automazioni | RPL Standard → Excellence |
| KPI & Data Loop | RPL Standard → Excellence |

Il consulente che applica il metodo `consulting-os/` guida il ristorante attraverso le 7 fasi operative, portandolo dall'Audit (Stadio 0) fino al pieno ingresso nello Stadio 2.

---

## Documenti correlati

- `docs/RPL_OPERATIONAL_CORE.md` — Visione d'insieme del sistema RPL
- `docs/RPL_SCORING_MODEL.md` — Modello di punteggio: come si traducono gli stadi del lifecycle in soglie numeriche verificabili
- `docs/05_Piano_B_RPL_Lite.md` — Specifica dettagliata del modello RPL Lite
- `consulting-os/docs/service-modules.md` — Le 7 fasi del metodo di trasformazione
- `docs/Regolamento_Generale/06_Sistema_di_Auditing.md` — Processo di audit ufficiale
- `docs/04_Progetto_Pilota_Sardegna.md` — Applicazione pratica del lifecycle in Sardegna
