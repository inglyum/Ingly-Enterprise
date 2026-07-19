# INGLY Design System (in codice)

Il sistema di design del brand Ingly Design, **realizzato in codice** (token CSS,
tipografia, icone SVG, texture, componenti) — non immagini incorporate. È la
versione operativa e versionata delle "board" (typography, colori, icone, UI).

> **Pagina live:** avvia il sito e apri **`/design-system`** per vedere colori,
> tipografia, bottoni, badge, form, icone ed elementi brand renderizzati.

---

## 1. Colori (token)

Definiti come variabili CSS in `extensions/ingly/src/pages/frontStore/all/ingly-theme.css`.

| Ruolo | Token | HEX | RGB |
|------|-------|-----|-----|
| Navy 900 | `--ingly-navy-900` | `#0D1020` | 13,16,32 |
| Navy 800 (brand) | `--ingly-navy-800` | `#14182B` | 20,24,43 |
| Navy 700 | `--ingly-navy-700` | `#1E2547` | 30,37,71 |
| Blu 500 (primario) | `--ingly-blue-500` | `#2E6FD1` | 46,111,209 |
| Blu 600 | `--ingly-blue-600` | `#245AB0` | 36,90,176 |
| Blu 100 | `--ingly-blue-100` | `#EEF3FC` | 238,243,252 |
| Oro 500 (accento) | `--ingly-gold-500` | `#F2C21A` | 242,194,26 |
| Oro 600 | `--ingly-gold-600` | `#DCAE10` | 220,174,16 |
| Crema | `--ingly-cream` | `#F5F1EC` | 245,241,236 |
| Neutro 700 | `--ingly-neutral-700` | `#3A4152` | 58,65,82 |
| Neutro 500 | `--ingly-neutral-500` | `#5B6172` | 91,97,114 |
| Neutro 200 | `--ingly-neutral-200` | `#E6E8EE` | 230,232,238 |
| Success | `--ingly-success` | `#1B7A3D` | 27,122,61 |
| Warning | `--ingly-warning` | `#8A6D1B` | 138,109,27 |
| Error | `--ingly-error` | `#B42318` | 180,35,24 |
| Info | `--ingly-info` | `#2E6FD1` | 46,111,209 |

**Gradiente brand:** `--ingly-gradient` = `linear-gradient(115deg,#14182B,#1E2547,#2E6FD1)`.

I colori del **design system EverShop** (shadcn) sono rimappati sul brand:
`--primary` = blu Ingly, `--ring` = blu, `--accent` = blu chiaro. Così bottoni,
focus e link seguono il brand su tutto lo storefront.

### Contrasto / accessibilità
- Testo scuro (`#14182B`) su chiaro e bianco su navy/blu → conformi WCAG AA.
- L'oro si usa come **accento** (badge, dettagli), non per testo lungo su bianco.

---

## 2. Tipografia
- **Display / titoli:** Space Grotesk (500/600/700) — geometrico, tecnico-premium.
- **Testo:** Inter (400/500/600/700) — alta leggibilità.
- Caricati in `all/InglyFonts.tsx`; applicati in `all/ingly-theme.css`
  (`--font-sans` = Inter; `main h1/h2/h3` e `.ingly-display` = Space Grotesk).

Scala consigliata: Display 44 · H2 30 · H3 22 · Body 16 · Small 13.

---

## 3. Icone
Set **tecnico/geometrico/outline** con `lucide-react` (già usato nello storefront
e nell'admin). Mappate per categoria in `homepage/InglyCategories.tsx` e mostrate
nel pannello `/design-system`. Uso: `<Icon size={22} strokeWidth={1.9} />` in un
contenitore `#EEF3FC` con icona blu — coerenza di tratto garantita dalla libreria.

---

## 4. Texture & elementi brand (SVG)
- **Pattern di brand:** `public/assets/ingly-bg-pattern.svg` (ticks del righello,
  punti "circuito", linee laser) — texture leggera su tutto lo storefront + footer.
- **Marchio/emblema:** `public/assets/ingly-mark.svg` (filigrana hero, segnaposto prodotti).
- **Elementi:** righello, raggio laser animato, accento oro, divisori — vedi
  `/design-system` e `homepage/InglyHero.tsx`.

Tutto **vettoriale**: nitido, leggero, versionato. Le foto (prodotti, hero,
galleria) restano file in `public/assets/` / caricati da pannello.

---

## 5. Componenti (dove sono)
- Bottoni: classi `.ingly-btn-primary` / `.ingly-btn-accent` (in `ingly-theme.css`)
  e i bottoni EverShop rimappati sui token.
- Card categoria, tile galleria, hero, fasce: `homepage/*.tsx`.
- Form: `contatti/Contatti.tsx`. Tabella admin: `admin/inglyQuotes/InglyQuotes.tsx`.
- Input/Select/Table/Badge del core EverShop ereditano i token del brand.

---

## 6. Come usarlo / modificarlo
1. Cambia un **colore**: modifica il token in `ingly-theme.css` → si aggiorna ovunque.
2. Cambia un **font**: `InglyFonts.tsx` (Google Fonts) + `--font-sans`.
3. Aggiungi un'**icona**: importala da `lucide-react` dove serve.
4. Vedi il risultato: pagina **`/design-system`**.

Se il negozio è avviato (`AVVIO-2`) le modifiche si ricompilano da sole.

---

## Vedi anche
- `PERSONALIZZAZIONE.md` — guida pratica alle modifiche
- `04_BRANDING.md` · `05_DESIGN_SYSTEM.md` — principi di brand e design
