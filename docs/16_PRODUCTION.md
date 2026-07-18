# 16 — PRODUCTION · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Production Domain Owner — Ingly Design
**Destinatari:** Backend, Produzione, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Progettare il modulo **Produzione**: trasformazione degli ordini in **ordini di produzione**, gestione della coda di lavoro del laboratorio, scheduling, avanzamento e collegamento a materiali e macchine (Laser Center, doc 17). È il cuore operativo del laboratorio Ingly.

---

## Visione

Ogni ordine con lavorazione custom genera automaticamente un ordine di produzione tracciabile dall'accettazione alla consegna. Il responsabile produzione pianifica; l'operatore esegue con parametri chiari; il cliente vede lo stato. Zero fogli Excel.

---

## Obiettivi

1. Generare ordini di produzione dagli ordini ecommerce (evento).
2. Gestire coda di lavoro e scheduling per macchina/operatore.
3. Tracciare avanzamento con stati e tempi.
4. Collegare materiali e parametri macchina (doc 17).
5. Notificare CRM/cliente sugli avanzamenti.

---

## Bounded Context

Modulo `modules/ingly/production/`. Entità principali:

- **ProductionJob**: ordine di produzione (da un ordine/linea ordine).
- **ProductionStep**: fase di lavorazione (taglio, incisione, finitura, controllo qualità).
- **WorkQueue**: coda ordinata per priorità/scadenza.
- **Assignment**: assegnazione a macchina/operatore.

Tabelle: `ingly_production_job`, `ingly_production_step`, `ingly_production_assignment`.

---

## Stati del job (macchina a stati)

```
CREATED ─► PLANNED ─► IN_PROGRESS ─► QUALITY_CHECK ─► COMPLETED ─► SHIPPED
   │           │            │              │
   └──────► ON_HOLD ◄───────┴──────────────┘   (materiale mancante, revisione)
                 │
               CANCELLED
```

Ogni transizione è validata (invarianti di dominio) e registra timestamp/operatore per l'audit.

---

## Integrazione event-driven

```
OrderPlaced (doc 13)
   └─ [Produzione] crea ProductionJob (se linea custom/laser)
        │
        ▼
   Pianificazione (scheduling) su macchina/operatore (doc 17)
        │
   avanzamento stati ─► emit("ProductionStatusChanged")
        ├─ CRM (doc 15): follow-up/notifiche
        ├─ Analytics (doc 21): lead time, throughput
        └─ Automazioni (doc 20): email cliente
        ▼
   ProductionCompleted ─► OMS/spedizione (doc 13)
```

I subscriber sono idempotenti; gli eventi si emettono dopo commit (o via outbox futura).

---

## Scheduling

- Coda ordinata per **priorità** e **data di consegna promessa**.
- Vincoli: disponibilità macchina (doc 17), materiale (doc 17), capacità operatore.
- Vista **Kanban** in Admin (doc 06) per stato; vista calendario per pianificazione.
- Ricalcolo capacità quando cambiano ordini/priorità.

---

## Materiali e capacità

- Il job dichiara i **materiali** necessari (da Laser Center, doc 17).
- Disponibilità materiale verificata prima di `PLANNED`; altrimenti `ON_HOLD`.
- Consumo materiale registrato per costi/inventario e per il Quoter (feedback prezzi reali).

---

## Diagramma testuale — Coda di lavoro

```
[ CREATED ][ PLANNED ][ IN_PROGRESS ][ QC ][ COMPLETED ]
     │          │            │
  priorità   materiale    macchina/operatore (doc 17)
  scadenza   disponibile   assegnati
```

---

## Best Practice

- Transizioni di stato solo tramite service di dominio (invarianti protetti).
- Audit di ogni cambio stato (chi/quando).
- Verifica materiale/capacità prima di pianificare.
- Idempotenza dei subscriber; eventi post-commit.
- Notifiche cliente coerenti con CRM (doc 15).

---

## Checklist produzione

- [ ] Job creato dall'evento OrderPlaced per linee custom.
- [ ] Stati gestiti con transizioni validate e audit.
- [ ] Materiali/capacità verificati prima di PLANNED.
- [ ] Assegnazione macchina/operatore (doc 17).
- [ ] Eventi di avanzamento emessi (CRM/Analytics/Automazioni).
- [ ] Consumo materiale registrato.
- [ ] Test integrazione ordine → job → spedizione.

---

## Roadmap

1. Job + stati + coda base.
2. Scheduling con vincoli macchina/materiale.
3. Kanban Admin + notifiche cliente.
4. Consumo materiali + feedback costi al Quoter.
5. Capacity planning avanzato.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Stato incoerente | Transizioni via service, invarianti |
| Pianificazione senza materiale | Verifica pre-PLANNED, stato ON_HOLD |
| Doppia creazione job | Idempotenza subscriber |
| Ritardi non tracciati | Audit tempi, lead time in Analytics |

---

## Estensioni future

- Integrazione IoT macchine (stato reale, telemetria).
- Ottimizzazione automatica scheduling (AI, doc 19).
- Gestione scarti e sostenibilità.

---

## Compatibilità con Evershop

Il modulo consuma gli eventi ordine del core e si integra con OMS per la spedizione, senza modificare il core. È un modulo Ingly additivo con proprie tabelle ed eventi.

## Compatibilità con aggiornamenti futuri

L'integrazione è via eventi/OMS: un upgrade del core non rompe la produzione finché gli eventi ordine/spedizione restano stabili. Verifica dei nomi evento e dei punti OMS dopo ogni upgrade.

---

## See also
- [13 Ecommerce](13_ECOMMERCE.md)
- [17 Laser Center](17_LASER_CENTER.md)
- [18 Quoter](18_QUOTER.md)
- [21 Analytics](21_ANALYTICS.md)
