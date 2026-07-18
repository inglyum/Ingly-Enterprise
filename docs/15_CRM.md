# 15 — CRM · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** CRM Domain Owner — Ingly Design
**Destinatari:** Backend, Frontend, Commerciale, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Progettare il modulo **CRM** (Customer Relationship Management): gestione clienti (B2C/B2B), lead, interazioni, pipeline di vendita e comunicazioni. Collega ordini e preventivi al profilo cliente, alimentando marketing e analytics.

---

## Visione

Un unico luogo dove vive la relazione con il cliente: dalla prima richiesta di preventivo (lead) all'ordine ricorrente. Il CRM ascolta gli eventi della piattaforma (ordini, preventivi) e arricchisce il profilo, dando al commerciale una vista completa.

---

## Obiettivi

1. Anagrafica unificata clienti e lead.
2. Tracciamento interazioni e comunicazioni.
3. Pipeline di vendita con stati configurabili.
4. Collegamento a ordini (doc 13) e preventivi (doc 18).
5. Base per marketing (doc 22) e automazioni (doc 20).

---

## Bounded Context

Modulo `modules/ingly/crm/`. Entità principali:

- **Customer**: profilo cliente (estende/riferisce il customer core Evershop).
- **Lead**: contatto potenziale (da configuratore/preventivo/form).
- **Interaction**: nota, chiamata, email, evento.
- **Pipeline/Stage**: fasi della trattativa.
- **Segment/Tag**: classificazione per marketing.

Tabelle: `ingly_crm_customer`, `ingly_crm_lead`, `ingly_crm_interaction`, `ingly_crm_pipeline`, `ingly_crm_stage`.

> Relazione con il customer core: il CRM **riferisce** l'anagrafica core (via UUID/FK) e aggiunge dati relazionali, senza duplicare né modificare le tabelle core.

---

## Lead management

```
Fonte lead
  ├─ Richiesta preventivo (doc 18)  ─ emit("QuoteRequested")
  ├─ Configuratore storefront (doc 07)
  ├─ Form contatti / newsletter (doc 22)
  └─ Import manuale
        │
        ▼
  Creazione/aggiornamento Lead (dedup per email)
        │
        ▼
  Assegnazione (owner) ─► Pipeline (stage) ─► Conversione in Customer/Order
```

Deduplica per email/telefono per evitare lead doppi.

---

## Pipeline di vendita

- Pipeline configurabili con stage (es. Nuovo → Qualificato → Preventivo → Vinto/Perso).
- Ogni lead/opportunità ha owner, valore stimato, prossima azione.
- Vista Kanban nell'Admin (doc 06).

---

## Integrazione event-driven

Il CRM è principalmente un **consumatore** di eventi:

```
OrderPlaced (doc 13)      ─► aggiorna storico cliente, LTV, apre attività
QuoteRequested (doc 18)   ─► crea/aggiorna lead
QuoteAccepted (doc 18)    ─► avanza pipeline
ProductionCompleted (16)  ─► notifica cliente / follow-up
```

E **produttore** di eventi per marketing/automazioni:

```
LeadCreated, LeadStageChanged, CustomerSegmented ─► Automazioni (doc 20), Marketing (doc 22)
```

---

## Comunicazioni

- Storico comunicazioni per cliente (email inviate, note).
- Invio email transazionali/marketing tramite servizi email (estensioni `resend`/`sendgrid`).
- Consensi e preferenze di contatto (GDPR, doc 24).

---

## Diagramma testuale — Vista 360° cliente

```
                 ┌──────────── CLIENTE (CRM) ────────────┐
                 │  profilo · segmenti · consensi         │
                 └───▲────────▲──────────▲────────▲───────┘
                     │        │          │        │
                 Ordini   Preventivi  Interazioni  Comunicazioni
                 (doc13)   (doc18)     (note/call)  (email)
```

---

## Best Practice

- Il CRM riferisce il customer core, non lo duplica.
- Reagire agli eventi in modo idempotente.
- Deduplica lead per evitare rumore.
- Rispettare consensi/GDPR su ogni comunicazione.
- Permessi RBAC con scope ("solo i miei clienti" — doc 11).

---

## Checklist CRM

- [ ] Lead deduplicati (email/telefono).
- [ ] Eventi ordine/preventivo consumati e riflessi nel profilo.
- [ ] Pipeline/stage con owner e prossima azione.
- [ ] Consensi/preferenze contatto tracciati (GDPR).
- [ ] Permessi/scope RBAC applicati.
- [ ] Comunicazioni storicizzate.

---

## Roadmap

1. Anagrafica + lead + interazioni.
2. Pipeline Kanban + assegnazione.
3. Consumo eventi ordini/preventivi.
4. Comunicazioni email + consensi.
5. Segmentazione per marketing.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Duplicazione dati customer | Riferimento al core, non copia |
| Lead duplicati | Deduplica |
| Violazione consensi | Gestione GDPR, preferenze |
| Eventi elaborati due volte | Idempotenza subscriber |

---

## Estensioni future

- Scoring lead con AI (doc 19).
- Integrazione telefonia/WhatsApp.
- Portale cliente B2B self-service.

---

## Compatibilità con Evershop

Il CRM riferisce il modulo `customer` core via UUID/FK e consuma gli eventi ordine del core, senza modificarlo. È un modulo Ingly additivo con proprie tabelle prefissate.

## Compatibilità con aggiornamenti futuri

Il disaccoppiamento via eventi e riferimenti (non copie) rende il CRM resiliente agli upgrade del core customer/oms. Verificare i nomi/eventi consumati dopo ogni upgrade.

---

## See also
- [13 Ecommerce](13_ECOMMERCE.md)
- [18 Quoter](18_QUOTER.md)
- [20 Automations](20_AUTOMATIONS.md)
- [22 Marketing](22_MARKETING.md)
