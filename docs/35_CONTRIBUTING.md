# 35 — CONTRIBUTING · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Technical Lead — Ingly Design
**Destinatari:** Contributori interni ed esterni, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Guidare chi contribuisce a INGLY Enterprise: setup, workflow, standard, PR e comportamento atteso. È il punto d'ingresso per nuovi sviluppatori (umani o AI) e complementa `CONTRIBUTING.md` del core con le regole specifiche Ingly.

---

## Visione

Contribuire deve essere semplice e sicuro: un percorso chiaro dal clone alla PR, con guardrail che proteggono qualità e compatibilità. Ogni contributo rispetta i principi Enterprise e lascia il progetto migliore.

---

## Obiettivi

1. Onboarding rapido dei contributori.
2. Percorso PR chiaro e conforme.
3. Standard di qualità non negoziabili.
4. Comportamento collaborativo e rispettoso (Code of Conduct).

---

## Setup ambiente

```
# Prerequisiti: Node.js >= 20, PostgreSQL 13+
npm install
# copia e configura le variabili d'ambiente (vedi configExample.text)
npm run dev        # sviluppo con HMR
npm test           # test (Jest)
npm run lint       # lint
npm run build      # build produzione
```

- Configurazione via env (Twelve-Factor, doc 27). Nessun segreto nel repo (doc 24).
- Leggere prima: `CLAUDE.md`, `docs/00_MASTER_PROMPT.md`, e i doc pertinenti al proprio task.

---

## Prima di contribuire — leggere

1. `00_MASTER_PROMPT.md` — contratto operativo.
2. `30_DEVELOPMENT_RULES.md` — regole quotidiane.
3. `32_CODING_STANDARDS.md` — stile.
4. `33_FILE_STRUCTURE.md` — dove mettere il codice.
5. `28_GITHUB_WORKFLOW.md` — branching/PR.
6. Il doc del dominio toccato (es. `18_QUOTER.md`).

---

## Workflow del contributo

```
1. Issue / requisito (FR/NFR)  ─► allineamento a visione (doc 01/02)
2. Analisi ─► docs/analysis/feature-xxx.md
3. Branch feature/<nome> da develop
4. Implementazione (standard doc 32) + test (doc 26)
5. Documentazione (/docs + README modulo)
6. Commit Conventional (doc 28)
7. PR verso develop: descrizione + test + doc + checklist principi
8. Review + CI verde ─► merge
```

Regole:
- PR piccole e focalizzate.
- CI verde obbligatoria; almeno una review.
- Non creare PR se non richiesto (per l'agente Claude).
- Mai `--no-verify`; mai segreti nel diff.

---

## Standard di qualità (Definition of Done)

Un contributo è "done" quando:
- [ ] Rispetta i principi architetturali (doc 00/03).
- [ ] Non modifica il core Evershop (salvo `core-patches/` documentato).
- [ ] Ha test adeguati (unit/integration/E2E) verdi.
- [ ] Documentazione `/docs` + README aggiornati.
- [ ] Lint/type verdi; Conventional Commits.
- [ ] Sicurezza/performance considerate (doc 24/25).
- [ ] Changelog `[Unreleased]` aggiornato (doc 34).

---

## Contributori esterni

- Fork → branch → PR verso il repository (secondo policy).
- Accettare il Code of Conduct (`CODE_OF_CONDUCT.md`).
- Firmare/accettare eventuali requisiti di licenza/contributor.
- Discutere feature significative in una issue **prima** di implementare (evita lavoro sprecato).

---

## Diagramma testuale — Percorso contributore

```
Clone/Fork ─► Setup (env, deps) ─► Issue/Analisi ─► feature/ branch
    │                                                     │
  leggere docs                                     implementa + test + doc
                                                          │
                                                   PR ─► CI+review ─► merge (develop)
```

---

## Best Practice

- Leggere i doc prima di scrivere.
- Preferire estensione (hook/eventi) a modifica.
- Comunicare presto (issue) per feature grandi.
- Test e documentazione contestuali al codice.
- Rispetto e collaborazione nelle review.

---

## Checklist contributore

- [ ] Ambiente configurato (env, deps, DB).
- [ ] Doc pertinenti letti.
- [ ] Branch/commit conformi.
- [ ] Analisi in `docs/analysis/` (feature non banali).
- [ ] Test + documentazione inclusi.
- [ ] CI verde; nessun segreto.
- [ ] Code of Conduct accettato.

---

## Roadmap

1. Guida onboarding + `configExample` chiaro.
2. PR template + issue template.
3. Scaffolding modulo per contributori.
4. Programma contributor esterni (doc 23 marketplace).

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Contributi non conformi | Checklist DoD, CI gate, review |
| Lavoro sprecato | Issue/analisi prima dell'implementazione |
| Onboarding lento | Guida chiara, scaffolding |
| Comportamento tossico | Code of Conduct, moderazione |

---

## Estensioni future

- Ambiente dev containerizzato "one-click".
- Buon-primo-issue e mentoring.
- Riconoscimenti contributori.

---

## Compatibilità con Evershop

Il flusso rispetta `CONTRIBUTING.md` e gli hook/lint del core, aggiungendo le regole Ingly. I contributi restano compatibili con l'upstream perché seguono la disciplina di non-modifica del core.

## Compatibilità con aggiornamenti futuri

Onboarding e standard sono indipendenti dalle versioni del core; gli upgrade upstream passano dallo stesso workflow PR/CI con regressione (doc 26).

---

## See also
- [00 Master Prompt](00_MASTER_PROMPT.md)
- [28 GitHub Workflow](28_GITHUB_WORKFLOW.md)
- [30 Development Rules](30_DEVELOPMENT_RULES.md)
- [34 Changelog Guide](34_CHANGELOG_GUIDE.md)
