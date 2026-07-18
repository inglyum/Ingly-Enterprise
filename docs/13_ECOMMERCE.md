# 13 — ECOMMERCE · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Ecommerce Lead — Ingly Design
**Destinatari:** Backend, Frontend, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire come INGLY Enterprise usa ed **estende** le capacità ecommerce di Evershop: catalogo, carrello, checkout, pagamenti, spedizioni, ordini — con l'aggiunta della **personalizzazione laser** e dell'integrazione con Quoter, Produzione e CRM.

---

## Visione

L'ecommerce è il core fornito da Evershop; Ingly lo arricchisce con prodotti personalizzabili, prezzo dinamico (Quoter) e orchestrazione post-ordine (produzione, CRM). Non riscriviamo l'ecommerce: lo estendiamo con moduli ed eventi.

---

## Obiettivi

1. Sfruttare il core Evershop per catalogo/carrello/checkout/pagamenti.
2. Supportare prodotti personalizzati con prezzo dinamico.
3. Collegare gli ordini a produzione e CRM via eventi.
4. Garantire integrità di prezzo e stock lato server.

---

## Capacità dal core Evershop

| Area | Fornito da Evershop | Modulo core |
|------|---------------------|-------------|
| Catalogo | Prodotti, varianti, attributi, categorie | `catalog` |
| Carrello/Checkout | Cart, checkout flow | `checkout` |
| Pagamenti | Stripe, PayPal, COD | `stripe`, `paypal`, `cod` |
| Ordini/OMS | Order, shipment | `oms` |
| Tasse/Promozioni | Tax, promotion | `tax`, `promotion` |
| Clienti | Customer base | `customer` |

Ingly costruisce **sopra** questi, senza modificarli.

---

## Estensioni Ingly

### Prodotti personalizzabili
- Attributi di personalizzazione (materiale, incisione, misure) sul prodotto.
- Configuratore storefront (doc 07) che raccoglie i parametri.
- Il **prezzo custom** è calcolato dal Quoter (doc 18) lato server e validato al checkout.

### Integrazione post-ordine (eventi)
```
checkout confermato
  └─ emit("OrderPlaced", order)
       ├─ [Produzione] crea ordine di produzione (doc 16)
       ├─ [CRM] aggiorna cliente + storico (doc 15)
       ├─ [Analytics] aggiorna KPI (doc 21)
       └─ [Automazioni] trigger (es. email) (doc 20)
```

---

## Integrità prezzo e stock

- Il prezzo dei prodotti custom è **ricalcolato e validato lato server** al momento dell'aggiunta al carrello e al checkout (mai fidarsi del client).
- Lo stock/capacità (per prodotti standard) è gestito dal core; per i custom la disponibilità dipende da materiali/capacità produzione (doc 16/17).
- Transazioni per operazioni atomiche (ordine ↔ inventario); vedere convenzioni DB (doc 08).

---

## Pagamenti e spedizioni

- Metodi di pagamento gestiti dai moduli core (`stripe`, `paypal`, `cod`); nuovi metodi si registrano via `registerPaymentMethod` in `bootstrap.ts`.
- Spedizioni e tasse dal core; regole specifiche Ingly come estensioni configurabili.
- Webhook di pagamento gestiti con handler a firma corretta (3-arg) e verifica firma.

---

## Diagramma testuale — Dal configuratore all'ordine

```
Configuratore (doc 07)
   │ parametri custom
   ▼
Quoter: prezzo (doc 18) ── validazione server ──► Carrello (core)
   │
   ▼ checkout + pagamento (core: stripe/paypal/cod)
   ▼
OrderPlaced ─► Produzione (doc 16) · CRM (doc 15) · Analytics (doc 21)
```

---

## Best Practice

- Prezzo e disponibilità sono verità **server-side**.
- Registrazioni (payment method, hook) solo in `bootstrap.ts`.
- Handler webhook con firma 3-arg + verifica firma provider.
- Emettere eventi post-commit; i subscriber reagiscono in modo idempotente.

---

## Checklist estensione ecommerce

- [ ] Nessuna modifica al core (solo estensioni/hook/eventi).
- [ ] Prezzo custom validato server-side.
- [ ] Eventi `OrderPlaced` gestiti dai moduli a valle.
- [ ] Pagamenti/webhook sicuri (firma, 3-arg).
- [ ] Stock/capacità coerenti (transazioni).
- [ ] Test integrazione checkout ↔ produzione/CRM.

---

## Roadmap

1. Prodotti personalizzabili + attributi.
2. Prezzo dinamico via Quoter al checkout.
3. Eventi OrderPlaced → produzione/CRM.
4. Regole spedizione/tasse specifiche.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Manomissione prezzo client | Validazione server-side |
| Doppia esecuzione subscriber | Idempotenza, eventi post-commit |
| Rottura da aggiornamento core | Solo estensioni ufficiali, test regressione |
| Webhook non sicuri | Verifica firma, 3-arg |

---

## Estensioni future

- Preventivo → ordine automatizzato per clienti B2B.
- Abbonamenti/ricorrenti.
- Marketplace esterni (Etsy/Amazon).

---

## Compatibilità con Evershop

Questo dominio **è** il core Evershop, esteso via moduli/eventi/hook ufficiali. È l'area dove la disciplina di non-modifica del core è più critica per assorbire gli aggiornamenti upstream.

## Compatibilità con aggiornamenti futuri

Poiché non si tocca il core ecommerce, gli aggiornamenti upstream si assorbono con analisi di impatto e test di regressione sui punti di integrazione (eventi, payment method, checkout).

---

## See also
- [07 Website](07_WEBSITE.md)
- [16 Production](16_PRODUCTION.md)
- [18 Quoter](18_QUOTER.md)
- [15 CRM](15_CRM.md)
