# 00 — MASTER PROMPT · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** CTO — Ingly Design
**Destinatari:** Claude Code, Team di Sviluppo, AI Agent, Technical Lead
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Questo documento costituisce il **prompt principale** e il **contratto operativo** per ogni agente AI, sviluppatore o collaboratore che lavora su **Ingly Enterprise**.
Definisce l'identità del progetto, le regole inviolabili, i principi architetturali, i workflow di sviluppo, i vincoli di compatibilità e il sistema di documentazione che governa l'intero ciclo di vita del prodotto.

Ogni conversazione, modifica al codice, progettazione di moduli o attività di refactoring **DEVE** riferirsi a questo Master Prompt come fonte primaria di verità operativa.

Questo documento è il **documento radice** dell'intero framework `/docs`. Tutti gli altri documenti (01–37) discendono da esso, lo dettagliano e non possono contraddirlo. In caso di conflitto tra un documento specifico e il Master Prompt, prevale il Master Prompt fino a quando la contraddizione non viene risolta con una PR esplicita.

---

## Visione

Ingly Enterprise non è un semplice e-commerce basato su Evershop.
È la **piattaforma gestionale unificata** che digitalizza e orchestra tutti i processi di Ingly Design:

- vendita online di prodotti personalizzati al laser,
- gestione completa della produzione (materiali, macchine, laboratorio),
- relazione con i clienti (CRM),
- creazione automatica di preventivi basata su AI,
- business intelligence,
- automazione dei flussi di lavoro,
- gestione documentale e media,
- estensibilità tramite plugin system,
- e molto altro ancora.

Tutto questo deve essere realizzato **estendendo il core di Evershop senza stravolgerlo**, così da garantire aggiornabilità, manutenibilità e una netta separazione delle responsabilità.

---

## Obiettivi del Master Prompt

1. **Guidare** ogni decisione tecnica e funzionale presa da Claude Code.
2. **Vincolare** lo sviluppo ai principi dell'Enterprise Architecture (Clean Architecture, SOLID, DDD, EDA).
3. **Preservare** la compatibilità con gli aggiornamenti ufficiali di Evershop.
4. **Garantire** coerenza documentale: ogni modifica deve riflettersi nei documenti `/docs`.
5. **Ridurre** il debito tecnico e la duplicazione del codice.
6. **Imporre** un workflow strutturato: Analisi → Piano → Approvazione → Implementazione → Test → Documentazione → Review.

---

## Principi architetturali fondamentali

Ogni decisione tecnica deve rispettare:

| Principio | Applicazione in Ingly Enterprise |
|-----------|----------------------------------|
| **Clean Architecture** | Separazione tra Domain, Application, Infrastructure e Presentation. Il core di Evershop non viene toccato; nuove funzionalità risiedono in strati esterni. |
| **SOLID** | Ogni modulo è una unità con una singola responsabilità, aperto all'estensione, chiuso alla modifica. |
| **DRY** | Ogni logica di business esiste in un unico punto; i moduli la richiamano via API o service layer. |
| **KISS** | Le soluzioni preferite sono le più semplici compatibili con i requisiti. Complessità introdotta solo se giustificata da esigenze non negoziabili. |
| **YAGNI** | Nessuna feature viene sviluppata "perché potrebbe servire in futuro". Si implementa solo ciò che è richiesto dalla roadmap corrente. |
| **Domain Driven Design** | Il dominio è modellato attorno a Bounded Context espliciti: Ecommerce, CRM, Produzione, Preventivi, Media, AI, Automazioni. Ognuno ha il proprio linguaggio ubiquo. |
| **Event Driven Architecture** | I moduli comunicano tramite eventi asincroni (es. OrderPlaced → avvia produzione, notifica CRM, aggiorna inventario). |
| **Component Driven Design** | L'interfaccia utente (Admin Panel e Website) è costruita con componenti riutilizzabili e indipendenti. |
| **Feature Driven Development** | Ogni nuova capacità (es. Quoter, Laser Center) è sviluppata come feature completa, testabile e rilasciabile indipendentemente. |
| **Modular Architecture** | Ogni dominio è un modulo autocontenuto con API pubbliche ben definite. |
| **Layered Architecture** | All'interno di ogni modulo: Controller → Service → Repository → Domain Entity. |
| **Plugin System** | Le estensioni di terze parti o sviluppate internamente devono poter essere installate come plugin, senza alterare il core o i moduli principali. |

---

## Regole operative inviolabili

1. **Mai modificare il core di Evershop** se non per bug critici bloccanti, e solo con un'analisi di impatto documentata in `/docs/core-patches/`.
2. **Ogni nuova capacità deve essere sviluppata come modulo separato** all'interno di `packages/evershop/src/modules/ingly/{dominio}/`.
3. **Nessuna modifica diretta su `main`**. Il flusso è: `feature/xxx` → `develop` → `release/x.x.x` → `main`.
4. **Prima di scrivere codice**, Claude deve:
   - analizzare il codice esistente coinvolto,
   - individuare i punti di estensione ufficiali di Evershop (hook, eventi, override, API),
   - produrre un mini-documento di analisi e proposta (`/docs/analysis/feature-xxx.md`).
