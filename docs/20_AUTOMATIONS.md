# 20 — AUTOMATIONS · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Platform Architect — Ingly Design
**Destinatari:** Backend, Operations, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Progettare il motore di **Automazioni**: workflow event-driven che collegano **trigger** (eventi di dominio, schedule, condizioni) ad **azioni** (email, aggiornamenti, task, chiamate API). Elimina il lavoro ripetitivo cross-dominio (ordine → produzione → notifica → follow-up).

---

## Visione

Il collante operativo della piattaforma: quando succede qualcosa (un ordine, un preventivo scaduto, uno stato produzione), le cose giuste accadono automaticamente, in modo configurabile dall'utente, senza codice. Basato sull'event bus di Evershop.

---

## Obiettivi

1. Definire automazioni come regole trigger → condizioni → azioni.
2. Sfruttare gli eventi di dominio esistenti (EDA).
3. Configurabilità no-code per gli operatori.
4. Affidabilità (retry, idempotenza, audit dei run).
5. Estensibilità (nuovi trigger/azioni via plugin, doc 23).

---

## Bounded Context

Modulo `modules/ingly/automation/`. Entità principali:

- **AutomationRule**: regola (trigger, condizioni, azioni, stato attivo).
- **Trigger**: evento di dominio, schedule (cron), o condizione.
- **Action**: operazione (invia email, cambia stato, crea task, chiama API, notifica).
- **AutomationRun**: esecuzione (input, esito, log) per audit e retry.

Tabelle: `ingly_automation_rule`, `ingly_automation_run`.

---

## Modello trigger → condizioni → azioni

```
TRIGGER (evento/schedule/condizione)
   │
   ▼  CONDIZIONI (filtri: es. valore ordine > X, cliente in segmento Y)
   │
   ▼  AZIONI (in sequenza, con gestione errori)
   ├─ invia email (resend/sendgrid)
   ├─ aggiorna entità (CRM stage, tag)
   ├─ crea task/notifica
   └─ chiama API/webhook esterno
```

### Tipi di trigger
- **Evento di dominio**: `OrderPlaced`, `QuoteExpired`, `ProductionStatusChanged`, `LeadCreated`.
- **Schedule**: cron (es. report giornaliero, solleciti).
- **Condizione**: valutazione periodica su dati (es. giacenza materiale sotto soglia).

---

## Registrazione ed esecuzione (Evershop)

- I trigger su eventi usano i **subscriber** Evershop (`subscribers/<event>/<handler>.ts`) e/o job schedulati (`registerJob` in `bootstrap.ts`).
- Le registrazioni avvengono **solo in `bootstrap.ts`** (registry locked dopo).
- Le azioni sono handler idempotenti; ogni run è tracciato in `AutomationRun`.

---

## Affidabilità

- **Idempotenza**: un evento elaborato due volte non produce effetti doppi (chiave di deduplica).
- **Retry** con backoff su azioni fallite (es. email provider down).
- **Dead-letter**: run falliti ripetutamente segnalati per intervento.
- **Audit**: input, azioni eseguite, esito, timestamp.

---

## Diagramma testuale — Esempio: preventivo scaduto

```
QuoteExpired (doc 18)
   │  condizione: nessun ordine collegato
   ▼
AZIONI:
   ├─ email follow-up al cliente (tono di voce, doc 04)
   ├─ CRM: crea task per il commerciale (doc 15)
   └─ Analytics: incrementa metrica "preventivi scaduti" (doc 21)
```

---

## Best Practice

- Automazioni configurabili, non hardcoded, dove possibile.
- Idempotenza su ogni azione; eventi consumati post-commit.
- Retry/backoff e dead-letter per resilienza.
- Audit completo dei run.
- Azioni pericolose (invii massivi) con limiti e conferma.

---

## Checklist automazione

- [ ] Trigger chiaro (evento/schedule/condizione).
- [ ] Condizioni esplicite.
- [ ] Azioni idempotenti con gestione errori.
- [ ] Registrazione in `bootstrap.ts` (subscriber/job).
- [ ] Retry/backoff + dead-letter.
- [ ] AutomationRun tracciato (audit).
- [ ] Limiti su azioni massive.
- [ ] Test su doppio evento e su fallimento azione.

---

## Roadmap

1. Motore regole + trigger su eventi core.
2. Azioni base (email, update, task).
3. Schedule (cron) + condizioni.
4. UI no-code per creare regole (Admin, doc 06).
5. Trigger/azioni estendibili via plugin (doc 23).

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Effetti doppi | Idempotenza, deduplica |
| Loop di automazioni | Guardie anti-loop, limiti |
| Invii massivi errati | Limiti, conferma, dry-run |
| Fallimenti silenziosi | Retry, dead-letter, audit/alert |

---

## Estensioni future

- Automazioni assistite/agenti AI supervisionati (doc 19).
- Editor visuale a nodi.
- Integrazioni esterne (Zapier-like) via connettori.

---

## Compatibilità con Evershop

Si basa su event bus, subscriber e job scheduler di Evershop, con registrazione in `bootstrap.ts`. Nessuna modifica al core; il motore è un modulo Ingly additivo.

## Compatibilità con aggiornamenti futuri

Poiché consuma eventi ufficiali, un upgrade del core non rompe le automazioni finché gli eventi restano stabili. Verificare i nomi evento e le API job/subscriber dopo ogni upgrade.

---

## See also
- [15 CRM](15_CRM.md)
- [16 Production](16_PRODUCTION.md)
- [18 Quoter](18_QUOTER.md)
- [23 Plugin System](23_PLUGIN_SYSTEM.md)
