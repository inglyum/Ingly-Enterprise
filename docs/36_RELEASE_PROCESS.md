# 36 — RELEASE PROCESS · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Release Manager — Ingly Design
**Destinatari:** DevOps, Technical Lead, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire la **procedura di rilascio** di INGLY Enterprise: da `develop` a produzione, con versioning, changelog, test di regressione (incluso l'assorbimento degli upgrade Evershop), tagging e deploy. Rende i rilasci ripetibili e sicuri.

---

## Visione

Rilasciare senza ansia. Ogni release segue una checklist, passa da staging, ha changelog e tag, ed è reversibile. La compatibilità con Evershop è verificata a ogni giro.

---

## Obiettivi

1. Rilasci ripetibili, tracciabili e reversibili.
2. Versioning semantico coerente (doc 34).
3. Regressione e compatibilità Evershop verificate (doc 26).
4. Changelog e release notes curati.
5. Rollback rapido.

---

## Semantic Versioning

```
MAJOR.MINOR.PATCH
  │     │     └─ fix retrocompatibili
  │     └─────── feature retrocompatibili
  └───────────── breaking change (nota migrazione obbligatoria)
```

La versione deriva dai Conventional Commits accumulati in `[Unreleased]` (doc 34).

---

## Tipi di release

| Tipo | Origine | Uso |
|------|---------|-----|
| **Release pianificata** | `release/x.y.z` da `develop` | Feature/fix accumulati |
| **Hotfix** | `hotfix/x.y.z+1` da `main` | Urgenze in produzione |
| **Upstream absorption** | branch dedicato | Aggiornamento Evershop |

---

## Procedura release pianificata

```
1. Da develop: crea release/x.y.z
2. Version bump (SemVer) + consolida changelog [Unreleased] → [x.y.z] (doc 34)
3. Suite completa: lint + typecheck + test + coverage + build + security + perf (doc 25/26)
4. Deploy in STAGING + migrazioni (expand/contract) + UAT
5. Regressione integrazioni Evershop (eventi, checkout, payment, widget)
6. Approvazione release
7. Merge in main + tag vX.Y.Z (solo da main)
8. Deploy PRODUZIONE (rolling/blue-green) + backup pre-migrazione
9. Merge release → develop (allinea)
10. Release notes pubblicate; monitoraggio post-deploy
```

---

## Assorbimento upgrade Evershop (upstream)

```
1. Analisi di impatto sui moduli Ingly (API/eventi/query builder cambiati?)
2. Branch dedicato; merge upstream
3. Adegua patch in docs/core-patches/ se necessario
4. Suite di REGRESSIONE completa (doc 26)
5. Staging + verifica integrazioni critiche
6. Voce changelog (Changed/Security) + note migrazione (doc 34)
7. Release secondo procedura standard
```

La compatibilità con la nuova versione Evershop è **dichiarata** nelle release notes.

---

## Migrazioni in release

- Preferire **expand/contract** per zero-downtime (doc 27).
- Backup **prima** di migrazioni potenzialmente distruttive.
- Migrazioni Ingly (`Version-X.Y.Z.ts`) convivono con quelle core (prefissi, versioning, doc 08).

---

## Diagramma testuale — Pipeline di release

```
develop ─► release/x.y.z ─► CI completa ─► STAGING+UAT+regressione ─► approvazione
                                                                          │
                                                                merge main + tag
                                                                          │
                                                        PRODUZIONE (blue-green) + backup
                                                                          │
                                                          release notes + monitoraggio/rollback
```

---

## Rollback

- Deploy dell'artefatto precedente (immutabile, doc 27).
- Migrazioni progettate reversibili/compatibili; se necessario, ripristino da backup.
- Feature flag per disattivare rapidamente funzionalità problematiche.

---

## Best Practice

- Nessuna release senza CI verde e regressione Evershop.
- Backup verificato prima di migrazioni.
- Tag solo da `main`; versione coerente con SemVer.
- Release notes curate (doc 34).
- Monitorare attivamente dopo il deploy.

---

## Checklist release

- [ ] Version bump SemVer coerente.
- [ ] Changelog consolidato con data ISO.
- [ ] CI completa verde (lint/test/build/security/perf).
- [ ] Staging + UAT ok.
- [ ] Regressione integrazioni Evershop ok.
- [ ] Backup pre-migrazione eseguito.
- [ ] Tag da `main`; deploy zero-downtime.
- [ ] Release notes pubblicate.
- [ ] Piano rollback pronto; monitoraggio attivo.
- [ ] Compatibilità Evershop dichiarata (se upgrade upstream).

---

## Roadmap

1. Procedura + checklist release.
2. CI di release con gate completi.
3. Automazione tag/changelog/release notes.
4. Blue-green + feature flag + rollback provato.
5. Rehearsal upgrade Evershop periodici.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Release rompe prod | Staging, regressione, blue-green, rollback |
| Upgrade Evershop rompe moduli | Analisi impatto + regressione + staging |
| Migrazione distruttiva | Expand/contract, backup |
| Versione/changelog errati | SemVer + curatela + automazione |

---

## Estensioni future

- Release completamente automatizzata (semantic-release).
- Canary release.
- DR e failover multi-region.

---

## Compatibilità con Evershop

Il processo include esplicitamente l'assorbimento controllato degli upgrade upstream con analisi di impatto e regressione, coerente con la strategia di non-modifica del core (doc 00/03).

## Compatibilità con aggiornamenti futuri

Ogni upgrade Evershop segue la stessa pipeline di release con dichiarazione di compatibilità nelle note: così l'evoluzione del core è tracciata e sotto controllo release dopo release.

---

## See also
- [26 Testing](26_TESTING.md)
- [27 Deployment](27_DEPLOYMENT.md)
- [28 GitHub Workflow](28_GITHUB_WORKFLOW.md)
- [34 Changelog Guide](34_CHANGELOG_GUIDE.md)