5. **Ogni feature deve essere accompagnata da test** (unitari, integrazione, E2E a seconda della criticità).
6. **La documentazione è un deliverable obbligatorio**, non accessorio. Ogni modulo deve avere il proprio `README.md` nella cartella del modulo e aggiornare i documenti globali pertinenti.
7. **Le API pubbliche di ogni modulo devono essere versionate** (`/api/v1/...`).
8. **Il design system e il branding di Ingly Design sono vincolanti** per ogni interfaccia utente.
9. **Tutti i messaggi di commit devono seguire il formato Conventional Commits**.
10. **Nessuna dipendenza esterna può essere aggiunta senza valutazione e approvazione** (da parte del Technical Lead / CTO simulato da Claude stesso in fase di analisi).

---

## Workflow di sviluppo (Claude Code)

Claude Code deve seguire rigidamente questo flusso per ogni attività:

### 1. ANALISI
- Leggere i requisiti (da documenti `/docs`, issue, richieste utente).
- Mappare il codice esistente coinvolto.
- Identificare i punti di estensione di Evershop.
- Produrre un documento di analisi (`/docs/analysis/...`).

### 2. PIANO
- Proporre l'architettura della soluzione.
- Identificare i file nuovi e quelli da modificare.
- Stimare l'impatto sugli altri moduli.
- Sottoporre il piano all'approvazione (simulata o reale).

### 3. APPROVAZIONE
- Attende conferma esplicita (nel contesto della conversazione) prima di scrivere codice.
- Se non specificato, assume il ruolo di CTO e approva internamente, ma deve esplicitarlo.

### 4. IMPLEMENTAZIONE
- Scrivere il codice nel branch corretto.
- Seguire gli standard di codifica (`/docs/32_CODING_STANDARDS.md`).
- Mantenere compatibilità con Evershop e con il Plugin System.
- Non introdurre debito tecnico senza segnalarlo.

### 5. TEST
- Scrivere test automatici.
- Verificare che i test esistenti passino.
- Eseguire controlli di performance e sicurezza, se applicabile.

### 6. DOCUMENTAZIONE
- Aggiornare i file in `/docs` pertinenti.
- Aggiungere commenti JSDoc/TSDoc al codice.
- Creare o aggiornare il README del modulo.

### 7. REVIEW
- Simulare una code review (Claude analizza il proprio codice alla ricerca di bug, inefficienze, violazioni dei principi).
- Suggerire miglioramenti.
- Preparare il riepilogo per il commit e per la pull request.

---

## Workflow Git

- **main**: produzione, stabile, protetto.
- **develop**: integrazione, contiene le feature approvate.
- **feature/<nome>**: sviluppo di nuove funzionalità.
- **bugfix/<nome>**: correzioni di bug.
- **release/<versione>**: preparazione al rilascio.
- **hotfix/<nome>**: correzioni urgenti su main.

Ogni branch feature deve derivare da `develop` e fondersi in `develop` tramite Pull Request.
Ogni PR deve includere: descrizione, test, documentazione aggiornata, checklist di conformità ai principi architetturali.

---

## Compatibilità con Evershop

**Impegno primario:** Ingly Enterprise deve poter ricevere aggiornamenti dal repository upstream di Evershop senza rompere le estensioni.

**Strategia:**
- Le personalizzazioni del core sono ridotte al minimo indispensabile.
- Ogni modifica al core è isolata in file separati con nomi espliciti (es. `originalFile.ingly.patch.js`), documentata e testata.
- L'override di template, hook ed eventi utilizza esclusivamente i meccanismi ufficiali di estensione di Evershop.
- I moduli Ingly risiedono interamente nella directory `packages/evershop/src/modules/ingly/`, con un proprio `bootstrap.ts` e sistema di build, indipendenti dal core.

**Aggiornamenti futuri:**
- Prima di ogni aggiornamento di Evershop, verrà eseguita una analisi di impatto sui moduli Ingly.
- I test di regressione devono coprire tutte le integrazioni critiche.
- La compatibilità con le nuove versioni di Evershop sarà dichiarata nella documentazione di release.

---

## Struttura del framework documentale

Questo Master Prompt è il documento radice.
La struttura completa in `/docs` comprende:

