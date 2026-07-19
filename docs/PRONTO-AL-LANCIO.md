# 🚀 INGLY Design — Pronto al lancio

Documento **unico** per andare online: dominio, database, email, foto, e la
pubblicazione del sito con **negozio + pannello admin funzionanti al 100%**.
Scritto passo-passo, anche se non sei tecnico. Segui le parti **in ordine**.

---

## ✅ Checklist rapida (spunta man mano)

- [ ] **1. Dominio** registrato (es. `inglydesign.it`)
- [ ] **2. Hosting + Database** attivi (Railway o VPS)
- [ ] **3. Variabili d'ambiente** impostate (DB + email)
- [ ] **4. Sito pubblicato** e raggiungibile via HTTPS
- [ ] **5. Dominio collegato** al sito
- [ ] **6. Amministratore** creato → accesso al pannello
- [ ] **7. Categorie e prodotti** caricati
- [ ] **8. Logo** caricato (dal pannello)
- [ ] **9. Foto** prodotti + hero + galleria inserite
- [ ] **10. Email preventivi** configurata (SMTP)
- [ ] **11. Pagamenti** configurati (Stripe/PayPal) — se vendi online
- [ ] **12. Verifica finale**: storefront e admin funzionanti

> Ti servono 3 cose di base: **un dominio**, **un hosting con Node.js + PostgreSQL**, e **le foto/logo**. Sotto trovi tutto.

---

## PARTE 1 — Registrare il dominio

1. Vai da un registrar (es. **Aruba**, **Namecheap**, **GoDaddy**, **OVH**).
2. Cerca il nome che vuoi (es. `inglydesign.it`) e **acquistalo** (~10–15 €/anno).
3. Tienilo da parte: ti servirà accedere al pannello DNS del registrar (Parte 5).

