# 18 — QUOTER (PREVENTIVI AI) · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Quoter Domain Owner — Ingly Design
**Destinatari:** Backend, Frontend, Commerciale, AI, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Progettare il **Quoter**: il motore di **preventivi** che calcola il prezzo di prodotti/lavorazioni personalizzate a partire da parametri (materiale, dimensioni, lavorazioni, quantità), con regole deterministiche configurabili e assistenza AI opzionale. Genera preventivi PDF e li collega a CRM e ordini.

---

## Visione

Ridurre il time-to-quote da ore a minuti. Il cliente configura, il Quoter calcola in modo trasparente e accurato usando i dati reali del Laser Center; l'AI assiste (spiegazioni, testo, casi ambigui) ma il **prezzo resta deterministico e spiegabile**.

---

## Obiettivi

1. Calcolo prezzo deterministico da parametri e regole configurabili.
2. Uso dei dati reali del Laser Center (costi materiale, tempo macchina).
3. Assistenza AI opzionale (stima su input ambigui, testo preventivo).
4. Generazione preventivo PDF + invio email.
5. Integrazione con CRM (lead) e conversione in ordine.

---

## Bounded Context

Modulo `modules/ingly/quoter/`. Entità principali:

- **Quote**: preventivo (cliente/lead, righe, totale, stato, validità).
- **QuoteLine**: riga (prodotto/lavorazione, parametri, prezzo calcolato).
- **PricingRule**: regola di prezzo configurabile (margini, sconti, minimi, maggiorazioni).
- **QuoteTemplate**: template PDF/email brandizzato.

Tabelle: `ingly_quote`, `ingly_quote_line`, `ingly_quote_rule`.

---

## Motore di calcolo (deterministico)

```
INPUT: materiale, dimensioni, lavorazioni, quantità
   │
   ▼  dati Laser Center (doc 17)
costo_materiale = f(area, sfrido, costo_unitario)
tempo_macchina  = LaserParam(materiale, macchina, lavorazione) × quantità
costo_macchina  = tempo_macchina × costo_ora_macchina
costo_manodopera= tempo × costo_ora_operatore
   │
   ▼  regole (PricingRule): margine, minimi, sconti quantità, maggiorazioni
PREZZO = (costi) × (1 + margine) applicando regole
   │
   ▼  OUTPUT: prezzo + breakdown spiegabile
```

**Principio:** il prezzo è **spiegabile** (breakdown visibile) e **riproducibile** (stessi input → stesso output). L'AI non altera il prezzo di nascosto.

---

## Ruolo dell'AI (assistenza, non sostituzione)

L'AI (doc 19) interviene in modo controllato:

- **Input ambigui**: da una descrizione libera del cliente, suggerisce parametri (materiale/lavorazione) da confermare.
- **Stima preliminare** quando mancano dati precisi, chiaramente marcata come stima.
- **Testo del preventivo**: genera descrizione/nota professionale (tono di voce, doc 04).
- **Suggerimenti** di upsell/alternative.

L'AI **propone**; il calcolo del prezzo finale resta deterministico e validato lato server. Ogni suggerimento AI è tracciato.

---

## Flusso preventivo

```
Configuratore/Storefront (doc 07)
   │ POST /api/v1/quoter/estimate  (stima live, server-side)
   ▼
Quote (bozza) ─ emit("QuoteRequested") ─► CRM crea lead (doc 15)
   │
   ▼ revisione commerciale (Admin, doc 06) + eventuale AI
Preventivo finale ─► PDF (Media Library, doc 12) ─► email (resend/sendgrid)
   │
   ├─ QuoteAccepted ─► conversione in ordine (doc 13) + pipeline CRM
   └─ QuoteExpired  ─► follow-up automazioni (doc 20)
```

---

## Stati del preventivo

```
DRAFT ─► SENT ─► ACCEPTED ─► CONVERTED(order)
   │        │
   │        └─► EXPIRED / REJECTED
   └─► CANCELLED
```

Validità con scadenza; follow-up automatici su `SENT`/`EXPIRED`.

---

## Diagramma testuale — Fonti del prezzo

```
LASER CENTER (doc 17)     PRICING RULES (config)      AI (doc 19, opz.)
 costo materiale  ┐        margini/sconti/minimi        parametri suggeriti
 tempo macchina   ├──────► MOTORE QUOTER ──────► prezzo + breakdown
 costo/ora        ┘                                      (deterministico)
```

---

## Best Practice

- Prezzo **sempre** ricalcolato server-side (mai fidarsi del client).
- Breakdown spiegabile allegato al preventivo.
- Regole di prezzo configurabili, versionate e testate.
- Suggerimenti AI marcati e confermabili dall'operatore.
- Preventivo PDF brandizzato e archiviato in Media Library.

---

## Checklist Quoter

- [ ] Calcolo deterministico e riproducibile.
- [ ] Uso dati reali Laser Center.
- [ ] Regole di prezzo configurabili/versionate.
- [ ] Stima server-side (endpoint `/api/v1/quoter/estimate`).
- [ ] AI opzionale, tracciata, non altera prezzo di nascosto.
- [ ] PDF brandizzato + email.
- [ ] Eventi QuoteRequested/Accepted/Expired → CRM/Automazioni.
- [ ] Test su casi limite (materiali/misure estreme).

---

## Roadmap

1. Motore deterministico + regole base.
2. Endpoint stima live + configuratore.
3. PDF/email + CRM lead.
4. Assistenza AI (parametri, testo).
5. Conversione preventivo → ordine + follow-up.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Prezzo non spiegabile/errato | Breakdown, regole testate, dati reali |
| Manomissione prezzo client | Ricalcolo server-side |
| AI "allucina" prezzi | AI solo su parametri/testo; prezzo deterministico |
| Parametri Laser obsoleti | Versioning parametri (doc 17) |

---

## Estensioni future

- Ottimizzazione prezzo/margine con ML su storico.
- Preventivi multi-opzione (buono/migliore/ottimo).
- Approvazioni e sconti autorizzati per soglia.
- Nesting/sfrido preciso per costo materiale.

---

## Compatibilità con Evershop

Il Quoter è un modulo Ingly. Si integra con il carrello/checkout core (prezzo custom validato) e con il CRM via eventi, senza modificare il core. Usa Media Library ed email extension per PDF/invio.

## Compatibilità con aggiornamenti futuri

Dominio autonomo: gli upgrade del core non impattano il motore di calcolo. Verificare solo i punti di integrazione con checkout (prezzo custom) dopo un upgrade.

---

## See also
- [17 Laser Center](17_LASER_CENTER.md)
- [19 AI Assistant](19_AI_ASSISTANT.md)
- [15 CRM](15_CRM.md)
- [13 Ecommerce](13_ECOMMERCE.md)
