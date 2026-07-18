# 33 — FILE STRUCTURE · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Technical Lead — Ingly Design
**Destinatari:** Tutto il team, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Documentare l'**organizzazione di file e cartelle** del repository: dove vive il core Evershop, dove vivono i moduli Ingly, dove la documentazione, i test e le estensioni. Fornisce la mappa per orientarsi e per collocare correttamente il nuovo codice.

---

## Visione

Una struttura prevedibile: sapere dove sta ogni cosa e dove metterla. I moduli Ingly hanno un posto dedicato e una forma interna coerente (layering), separati dal core.

---

## Obiettivi

1. Mappa chiara del repository.
2. Collocazione corretta di moduli, doc, test, estensioni.
3. Coerenza con le convenzioni Evershop.
4. Separazione netta core / Ingly / estensioni.

---

## Struttura del repository (alto livello)

```
Ingly-Enterprise/
├── docs/                     # Framework documentale INGLY (questo)
│   ├── 00_MASTER_PROMPT.md ... 37_FUTURE_MODULES.md
│   ├── analysis/             # mini-documenti di analisi per feature
│   └── core-patches/         # patch isolate al core (eccezionali, documentate)
├── packages/
│   └── evershop/
│       └── src/
│           └── modules/
│               ├── <core>/           # moduli core Evershop (auth, catalog, checkout, oms, ...)
│               └── ingly/            # MODULI INGLY (dominio verticale)
│                   ├── crm/
│                   ├── media/
│                   ├── production/
│                   ├── laser/
│                   ├── quoter/
│                   ├── ai/
│                   ├── automation/
│                   ├── analytics/
│                   └── portfolio/
├── extensions/               # plugin/estensioni (doc 23)
├── translations/             # i18n
├── seed/                     # dati di seed (incl. DB di test)
├── tests/                    # test a livello repo
├── .github/                  # workflow CI (doc 28)
├── Dockerfile, docker-compose.yml
├── package.json, tsconfig.json, eslint.config.js, .prettierrc
└── CLAUDE.md                 # istruzioni per Claude (core Evershop wiki)
```

> Nota: `docs/` è **versionato** in questo progetto (è stato rimosso da `.gitignore`), perché il framework documentale è un deliverable.

---

## Struttura interna di un modulo Ingly

```
modules/ingly/<dominio>/
├── bootstrap.ts        # UNICO punto di registrazione (hook/processor/widget/job/permessi)
├── domain/             # entità, value object, interfacce (IRepository, IService)
├── application/        # use case / service (logica di business)
├── infrastructure/     # repository Postgres, adapter esterni
├── api/                # handler REST v1
├── pages/              # componenti React (admin/frontStore)
│   ├── admin/<route>/
│   └── frontStore/<route>/
├── graphql/            # *.graphql (+ *.admin.graphql), resolver
├── migration/          # Version-X.Y.Z.ts
├── subscribers/        # <event_name>/<handler>.ts
├── services/           # servizi condivisi del modulo
├── tests/
│   ├── unit/
│   └── integration/
└── README.md           # documentazione del modulo (obbligatoria)
```

**Regola di dipendenza:** `pages/api/graphql → application → domain`; `infrastructure` implementa le interfacce di `domain`. Il `domain` non importa Express/React/Evershop.

---

## Convenzioni di collocazione

| Cosa | Dove |
|------|------|
| Nuovo dominio Ingly | `modules/ingly/<dominio>/` |
| Analisi di feature | `docs/analysis/feature-xxx.md` |
| Patch core (eccezionale) | `docs/core-patches/` + file `*.ingly.patch.*` |
| Plugin/estensione | `extensions/<plugin>/` |
| Migrazione | `<modulo>/migration/Version-X.Y.Z.ts` |
| Subscriber evento | `<modulo>/subscribers/<event>/<handler>.ts` |
| Pagina admin | `<modulo>/pages/admin/<route>/` |
| Pagina storefront | `<modulo>/pages/frontStore/<route>/` |
| Site-wide admin/front | `pages/admin/all/`, `pages/frontStore/all/`, `pages/global/`, `api/global/` |
| Documentazione modulo | `<modulo>/README.md` |

---

## Diagramma testuale — Separazione delle responsabilità

```
docs/            ← contratto & conoscenza (governance)
packages/.../modules/<core>   ← Evershop (intatto)
packages/.../modules/ingly/*  ← dominio Ingly (layering)
extensions/*     ← plugin (agganci ufficiali)
translations/    ← i18n
seed/ tests/     ← dati & test
```

---

## Best Practice

- Ogni dominio nuovo → cartella dedicata in `modules/ingly/` con layering completo.
- README del modulo sempre presente e aggiornato.
- Non mescolare responsabilità tra cartelle (SRP).
- Patch al core solo in `core-patches/` con file esplicito e analisi.
- Test accanto al modulo (`tests/unit`, `tests/integration`).

---

## Checklist collocazione (nuovo codice)

- [ ] Il codice è nel modulo/dominio corretto.
- [ ] Layering rispettato (dominio puro).
- [ ] Convenzioni file Evershop (route/middleware/migration/subscriber).
- [ ] README del modulo aggiornato.
- [ ] Test nella cartella `tests/` del modulo.
- [ ] Nessun file core modificato fuori da `core-patches/`.

---

## Roadmap

1. Scaffold `modules/ingly/` + template modulo.
2. `docs/analysis/` e `docs/core-patches/` come cartelle attive.
3. Generatore di modulo conforme (scaffold CLI, futuro).

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Codice collocato male | Mappa + checklist collocazione |
| Layering violato | Regola dipendenza + review |
| Patch core sparse | Solo `core-patches/`, documentate |
| Moduli disomogenei | Template modulo standard |

---

## Estensioni future

- CLI di scaffolding per nuovi moduli/plugin conformi.
- Verifica automatica della struttura in CI.

---

## Compatibilità con Evershop

La struttura rispetta l'organizzazione `packages/evershop/src/modules/` e le convenzioni file del core. I moduli Ingly sono una sottocartella dedicata; il core resta al suo posto e intatto.

## Compatibilità con aggiornamenti futuri

Isolando i moduli Ingly in `modules/ingly/` e le patch in `core-patches/`, gli aggiornamenti del core (nuovi/aggiornati moduli core) non collidono con il codice Ingly.

---

## See also
- [03 System Architecture](03_SYSTEM_ARCHITECTURE.md)
- [23 Plugin System](23_PLUGIN_SYSTEM.md)
- [32 Coding Standards](32_CODING_STANDARDS.md)
