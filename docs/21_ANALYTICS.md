# 21 — ANALYTICS & BUSINESS INTELLIGENCE · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Data / BI Architect — Ingly Design
**Destinatari:** Backend, Management, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Progettare il modulo **Analytics/BI**: raccolta di metriche, KPI e dashboard per decisioni data-driven su vendite, produzione, preventivi, marketing e operations. Usa un approccio **CQRS light**: read model dedicati, aggiornati via eventi, separati dalle tabelle transazionali.

---

## Visione

Numeri affidabili in tempo quasi reale, senza appesantire le operazioni. Ogni dominio pubblica eventi; l'Analytics li proietta in modelli di lettura ottimizzati per dashboard e report. Il management vede la salute dell'azienda a colpo d'occhio.

---

## Obiettivi

1. KPI configurabili in tempo quasi reale.
2. Separare letture analitiche dalle scritture transazionali (CQRS light).
3. Dashboard per ruolo (doc 06/11).
4. Report esportabili (CSV/PDF/xlsx).
5. Base per insight AI (doc 19).

---

## Bounded Context

Modulo `modules/ingly/analytics/`. Componenti:

- **Read model**: tabelle/materialized view denormalizzate (`ingly_analytics_read_*`).
- **Projector**: subscriber che aggiornano i read model dagli eventi.
- **KPI/Metric**: definizioni di metriche calcolabili.
- **Dashboard/Widget**: composizioni di KPI per ruolo.

---

## CQRS light

```
SCRITTURA (domini)                LETTURA (analytics)
Order/Quote/ProductionJob  ──emit──►  Projector  ──►  Read model (denormalizzato)
(tabelle transazionali)      eventi                    ingly_analytics_read_*
                                                              │
                                                              ▼
                                                    Dashboard / Report / API
```

- I read model sono **eventualmente consistenti**: aggiornati dagli eventi, tollerano un piccolo ritardo.
- Ricostruibili dagli eventi (replay) in caso di necessità.
- Non si fanno query analitiche pesanti sulle tabelle transazionali (protegge le performance operative).

---

## KPI principali (baseline)

| Area | KPI |
|------|-----|
| Vendite | fatturato, ordini, AOV, conversione |
| Preventivi | time-to-quote, tasso accettazione, valore pipeline |
| Produzione | lead time, throughput, job in ritardo, utilizzo macchine |
| Materiali | consumo, giacenza, costo |
| Marketing | traffico, lead, CAC, sorgenti |
| Operations | SLA, code, automazioni eseguite |

Le metriche North Star sono in `01_PROJECT_VISION.md`.

---

## Dashboard e report

- Dashboard per ruolo con widget (doc 06); rispetto permessi (doc 11).
- Filtri temporali e per dimensione (prodotto, materiale, canale).
- Export report (CSV/xlsx/PDF) per amministrazione.
- Aggiornamento tempo quasi reale (read model) + snapshot storici.

---

## Diagramma testuale — Dal fatto al KPI

```
Evento dominio ─► Projector (subscriber) ─► Read model
                                              │
                     ┌────────────────────────┼───────────────────┐
                     ▼                        ▼                    ▼
                 Dashboard              Report export         Insight AI (doc 19)
                 (Admin, doc 06)        (CSV/xlsx/PDF)        (spiegazione/anomalie)
```

---

## Best Practice

- Query analitiche solo sui read model, mai sulle transazionali.
- Projector idempotenti; read model ricostruibili (replay).
- Definizioni KPI centralizzate e documentate (una sola verità per "fatturato").
- Rispettare permessi/scope sui dati sensibili.
- Snapshot storici per confronti nel tempo.

---

## Checklist Analytics

- [ ] Read model dedicato (`ingly_analytics_read_*`).
- [ ] Projector idempotente collegato agli eventi.
- [ ] KPI definito una sola volta e documentato.
- [ ] Dashboard rispetta permessi/scope.
- [ ] Export report disponibile dove richiesto.
- [ ] Replay/ricostruzione read model testati.
- [ ] Nessuna query pesante su tabelle transazionali.

---

## Roadmap

1. Read model + projector per vendite/preventivi.
2. Dashboard base per ruolo.
3. Produzione/materiali KPI.
4. Export report + snapshot storici.
5. Insight/anomalie con AI (doc 19).

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Metriche incoerenti | Definizioni centralizzate |
| Read model disallineato | Idempotenza, replay, monitoraggio lag |
| Impatto su performance operative | CQRS: letture separate |
| Dati sensibili esposti | Permessi/scope, anonimizzazione |

---

## Estensioni future

- Data warehouse/BigQuery per analisi avanzate.
- Forecasting e anomaly detection (ML).
- Attribuzione marketing multi-touch (doc 22).

---

## Compatibilità con Evershop

Consuma gli eventi di dominio del core e dei moduli Ingly. I read model sono tabelle Ingly additive. Nessuna modifica al core; projector registrati come subscriber in `bootstrap.ts`.

## Compatibilità con aggiornamenti futuri

I read model sono ricostruibili dagli eventi; un upgrade del core che aggiunge/modifica eventi richiede aggiornare i projector. La separazione CQRS protegge le operazioni durante le migrazioni.

---

## See also
- [01 Project Vision](01_PROJECT_VISION.md)
- [06 Admin Panel](06_ADMIN_PANEL.md)
- [19 AI Assistant](19_AI_ASSISTANT.md)
- [25 Performance](25_PERFORMANCE.md)
