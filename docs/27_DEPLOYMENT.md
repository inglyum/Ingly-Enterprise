# 27 — DEPLOYMENT · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** DevOps / Platform Engineer — Ingly Design
**Destinatari:** DevOps, Backend, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire **CI/CD**, **ambienti**, **infrastruttura** e **procedure operative** per rilasciare INGLY Enterprise in modo affidabile e ripetibile. Basato su container (Docker) e principi Twelve-Factor.

---

## Visione

Rilasci frequenti, piccoli e sicuri. Ogni ambiente è riproducibile; la configurazione è esterna al codice; i rollback sono rapidi. La pipeline garantisce qualità (test, lint, budget, security) prima della produzione.

---

## Obiettivi

1. Build riproducibili e artefatti versionati.
2. Ambienti coerenti (dev → staging → prod).
3. CI/CD con gate di qualità.
4. Deploy sicuri con rollback rapido.
5. Osservabilità e backup in produzione.

---

## Ambienti

| Ambiente | Scopo | Note |
|----------|-------|------|
| **Development** | Sviluppo locale | `npm run dev` (webpack-dev-middleware + HMR) |
| **Test/CI** | Test automatici | DB effimero, seed |
| **Staging** | Pre-produzione, UAT | Dati simili a prod, upgrade rehearsal |
| **Production** | Utenti reali | HA, backup, monitoring |

Configurazione **solo via variabili d'ambiente** (Twelve-Factor); nessun segreto nel codice (doc 24).

---

## Build & artefatti

- Sorgenti in `src/` compilate con **SWC** in `dist/` (`npm run compile`); runtime carica `.js` da `dist/`.
- Build produzione: `npm run build` → `npm run start`.
- **Container Docker** (Dockerfile presente) come unità di deploy; `docker-compose.yml` per l'orchestrazione locale.
- Artefatti immutabili e versionati (tag = versione release, doc 36).

---

## Pipeline CI/CD

```
Push/PR
  ├─ install (cache dipendenze)
  ├─ lint (npm run lint)  ────────────┐
  ├─ typecheck                        │  GATE: tutto verde
  ├─ test (npm test) + coverage       │  altrimenti blocco
  ├─ build (compile/build)            │
  ├─ security scan (dip./secret)      │
  └─ performance budget (doc 25) ─────┘
        │ (su branch di release)
        ▼
  build immagine ─► push registry ─► deploy staging ─► (UAT) ─► deploy prod
```

Dettagli GitHub Actions in `28_GITHUB_WORKFLOW.md`.

---

## Migrazioni in deploy

- Le migrazioni DB (doc 08, `Version-X.Y.Z.ts`) vengono eseguite in modo controllato durante il deploy.
- **Backward-compatible first**: preferire migrazioni additive; le rimozioni avvengono in step separati (expand/contract) per zero-downtime.
- Backup **prima** di migrazioni potenzialmente distruttive.

---

## Strategia di rilascio

- **Rolling / blue-green** per zero-downtime dove possibile.
- **Feature flag** per rilasci graduali e kill-switch.
- **Rollback** rapido all'artefatto precedente; le migrazioni sono progettate per essere reversibili o compatibili.

---

## Osservabilità e backup

- Log su **stdout** (JSON strutturato), raccolti dal collector.
- Metriche/alert su latenza, error rate, saturazione (doc 25).
- **Backup** DB e media periodici, verificati e ripristinabili (doc 08/24).
- Health check e readiness/liveness probe.

---

## Diagramma testuale — Flusso di deploy

```
main/release ─► CI (gate) ─► build immagine ─► registry
                                   │
                                   ▼
                             staging (UAT, migrazioni)
                                   │  approvazione
                                   ▼
                             produzione (rolling/blue-green)
                                   │
                        monitoring/alert ─► rollback se necessario
```

---

## Best Practice

- Config in env; segreti gestiti (doc 24), mai nel repo.
- Artefatti immutabili e versionati.
- Migrazioni expand/contract per zero-downtime.
- Backup prima di ogni migrazione rischiosa.
- Rollback provato, non solo teorico.

---

## Checklist deploy

- [ ] CI verde (lint, test, build, security, budget).
- [ ] Migrazioni backward-compatible / expand-contract.
- [ ] Backup pre-migrazione eseguito.
- [ ] Config/segreti via env.
- [ ] Health check e probe configurati.
- [ ] Piano di rollback pronto.
- [ ] Monitoring/alert attivi post-deploy.

---

## Roadmap

1. Pipeline CI con gate (lint/test/build).
2. Immagini Docker + registry + staging.
3. Migrazioni controllate + backup.
4. Blue-green/rolling + feature flag.
5. Osservabilità completa + DR (disaster recovery).

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Deploy che rompe la prod | Gate CI, staging, blue-green, rollback |
| Migrazione distruttiva | Expand/contract, backup |
| Segreti esposti | Env + secret manager |
| Downtime | Zero-downtime deploy, probe |

---

## Estensioni future

- IaC (Terraform) per infrastruttura.
- Autoscaling orizzontale (app stateless, doc 03).
- Canary release automatizzato.
- DR multi-region.

---

## Compatibilità con Evershop

Si usa il modello build/run di Evershop (SWC `src`→`dist`, `build`/`start`) e il Dockerfile del repo. Il deploy dei moduli Ingly è parte dello stesso artefatto; nessuna infrastruttura separata richiesta inizialmente (monolite modulare).

## Compatibilità con aggiornamenti futuri

Gli upgrade Evershop entrano nella stessa pipeline: rehearsal in staging con suite di regressione (doc 26) prima della produzione. Le migrazioni Ingly convivono con quelle core (prefissi, versioning).

---

## See also
- [24 Security](24_SECURITY.md)
- [25 Performance](25_PERFORMANCE.md)
- [28 GitHub Workflow](28_GITHUB_WORKFLOW.md)
- [36 Release Process](36_RELEASE_PROCESS.md)
