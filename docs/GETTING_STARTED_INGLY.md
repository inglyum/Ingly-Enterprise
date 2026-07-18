# Avvio rapido — INGLY Enterprise

Guida in **step semplici** per avviare in locale l'ecommerce + admin personalizzato di Ingly Design.

> **Cosa ottieni:** storefront Ingly (con announcement bar), pannello admin brandizzato INGLY, lingua **italiano**, valuta **EUR**, logo Ingly. Tutto costruito **sopra** EverShop senza modificarne il core.

---

## Prerequisiti (una volta sola)

- **Node.js ≥ 20** (consigliato 22) — verifica: `node -v`
- **Docker** (per il database PostgreSQL) — oppure un PostgreSQL 13+ già installato
- **Git**

---

## Step 1 — Installa le dipendenze

```bash
npm install
```

## Step 2 — Compila il core EverShop

La cartella `dist/` non è versionata: va generata una volta.

```bash
npm run compile
```

## Step 3 — Avvia il database PostgreSQL

Usa il Postgres già pronto in `docker-compose.yml`:

```bash
docker compose up -d database
```

(Il database ascolta su `localhost:5432`, utente/password `postgres`.)

## Step 4 — Configura le variabili d'ambiente

```bash
cp .env.ingly.example .env
```

I valori di default combaciano già con il database Docker dello Step 3: non serve modificarli.

## Step 5 — Installa lo schema del database

```bash
npm run setup
```

## Step 6 — Crea l'utente amministratore

```bash
npm run user:create
```

Inserisci **email**, **password** e nome quando richiesto: sono le credenziali per entrare nell'admin.

## Step 7 — (Opzionale) Carica dati demo

```bash
npm run seed
```

## Step 8 — Avvia in modalità sviluppo

```bash
npm run dev
```

Attendi il messaggio di avvio del server.

---

## Apri l'applicazione (i "click")

| Cosa | URL | Note |
|------|-----|------|
| 🛍️ **Storefront Ingly** | http://localhost:3000 | Announcement bar Ingly in alto, logo, IT/EUR |
| 🔐 **Login Admin** | http://localhost:3000/admin/login | Usa le credenziali dello Step 6 |
| 📊 **Dashboard Admin INGLY** | http://localhost:3000/admin | Barra branding INGLY + pannello di benvenuto |

Nel pannello admin puoi:
1. **Catalog → Products** → *Create* per aggiungere un prodotto.
2. **CMS → Pages** per le pagine/contenuti.
3. **Customers**, **Orders**, **Promotions**, **Settings** dal menu laterale.

---

## Produzione (quando vuoi pubblicare)

```bash
npm run build      # genera i bundle di produzione
npm run start      # avvia il server in produzione
```

In produzione l'extension `ingly` richiede la sua `dist/`: `npm run build` la genera automaticamente.

---

## Personalizzazione

| Voglio cambiare… | Dove |
|------------------|------|
| Logo | sostituisci `public/assets/ingly-logo.svg` (o cambia `themeConfig.logo.src` in `config/default.json`) |
| Nome/valuta/lingua/copyright | `config/default.json` (`shop`, `themeConfig`) |
| Barra branding admin | `extensions/ingly/src/pages/admin/all/InglyAdminBar.tsx` |
| Pannello dashboard admin | `extensions/ingly/src/pages/admin/dashboard/InglyDashboard.tsx` |
| Announcement bar storefront | `extensions/ingly/src/pages/frontStore/all/InglyTopBar.tsx` |
| Disattivare la personalizzazione | `config/default.json` → `system.extensions[].enabled = false` |

Dopo aver modificato i file dell'extension, `npm run dev` ricompila automaticamente.

---

## Problemi comuni

| Sintomo | Soluzione |
|--------|-----------|
| `dist ... does not exist` | Esegui `npm run compile` (Step 2) |
| Errore connessione DB | Verifica che `docker compose up -d database` sia attivo e `.env` corretto |
| L'extension non appare | Controlla `config/default.json`: `ingly` presente ed `enabled: true`; riavvia `npm run dev` |
| Porta 3000 occupata | Cambia `PORT` in `.env` |

---

## Riferimenti

- Personalizzazione = extension ufficiale: `docs/23_PLUGIN_SYSTEM.md`
- Struttura file: `docs/33_FILE_STRUCTURE.md`
- Admin panel: `docs/06_ADMIN_PANEL.md` · Storefront: `docs/07_WEBSITE.md`
- Branding: `docs/04_BRANDING.md`
