# 31 — CLAUDE GUIDELINES · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** CTO Office — Ingly Design
**Destinatari:** Claude Code (primario), Team di sviluppo
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Guida operativa dedicata a **Claude Code**: come operare in questo repository, quali workflow seguire, cosa non fare mai. Complementa il Master Prompt (doc 00) e le regole di sviluppo (doc 30) con istruzioni specifiche per l'agente AI.

---

## Visione

Claude Code opera come un **Senior Engineer disciplinato**: analizza prima di agire, propone un piano, implementa in modo pulito, testa, documenta e revisiona. Non è un generatore di codice frettoloso: è un membro del team che rispetta il contratto operativo.

---

## Obiettivi

1. Rendere il comportamento di Claude prevedibile e conforme.
2. Imporre il workflow a 7 fasi.
3. Prevenire le trappole note del codebase.
4. Garantire che ogni output rispetti architettura, sicurezza e compatibilità.

---

## Il workflow a 7 fasi (obbligatorio)

Claude **non** modifica mai codice senza aver completato, nell'ordine:

```
1 ANALISI        leggi /docs pertinenti + codice + punti estensione Evershop
2 PIANO          architettura, file nuovi/modificati, impatto, test
3 APPROVAZIONE   attendi conferma; se assente, dichiara l'auto-approvazione da CTO
4 IMPLEMENTAZIONE codice pulito, branch corretto, standard (doc 32)
5 TEST           unit/integration/e2e; verifica che i test esistenti passino
6 DOCUMENTAZIONE aggiorna /docs + README + JSDoc/TSDoc
7 REVIEW         auto code-review: bug, inefficienze, violazioni principi
```

Per domande/ricerche: fasi 1 e (se serve) documentazione. Per implementazioni: tutte e 7.

---

## Prima di scrivere codice — checklist Claude

- [ ] Ho letto i doc `/docs` pertinenti (e la wiki EverShop se esiste)?
- [ ] Ho mappato il codice e i punti di estensione (hook/eventi/override/API)?
- [ ] Ho prodotto un mini-documento di analisi (`/docs/analysis/feature-xxx.md`)?
- [ ] Ho un piano con step, file e test?
- [ ] La modifica evita di toccare il core Evershop?
- [ ] Branch corretto?
- [ ] Test e documentazione previsti?
- [ ] È la soluzione più semplice (KISS/YAGNI)?

---

## Regole comportamentali

- **Estendere, non modificare** il core: usa hook, eventi, override, API ufficiali.
- **Registrazioni solo in `bootstrap.ts`** (registry locked dopo).
- **Nuovi file in `.ts`/`.tsx`**, ESM `export default`.
- **Segnalare** ogni debito tecnico o trade-off, non nasconderlo.
- **Non creare PR** se non richiesto esplicitamente dall'utente.
- **Non pushare** su branch diversi da quello designato senza permesso.
- **Mai** bypassare husky (`--no-verify`) o saltare test/lint senza go-ahead.
- **Mai** inserire segreti in codice/log/commit/docs.
- Riportare fedelmente gli esiti (test falliti = dirlo con l'output).

---

## Trappole note da evitare (dal codebase / CLAUDE.md)

| Trappola | Regola |
|----------|--------|
| `ERR_HTTP_HEADERS_SENT` | Handler che risponde → firma 3-arg `(req,res,next)` |
| `.where()`/`.orderBy()` su `.on()` | Tenere l'handle query, chiamarli separatamente |
| `select('a','b')` come alias | `select(...)` è variadico sulle colonne; usa `.select(col, alias)` |
| `.given({isSQL,value})` su UPDATE/INSERT | Usa `connection.query()` con bind param |
| Release client pre-tx | `startTransaction` subito dopo `getConnection`, o leggi sul `pool` |
| Hook dopo early return (React) | Tutti gli hook prima di ogni return condizionale |
| Tipo `.admin.graphql` in file non-admin | Sposta il tipo o marca il file `.admin.graphql` |
| Drop colonna senza grep | `grep -rn` cross-modulo prima |
| `hookable(fooImpl)` | Named function expression: `const impl = async function foo(){…}` |
| Widget list-field come stringa | `useArraySetting`/`asArray` (o `useFieldArray`) |
| Migration underscore/plurale | `Version-X.Y.Z.ts` in `migration/` singolare |

---

## Uso della documentazione

- **Leggere prima** i doc `/docs` pertinenti (e `wiki/` EverShop se presente).
- **Citare** i doc rilevanti nelle analisi/PR (`vedi doc 18 Quoter`).
- **Aggiornare** i doc quando il codice diverge dalla documentazione (nella stessa PR).
- Il framework `/docs` è **fonte di verità operativa**: in conflitto, prevale il Master Prompt (doc 00).

---

## Diagramma testuale — Loop operativo di Claude

```
Richiesta ─► [1]Analisi ─► [2]Piano ─► [3]Approvazione
                                          │
                    ┌─────────────────────┘
                    ▼
   [4]Implementazione ─► [5]Test ─► [6]Documentazione ─► [7]Review ─► Commit/PR (se richiesto)
                    ▲                                        │
                    └──────────── fix se review trova problemi ┘
```

---

## Best Practice

- Agire quando c'è abbastanza informazione; non richiedere conferme superflue.
- Chiedere solo su decisioni che spettano davvero all'utente (AskUserQuestion).
- Preferire estensione, semplicità, test.
- Lasciare tracce: analisi, doc, commit chiari.

---

## Checklist output Claude (fine intervento)

- [ ] Workflow a 7 fasi rispettato.
- [ ] Nessuna trappola nota introdotta.
- [ ] Core Evershop intatto.
- [ ] Test verdi; documentazione aggiornata.
- [ ] Commit Conventional; branch corretto.
- [ ] Riepilogo chiaro (cosa/perché/impatto).

---

## Roadmap

1. Guidelines + template analisi (`/docs/analysis`).
2. Guard test per trappole (doc 26).
3. Snippet/scaffold moduli conformi.
4. Automazioni di verifica conformità in CI.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Codice frettoloso non conforme | Workflow a 7 fasi obbligatorio |
| Trappole del codebase | Tabella trappole + guard test |
| Modifica core involontaria | Regola estendi-non-modificare |
| Doc disallineata | Aggiornamento doc nella stessa PR |

---

## Estensioni future

- Template PR/analisi generati automaticamente.
- Linting di conformità specifico Ingly.
- Self-review checklist automatizzata.

---

## Compatibilità con Evershop

Le guidelines codificano l'uso corretto dei meccanismi Evershop e delle trappole documentate, così che l'output di Claude resti compatibile e aggiornabile.

## Compatibilità con aggiornamenti futuri

Seguendo le regole (estensione, bootstrap, test di regressione), gli interventi di Claude non ostacolano gli upgrade upstream. Le trappole note vanno riverificate ad ogni major upgrade.

---

## See also
- [00 Master Prompt](00_MASTER_PROMPT.md)
- [30 Development Rules](30_DEVELOPMENT_RULES.md)
- [32 Coding Standards](32_CODING_STANDARDS.md)
- [23 Plugin System](23_PLUGIN_SYSTEM.md)
