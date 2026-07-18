# INGLY Enterprise — Framework Documentale

**Versione framework:** 1.0.0 · **Data:** 18 luglio 2026 · **Proprietario:** CTO Office — Ingly Design

Questo è il **framework documentale Enterprise** di INGLY Enterprise, la piattaforma gestionale unificata di Ingly Design costruita **estendendo il core di Evershop** senza modificarlo.

> **Fonte di verità.** In caso di conflitto tra documenti, prevale `00_MASTER_PROMPT.md`. La documentazione è un deliverable obbligatorio: ogni feature aggiorna i doc pertinenti nella stessa PR.

---

## Come usare questa cartella

- **Nuovo del progetto?** Leggi in ordine: `00` → `01` → `03` → `30`/`31`.
- **Devi implementare una feature?** Leggi `31_CLAUDE_GUIDELINES.md` + il doc del dominio + `32`/`33`.
- **Devi rilasciare?** `26` → `27` → `36`.
- **Idea futura?** Registrala in `37_FUTURE_MODULES.md` (non implementare senza roadmap).

Cartelle operative:
- `docs/analysis/` — mini-documenti di analisi per ogni feature (fase 1 del workflow).
- `docs/core-patches/` — patch isolate ed eccezionali al core Evershop, documentate.

---

## Indice dei documenti

### Fondamenta & Prodotto
| # | Documento | Contenuto |
|---|-----------|-----------|
| 00 | [Master Prompt](00_MASTER_PROMPT.md) | Contratto operativo radice, regole inviolabili |
| 01 | [Project Vision](01_PROJECT_VISION.md) | Visione, missione, valori, personas, metriche |
| 02 | [Product Requirements](02_PRODUCT_REQUIREMENTS.md) | Requisiti funzionali e non funzionali (FR/NFR) |
| 03 | [System Architecture](03_SYSTEM_ARCHITECTURE.md) | Architettura, layer, eventi, stack, vincoli |

### UX & Design
| # | Documento | Contenuto |
|---|-----------|-----------|
| 04 | [Branding](04_BRANDING.md) | Identità di marca, logo, colori, tono di voce |
| 05 | [Design System](05_DESIGN_SYSTEM.md) | Token, componenti, griglia, accessibilità |
| 06 | [Admin Panel](06_ADMIN_PANEL.md) | Pannello amministrativo, IA, pattern di pagina |
| 07 | [Website](07_WEBSITE.md) | Storefront, customer journey, configuratore |

### Piattaforma
| # | Documento | Contenuto |
|---|-----------|-----------|
| 08 | [Database](08_DATABASE.md) | Schema, convenzioni PostgreSQL, migrazioni |
| 09 | [API](09_API.md) | REST v1 + GraphQL, versioning, error handling |
| 10 | [Authentication](10_AUTHENTICATION.md) | Autenticazione, sessioni, token, OAuth2 |
| 11 | [User Roles](11_USER_ROLES.md) | RBAC, permessi, ACL |
| 12 | [Media Library](12_MEDIA_LIBRARY.md) | Asset digitali, varianti, CDN |

### Domini di business
| # | Documento | Contenuto |
|---|-----------|-----------|
| 13 | [Ecommerce](13_ECOMMERCE.md) | Catalogo, checkout, pagamenti (core + estensioni) |
| 14 | [CMS](14_CMS.md) | Pagine, blog, portfolio, SEO on-page |
| 15 | [CRM](15_CRM.md) | Clienti, lead, pipeline, comunicazioni |
| 16 | [Production](16_PRODUCTION.md) | Ordini di produzione, coda, scheduling |
| 17 | [Laser Center](17_LASER_CENTER.md) | Macchine, materiali, parametri laser |
| 18 | [Quoter](18_QUOTER.md) | Preventivi deterministici + AI |
| 19 | [AI Assistant](19_AI_ASSISTANT.md) | AI multi-provider, guardrail, human-in-the-loop |
| 20 | [Automations](20_AUTOMATIONS.md) | Workflow event-driven (trigger → azioni) |
| 21 | [Analytics](21_ANALYTICS.md) | BI, KPI, read model (CQRS light) |
| 22 | [Marketing](22_MARKETING.md) | SEO, email, promozioni, attribuzione |

### Estensibilità, qualità & operazioni
| # | Documento | Contenuto |
|---|-----------|-----------|
| 23 | [Plugin System](23_PLUGIN_SYSTEM.md) | Estensioni isolate, hook/eventi, ciclo di vita |
| 24 | [Security](24_SECURITY.md) | OWASP, GDPR, segreti, audit |
| 25 | [Performance](25_PERFORMANCE.md) | Budget, caching, ottimizzazione, benchmark |
| 26 | [Testing](26_TESTING.md) | Piramide test, coverage, regressione |
| 27 | [Deployment](27_DEPLOYMENT.md) | CI/CD, ambienti, container, rollback |
| 28 | [GitHub Workflow](28_GITHUB_WORKFLOW.md) | Branching, PR, Actions, protezioni |

### Governance & processo
| # | Documento | Contenuto |
|---|-----------|-----------|
| 29 | [Roadmap](29_ROADMAP.md) | Fasi, milestone, criteri di rilascio |
| 30 | [Development Rules](30_DEVELOPMENT_RULES.md) | Regole operative del team |
| 31 | [Claude Guidelines](31_CLAUDE_GUIDELINES.md) | Guida operativa per Claude Code |
| 32 | [Coding Standards](32_CODING_STANDARDS.md) | Stile, ESLint/Prettier, anti-pattern |
| 33 | [File Structure](33_FILE_STRUCTURE.md) | Organizzazione file e cartelle |
| 34 | [Changelog Guide](34_CHANGELOG_GUIDE.md) | Changelog, Conventional Commits, SemVer |
| 35 | [Contributing](35_CONTRIBUTING.md) | Guida ai contributori |
| 36 | [Release Process](36_RELEASE_PROCESS.md) | Procedura di rilascio + upgrade upstream |
| 37 | [Future Modules](37_FUTURE_MODULES.md) | Backlog strategico (YAGNI) |

---

## Principi non negoziabili (sintesi)

1. **Mai modificare il core Evershop** (salvo `core-patches/` documentato).
2. **Ogni capacità = modulo** in `packages/evershop/src/modules/ingly/<dominio>/`.
3. **Workflow a 7 fasi**: Analisi → Piano → Approvazione → Implementazione → Test → Documentazione → Review.
4. **Test + documentazione** come Definition of Done.
5. **API versionate** (`/api/v1/`), **RBAC server-side**, **sicurezza by design**.
6. **Registrazioni solo in `bootstrap.ts`**; **Conventional Commits**; branching disciplinato.

---

## Convenzioni dei documenti

Ogni documento segue la struttura: **Scopo · Visione · Obiettivi · Architettura/Contenuto · Workflow · Diagrammi testuali · Convenzioni · Best Practice · Checklist · Roadmap · Rischi · Estensioni future · Compatibilità con Evershop · Compatibilità con aggiornamenti futuri**. Date in formato ISO `YYYY-MM-DD`. Riferimenti file in formato `path:line`.
