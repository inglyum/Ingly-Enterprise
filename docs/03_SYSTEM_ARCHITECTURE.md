# 03 — SYSTEM ARCHITECTURE · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Enterprise Architect — Ingly Design
**Destinatari:** Team di sviluppo, DevOps, QA, Claude Code, Technical Lead
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Questo documento descrive l'architettura software di **Ingly Enterprise**, la piattaforma gestionale costruita estendendo il core di Evershop. L'architettura traduce la Visione e i Requisiti di Prodotto in un modello tecnico concreto, definendo i componenti, i layer, le interazioni e i vincoli progettuali.

Il documento funge da riferimento primario per:
- Progettare nuovi moduli e servizi.
- Valutare l'impatto di modifiche e aggiornamenti.
- Garantire che tutte le parti del sistema evolvano in modo coerente.
- Guidare Claude Code e gli sviluppatori nella scrittura di codice conforme all'architettura.

---

## Visione architetturale

Vogliamo una piattaforma **modulare, estendibile e sostituibile**, in cui:
- Il **core e-commerce** (Evershop) rimanga il più possibile intatto e aggiornabile.
- La **logica di business specifica** di Ingly Design risieda in moduli autonomi (Bounded Context), completamente separati dal core.
- La comunicazione tra moduli avvenga preferibilmente tramite **eventi asincroni**, per evitare accoppiamento forte.
- L'esperienza utente (Admin Panel e Storefront) sia composta da componenti indipendenti e guidata da un Design System centralizzato.
- L'infrastruttura sottostante sia containerizzata, orchestrata e scalabile orizzontalmente.
- Il sistema sia osservabile (logging, monitoring, alerting) e sicuro by design.

---

## Obiettivi dell'architettura

1. **Separazione delle preoccupazioni**: ogni modulo incapsula il proprio dominio e le proprie regole di business.
2. **Indipendenza dal framework**: la logica di business non dipende da Express, React o Evershop. Questi sono dettagli implementativi esterni ai casi d'uso.
3. **Testabilità**: ogni componente è testabile in isolamento.
4. **Estendibilità**: nuove funzionalità vengono aggiunte senza modificare il codice esistente (Open/Closed Principle).
5. **Aggiornabilità**: gli aggiornamenti di Evershop devono poter essere applicati con minimo impatto.
6. **Resilienza**: guasti in un modulo non bloccano l'intero sistema (graceful degradation).

---

## Principi architetturali applicati

| Principio | Implementazione concreta in Ingly Enterprise |
|-----------|----------------------------------------------|
| **Clean Architecture** | L'applicazione è organizzata in anelli concentrici: Domain al centro, Use Cases, Interface Adapters, Frameworks esterni. I moduli Ingly dipendono solo verso l'interno. |
| **SOLID** | Ogni modulo è un'unità coesa. Le interfacce (es. `IQuoterService`) sono definite nel Domain e implementate nell'Infrastructure. Dependency Injection ovunque. |
| **DDD** | I moduli corrispondono a Bounded Context (Ecommerce, CRM, Produzione, ecc.). Ogni contesto ha il proprio linguaggio ubiquo. Gli Aggregate root (Order, Customer, Product) proteggono gli invarianti. |
| **Event-Driven Architecture** | I moduli pubblicano eventi di dominio (es. `OrderPlaced`, `ProductionCompleted`) sull'event bus di Evershop. Altri moduli si sottoscrivono e reagiscono. |
| **Modular Monolith first** | Inizialmente l'applicazione è un monolite modulare ben strutturato. In futuro, i moduli con carico più elevato potranno essere estratti in microservizi senza riscrivere la logica. |
| **CQRS (light)** | Dove necessario (Analytics, Dashboard), si separano modelli di lettura ottimizzati da quelli di scrittura, sincronizzati via eventi. |
| **API-first** | Ogni modulo espone API interne ed esterne documentate. Admin Panel e Storefront consumano queste API. |
| **Twelve-Factor App** | Configurazione via variabili d'ambiente. Log su stdout. Processi stateless. |

---

## Stack tecnologico

