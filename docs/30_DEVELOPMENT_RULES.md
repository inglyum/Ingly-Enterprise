# 30 — DEVELOPMENT RULES · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Technical Lead — Ingly Design
**Destinatari:** Tutto il team, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire le **regole operative del team di sviluppo**: cosa è obbligatorio, cosa è vietato, come si collabora. È il "codice della strada" quotidiano che rende operative le regole del Master Prompt (doc 00).

---

## Visione

Un team (umani + AI) che lavora con disciplina condivisa: stessi principi, stesse convenzioni, stessa cura. Le regole riducono l'attrito e proteggono la qualità e l'aggiornabilità.

---

## Obiettivi

1. Rendere esplicite le regole quotidiane.
2. Prevenire errori ricorrenti e debito tecnico.
3. Garantire coerenza tra contributori.
4. Proteggere core Evershop e compatibilità.

---

## Regole fondamentali (obbligatorie)

1. **Non modificare il core Evershop** senza analisi di impatto documentata in `/docs/core-patches/` (solo bug bloccanti).
2. **Ogni capacità = modulo** in `modules/ingly/<dominio>/` con layering (doc 03).
3. **Workflow a 7 fasi** (Analisi → Piano → Approvazione → Implementazione → Test → Documentazione → Review) per ogni intervento non banale.
4. **Test obbligatori** come parte della Definition of Done (doc 26).
5. **Documentazione obbligatoria**: `/docs` + README modulo aggiornati (doc 00).
6. **API versionate** (`/api/v1/`).
7. **Conventional Commits** (doc 28) e branching corretto.
8. **Registrazioni solo in `bootstrap.ts`** (registry locked dopo).
9. **Nessuna dipendenza** nuova senza valutazione/approvazione.
10. **Sicurezza by design** (doc 24) e **RBAC server-side** (doc 11).

---

## Divieti (non conformità bloccanti)

- ❌ Bypassare hook husky (`--no-verify`) o saltare lint/type/test senza go-ahead esplicito.
- ❌ Segreti in codice/log/commit/docs.
- ❌ Modifiche dirette a `main`/`develop` senza PR.
- ❌ SQL concatenato (usare bind param).
- ❌ Accesso diretto a tabelle/infrastruttura di altri moduli (usare service/eventi).
- ❌ `module.exports`, sintassi MySQL, cartella `migrations/` plurale, `Version_x` underscore, `pages/frontend/`.
- ❌ Registrare hook/processor/widget fuori da `bootstrap.ts`.

---

## Convenzioni tecniche chiave (da CLAUDE.md)

- **Nuovi file `.ts`/`.tsx`**, ESM `export default`.
- **PostgreSQL**: `SERIAL/IDENTITY`, `JSONB`, `gen_random_uuid()`, identificatori snake_case.
- **Handler API che rispondono**: firma 3-arg `(req, res, next)` (evita `ERR_HTTP_HEADERS_SENT`).
- **Tipi**: `EvershopRequest`/`EvershopResponse`, non `express`.
- **Hook**: `hookable()` con **named function expression** (nome = chiave hook).
- **Query builder**: attenzione a `select(...)` variadico, `.on()` nei join, `.given()` raw, tx dopo `getConnection`.
- **React**: nessun hook dopo early return.
- **GraphQL**: tipi `.admin.graphql` non visibili allo storefront.
- **Widget list-field**: `useArraySetting`/`asArray`.
- **Drop colonna**: `grep` cross-modulo prima.

---

## Collaborazione

- PR piccole, focalizzate, con descrizione/test/doc.
- Review costruttiva; almeno un'approvazione.
- Comunicare decisioni architetturali (doc 03) e trade-off.
- Segnalare esplicitamente ogni debito tecnico introdotto.

---

## Diagramma testuale — Gate di conformità

```
Codice ─► Lint/Type ─► Test ─► Security ─► Review ─► Merge
   │         │          │         │          │
  ESLint   TS strict   Jest    scan/segreti  principi (doc00)
   └────── qualsiasi rosso = blocco (non conformità) ──────┘
```

---

## Best Practice

- KISS/YAGNI/DRY come default; complessità solo se giustificata.
- Leggere i doc `/docs` pertinenti prima di iniziare.
- Preferire estensione (hook/eventi) a modifica.
- Lasciare il codice più pulito di come lo si è trovato.
- Aggiungere test di regressione per ogni bug.

---

## Checklist pre-commit

- [ ] Workflow a 7 fasi seguito (per interventi non banali).
- [ ] Nessuna modifica core non isolata/documentata.
- [ ] Registrazioni in `bootstrap.ts`.
- [ ] Test verdi; coverage ok.
- [ ] Lint/type verdi (no `--no-verify`).
- [ ] Documentazione aggiornata.
- [ ] Conventional Commit + branch corretto.
- [ ] Nessun segreto nel diff.

---

## Roadmap

1. Regole + PR template + CI gate.
2. Guard test per trappole note (doc 26).
3. Onboarding contributori (doc 35).
4. Automazioni di controllo (lint custom, danger).

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Deriva dalle regole | CI gate, review, guard test |
| Debito tecnico silente | Segnalazione obbligatoria, refactoring |
| Errori ricorrenti | Convenzioni esplicite (CLAUDE.md/doc 32) |
| Modifiche core rischiose | Divieto salvo bug bloccanti documentati |

---

## Estensioni future

- Regole applicate via lint rule custom.
- Danger.js per policy PR automatiche.
- Metriche di qualità nel tempo (debito, coverage).

---

## Compatibilità con Evershop

Le regole codificano l'uso corretto dei meccanismi Evershop (moduli, hook, eventi, migration, query builder) per garantire non-modifica del core e aggiornabilità.

## Compatibilità con aggiornamenti futuri

Il rispetto delle regole (estensione vs modifica, registrazioni in bootstrap, test di regressione) è ciò che rende gli upgrade upstream assorbibili senza rotture.

---

## See also
- [00 Master Prompt](00_MASTER_PROMPT.md)
- [31 Claude Guidelines](31_CLAUDE_GUIDELINES.md)
- [32 Coding Standards](32_CODING_STANDARDS.md)
- [28 GitHub Workflow](28_GITHUB_WORKFLOW.md)