*(Se ce l'hai già, salta alla Parte 2.)*

---

## PARTE 2 — Pubblicare online (strada consigliata: Railway)

**Railway** pubblica il sito direttamente da GitHub e include il database. È la
via più semplice se non sei tecnico. *(In alternativa: VPS con Docker — vedi
`DEPLOY_ONLINE.md`.)*

1. Vai su **https://railway.app** → **Login with GitHub**.
2. **New Project → Deploy from GitHub repo** → seleziona `inglyum/Ingly-Enterprise`
   e il **branch** della tua versione Ingly.
3. **New → Database → Add PostgreSQL**. Railway crea il database.
4. Apri il servizio dell'**app** → scheda **Settings**:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
5. Scheda **Variables** dell'app → aggiungi (vedi anche `.env.ingly.example`):

   | Variabile | Valore |
   |-----------|--------|
   | `DB_HOST` | (host del PostgreSQL Railway) |
   | `DB_PORT` | `5432` |
   | `DB_USER` | (utente del DB Railway) |
   | `DB_PASSWORD` | (password del DB Railway) |
   | `DB_NAME` | (nome del DB Railway) |
   | `NODE_ENV` | `production` |

   > I valori del DB li trovi nel servizio **PostgreSQL → Variables/Connect** su Railway.

6. Railway costruisce e avvia. Al primo avvio **le tabelle si creano da sole**.
7. Nel servizio app → **Settings → Networking → Generate Domain**: ottieni un
   indirizzo tipo `ingly-production.up.railway.app` per provare subito.

---

## PARTE 3 — Creare l'amministratore e i contenuti (una volta sola)

Sul sito online il database è vuoto: vanno creati admin e contenuti.
Su Railway usa **il terminale del progetto** (icona "Command"/"Shell" del servizio app)
ed esegui:

1. **Crea l'amministratore** (scegli tu email e password):
   ```bash
   node packages/evershop/dist/bin/evershop.js user:create --name "Admin" --email "tua@email.it" --password "PasswordSicura1"
   ```
2. **Carica categorie e prodotti demo** (facoltativo, poi li modifichi):
   ```bash
   ADMIN_EMAIL=tua@email.it ADMIN_PASSWORD=PasswordSicura1 node extensions/ingly/seed/ingly-seed.mjs
   ```
3. Entra nel pannello: `https://iltuoindirizzo/admin` con le credenziali del punto 1.

---

## PARTE 4 — Collegare il tuo dominio

1. Su Railway → servizio app → **Settings → Networking → Custom Domain** →
   inserisci `inglydesign.it` (e/o `www.inglydesign.it`).
2. Railway ti mostra un record **CNAME** (o simile) da inserire.
3. Vai nel **pannello DNS del registrar** (Parte 1) e aggiungi quel record.
4. Attendi la propagazione (da minuti a qualche ora). **HTTPS è automatico.**
5. Verifica: apri `https://inglydesign.it` → deve mostrare il negozio Ingly.

---

## PARTE 5 — Email delle richieste preventivo (SMTP)

Le richieste dal form **Contatti** si salvano **sempre** nel pannello
(*INGLY → Richieste preventivo*). Per riceverle anche via **email**, aggiungi
queste variabili (Railway → Variables, o `.env` su VPS). Esempio con **Gmail**:

1. Nell'account Google: attiva la **verifica in 2 passaggi** e crea una
   **“password per le app”** (Sicurezza → Password per le app).
2. Imposta:

   | Variabile | Valore (esempio) |
   |-----------|------------------|
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `587` |
   | `SMTP_SECURE` | `false` |
   | `SMTP_USER` | `tuoindirizzo@gmail.com` |
   | `SMTP_PASS` | la password per app (16 caratteri) |
   | `SMTP_FROM` | `tuoindirizzo@gmail.com` |
   | `INGLY_QUOTE_TO` | dove ricevere le richieste |

3. Riavvia/ridistribuisci. D'ora in poi ogni richiesta arriva in casella.

---

## PARTE 6 — Logo e Foto

- **Logo (header):** pannello → **SETTING → Store → Branding/Logo → carica**. Salva.
- **Foto prodotti:** pannello → **Catalog → Products → [prodotto] → Images → carica**.
- **Sfondo hero (foto laser):** metti il file `public/assets/ingly-hero.jpg`
  (nel repo/deploy). Se manca, resta lo sfondo grafico Ingly.
- **Galleria “I nostri lavori”:** file `public/assets/gallery/gallery-1.jpg … gallery-6.jpg`.

> Consigli foto: hero ~1600×900, galleria ~800×600, JPG < 400 KB.

---

## PARTE 7 — Pagamenti (se vendi online)

Nel pannello, moduli **Stripe / PayPal** (o COD, contrassegno):
- Inserisci le **chiavi API** dei rispettivi account (in produzione, dai tuoi
  account Stripe/PayPal). Attiva il metodo desiderato.
- Verifica un ordine di prova prima di comunicare il lancio.

---

## PARTE 8 — Verifica finale (deve funzionare al 100%)

**Storefront** (`https://inglydesign.it`):
- [ ] Home carica: hero, categorie con icone, prodotti in evidenza, galleria
- [ ] Menu: Home, Catalogo, Tutto l'Anno, **Chi siamo**, **Contatti**
- [ ] Una pagina categoria mostra i prodotti con prezzi in **€**
- [ ] Una scheda prodotto si apre e si può aggiungere al carrello
- [ ] **Contatti**: invii il form → messaggio di conferma
- [ ] HTTPS attivo (lucchetto nel browser)

**Pannello admin** (`https://inglydesign.it/admin`):
- [ ] Login con le tue credenziali
- [ ] **INGLY → Richieste preventivo**: compare la richiesta di prova inviata sopra
- [ ] Catalog → Products/Categories: puoi creare/modificare
- [ ] SETTING → Store: logo, nome, valuta, lingua

Se tutti i punti sono spuntati → **sei online e funzionante**. 🎉

---

## PARTE 9 — Manutenzione, aggiornamenti, backup

- **Aggiornare il sito:** aggiorni il codice (nuovo push/ZIP) → su Railway parte
  un nuovo **deploy**; su VPS `npm install && npm run build && npm run start`.
  Le migrazioni del database si applicano da sole. **I dati non si perdono.**
- **Backup (importante):**
  - Database (`pg_dump` o snapshot del DB gestito) — prodotti, ordini, richieste.
  - Cartelle `media/` (foto caricate) e `public/assets/` (logo, hero, galleria).
- **Modifiche/personalizzazioni:** vedi `PERSONALIZZAZIONE.md` e
  `DESIGN_SYSTEM_INGLY.md`.

---

## Riepilogo indirizzi
| Cosa | URL |
|------|-----|
| Negozio | `https://inglydesign.it` |
| Pannello admin | `https://inglydesign.it/admin` |
| Contatti / preventivo | `https://inglydesign.it/contatti` |
| Chi siamo | `https://inglydesign.it/chi-siamo` |
| Design System (riferimento) | `https://inglydesign.it/design-system` |

---

## Vedi anche
- `DEPLOY_ONLINE.md` — dettagli deploy (Railway/VPS/Docker)
- `PERSONALIZZAZIONE.md` — modificare logo, colori, foto, prodotti, pagine
- `LEGGIMI-WINDOWS.md` — provare tutto in locale sul tuo PC prima del lancio
