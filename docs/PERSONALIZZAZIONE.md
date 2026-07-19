# Personalizzare INGLY Enterprise — guida completa

Tutto quello che serve per modificare il sito quando vuoi: **cosa cambiare, dove
e come**. La maggior parte si fa **dal pannello admin** (senza codice); il resto
sono file semplici da sostituire.

---

## 1) Dal pannello admin (senza codice) — `http://localhost:3000/admin`

| Voglio… | Dove nel pannello |
|---------|-------------------|
| **Logo del sito** | SETTING → Store → Branding/Logo → carica immagine |
| **Nome negozio, valuta, lingua** | SETTING → Store |
| **Aggiungere/modificare prodotti** | Catalog → Products (→ Images per le foto) |
| **Categorie** | Catalog → Categories |
| **Prodotti in evidenza (quali)** | Catalog → Collections → “In Evidenza” |
| **Prodotti in evidenza (titolo/numero)** | CMS → Widgets → “Prodotti in evidenza” |
| **Pagine (blog, contenuti)** | CMS → Pages / Blog |
| **Richieste preventivo ricevute** | INGLY → Richieste preventivo |
| **Sconti/coupon** | Promotion → Coupons |
| **Ordini e clienti** | Sale → Orders, Customer → Customers |

---

## 2) Immagini (file da mettere in `public/assets/`)

Metti i file con questi **nomi esatti** e ricarichi la pagina:

| Immagine | File | Dove appare |
|----------|------|-------------|
| Sfondo hero (foto laser) | `public/assets/ingly-hero.jpg` | Grande riquadro in alto nella home |
| Galleria “I nostri lavori” | `public/assets/gallery/gallery-1.jpg` … `gallery-6.jpg` | Griglia portfolio in home |
| Logo (versione file) | `public/assets/ingly-logo.svg` | Fallback logo |

- Se un file non c'è, si vede un **segnaposto brandizzato** (nessun errore).
- Consigliato: hero ~1600×900 px, galleria ~800×600 px, JPG leggeri (< 400 KB).
- **Il logo dell'header** è meglio caricarlo dal pannello (SETTING → Store): ha
  la precedenza su quello di default.

---

## 3) Colori, font, testi del brand (file di codice)

Cartella: `extensions/ingly/src/pages/frontStore/`

| Voglio cambiare… | File |
|------------------|------|
| Colori del brand (blu, giallo, navy), angoli | `all/ingly-theme.css` (variabili `--primary`, ecc.) |
| Font | `all/InglyFonts.tsx` (Google Fonts) + `all/ingly-theme.css` |
| Barra promo in alto | `all/InglyTopBar.tsx` |
| Navigazione (menu) | `all/InglyHeaderNav.tsx` |
| Link nel footer | `all/InglyFooterLinks.tsx` |
| Logo (SVG monocromatico di default) | `all/Logo.tsx` |
| Hero (testi, pulsanti, animazione) | `homepage/InglyHero.tsx` |
| Vetrina categorie e icone | `homepage/InglyCategories.tsx` |
| Galleria/portfolio | `homepage/InglyGallery.tsx` |
| Fascia valori + CTA | `homepage/InglyValueProps.tsx` |
| Pagina Chi siamo | `chiSiamo/ChiSiamo.tsx` |
| Pagina Contatti + form | `contatti/Contatti.tsx` |

**Palette brand:** navy `#14182B` · blu `#2E6FD1` · giallo `#F2C21A` · crema `#F5F1EC`.
Dopo aver modificato un file, se il negozio è avviato (`AVVIO-2`) si ricompila da
solo; altrimenti riavvia `AVVIO-2`.

---

## 4) Email delle richieste preventivo
- Le richieste si salvano **sempre** nel pannello (INGLY → Richieste preventivo).
- Per riceverle anche via email: compila le righe `SMTP_*` nel file `.env`
  (esempio Gmail in `.env.ingly.example`) e riavvia `AVVIO-2`.

---

## 5) Spegnere/riaccendere la personalizzazione Ingly
In `config/default.json`, nell'estensione `ingly`: `"enabled": true/false`, poi riavvia.

---

## 6) Aggiornare senza perdere i dati
- I **dati** (prodotti, ordini, richieste, clienti) sono nel **database**: non si
  perdono aggiornando il codice.
- Le **foto caricate da admin** stanno in `media/`; quelle di brand in `public/assets/`.
- Per aggiornare: prendi la nuova versione del codice, `npm install && npm run build`
  (o ri-scarica lo ZIP e rifai `AVVIO-1`), riavvia. Le migrazioni DB partono da sole.

---

## 7) Backup consigliato
- **Database** (pg_dump) — contiene tutto il gestionale.
- Cartelle **`media/`** e **`public/assets/`** — immagini.

---

## Vedi anche
- `LEGGIMI-WINDOWS.md` — avvio sul tuo PC
- `DEPLOY_ONLINE.md` — pubblicare online con un dominio
- `31_CLAUDE_GUIDELINES.md` — come far lavorare Claude Code sul progetto
