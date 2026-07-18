# Extension `ingly` — INGLY Enterprise

Personalizzazione **admin** e **storefront** di Ingly Design costruita **sopra** EverShop,
senza modificare il core (vedi `docs/23_PLUGIN_SYSTEM.md` e `docs/00_MASTER_PROMPT.md`).

## Cosa fa

| Componente | Dove appare | Area |
|-----------|-------------|------|
| `pages/admin/all/InglyAdminBar.tsx` | In cima a **ogni** pagina admin | `header` |
| `pages/admin/dashboard/InglyDashboard.tsx` | Dashboard admin (benvenuto + link rapidi) | `content` |
| `pages/frontStore/all/InglyTopBar.tsx` | Announcement bar su **ogni** pagina storefront | `body` |

Il **branding** (logo, nome negozio, copyright, lingua IT, valuta EUR) è configurato in
`config/default.json` a livello di progetto (nessun codice necessario).

## Come si attiva

Registrata in `config/default.json`:

```json
"system": {
  "extensions": [
    { "name": "ingly", "resolve": "extensions/ingly", "enabled": true, "priority": 10 }
  ]
}
```

- **Disattivare**: metti `"enabled": false` e riavvia.
- In **dev** EverShop compila automaticamente `src/` → `dist/`.
- In **produzione** serve la build (`npm run build`), che genera `dist/`.

## Struttura

```
extensions/ingly/
├── package.json
├── README.md
└── src/
    ├── bootstrap.ts                 # punto di registrazione (vuoto: sola UI)
    └── pages/
        ├── admin/
        │   ├── all/InglyAdminBar.tsx
        │   └── dashboard/InglyDashboard.tsx
        └── frontStore/
            └── all/InglyTopBar.tsx
```

## Estendere

Aggiungi qui i futuri moduli di dominio Ingly (CRM, Quoter, Produzione, …) seguendo il
layering di `docs/03_SYSTEM_ARCHITECTURE.md` e `docs/33_FILE_STRUCTURE.md`. Tutte le
registrazioni (hook, job, widget, permessi) vanno **solo** in `bootstrap.ts`.
