# 28 — GITHUB WORKFLOW · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** DevOps / Release Manager — Ingly Design
**Destinatari:** Tutto il team, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire il **workflow GitHub**: branching, Pull Request, GitHub Actions (CI), protezioni di branch e automazioni. Traduce le regole Git del Master Prompt (doc 00) e il processo di deploy (doc 27) in pratiche operative concrete sul repository.

---

## Visione

Un flusso disciplinato dove ogni cambiamento passa da un branch, una PR revisionata e una CI verde prima di entrare in `develop` e, tramite release, in `main`. Automazioni riducono il lavoro manuale e proteggono la qualità.

---

## Obiettivi

1. Branching coerente con il Master Prompt.
2. PR con review, test e documentazione obbligatori.
3. CI come gate di qualità (lint/test/build/security/budget).
4. Protezioni di branch su `main` e `develop`.
5. Automazioni (label, changelog, release).

---

## Modello di branching

```
main ───────────────●────────────────●───────────►  (produzione, protetto)
                    ╱                ╱
release/x.y.z ─────●────────────────●               (stabilizzazione)
                  ╱                ╱
develop ────●────●────●────●──────●─────────────►    (integrazione)
           ╱    ╱    ╱    ╱
feature/  ●    ●    ●    ●   bugfix/ · hotfix/
```

| Branch | Origine | Merge in | Uso |
|--------|---------|----------|-----|
| `main` | — | — | Produzione, protetto |
| `develop` | main | — | Integrazione feature |
| `feature/<nome>` | develop | develop (PR) | Nuove funzionalità |
| `bugfix/<nome>` | develop | develop (PR) | Correzioni |
| `release/x.y.z` | develop | main + develop | Stabilizzazione release |
| `hotfix/<nome>` | main | main + develop | Urgenze produzione |

> Nota: questo repository usa `dev` come branch di default upstream; lo sviluppo di questa iniziativa avviene sul branch dedicato indicato dal task. Il modello sopra è la convenzione target di progetto.

---

## Convenzioni commit (Conventional Commits)

```
<type>(<scope>): <descrizione breve>

[corpo opzionale]
[footer opzionale]
```

Tipi: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `build`, `ci`, `style`, `revert`.
Esempi: `feat(quoter): calcolo prezzo deterministico`, `docs(architecture): aggiorna diagramma eventi`.

I commit alimentano il changelog (doc 34) e il semantic versioning (doc 36).

---

## Pull Request

Ogni PR deve includere:
- **Descrizione**: cosa/perché, link a requisiti (`FR/NFR`) e analisi (`/docs/analysis`).
- **Test**: cosa è coperto; CI verde.
- **Documentazione**: doc `/docs` e README aggiornati.
- **Checklist di conformità** ai principi architetturali (doc 00).

Regole:
- PR piccole e focalizzate (una feature/bugfix).
- Almeno una review approvata.
- CI obbligatoria verde.
- No merge diretto su `main`/`develop` senza PR.
- **Non creare PR** se non esplicitamente richiesto (policy operativa Claude).

---

## GitHub Actions (CI)

Pipeline consigliata (dettagli deploy in doc 27):

```yaml
# .github/workflows/ci.yml (schema concettuale)
on: [pull_request, push]
jobs:
  quality:
    steps:
      - checkout
      - setup-node (>=20) + cache
      - install
      - lint            # npm run lint
      - typecheck
      - test            # npm test (+ coverage)
      - build           # compile/build
      - security-scan   # dipendenze + secret scanning
      - perf-budget     # gate performance (doc 25) [su release]
```

Gate: il merge è bloccato se un job fallisce.

---

## Protezioni di branch

- `main` e `develop`: PR obbligatoria, review, CI verde, no force-push.
- Storia lineare preferita (squash/rebase secondo policy).
- Tag di release solo da `main` (doc 36).

---

## Automazioni

- **Labeling** automatico per area/tipo.
- **Changelog** generato dai Conventional Commits (doc 34).
- **Release** automatizzata su tag (doc 36).
- Eventuale **PR steward/CI autofix** per babysitting delle PR (integrazione ambiente).

---

## Diagramma testuale — Ciclo di una feature

```
Analisi+Piano (doc31) ─► feature/xxx ─► commit (conventional) ─► PR
      │                                                          │
   /docs/analysis                                          CI (gate) + review
                                                               │ verde+approvata
                                                               ▼
                                                        merge in develop
                                                               │
                                                    release/x.y.z ─► main (doc36)
```

---

## Best Practice

- Branch e commit descrittivi (Conventional Commits).
- PR piccole, con test e doc.
- Mai bypassare hook husky (`--no-verify`) senza autorizzazione.
- CI verde prima del merge; niente merge "a forza".
- Collegare sempre PR ↔ requisiti ↔ analisi.

---

## Checklist PR

- [ ] Branch corretto (da `develop`, naming giusto).
- [ ] Commit Conventional Commits.
- [ ] Descrizione con link a requisiti/analisi.
- [ ] Test aggiunti/aggiornati; CI verde.
- [ ] Documentazione `/docs` + README aggiornati.
- [ ] Checklist principi architetturali (doc 00).
- [ ] Nessun segreto nel diff (doc 24).
- [ ] Review approvata.

---

## Roadmap

1. Workflow CI base (lint/test/build).
2. Protezioni branch + PR template.
3. Security scan + coverage gate.
4. Changelog/release automation.
5. Perf budget in CI.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Merge senza qualità | Gate CI + review obbligatori |
| Storia confusa | Conventional Commits, squash/rebase |
| Segreti nel repo | Secret scanning, review |
| Bypass hook | Divieto `--no-verify` senza ok |

---

## Estensioni future

- Required checks avanzati (mutation/contract test).
- Deploy preview per PR.
- Bot di triage issue/PR.

---

## Compatibilità con Evershop

Il repo include già `.husky` e configurazioni lint/prettier del core; il workflow Ingly le rispetta. Le Actions Ingly si aggiungono in `.github/workflows/` senza alterare la logica del core.

## Compatibilità con aggiornamenti futuri

Il workflow è indipendente dalle versioni del core; gli upgrade upstream passano dallo stesso processo PR/CI con la suite di regressione (doc 26).

---

## See also
- [00 Master Prompt](00_MASTER_PROMPT.md)
- [27 Deployment](27_DEPLOYMENT.md)
- [34 Changelog Guide](34_CHANGELOG_GUIDE.md)
- [36 Release Process](36_RELEASE_PROCESS.md)