| Documento | Contenuto |
|-----------|-----------|
| `00_MASTER_PROMPT.md` | Questo documento |
| `01_PROJECT_VISION.md` | Visione, missione, valori del prodotto |
| `02_PRODUCT_REQUIREMENTS.md` | Requisiti funzionali e non funzionali |
| `03_SYSTEM_ARCHITECTURE.md` | Architettura generale, diagrammi, stack tecnologico |
| `04_BRANDING.md` | Identità del marchio, logo, colori, tono di voce |
| `05_DESIGN_SYSTEM.md` | Design token, componenti UI, griglie, tipografia |
| `06_ADMIN_PANEL.md` | Progettazione pannello amministrativo |
| `07_WEBSITE.md` | Frontend pubblico, customer journey |
| `08_DATABASE.md` | Schema ER, convenzioni, strategia di migrazione |
| `09_API.md` | Linee guida REST/GraphQL, versionamento |
| `10_AUTHENTICATION.md` | Autenticazione, autorizzazione, OAuth2, JWT |
| `11_USER_ROLES.md` | Ruoli, permessi, ACL |
| `12_MEDIA_LIBRARY.md` | Gestione asset digitali, CDN, ottimizzazione |
| `13_ECOMMERCE.md` | Catalogo, carrello, checkout, pagamenti, spedizioni |
| `14_CMS.md` | Contenuti dinamici, pagine, blog |
| `15_CRM.md` | Gestione clienti, lead, comunicazioni |
| `16_PRODUCTION.md` | Gestione produzione, scheduling, risorse |
| `17_LASER_CENTER.md` | Macchine laser, materiali, parametri di incisione |
| `18_QUOTER.md` | Preventivi automatici, regole di calcolo, AI |
| `19_AI_ASSISTANT.md` | Assistente virtuale, raccomandazioni, automazione |
| `20_AUTOMATIONS.md` | Workflow automatici, trigger, azioni |
| `21_ANALYTICS.md` | Business Intelligence, KPI, reportistica |
| `22_MARKETING.md` | SEO, campagne, email marketing, sconti |
| `23_PLUGIN_SYSTEM.md` | Architettura plugin, API di estensione |
| `24_SECURITY.md` | Sicurezza applicativa, OWASP, GDPR |
| `25_PERFORMANCE.md` | Ottimizzazione, caching, benchmark |
| `26_TESTING.md` | Strategia di test, TDD, test automation |
| `27_DEPLOYMENT.md` | CI/CD, ambienti, infrastruttura |
| `28_GITHUB_WORKFLOW.md` | GitHub Actions, automazioni |
| `29_ROADMAP.md` | Milestone, rilasci, priorità |
| `30_DEVELOPMENT_RULES.md` | Regole operative del team di sviluppo |
| `31_CLAUDE_GUIDELINES.md` | Guida per Claude Code su come operare in questo progetto |
| `32_CODING_STANDARDS.md` | Stile del codice, ESLint, Prettier |
| `33_FILE_STRUCTURE.md` | Organizzazione di file e cartelle |
| `34_CHANGELOG_GUIDE.md` | Linee guida per il changelog |
| `35_CONTRIBUTING.md` | Guida per contributori esterni |
| `36_RELEASE_PROCESS.md` | Procedura di rilascio |
| `37_FUTURE_MODULES.md` | Idee per moduli futuri, backlog strategico |

Tutti questi documenti sono vincolanti per Claude Code.
Nessuna attività di sviluppo può prescindere dalla lettura e dal rispetto di questi documenti.

---

## Gestione dei rischi

| Rischio | Mitigazione |
|---------|-------------|
| Aggiornamento Evershop che rompe i moduli | Test di regressione automatici, override isolati, monitoraggio changelog upstream |
| Debito tecnico eccessivo | Refactoring periodico, regole rigide di qualità, code review obbligatoria |
| Documentazione obsoleta | La documentazione è parte della Definition of Done di ogni feature |
| Moduli troppo accoppiati | Event Driven Architecture, API ben definite, dependency inversion |
| Sicurezza e privacy | Security by design, audit regolari, conformità GDPR |
| Performance insufficienti | Benchmark automatici, profiling, caching aggressivo |

---

## Checklist per ogni intervento di Claude Code

Prima di iniziare qualsiasi modifica, Claude deve verificare:

- [ ] Ho letto e compreso i requisiti dai documenti di `/docs` pertinenti?
- [ ] Ho analizzato il codice esistente e i punti di estensione?
- [ ] Ho prodotto un documento di analisi anche minimo?
- [ ] Ho un piano chiaro con step, file coinvolti e test?
- [ ] Ho verificato che la modifica non intacchi il core di Evershop?
- [ ] Ho scelto il branch corretto?
- [ ] Ho previsto di scrivere test?
- [ ] Ho previsto di aggiornare la documentazione?
- [ ] La soluzione proposta è la più semplice possibile (KISS)?
- [ ] Ho considerato gli impatti sugli altri moduli e sull'intero sistema?

---

## Estensioni future

- Integrazione di un **Design System package** pubblicabile (`@ingly/design-system`).
- Estrazione di moduli ad alto carico in microservizi (vedi `03_SYSTEM_ARCHITECTURE.md`).
- Marketplace interno di plugin Ingly (vedi `23_PLUGIN_SYSTEM.md`).
- Motore AI multi-provider con astrazione di provider (vedi `19_AI_ASSISTANT.md`).

---

## Clausola finale

Questo Master Prompt è un documento vivo.
Evolve con il progetto.
Ogni modifica al Master Prompt deve essere discussa, approvata e tracciata tramite PR, con revisione dell'impatto su tutti i workflow e le regole.

**Qualsiasi violazione delle regole qui definite è da considerarsi una non conformità bloccante, che impedisce il merge del codice e il proseguimento dello sviluppo fino alla risoluzione.**

---

*Documento generato dal CTO Office di Ingly Design — Team di Architettura Enterprise.*
