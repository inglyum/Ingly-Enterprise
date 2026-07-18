# 32 — CODING STANDARDS · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Technical Lead — Ingly Design
**Destinatari:** Tutto il team, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire lo **stile del codice** e gli standard tecnici: linguaggio, ESLint/Prettier, naming, struttura dei file, pattern e anti-pattern. Rende il codice uniforme, leggibile e conforme al codebase Evershop.

---

## Visione

Codice che "si legge come il codice circostante": stessa densità di commenti, stesso naming, stessi idiomi. La coerenza riduce il carico cognitivo e i bug.

---

## Obiettivi

1. Uniformità stilistica e tecnica.
2. TypeScript by default, ESM.
3. Conformità PostgreSQL/Evershop.
4. Prevenzione degli anti-pattern noti.
5. Lint/format automatici e non aggirabili.

---

## Linguaggio e moduli

- **TypeScript** per nuovo codice (`.ts`/`.tsx`). Il codebase è misto `.js`/`.ts` per migrazione incrementale: piccole modifiche a un `.js` restano `.js`; una riscrittura completa è il momento per passare a `.ts`.
- **ESM**: `export default` / named export. **Mai** `module.exports`.
- **Tipi Evershop**: `EvershopRequest`/`EvershopResponse` (da `@evershop/evershop/types/*`), non da `express`.

---

## ESLint & Prettier

- Rispettare `eslint.config.js` e `.prettierrc` del repo.
- **Non** disabilitare regole senza motivo documentato.
- Lint: `npm run lint`. Format: Prettier (via husky pre-commit).
- **Mai** `--no-verify` senza autorizzazione esplicita.

---

## Naming e convenzioni file (Evershop)

| Elemento | Convenzione |
|----------|-------------|
| Migrazioni | `Version-X.Y.Z.ts` (trattino) in `migration/` (singolare) |
| Route | cartella = route ID (solo a-z/A-Z), `route.json` |
| Middleware | `[after]name[before].ts`, iniziale minuscola |
| Master Components | iniziale maiuscola, `.tsx`, `export const layout` opz. |
| Condivisi tra route | `routeA+routeB/` |
| Subscriber | `subscribers/<event>/<handler>.ts` |
| Modulo | `modules/ingly/<dominio>/`, ID univoco |
| Tabelle Ingly | `ingly_<dominio>_<entità>` (snake_case) |
| Permessi | `dominio.risorsa.azione` |
| Eventi | PascalCase al passato (`OrderPlaced`) |
| Interfacce | prefisso `I` (`IQuoterService`) |

Variabili/funzioni: `camelCase`; classi/tipi: `PascalCase`; costanti: `UPPER_SNAKE` dove idiomatico.

---

## Pattern di codice

- **Layering** (doc 03): Controller → Service → Repository → Domain; il dominio non importa framework.
- **Dependency injection** verso le interfacce (SOLID).
- **Funzioni pure** dove possibile; effetti collaterali isolati nell'infrastruttura.
- **Errori** espliciti e tipizzati; non ingoiare eccezioni.
- **Async/await**; gestione errori con try/catch dove serve; niente promise non gestite.
- **Idempotenza** nei subscriber di eventi.

---

## Anti-pattern vietati (compile-clean ma rotti a runtime)

- Handler 2-arg che invia risposta → `ERR_HTTP_HEADERS_SENT` (usa 3-arg).
- `.where()`/`.orderBy()` su `.on()` nei join.
- `select('col','alias')` top-level (variadico sulle colonne).
- `.given({isSQL,value})` per SQL raw in UPDATE/INSERT.
- `.execute/.load(connection)` prima di `startTransaction`.
- Hook dopo early return in componenti React.
- Tipo `.admin.graphql` usato in file non-admin.
- `hookable(fooImpl)` con dichiarazione non nominata.
- Widget list-field letto con `watch(...) ?? initial`.
- Drop colonna senza `grep` cross-modulo.
- Sintassi MySQL, `module.exports`, `migrations/` plurale, `Version_x` underscore, `pages/frontend/`.

*(Dettagli e fix in CLAUDE.md e nei doc 08/09/23.)*

---

## Commenti e documentazione codice

- **JSDoc/TSDoc** su funzioni pubbliche/service e API.
- Commentare il **perché**, non il **cosa** ovvio.
- Densità commenti coerente col file circostante.
- Nessun commento con segreti o note personali sensibili.

---

## Diagramma testuale — Pre-commit locale

```
git commit
   └─► husky pre-commit
          ├─ prettier (format)
          ├─ eslint (lint)
          └─ (eventuale) test rapidi
                 │ rosso? commit bloccato (no --no-verify)
                 ▼
             commit ok
```

---

## Best Practice

- Leggere il codice vicino prima di scrivere: imitarne stile e idiomi.
- Preferire chiarezza a "cleverness".
- Piccole funzioni con responsabilità singola.
- Tipi espliciti sui confini pubblici.
- Nessuna dipendenza nuova senza approvazione.

---

## Checklist stile (per ogni file)

- [ ] `.ts`/`.tsx` per nuovo codice; ESM `export default`.
- [ ] Naming/convenzioni file Evershop rispettate.
- [ ] Tipi `EvershopRequest/Response` dove pertinente.
- [ ] Nessun anti-pattern noto.
- [ ] Lint/format verdi (no `--no-verify`).
- [ ] JSDoc/TSDoc sulle API pubbliche.
- [ ] Layering rispettato (dominio puro).

---

## Roadmap

1. Allineamento a ESLint/Prettier del repo.
2. Regole lint custom per anti-pattern Ingly.
3. Guard test per trappole (doc 26).
4. Snippet/scaffold conformi.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Stile incoerente | ESLint/Prettier, review |
| Anti-pattern a runtime | Lint custom, guard test, tabella |
| `.js` proliferante | Nuovo codice in `.ts` |
| Lint aggirato | Divieto `--no-verify` |

---

## Estensioni future

- Regole ESLint specifiche Ingly (plugin lint).
- Type coverage e strictness crescente.
- Formatter/organizzatore import automatico.

---

## Compatibilità con Evershop

Gli standard riflettono le convenzioni del core (naming file, migration, middleware, query builder). Rispettarli garantisce integrazione pulita e non-modifica del core.

## Compatibilità con aggiornamenti futuri

Standard e lint sono a livello di progetto; gli upgrade del core non li invalidano. Le trappole note vanno riverificate quando il query builder o l'API core cambiano.

---

## See also
- [30 Development Rules](30_DEVELOPMENT_RULES.md)
- [31 Claude Guidelines](31_CLAUDE_GUIDELINES.md)
- [33 File Structure](33_FILE_STRUCTURE.md)
- [08 Database](08_DATABASE.md)
