# 09 — API · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** API / Integration Architect — Ingly Design
**Destinatari:** Backend, Frontend, Integrazioni, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire le linee guida per le **API** di INGLY Enterprise: REST versionata per i moduli Ingly, GraphQL per storefront/admin (fornito da Evershop), convenzioni di versioning, error handling, sicurezza e documentazione. Le API sono il contratto pubblico tra moduli, frontend e integrazioni esterne (API-first).

---

## Visione

Ogni modulo espone un contratto stabile e versionato. I consumatori (storefront, admin, plugin, integrazioni) dipendono dai contratti, non dall'implementazione. Le API sono documentate (OpenAPI per REST, SDL per GraphQL) e testate.

---

## Obiettivi

1. Contratti stabili e versionati (`/api/v1/`).
2. Coerenza tra REST e GraphQL.
3. Sicurezza (auth, RBAC, rate limiting).
4. Error handling uniforme.
5. Documentazione sempre allineata al codice.

---

## Due piani API

| Piano | Tecnologia | Uso |
|-------|-----------|-----|
| **GraphQL** | Evershop (schema assemblato a startup da `.graphql`) | Storefront e Admin data-fetching |
| **REST v1** | Handler Express nei moduli Ingly | API pubbliche/integrazioni, azioni di dominio, webhook |

I due piani coesistono: GraphQL per il rendering delle pagine, REST v1 per operazioni di dominio e integrazioni.

---

## Convenzioni REST v1

- Base path: `/api/v1/<dominio>/<risorsa>`.
- Metodi: `GET` (lettura), `POST` (creazione/azione), `PUT/PATCH` (aggiornamento), `DELETE` (cancellazione).
- Naming risorse: plurale, kebab/snake coerente (`/api/v1/crm/customers`).
- Idempotenza: `GET/PUT/DELETE` idempotenti; `POST` no (usare idempotency-key per azioni critiche).
- Paginazione: `?page`, `?limit` (default sensati), risposta con `meta` di paginazione.
- Filtri/ordinamento: query param espliciti.

### Formato risposta
```json
{
  "data": { /* risorsa o lista */ },
  "meta": { "page": 1, "limit": 20, "total": 137 },
  "errors": []
}
```

### Formato errore
```json
{
  "data": null,
  "errors": [
    { "code": "VALIDATION_ERROR", "field": "email", "message": "Email non valida" }
  ]
}
```

---

## Convenzione critica handler Evershop (attivo/passivo)

Un handler API che **invia** una risposta (`response.json()`, `.send()`, `.redirect()`) **deve** dichiarare la firma a **3 argomenti** `(request, response, next)`, anche se `next` non viene usato. Una firma a 2 argomenti è trattata come "passiva": il framework chiama `next()` dopo la risoluzione e `apiResponse` tenta di reinviare gli header → `ERR_HTTP_HEADERS_SENT`.

Usare i tipi corretti:
```ts
import { EvershopRequest } from '@evershop/evershop/types/request';
import { EvershopResponse } from '@evershop/evershop/types/response';

export default async (request: EvershopRequest, response: EvershopResponse, next) => {
  response.json({ data: {/* ... */}, meta: {}, errors: [] });
};
```

---

## Versioning

- Versione nel path: `/api/v1/...`. Le breaking change introducono `/api/v2/...`.
- Le versioni precedenti restano supportate per un periodo di deprecazione documentato.
- Cambi non-breaking (campi additivi) restano nella stessa versione.
- Ogni endpoint documenta: versione introdotta, deprecazione, sostituto.

---

## GraphQL (Evershop)

- Schema assemblato a startup dai file `.graphql` per modulo.
- Due schemi separati: **admin** (vede `.admin.graphql` + non-admin) e **storefront** (solo non-admin).
- Trappola: un tipo definito in `.admin.graphql` referenziato da un `.graphql` non-admin → "Unknown type X" allo storefront. Tenere i tipi nel file giusto.
- Context/servizi: `setContextValue`, `getContextValue` da `@evershop/evershop/graphql/services`.

---

## Sicurezza API

- Autenticazione (doc 10): sessione admin / token per API esterne.
- Autorizzazione RBAC (doc 11) su ogni endpoint sensibile.
- Rate limiting sulle API pubbliche.
- Validazione input rigorosa (mai fidarsi del client).
- CORS configurato esplicitamente per le origini ammesse.
- Audit log delle azioni critiche.

---

## Diagramma testuale — Flusso richiesta REST v1

```
Client ─► /api/v1/quoter/estimate
   │
   ▼ middleware: auth (doc 10) ─► RBAC (doc 11) ─► validazione input
   ▼
Controller (handler 3-arg) ─► Application Service ─► Domain ─► Repository (Postgres)
   │
   ▼ risposta { data, meta, errors }
   └─ eventuale emit evento di dominio (dopo commit)
```

---

## Documentazione API

- REST: specifica **OpenAPI** per dominio, mantenuta accanto al codice.
- GraphQL: SDL come fonte di verità, introspezione in ambienti non-prod.
- Esempi di richiesta/risposta per ogni endpoint.
- Changelog API nel doc 34 e nella release (doc 36).

---

## Best Practice

- Progettare il contratto prima dell'implementazione (API-first).
- Errori con `code` stabile e messaggio human-friendly.
- Nessun leak di dettagli interni negli errori (sicurezza).
- Handler che rispondono → firma 3 argomenti (evita `ERR_HTTP_HEADERS_SENT`).
- Versionare da subito (`/v1`) anche se c'è una sola versione.

---

## Checklist nuovo endpoint

- [ ] Path versionato `/api/v1/...`.
- [ ] Auth + RBAC applicati.
- [ ] Validazione input server-side.
- [ ] Handler con firma 3-arg se invia risposta.
- [ ] Formato risposta/errore standard.
- [ ] Paginazione/filtri se lista.
- [ ] Documentazione OpenAPI/SDL aggiornata.
- [ ] Test (unit + integration).
- [ ] Eventi di dominio emessi dopo commit.

---

## Roadmap

1. Convenzioni REST v1 + template handler.
2. OpenAPI per moduli CRM/Quoter/Media.
3. Rate limiting e idempotency-key.
4. Webhook in uscita per integrazioni.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Breaking change silente | Versioning e deprecazione documentata |
| `ERR_HTTP_HEADERS_SENT` | Firma handler 3-arg |
| Tipi GraphQL cross-schema | Rispettare admin/non-admin |
| Input non validato | Validazione server-side obbligatoria |

---

## Estensioni future

- API pubblica per partner con API key/OAuth2.
- GraphQL federation se estratti microservizi.
- SDK client generati da OpenAPI.

---

## Compatibilità con Evershop

GraphQL è quello nativo di Evershop; le API REST v1 Ingly si aggiungono come handler nei moduli, senza modificare il core. Si usano i tipi `EvershopRequest`/`EvershopResponse` e i servizi GraphQL ufficiali.

## Compatibilità con aggiornamenti futuri

Il versioning `/v1` isola i consumatori dai cambi. Un upgrade Evershop che modifica lo schema GraphQL core richiede verifica dei resolver Ingly; le REST v1 restano stabili perché indipendenti.

---

## See also
- [03 System Architecture](03_SYSTEM_ARCHITECTURE.md)
- [10 Authentication](10_AUTHENTICATION.md)
- [11 User Roles](11_USER_ROLES.md)
- [23 Plugin System](23_PLUGIN_SYSTEM.md)
