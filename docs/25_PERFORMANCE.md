# 25 — PERFORMANCE · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Performance Engineer — Ingly Design
**Destinatari:** Backend, Frontend, DevOps, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire la strategia di **performance**: budget, caching, ottimizzazione query, frontend e benchmark. La performance è un requisito (NFR-PERF, doc 02) e un fattore SEO (doc 22), non un ripensamento.

---

## Visione

Un sistema veloce sotto carico reale: storefront reattivo per convertire, admin fluido per l'operatività, API rapide per l'integrazione. Ottimizzazioni guidate da misure, non da intuizioni.

---

## Obiettivi

1. Rispettare i budget di performance (NFR).
2. Caching a più livelli senza sacrificare correttezza.
3. Query DB efficienti (indici, read model).
4. Frontend leggero (SSR + hydration selettiva).
5. Benchmark e profiling continui.

---

## Budget di performance

| Metrica | Target |
|---------|--------|
| TTFB storefront | < 500 ms (p95) |
| API interne | < 200 ms (p95) |
| LCP | < 2.5 s |
| CLS | < 0.1 |
| INP | < 200 ms |
| Query DB critiche | < 50 ms (p95) |

I budget sono **gate**: una regressione oltre soglia è un difetto.

---

## Caching (a livelli)

```
CDN (asset/pagine pubbliche) 
   └─► App cache (frammenti/dati) 
          └─► Query cache / read model (doc 21) 
                 └─► PostgreSQL
```

- **CDN**: asset statici e pagine pubbliche cacheable (doc 12/07).
- **Application cache**: dati costosi e stabili (config, cataloghi), con **invalidazione** guidata da eventi.
- **Read model** (CQRS light, doc 21): letture analitiche pre-calcolate.
- Regola: cache con chiavi chiare e **invalidazione esplicita** (niente stale silente su dati critici come prezzi/stock).

---

## Ottimizzazione database

- Indici mirati su colonne di filtro/join (doc 08); evitare over-indexing.
- Evitare N+1 (batch/join, dataloader nei resolver GraphQL).
- `EXPLAIN ANALYZE` sulle query critiche.
- Paginazione obbligatoria su liste (no full scan).
- Letture analitiche sui read model, non sulle transazionali.

---

## Frontend

- SSR + **hydration selettiva**; spedire JS minimo (MPA, no SPA).
- Immagini ottimizzate (WebP/AVIF, lazy-load, dimensioni corrette) dalla Media Library (doc 12).
- Code splitting per route (webpack); evitare bundle monolitici.
- Evitare layout shift (dimensioni riservate) → CLS basso.
- Attenzione alla regola degli hook (no lavoro inutile nei render).

---

## Diagramma testuale — Percorso di una richiesta veloce

```
Utente ─► CDN (hit?) ──sì──► risposta immediata
   │ no
   ▼
App (SSR) ─► App cache (hit?) ──sì──► render veloce
   │ no
   ▼
Read model / Query indicizzata ─► PostgreSQL ─► render ─► cache popolata
```

---

## Benchmark e profiling

- **Benchmark automatici** in CI su endpoint/pagine critiche (gate su budget).
- **Load/stress test** periodici (report `stress-report-*`).
- **Profiling** su hot path (CPU, memoria, query lente).
- Monitoraggio in produzione (latenza p95/p99, error rate) con alert.

---

## Best Practice

- Misurare prima di ottimizzare (no ottimizzazioni premature — KISS/YAGNI).
- Cache con invalidazione esplicita; mai stale su prezzi/stock.
- Paginazione e indici su ogni lista/ricerca.
- Immagini sempre ottimizzate.
- Budget come gate in CI.

---

## Checklist performance (per ogni feature)

- [ ] Liste paginate e indicizzate.
- [ ] Nessun N+1 (batch/dataloader).
- [ ] Cache dove utile, con invalidazione.
- [ ] Immagini ottimizzate (Media Library).
- [ ] JS frontend minimo; niente CLS.
- [ ] Budget verificati (benchmark).
- [ ] Query critiche profilate.

---

## Roadmap

1. Budget + benchmark base in CI.
2. Caching CDN/app + invalidazione eventi.
3. Read model per letture pesanti.
4. Load/stress test periodici.
5. Monitoraggio p95/p99 + alert in produzione.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Cache stale su prezzi/stock | Invalidazione esplicita, no cache su dati volatili |
| Query N+1/lente | Batch, indici, EXPLAIN |
| Bundle JS pesante | Code splitting, hydration selettiva |
| Regressioni di performance | Gate benchmark in CI |

---

## Estensioni future

- Edge rendering/caching avanzato.
- Read replica per letture pesanti.
- Prefetch intelligente e ottimizzazione predittiva.

---

## Compatibilità con Evershop

Si sfruttano webpack/SWC, SSR e query builder del core. Le ottimizzazioni (cache, read model, immagini) sono additive e non modificano il core. Le estensioni storage/CDN sono quelle ufficiali (doc 12).

## Compatibilità con aggiornamenti futuri

Budget e caching sono a livello applicativo/infra: gli upgrade del core vanno verificati con i benchmark. La separazione read model protegge le performance durante le migrazioni.

---

## See also
- [02 Product Requirements](02_PRODUCT_REQUIREMENTS.md)
- [08 Database](08_DATABASE.md)
- [12 Media Library](12_MEDIA_LIBRARY.md)
- [21 Analytics](21_ANALYTICS.md)
