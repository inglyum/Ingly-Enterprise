# 34 — CHANGELOG GUIDE · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Release Manager — Ingly Design
**Destinatari:** Tutto il team, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire come si mantiene il **changelog** di INGLY Enterprise: formato, categorie, collegamento ai Conventional Commits e al Semantic Versioning. Un changelog chiaro racconta cosa è cambiato, per utenti e sviluppatori.

---

## Visione

Ogni release ha una storia leggibile. Il changelog non è un dump di commit: è una sintesi curata, categorizzata, orientata a chi legge. Generato dai commit ma rifinito a mano dove serve.

---

## Obiettivi

1. Formato coerente (Keep a Changelog).
2. Collegamento a Conventional Commits e SemVer.
3. Sintesi leggibile per utenti e integratori.
4. Tracciabilità (commit/PR/requisiti).

---

## Formato (Keep a Changelog)

```md
# Changelog

## [Unreleased]
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security

## [1.2.0] - 2026-08-01
### Added
- Quoter: calcolo prezzo deterministico (#123)
### Fixed
- CRM: deduplica lead per email (#130)
```

Categorie: **Added**, **Changed**, **Deprecated**, **Removed**, **Fixed**, **Security**.

---

## Mappatura Conventional Commits → categoria

| Commit type | Categoria changelog | Impatto SemVer |
|-------------|---------------------|----------------|
| `feat` | Added / Changed | MINOR |
| `fix` | Fixed | PATCH |
| `perf` | Changed | PATCH/MINOR |
| `refactor` | (di norma non in user changelog) | PATCH |
| `docs`/`test`/`chore`/`ci` | (escluso o "Internal") | — |
| `BREAKING CHANGE` (footer) | Changed/Removed (evidenziato) | MAJOR |

I `BREAKING CHANGE` sono sempre evidenziati con nota di migrazione.

---

## Semantic Versioning (SemVer)

```
MAJOR.MINOR.PATCH
  │     │     └─ fix retrocompatibili
  │     └─────── funzionalità retrocompatibili
  └───────────── breaking change (API/comportamento)
```

Dettagli di rilascio in `36_RELEASE_PROCESS.md`. Il versioning delle **API** (`/v1`) è separato dal versioning del prodotto (doc 09).

---

## Processo

```
Commit (conventional) ─► [genera bozza changelog] ─► curatela umana ─► release notes
        │                        │                          │
    PR con scope           tool/CI (doc 28)          sintesi leggibile (doc 36)
```

- `[Unreleased]` accumula durante lo sviluppo.
- Alla release, `[Unreleased]` diventa la versione con data.
- Voci con link a PR/issue e, dove utile, a requisiti (`FR/NFR`).

---

## Diagramma testuale — Dal commit alla release note

```
feat(quoter): ...        ┐
fix(crm): ...            ├─► raggruppa per categoria ─► [Unreleased] ─► [1.2.0] 2026-08-01
BREAKING CHANGE: ...     ┘        (curatela + note migrazione)
```

---

## Best Practice

- Scrivere voci pensando a **chi legge** (utente/integratore), non come log tecnico.
- Evidenziare breaking change e passi di migrazione.
- Collegare a PR/issue.
- Tenere `[Unreleased]` sempre aggiornato durante lo sviluppo.
- Non includere rumore (chore/ci) nel changelog utente.

---

## Checklist changelog (per release)

- [ ] `[Unreleased]` consolidato nella nuova versione con data ISO.
- [ ] Voci categorizzate (Added/Changed/…).
- [ ] Breaking change evidenziati + note migrazione.
- [ ] Link a PR/issue.
- [ ] Versione coerente con SemVer.
- [ ] Sintesi leggibile (non dump di commit).

---

## Roadmap

1. Adottare Keep a Changelog + SemVer.
2. Generazione bozza da Conventional Commits (CI, doc 28).
3. Curatela + release notes automatizzate (doc 36).

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Changelog illeggibile | Curatela umana, categorie |
| Breaking change non segnalato | Footer `BREAKING CHANGE`, evidenza |
| Versione errata | Mappatura commit→SemVer |
| Drift con i commit | Generazione da commit + review |

---

## Estensioni future

- Release notes multi-audience (utente vs sviluppatore).
- Localizzazione delle note.
- Changelog per singolo modulo/plugin.

---

## Compatibilità con Evershop

Il repo mantiene già un `changelog.md`; la guida Ingly ne definisce formato e processo. Gli aggiornamenti del core assorbiti vengono annotati nel changelog Ingly (sezione "Upstream").

## Compatibilità con aggiornamenti futuri

Ogni assorbimento di un upgrade Evershop produce una voce di changelog (Changed/Security) con eventuali note di migrazione, mantenendo tracciabilità della compatibilità nel tempo.

---

## See also
- [28 GitHub Workflow](28_GITHUB_WORKFLOW.md)
- [36 Release Process](36_RELEASE_PROCESS.md)
- [09 API](09_API.md)
