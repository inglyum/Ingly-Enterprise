# Mettere INGLY Enterprise online (deploy)

Guida pratica per pubblicare il sito su internet con un dominio tuo.
Il sito è un'app Node.js + PostgreSQL, quindi serve un hosting che li supporti
(non un hosting "solo HTML" tipo Aruba classico).

> In sintesi ti servono 3 cose: **un server** (o piattaforma), **un database
> PostgreSQL**, **un dominio**. Sotto trovi due strade: la più semplice
> (piattaforma gestita) e quella classica (VPS con Docker).

---

## Cosa ti serve (per entrambe le strade)
- Il progetto (questo repository).
- Un **dominio** (es. `inglydesign.it`) — da un registrar (Aruba, Namecheap, ecc.).
- Un **database PostgreSQL 13+**.
- Le **variabili d'ambiente** (DB + email) — vedi `.env.ingly.example`.

---

## Strada A — Piattaforma gestita (consigliata se non sei tecnico)

Piattaforme come **Railway**, **Render** o **Fly.io** pubblicano direttamente da
GitHub e offrono anche il database PostgreSQL. Esempio con **Railway**:

1. Vai su https://railway.app e registrati (login con GitHub).
2. **New Project → Deploy from GitHub repo** → scegli `inglyum/Ingly-Enterprise`
   (branch della versione Ingly).
3. **Add a service → Database → PostgreSQL**: Railway crea il DB e le variabili.
4. Nel servizio dell'app, sezione **Variables**, imposta (vedi `.env.ingly.example`):
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` → dai valori del DB Railway
   - `NODE_ENV=production`
   - (facoltativo email) `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `INGLY_QUOTE_TO`
5. **Build & Start** — imposta i comandi:
   - Build: `npm install && npm run build`
   - Start: `npm run start`
6. Al primo avvio le tabelle si creano da sole. Poi crea l'admin e i contenuti
   (vedi sotto “Primo avvio in produzione”).
7. **Dominio**: in Railway → Settings → Domains → aggiungi il tuo dominio e
   segui le istruzioni DNS (un record CNAME dal tuo registrar a Railway).

Render/Fly.io funzionano in modo simile (deploy da GitHub + PostgreSQL add-on).

---

## Strada B — VPS con Docker (classica)

Un VPS (DigitalOcean, Hetzner, Aruba Cloud…) con Docker installato.

1. Collegati al VPS (SSH) e clona/copia il progetto.
2. Crea il file `.env` (vedi `.env.ingly.example`) con i dati del database.
3. Avvia il database PostgreSQL (puoi usare quello di `docker-compose.yml`):
   ```bash
   docker compose up -d database
   ```
4. Compila e avvia l'app in produzione:
   ```bash
   npm install
   npm run build
   npm run start
   ```
   (oppure crea un'immagine Docker dell'app e mettila nel compose).
5. Metti davanti un **reverse proxy** (Nginx o Caddy) per HTTPS e dominio.
   Con **Caddy** bastano poche righe (HTTPS automatico):
   ```
   inglydesign.it {
     reverse_proxy localhost:3000
   }
   ```
6. Punta il **DNS** del dominio all'IP del VPS (record A).

---

## Primo avvio in produzione (una volta sola)
Dopo che l'app è online e connessa al DB:
1. Le **tabelle** si creano automaticamente al primo avvio.
2. Crea l'**amministratore**:
   ```bash
   node packages/evershop/dist/bin/evershop.js user:create --name "Admin" --email "tua@email.it" --password "PasswordSicura1"
   ```
3. Carica **categorie e prodotti demo** (facoltativo):
   ```bash
   ADMIN_EMAIL=tua@email.it ADMIN_PASSWORD=PasswordSicura1 node extensions/ingly/seed/ingly-seed.mjs
   ```
4. Entra su `https://iltuodominio/admin` e personalizza (logo, foto, prodotti).

---

## Aggiornare il sito online (nuove versioni)
1. Aggiorni il codice (git pull o nuovo ZIP) sul server/piattaforma.
2. `npm install && npm run build` e riavvii (`npm run start`).
   - Sulle piattaforme gestite basta un nuovo **deploy** dal repo.
3. Le **migrazioni** del database si applicano da sole all'avvio.
4. I **dati** (prodotti, ordini, richieste) restano nel database: gli
   aggiornamenti del codice non li toccano.

---

## Backup (importante)
- **Database**: backup periodico di PostgreSQL (`pg_dump`), o snapshot del DB
  gestito. È qui che vivono prodotti, ordini e richieste preventivo.
- **Media/immagini caricate**: la cartella `media/` (foto prodotti caricate da
  admin) e `public/assets/` (logo, hero, galleria).

---

## Domande frequenti
- **Posso usare un hosting economico “solo PHP/HTML”?** No: serve Node.js + PostgreSQL.
- **Serve HTTPS?** Sì (Caddy/piattaforme lo fanno automatico). Obbligatorio per pagamenti e login.
- **Dove metto le chiavi di Stripe/PayPal?** In produzione, come variabili d'ambiente / impostazioni admin dei rispettivi moduli.

---

## Vedi anche
- `LEGGIMI-WINDOWS.md` — avvio in locale sul tuo PC
- `PERSONALIZZAZIONE.md` — come modificare logo, colori, foto, prodotti, pagine
- `27_DEPLOYMENT.md` — dettagli tecnici CI/CD e ambienti
