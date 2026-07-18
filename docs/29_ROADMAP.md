# 29 — ROADMAP · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Product Owner / CTO — Ingly Design
**Destinatari:** Tutto il team, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire la **roadmap** di INGLY Enterprise: fasi, milestone, priorità e criteri di rilascio. Traduce visione (doc 01) e requisiti (doc 02) in una sequenza eseguibile, rispettando YAGNI (si costruisce ciò che serve ora).

---

## Visione

Costruire per strati: prima fondamenta solide e compatibilità con Evershop, poi i domini che portano valore immediato (CRM, Media, Quoter), infine produzione, BI e automazioni. Ogni fase è rilasciabile e testabile (Feature Driven Development).

---

## Obiettivi

1. Sequenza di consegna a valore incrementale.
2. Milestone con criteri di uscita chiari.
3. Priorità guidate da valore/rischio, non da entusiasmo.
4. Allineamento a metriche North Star (doc 01).

---

## Principi di prioritizzazione

- **Valore per persona** (doc 01) prima di tutto.
- **Rischio/dipendenze**: sbloccare prima ciò che abilita il resto (fondamenta, eventi).
- **YAGNI**: niente feature speculative.
- **Compatibilità**: mai compromettere l'aggiornabilità Evershop.

---

## Fasi e milestone

### Fase 0 — Fondamenta (0–2 mesi)
**Obiettivo:** governance, architettura, scaffolding.
- Framework `/docs` completo (questo lavoro).
- Convenzioni moduli `modules/ingly/` + scaffold.
- CI base (lint/test/build), branching, PR template.
- **Exit:** docs approvati, scaffold pronto, CI verde.

### Fase 1 — CRM & Media (2–5 mesi)
**Obiettivo:** relazione cliente + asset.
- Modulo CRM (anagrafica, lead, pipeline) — doc 15.
- Media Library (upload, varianti, ricerca) — doc 12.
- RBAC + auth consolidati — doc 10/11.
- **Exit:** lead tracciati, media ottimizzati, permessi attivi.

### Fase 2 — Quoter & AI (5–9 mesi)
**Obiettivo:** preventivi rapidi e accurati.
- Laser Center (macchine/materiali/parametri) — doc 17.
- Quoter deterministico + PDF/email — doc 18.
- AI Assistant (parametri, testo) con astrazione provider — doc 19.
- **Exit:** time-to-quote < 5 min; preventivo → lead CRM.

### Fase 3 — Produzione (9–13 mesi)
**Obiettivo:** laboratorio digitale.
- Modulo Produzione (job, coda, stati, scheduling) — doc 16.
- Integrazione ordine → produzione → spedizione — doc 13.
- Notifiche cliente su avanzamento.
- **Exit:** ordine custom genera job automatico; stati tracciati.

### Fase 4 — BI & Automazioni (13–18 mesi)
**Obiettivo:** decisioni e automazione.
- Analytics/BI (read model, dashboard) — doc 21.
- Automazioni event-driven (no-code) — doc 20.
- Marketing (SEO, email, attribuzione) — doc 22.
- **Exit:** KPI in tempo quasi reale; automazioni attive; automation rate in crescita.

### Fase 5 — Estensibilità & Scala (18–36 mesi)
**Obiettivo:** apertura e scala.
- Plugin System maturo + marketplace interno — doc 23.
- Estrazione microservizi ad alto carico — doc 03.
- Portale B2B / integrazioni esterne — doc 37.
- **Exit:** plugin di terze parti; scala orizzontale.

---

## Diagramma testuale — Timeline

```
Mese:  0───2────5────────9────────13────────18──────────────────36
Fase:  [F0 Fond.][F1 CRM/Media][F2 Quoter/AI][F3 Prod.][F4 BI/Autom.][F5 Estens./Scala]
Valore:  base      relazione     preventivi   lab digit.  insight/auto   ecosistema
```

---

## Criteri di rilascio (Definition of Done per milestone)

- Requisiti (`FR/NFR`) soddisfatti e verificati.
- Test (unit/integration/E2E) verdi; coverage moduli critici ≥ 80%.
- Documentazione `/docs` aggiornata.
- Sicurezza e performance verificate (doc 24/25).
- Compatibilità Evershop confermata (regressione, doc 26).

---

## Best Practice

- Rivedere la roadmap ad ogni fine fase con dati reali.
- Non anticipare fasi successive (YAGNI).
- Ogni milestone rilasciabile in autonomia.
- Tracciare metriche North Star per validare il valore.

---

## Checklist di fase

- [ ] Obiettivo di fase chiaro e misurabile.
- [ ] Requisiti collegati (doc 02).
- [ ] Dipendenze sbloccate.
- [ ] Criteri di uscita definiti.
- [ ] Test e documentazione previsti.
- [ ] Compatibilità Evershop verificata.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Scope creep | YAGNI, criteri di uscita, revisione fine fase |
| Dipendenze bloccanti | Sequenziamento per rischio |
| Ritardi a cascata | Milestone indipendenti e rilasciabili |
| Deriva dal valore | Metriche North Star |

---

## Estensioni future (backlog strategico)

Vedi `37_FUTURE_MODULES.md`: portale B2B, marketplace esterni, sostenibilità, forecasting ML, telefonia/WhatsApp, IoT macchine.

---

## Compatibilità con Evershop

Ogni fase mantiene la disciplina di non-modifica del core: prima si consolida la compatibilità (F0), poi si costruisce sopra. Gli upgrade upstream sono gestiti tra le fasi con analisi di impatto.

## Compatibilità con aggiornamenti futuri

La roadmap prevede finestre di assorbimento degli upgrade Evershop (regressione + staging) tra le fasi, così l'evoluzione del core non blocca quella di Ingly.

---

## See also
- [01 Project Vision](01_PROJECT_VISION.md)
- [02 Product Requirements](02_PRODUCT_REQUIREMENTS.md)
- [36 Release Process](36_RELEASE_PROCESS.md)
- [37 Future Modules](37_FUTURE_MODULES.md)
