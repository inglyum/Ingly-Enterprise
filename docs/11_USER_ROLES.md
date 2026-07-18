# 11 — USER ROLES & PERMISSIONS · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Security / Identity Architect — Ingly Design
**Destinatari:** Backend, Admin UX, Security, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire il modello di **autorizzazione** (RBAC — Role-Based Access Control): ruoli, permessi, ACL e regole di applicazione in tutta la piattaforma. Complementa `10_AUTHENTICATION.md` (chi sei) definendo **cosa puoi fare**.

---

## Visione

Permessi granulari, centralizzati e verificabili. Ogni azione sensibile — UI, API, evento — è protetta da un permesso. I ruoli aggregano permessi per profilo lavorativo; le eccezioni si gestiscono con permessi diretti, non con hardcoding.

---

## Obiettivi

1. Controllo accessi coerente su UI, API v1 e GraphQL.
2. Least privilege di default.
3. Ruoli mappati alle personas reali (doc 01).
4. Estensibilità: nuovi moduli dichiarano i propri permessi.
5. Auditabilità di chi può/ha fatto cosa.

---

## Modello RBAC

```
UTENTE ──ha──► RUOLI ──contengono──► PERMESSI ──proteggono──► RISORSE/AZIONI
   │                                                              │
   └── permessi diretti (override eccezionale) ───────────────────┘
```

- **Permesso**: stringa stabile `dominio.risorsa.azione` (es. `crm.customer.read`, `production.job.update`).
- **Ruolo**: insieme nominato di permessi (es. `Commerciale`, `OperatoreLaser`).
- **Assegnazione**: utente → ruoli (+ eventuali permessi diretti).
- **Scope** (estensione): limitare per ambito (es. solo i propri clienti).

---

## Ruoli standard (baseline)

| Ruolo | Descrizione | Aree principali |
|-------|-------------|-----------------|
| **Super Admin** | Controllo totale, gestione sistema | tutto |
| **Amministrazione** | Report, fatturato, GDPR, backup | analytics, ordini, impostazioni |
| **Commerciale / Account** | Lead, clienti, preventivi | CRM, Quoter, ordini (lettura) |
| **Responsabile Produzione** | Pianificazione laboratorio | Produzione, Laser Center |
| **Operatore Laser** | Esecuzione lavori | coda produzione (lettura/avanzamento) |
| **Marketing** | SEO, campagne, contenuti | CMS, Marketing, Media, Analytics (lettura) |
| **Content Editor** | Blog, portfolio, pagine | CMS, Media |
| **Customer** | Cliente storefront | proprio account/ordini/preventivi |

I ruoli sono **configurabili**: la baseline è un punto di partenza, non una gabbia.

---

## Convenzione permessi per modulo

Ogni modulo Ingly dichiara i propri permessi nel `bootstrap.ts` (registrazione locked dopo bootstrap) con naming `dominio.risorsa.azione`:

```
crm.customer.read / create / update / delete
crm.lead.read / create / update
production.job.read / update / assign
quoter.quote.read / create / send
media.asset.read / upload / delete
```

Azioni standard: `read`, `create`, `update`, `delete`, più azioni specifiche (`send`, `assign`, `export`).

---

## Applicazione dei permessi (enforcement)

I permessi si verificano in **tre punti** e la sicurezza è quella del più profondo:

1. **UI (Admin)**: nasconde/disabilita azioni non permesse (UX), **non** è sicurezza.
2. **API v1 / GraphQL**: middleware/resolver verificano il permesso — **questa è la barriera vera**.
3. **Service di dominio**: controlli invarianti e scope dove serve (difesa in profondità).

> Regola: la UI non è mai l'unico controllo. Ogni endpoint sensibile verifica il permesso lato server.

---

## Diagramma testuale — Decisione di accesso

```
Richiesta ─► Autenticazione (doc 10): utente noto?
   │ sì
   ▼
Risoluzione ruoli/permessi effettivi (ruoli + diretti − revoche)
   │
   ▼
Permesso richiesto dall'azione presente?  ──no──► 403 Forbidden (+ audit)
   │ sì
   ▼
Scope soddisfatto? (es. proprietà risorsa)  ──no──► 403
   │ sì
   ▼
Esecuzione azione ─► audit log
```

---

## Audit e conformità

- Log delle azioni sensibili: chi, cosa, quando, esito.
- Revisione periodica di ruoli e assegnazioni (least privilege drift).
- Separazione dei compiti su operazioni critiche (es. rimborsi, cancellazioni massive).

---

## Best Practice

- Permessi con naming stabile `dominio.risorsa.azione`.
- Least privilege: partire dal minimo, aggiungere quando serve.
- Controllo sempre lato server, mai solo UI.
- Nuovo modulo → dichiara i suoi permessi in bootstrap.
- Evitare ruoli "onnipotenti" oltre al Super Admin.

---

## Checklist permessi (per ogni nuova azione)

- [ ] Permesso definito con naming standard.
- [ ] Dichiarato in `bootstrap.ts` del modulo.
- [ ] Verificato lato API/GraphQL (barriera reale).
- [ ] UI nasconde/disabilita coerentemente.
- [ ] Scope applicato se necessario.
- [ ] Assegnato ai ruoli baseline pertinenti.
- [ ] Azione sensibile → audit log.

---

## Roadmap

1. Modello RBAC base + ruoli baseline.
2. Dichiarazione permessi per modulo (CRM, Produzione, Quoter, Media).
3. Scope-based access (es. "solo i miei clienti").
4. UI di gestione ruoli/permessi.
5. Audit log consultabile.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Privilege creep | Revisione periodica, least privilege |
| Controllo solo UI | Enforcement server-side obbligatorio |
| Permessi incoerenti tra moduli | Naming standard, registrazione in bootstrap |
| Ruoli troppo ampi | Ruoli granulari, separazione compiti |

---

## Estensioni future

- ABAC (attribute-based) per regole contestuali complesse.
- Deleghe temporanee e permessi a scadenza.
- Ruoli per partner/rivenditori nel portale B2B.

---

## Compatibilità con Evershop

Si estende il modello ruoli/permessi admin di Evershop, dichiarando permessi Ingly via i meccanismi ufficiali di modulo. Il customer storefront usa l'auth cliente nativa. Nessuna modifica al core RBAC.

## Compatibilità con aggiornamenti futuri

I permessi Ingly sono additivi e namespaced per dominio: un upgrade del core non li rimuove. Verificare l'integrazione dei middleware di autorizzazione dopo ogni upgrade.

---

## See also
- [10 Authentication](10_AUTHENTICATION.md)
- [06 Admin Panel](06_ADMIN_PANEL.md)
- [24 Security](24_SECURITY.md)
