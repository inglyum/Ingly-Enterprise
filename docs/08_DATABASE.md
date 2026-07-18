# 08 — DATABASE · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Database Architect — Ingly Design
**Destinatari:** Backend, DevOps, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire le convenzioni di **modellazione dati**, lo **schema per bounded context**, la **strategia di migrazione** e le regole d'uso del database per INGLY Enterprise. Il DB è **PostgreSQL 13+** — l'unico supportato. Nessun'altra tecnologia di persistenza relazionale è ammessa nel core path.

---

## Visione

Un modello dati coerente, normalizzato dove serve, denormalizzato dove la lettura lo richiede (CQRS light per BI). Ogni bounded context possiede le proprie tabelle; l'accesso cross-context avviene tramite service, non tramite join opportunistici (salvo letture documentate).

---

## Obiettivi

1. Integrità dei dati (vincoli, foreign key, transazioni).
2. Convenzioni uniformi (naming, tipi, chiavi).
3. Migrazioni versionate, ripetibili e reversibili quando possibile.
4. Isolamento dei dati per dominio, con confini chiari.
5. Performance: indici mirati, query efficienti.

---

## Regole PostgreSQL (vincolanti)

- **Solo PostgreSQL.** Niente sintassi MySQL.
- Identità: `SERIAL`/`GENERATED ... AS IDENTITY` per PK numeriche interne; `gen_random_uuid()` per UUID pubblici.
- Identificatori: snake_case, doppi apici solo se necessario.
- JSON: `JSONB` (non `JSON`).
- Timestamp: `TIMESTAMPTZ` con default `NOW()` dove sensato.
- Ogni entità pubblica espone uno **UUID** stabile oltre alla PK interna (pattern Evershop).

---

## Convenzioni di naming

| Elemento | Convenzione | Esempio |
|----------|-------------|---------|
| Tabella | snake_case, prefisso dominio Ingly | `ingly_crm_customer` |
| PK interna | `<entità>_id` (SERIAL/IDENTITY) | `customer_id` |
| UUID pubblico | `uuid` (`gen_random_uuid()`) | `uuid` |
| FK | `<entità>_id` | `order_id` |
| Indice | `idx_<tabella>_<colonne>` | `idx_ingly_crm_customer_email` |
| Timestamp | `created_at`, `updated_at` | — |

**Nota anti-collisione:** le tabelle dei moduli Ingly usano prefisso `ingly_<dominio>_` per non collidere con le tabelle core Evershop.

---

## Migrazioni (convenzione Evershop)

- Cartella **singolare** `migration/` dentro il modulo.
- File `Version-X.Y.Z.ts` (**trattino**, non underscore; es. `Version-1.0.0.ts`).
- Le migrazioni sono ordinate per versione ed eseguite dal migrator di Evershop.
- Ogni migrazione è **idempotente** dove possibile e non distruttiva senza backup.
- **Mai** droppare una colonna senza prima `grep` cross-modulo (le tabelle sono condivise tra moduli — vedi pitfall CLAUDE.md).

```
modules/ingly/crm/migration/
├── Version-1.0.0.ts   # create table ingly_crm_customer
├── Version-1.1.0.ts   # add column ...
└── Version-1.2.0.ts   # add index ...
```

---

## Accesso ai dati (query builder Evershop)

Import pubblici:
```ts
import { select, insert, update, del, insertOnUpdate } from '@evershop/evershop/lib/postgres/query';
import { pool, getConnection, startTransaction } from '@evershop/evershop/lib/postgres';
```

Trappole note (da CLAUDE.md — vincolanti):
- `select(...)` top-level è **variadico sulle colonne**: non passare `(colonna, alias)`. Per l'alias usare la forma concatenata `.select(col, alias)`.
- Nei JOIN, `.on()` restituisce un `Node`: non concatenare `.where()`/`.orderBy()` direttamente su `.on()`. Tenere l'handle della query e chiamarli separatamente.
- `.given({ isSQL:true, value:'...' })` per SQL raw in UPDATE/INSERT **non** è onorato: scendere a `connection.query()` con bind param per i valori utente.
- `.execute(connection)`/`.load(connection)` su una `getConnection()` prima di `startTransaction` rilascia il client: chiamare `startTransaction` subito dopo `getConnection`, oppure fare le letture pre-tx sul `pool` condiviso.

