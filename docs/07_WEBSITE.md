# 07 — WEBSITE (STOREFRONT) · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Product Design Lead — Ingly Design
**Destinatari:** Frontend, UX, Marketing, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Progettare il **frontend pubblico (Storefront)** di INGLY Enterprise: vetrina, catalogo, configuratore di prodotti personalizzati, richiesta preventivo, checkout, blog e portfolio. Estende lo storefront Evershop con le capacità Ingly (configuratore, quoter) mantenendo brand e Design System.

---

## Visione

Un sito che comunica la qualità artigianale di Ingly Design e converte il visitatore in cliente con un percorso chiaro: scopri → personalizza → preventivo/acquista → traccia. Veloce (SSR), accessibile, ottimizzato SEO.

---

## Obiettivi

1. Presentare catalogo e portfolio con impatto e chiarezza.
2. Consentire personalizzazione e richiesta preventivo fluida.
3. Massimizzare conversione e performance (Core Web Vitals).
4. Garantire SEO e accessibilità.
5. Integrare CRM (lead) e Quoter senza attrito.

---

## Customer journey

```
SCOPERTA           CONSIDERAZIONE          DECISIONE            POST-VENDITA
Home/SEO/Blog ──► Catalogo/Portfolio ──► Configuratore ──► Checkout/Preventivo ──► Tracciamento
      │                  │                     │                    │                    │
   Media/Brand      Filtri/Ricerca      Prezzo dinamico       Pagamento/Invio        Stato ordine
                                        (Quoter · doc 18)     (Ecommerce · doc 13)   (OMS/Produzione)
                                             │
                                        Lead → CRM (doc 15)
```

---

## Sezioni principali

| Sezione | Descrizione | Doc di riferimento |
|---------|-------------|--------------------|
| Home | Vetrina brand, categorie, highlight portfolio | 04, 22 |
| Catalogo | Lista/filtri prodotti, PDP | 13 |
| Configuratore | Personalizzazione prodotto (materiale, incisione, misure) | 17, 18 |
| Preventivo | Richiesta preventivo con stima dinamica | 18 |
| Checkout | Carrello, pagamento, spedizione | 13 |
| Blog / Portfolio | Contenuti, casi, SEO | 14, 22 |
| Account cliente | Ordini, preventivi, dati, tracciamento | 10, 15 |

---

## Convenzioni tecniche Evershop (Storefront)

- **MPA**: ogni route ha bundle e HTML completo, poi hydration. Nessun router client-side.
- **Route:** cartella = route ID, `route.json`.
- **Pagine:** `pages/frontStore/<route>/` (attenzione: `frontStore`, non `frontend`).
- **Site-wide:** `pages/frontStore/all/`.
- **GraphQL storefront:** solo file `.graphql` non-admin (i tipi `.admin.graphql` non sono visibili qui).
- **SEO:** meta, canonical, slug, sitemap, structured data (doc 22).

---

## Configuratore di prodotto (chiave per Ingly)

- Selezione **materiale** (da Laser Center · doc 17), **dimensioni**, **lavorazioni** (incisione/taglio), **quantità**.
- **Prezzo dinamico** calcolato dal Quoter (doc 18) via API v1.
- Anteprima (mockup/preview) quando disponibile.
- CTA duale: **Aggiungi al carrello** (prodotto standard) oppure **Richiedi preventivo** (custom).
- Ogni richiesta preventivo genera un **lead** nel CRM (evento).

---

## Performance & Core Web Vitals

- SSR + hydration selettiva; evitare JS non necessario.
- Immagini ottimizzate dalla Media Library (formati moderni, lazy-load) (doc 12, 25).
- Budget performance: LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Caching aggressivo su pagine pubbliche (doc 25).

---

## Diagramma testuale — Richiesta preventivo dallo storefront

```
Configuratore (frontStore) 
   │ parametri (materiale, misure, lavorazioni)
   ▼
POST /api/v1/quoter/estimate ──► Quoter service (doc 18)
   │ stima prezzo + eventuale AI (doc 19)
   ▼
Utente conferma richiesta
   │
   ├─ emit("QuoteRequested") ─► CRM crea/aggiorna lead (doc 15)
   └─ Email/PDF preventivo (doc 18, 12)
```

---

## Accessibilità e i18n

- WCAG 2.1 AA su tutto lo storefront.
- Multilingua tramite `translations/` (i18n); testi non hardcoded.
- Navigazione da tastiera e screen reader.

---

## Best Practice

- Ogni pagina pubblica ha meta SEO e structured data pertinenti.
- Immagini sempre servite ottimizzate (mai originali pesanti).
- Il configuratore valida i parametri lato server (fonte di verità del prezzo).
- Rispettare regola hook e firma middleware (CLAUDE.md).

---

## Checklist nuova pagina Storefront

- [ ] Route dichiarata, cartella `frontStore` corretta.
- [ ] SEO: title, meta, canonical, slug, structured data.
- [ ] Performance: immagini ottimizzate, JS minimo.
- [ ] Accessibilità WCAG AA.
- [ ] i18n: testi in `translations/`.
- [ ] Eventi CRM emessi dove pertinente (lead).
- [ ] Stati loading/empty/error gestiti.

---

## Roadmap

1. Home + catalogo + PDP brandizzati.
2. Configuratore v1 con prezzo dinamico (Quoter).
3. Richiesta preventivo → lead CRM.
4. Blog/Portfolio SEO.
5. Account cliente con tracciamento produzione.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Prezzo calcolato lato client manomettibile | Validazione/stima autorevole lato server |
| Performance degradata da media pesanti | Ottimizzazione Media Library, budget CWV |
| SEO trascurata | Checklist SEO obbligatoria (doc 22) |
| Divergenza brand | Design System condiviso (doc 05) |

---

## Estensioni future

- Configuratore 3D/preview avanzata.
- Portale B2B self-service.
- Wishlist, resi self-service, recensioni.

---

## Compatibilità con Evershop

Lo storefront estende quello Evershop con route/pagine `frontStore`, componenti override e GraphQL non-admin. Il configuratore e il quoter sono moduli Ingly che si integrano via API ed eventi, senza modificare il core.

## Compatibilità con aggiornamenti futuri

Usando route e componenti override ufficiali, gli aggiornamenti dello storefront core non rompono le estensioni. Verificare i componenti sovrascritti dopo ogni upgrade.

---

## See also
- [13 Ecommerce](13_ECOMMERCE.md)
- [17 Laser Center](17_LASER_CENTER.md)
- [18 Quoter](18_QUOTER.md)
- [22 Marketing](22_MARKETING.md)
