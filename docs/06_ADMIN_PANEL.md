# 06 — ADMIN PANEL · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Product Design Lead — Ingly Design
**Destinatari:** Frontend, Backend, UX, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Progettare l'**Admin Panel** di INGLY Enterprise: il centro operativo da cui i collaboratori gestiscono ecommerce, CRM, produzione, preventivi, media, marketing e configurazioni. Estende l'admin di Evershop con le sezioni dei moduli Ingly, mantenendo coerenza UX (doc 05) e sicurezza (doc 10, 11, 24).

---

## Visione

Un unico pannello dove ogni ruolo trova il proprio spazio di lavoro, con navigazione chiara, azioni rapide, dati in tempo reale e assistenza AI contestuale. L'Admin non è un insieme di CRUD scollegati, ma un ambiente operativo orientato ai flussi di lavoro reali del laboratorio.

---

## Obiettivi

1. Estendere l'admin Evershop senza modificarne il core.
2. Fornire un'esperienza coerente tra sezioni core e moduli Ingly.
3. Rispettare ruoli e permessi (RBAC, doc 11).
4. Ottimizzare le operazioni frequenti (produzione, preventivi, CRM).
5. Integrare l'AI Assistant come supporto contestuale.

---

## Architettura di navigazione (IA)

```
DASHBOARD (KPI, attività, code)
├── Vendite
│   ├── Ordini            (core Evershop + estensioni)
│   ├── Preventivi        (Quoter · doc 18)
│   └── Clienti / CRM     (doc 15)
├── Catalogo
│   ├── Prodotti / Varianti / Attributi (core)
│   └── Materiali         (Laser Center · doc 17)
├── Produzione
│   ├── Coda di lavoro    (doc 16)
│   ├── Macchine laser    (doc 17)
│   └── Avanzamento
├── Contenuti
│   ├── Pagine / Blog / Portfolio (CMS · doc 14)
│   └── Media Library     (doc 12)
├── Marketing             (SEO, campagne, sconti · doc 22)
├── Analytics / BI        (doc 21)
├── Automazioni           (doc 20)
└── Impostazioni
    ├── Utenti & Ruoli    (doc 11)
    ├── Plugin            (doc 23)
    ├── Backup & Versioning
    └── Configurazioni sistema
```

---

## Convenzioni tecniche Evershop (Admin)

- **Route:** cartella = route ID (solo a-z/A-Z), `route.json` dichiara la route.
- **Pagine admin:** `pages/admin/<route>/` con Master Components `.tsx` e `export const layout = { areaId, sortOrder }`.
- **Middleware:** ordine bracket-syntax `[after]name[before].ts`; API handler che inviano risposta devono avere firma a 3 argomenti (`req, res, next`) per evitare `ERR_HTTP_HEADERS_SENT`.
- **Site-wide admin:** `pages/admin/all/`.
- **Menu:** registrato via area/layout, con controllo permessi.
- **GraphQL admin:** file `.admin.graphql` (tipi non visibili allo storefront).

---

## Pattern di pagina

| Pattern | Uso | Componenti (doc 05) |
|---------|-----|---------------------|
| **List page** | Elenco entità con filtri/paginazione | `DataGrid`, `Badge`, azioni |
| **Detail page** | Vista/edit singola entità | `Form`, `Tabs`, `Card` |
| **Wizard** | Flussi multi-step (es. nuovo preventivo) | step, `Stepper`, validazione |
| **Dashboard** | KPI e widget | grid, chart, `Card` |
| **Kanban/Queue** | Coda produzione | colonne per stato, drag/stato |

---

## Dashboard

- Widget configurabili per ruolo: ordini del giorno, preventivi in attesa, coda produzione, KPI vendite, alert.
- Dati in tempo quasi reale (read model, doc 21).
- Ogni widget rispetta i permessi dell'utente.

---

## Integrazione AI Assistant

- Pannello contestuale (doc 19) accessibile dalle sezioni chiave.
- Suggerimenti sul preventivo, riassunti cliente nel CRM, spiegazione KPI.
- L'AI propone; l'utente decide. Nessuna azione irreversibile automatica senza conferma.

---

## Diagramma testuale — Rendering Admin (SSR + hydration)

```
Richiesta /admin/... ─► Middleware (auth, RBAC) ─► Route Evershop
      │                                                │
      ▼                                                ▼
  Controllo permessi (doc 11)                Master Components (React SSR)
      │                                                │
      └──────────────► HTML completo ◄─────────────────┘
                              │ hydration client
                              ▼
                    Interattività + chiamate GraphQL/REST v1
```

---

## Best Practice

- Riusare i pattern di pagina; non reinventare list/detail ogni volta.
- Ogni azione distruttiva richiede conferma esplicita.
- Feedback immediato (toast, stati loading) su ogni operazione.
- Rispettare la regola degli hook e attivo/passivo dei middleware (CLAUDE.md).
- Ogni sezione nuova aggiorna il menu via layout/area, con permesso associato.

---

## Checklist nuova sezione Admin

- [ ] Route dichiarata (`route.json`), naming corretto.
- [ ] Permessi RBAC definiti e verificati.
- [ ] Pattern di pagina riusato dal Design System.
- [ ] Middleware con firma corretta (3 arg se invia risposta).
- [ ] GraphQL admin in `.admin.graphql` se necessario.
- [ ] Voce di menu con controllo permessi.
- [ ] Stati loading/empty/error gestiti.
- [ ] Accessibilità verificata.
- [ ] README/aggiornamento doc pertinente.

---

## Roadmap

1. Dashboard operativa con KPI base.
2. Sezioni CRM e Media Library.
3. Coda produzione (Kanban) e Laser Center.
4. Wizard preventivi + AI.
5. Automazioni e BI avanzata.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Sovraccarico cognitivo (troppe voci) | IA per ruolo, progressive disclosure |
| Permessi incoerenti | RBAC centralizzato (doc 11), test |
| Divergenza UX core/Ingly | Design System condiviso (doc 05) |
| Header già inviati (middleware) | Firma 3 argomenti sui handler che rispondono |

---

## Estensioni future

- Personalizzazione dashboard per utente.
- Command palette (ricerca/azioni rapide).
- Notifiche real-time (websocket) per coda produzione.

---

## Compatibilità con Evershop

L'Admin estende l'area admin Evershop con moduli, route, pagine e voci di menu tramite i meccanismi ufficiali. Nessuna modifica al core; le sezioni Ingly si registrano da `bootstrap.ts` e vivono in `modules/ingly/`.

## Compatibilità con aggiornamenti futuri

Poiché si usano route/aree/layout ufficiali, un aggiornamento dell'admin core non rompe le sezioni Ingly. Verificare eventuali componenti admin sovrascritti dopo ogni upgrade.

---

## See also
- [05 Design System](05_DESIGN_SYSTEM.md)
- [11 User Roles](11_USER_ROLES.md)
- [19 AI Assistant](19_AI_ASSISTANT.md)
- [21 Analytics](21_ANALYTICS.md)