---

## Transazioni

- Operazioni multi-tabella che devono essere atomiche usano una transazione dedicata.
- Pattern "delayed tx" (quando una chiamata di rete esterna sta tra lettura e scrittura): vedi `oms/services/createShipment.ts` come riferimento canonico.
- Emettere eventi di dominio **dopo** il commit (o via outbox — estensione futura) per evitare effetti su rollback.

---

## Diagramma testuale — Schema per bounded context

```
CORE EVERSHOP                 MODULI INGLY (prefisso ingly_)
─────────────                 ──────────────────────────────
product, product_*            ingly_crm_customer, ingly_crm_lead, ingly_crm_interaction
customer, customer_*          ingly_media_asset, ingly_media_variant
order, order_*                ingly_production_job, ingly_production_step
cart, shipment                ingly_laser_machine, ingly_laser_material, ingly_laser_param
cms_page, ...                 ingly_quote, ingly_quote_line, ingly_quote_rule
                              ingly_automation_rule, ingly_automation_run
                              ingly_analytics_read_* (read model)
        │  FK/eventi                  │
        └───────── relazioni via service/eventi, non join opportunistici ─────────┘
```

---

## Indici e performance

- Indicizzare le colonne di ricerca/filtro frequenti (email, slug, foreign key).
- Evitare over-indexing (costo in scrittura).
- Per BI: read model denormalizzati / materialized view (doc 21), aggiornati via eventi.
- Analizzare i piani di esecuzione (`EXPLAIN ANALYZE`) sulle query critiche.

---

## Backup, versioning e retention

- Backup periodici automatici del DB (doc 27).
- Versioning logico dei dati critici (audit trail) dove richiesto (preventivi, ordini di produzione).
- Retention conforme GDPR (doc 24): cancellazione/anonimizzazione su richiesta.

---

## Best Practice

- Ogni tabella Ingly: PK interna + UUID pubblico + `created_at`/`updated_at`.
- Vincoli a livello DB (NOT NULL, FK, UNIQUE) oltre alla validazione applicativa.
- Migrazioni piccole e frequenti, mai distruttive senza backup.
- `grep` cross-modulo prima di alterare/droppare colonne condivise.

---

## Checklist migrazione

- [ ] File `Version-X.Y.Z.ts` (trattino) nella cartella `migration/`.
- [ ] Prefisso tabella `ingly_<dominio>_`.
- [ ] PK, UUID, timestamp, vincoli presenti.
- [ ] Indici necessari creati.
- [ ] Idempotenza/non distruttività verificate.
- [ ] Nessun drop di colonna senza grep cross-modulo + backup.
- [ ] Testata su DB pulito e su DB con dati.

---

## Roadmap

1. Schema base moduli Ingly (CRM, Media).
2. Read model per BI (CQRS light).
3. Audit trail preventivi/produzione.
4. Outbox pattern per eventi affidabili.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Drop colonna condivisa | grep cross-modulo + backup + review |
| Migrazione distruttiva | idempotenza, backup, staging |
| Query lente | indici, EXPLAIN, read model |
| Client rilasciato pre-tx | pattern startTransaction corretto (CLAUDE.md) |

---

## Estensioni future

- Partizionamento tabelle ad alto volume (analytics).
- Read replica per letture BI.
- Outbox + CDC per integrazioni esterne.

---

## Compatibilità con Evershop

Si usa lo stesso PostgreSQL, lo stesso query builder e lo stesso migrator di Evershop. Le tabelle Ingly sono additive (prefisso dedicato) e non alterano lo schema core.

## Compatibilità con aggiornamenti futuri

Le migrazioni Ingly sono versionate indipendentemente dal core. Un upgrade Evershop che aggiunge migrazioni core convive con quelle Ingly grazie al prefisso e all'isolamento. Verificare conflitti di colonne condivise prima di ogni upgrade.

---

## See also
- [03 System Architecture](03_SYSTEM_ARCHITECTURE.md)
- [09 API](09_API.md)
- [21 Analytics](21_ANALYTICS.md)
- [24 Security](24_SECURITY.md)