| Layer | Tecnologia |
|-------|-----------|
| Runtime | Node.js ≥ 20 |
| Web framework | Express (fornito da Evershop) |
| UI | React 18 con SSR + hydration (MPA, non SPA) |
| Database | PostgreSQL 13+ (unico DB supportato) |
| API | GraphQL (schema assemblato a startup) + REST versionata |
| Bundler | webpack 5 + SWC (no Babel) |
| Form | react-hook-form (wrapper `components/common/form/Form.tsx`) |
| Styling | Tailwind v4 + PostCSS |
| Build | SWC `src/` → `dist/` (`npm run compile`) |
| Test | Jest |
| Container | Docker + docker-compose |

---

## Diagramma architetturale ad alto livello

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                             │
│   Storefront (React SSR)      Admin Panel (React SSR)                 │
│   ─ componenti Design System ─ page-builder ─ hydration              │
└───────────────┬───────────────────────────────┬─────────────────────┘
                │ GraphQL / REST v1              │
┌───────────────▼───────────────────────────────▼─────────────────────┐
│                         APPLICATION LAYER                            │
│   Use Cases / Services  ·  Middleware  ·  Subscribers (eventi)       │
│   Controller → Service → Repository → Domain Entity                  │
└───────────────┬───────────────────────────────┬─────────────────────┘
                │                                │  emit/subscribe
┌───────────────▼──────────────┐   ┌─────────────▼─────────────────────┐
│        DOMAIN LAYER          │   │          EVENT BUS                │
│  Bounded Contexts Ingly:     │   │  OrderPlaced, QuoteCreated,       │
│  crm, production, laser,     │◄──┤  ProductionCompleted, ...         │
│  quoter, media, ai, ...      │   └───────────────────────────────────┘
│  + Evershop core (intatto)   │
└───────────────┬──────────────┘
                │
┌───────────────▼─────────────────────────────────────────────────────┐
│                       INFRASTRUCTURE LAYER                           │
│  PostgreSQL · Storage/CDN · Email · Payment gateway · AI provider   │
│  Cache · Queue · External APIs                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Struttura dei moduli Ingly

I moduli Ingly risiedono in `packages/evershop/src/modules/ingly/<dominio>/` e seguono le convenzioni Evershop (route, middleware, migration, subscribers, `.graphql`) ma con layering interno esplicito:

```
modules/ingly/crm/
├── bootstrap.ts           # registrazione hook/processor/eventi (locked dopo)
├── domain/                # entità, value object, interfacce (IRepository)
├── application/           # use case, service (logica di business)
├── infrastructure/        # repository Postgres, adapter esterni
├── api/                   # handler REST v1 + api/global
├── pages/                 # componenti React (admin/frontStore)
├── graphql/               # *.graphql, resolver, types
├── migration/             # Version-X.Y.Z.ts
├── subscribers/           # <event_name>/<handler>.ts
├── services/              # servizi condivisi del modulo
├── tests/                 # unit / integration
└── README.md              # documentazione del modulo (obbligatoria)
```

**Regola di dipendenza (Clean Architecture):** `pages/api/graphql → application → domain`. `infrastructure` implementa le interfacce di `domain`. Il `domain` non importa nulla da Express/React/Evershop.

---

## Comunicazione tra moduli

- **Preferita:** eventi asincroni via event bus di Evershop (`emit` / `createSubscriber`). Basso accoppiamento.
- **Consentita:** chiamate a service layer pubblici di un altro modulo tramite interfacce, quando serve consistenza sincrona.
- **Vietata:** import diretto di repository/infrastructure di un altro modulo, o accesso diretto alle sue tabelle senza passare dai suoi service (salvo lettura documentata — vedi pitfall "colonne condivise" in CLAUDE.md).

### Esempio di flusso event-driven

```
Ecommerce: checkout confermato
   └─ emit("OrderPlaced", order)
        ├─ [Produzione] crea ordine di produzione
        ├─ [CRM] aggiorna storico cliente + apre attività
        ├─ [Analytics] aggiorna modello di lettura KPI
        └─ [Automazioni] valuta trigger (es. email di ringraziamento)
```

---

## Vincoli architetturali (hard constraints)

1. **Bootstrap è un muro:** hook e registry sono bloccati dopo `bootstrap.ts`. Registrare processor/hook/widget/job solo da `bootstrap.ts`.
2. **Core intatto:** nessuna modifica al core Evershop se non isolata, documentata in `/docs/core-patches/`, e con analisi di impatto.
3. **PostgreSQL only:** niente sintassi MySQL, niente altri DB.
4. **ESM + TypeScript:** nuovi file `.ts`/`.tsx`, `export default`, no `module.exports`.
5. **API versionate:** endpoint pubblici sotto `/api/v1/`.
6. **Stateless:** nessuno stato in-process; sessione e cache esterne per scalabilità orizzontale.

---

## Osservabilità

- **Logging** strutturato JSON su stdout, con correlazione richiesta.
- **Metrics** su latenza, throughput, error rate per modulo.
- **Tracing** delle richieste cross-modulo tramite un correlation id.
- **Alerting** su soglie NFR (vedi doc 02, doc 25).

---

## Evoluzione verso microservizi (futuro)

Il monolite modulare è progettato per l'estrazione: poiché i moduli comunicano per eventi e interfacce, un modulo ad alto carico (es. AI, Analytics) può diventare un servizio indipendente sostituendo il trasporto (in-process → rete) senza riscrivere il dominio. Questo è un obiettivo di lungo periodo, non un requisito iniziale (YAGNI).

---

## Workflow architetturale

1. Nuovo requisito → documento di analisi (`/docs/analysis/`).
2. Identificazione del Bounded Context di appartenenza.
3. Definizione delle interfacce di dominio e degli eventi.
4. Scelta del meccanismo di estensione Evershop (hook/evento/override/API).
5. Review architetturale prima dell'implementazione.

---

## Convenzioni

- Un modulo = un Bounded Context = una cartella in `modules/ingly/`.
- Gli eventi di dominio usano PascalCase al passato (`OrderPlaced`).
- Le interfacce di dominio iniziano con `I` (`IQuoterService`).
- Le API pubbliche sono versionate e documentate (doc 09).

---

## Best Practice

- Progettare prima gli **eventi** e i **contratti**, poi l'implementazione.
- Mantenere il `domain` puro (nessun import di framework).
- Preferire composizione a ereditarietà.
- Isolare ogni integrazione esterna dietro un adapter.

---

## Checklist architetturale (per ogni nuovo modulo)

- [ ] Bounded Context chiaro e nominato.
- [ ] Layering `domain/application/infrastructure` rispettato.
- [ ] Eventi di dominio definiti e documentati.
- [ ] Nessuna modifica al core Evershop.
- [ ] Registrazioni solo in `bootstrap.ts`.
- [ ] API versionate.
- [ ] README del modulo presente.
- [ ] Test in isolamento del dominio.

---

## Roadmap architetturale

1. **Fase 1** — Consolidamento monolite modulare, scaffolding `modules/ingly/`.
2. **Fase 2** — Event bus maturo, CQRS light per Analytics.
3. **Fase 3** — Estrazione selettiva di microservizi ad alto carico.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Accoppiamento nascosto tra moduli | Comunicazione per eventi/interfacce, review architetturale |
| Drift dal core Evershop | Politica di non-modifica, patch isolate, test regressione |
| Complessità prematura (microservizi) | Monolite modulare first (YAGNI) |
| Dominio inquinato da framework | Regola di dipendenza verso l'interno, lint |

---

## Estensioni future

- Service mesh per i microservizi estratti.
- Read model dedicati (materialized view) per BI.
- Outbox pattern per garantire consegna eventi.

---

## Compatibilità con Evershop

L'architettura è un **wrapping** del core Evershop: usa i suoi meccanismi (moduli, hook, eventi, GraphQL, migration) e aggiunge layering e domini. Nessun costrutto Ingly sostituisce o forka componenti core.

## Compatibilità con aggiornamenti futuri

Poiché il dominio Ingly è isolato e comunica per contratti, un aggiornamento del core che non cambia le API pubbliche non impatta i moduli. Le patch al core sono isolate e ri-applicabili. Analisi di impatto obbligatoria prima di ogni upgrade upstream.

---

## See also
- [00 Master Prompt](00_MASTER_PROMPT.md)
- [08 Database](08_DATABASE.md)
- [09 API](09_API.md)
- [23 Plugin System](23_PLUGIN_SYSTEM.md)
- [33 File Structure](33_FILE_STRUCTURE.md)
