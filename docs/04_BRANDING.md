# 04 — BRANDING · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Brand & Creative Director — Ingly Design
**Destinatari:** Design, Frontend, Marketing, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire l'**identità di marca** di Ingly Design applicata alla piattaforma INGLY Enterprise: logo, colori, tipografia, tono di voce e regole d'uso. Il branding è **vincolante** per ogni interfaccia (Admin e Storefront) e per ogni comunicazione generata dal sistema (email, PDF, notifiche).

Questo documento è la fonte di verità per i valori di brand che poi diventano **design token** in `05_DESIGN_SYSTEM.md`.

---

## Visione

Il brand Ingly comunica **precisione artigianale + tecnologia**. L'incisione laser è precisa, pulita, essenziale: l'identità visiva deve rifletterlo. Niente decorazioni superflue, molto respiro, contrasto netto, materia (legno, metallo, acrilico) evocata con sobrietà.

---

## Obiettivi

1. Garantire coerenza visiva su tutti i touchpoint.
2. Fornire regole applicabili e verificabili (non gusti soggettivi).
3. Collegare i valori di brand ai design token tecnici.
4. Preservare l'identità anche negli output generati automaticamente.

---

## Logo

- **Logo primario:** wordmark "INGLY" + eventuale simbolo del fascio/segno di incisione.
- **Varianti:** positivo (su chiaro), negativo (su scuro), monocromatico, favicon/mark.
- **Area di rispetto:** margine minimo pari all'altezza della lettera "I" su tutti i lati.
- **Dimensione minima:** 24 px di altezza in digitale per garantire leggibilità.
- **Usi vietati:** distorsioni, ombre, gradienti non approvati, rotazioni, ricolorazioni fuori palette.

Gli asset del logo risiedono nella **Media Library** (doc 12) con tag `brand/logo` e sono la sola fonte autorizzata.

---

## Palette colori

> I valori esatti sono i **token** definiti in `05_DESIGN_SYSTEM.md`. Qui si definisce l'intento.

| Ruolo | Intento | Token (rif. doc 05) |
|-------|---------|---------------------|
| **Primary** | Colore del brand, azioni principali | `--color-primary` |
| **Neutrals** | Sfondi, testo, bordi — scala di grigi calda | `--color-neutral-*` |
| **Accent** | Evidenziazioni, stati di successo/attenzione | `--color-accent`, `--color-*-500` |
| **Surface** | Superfici materiche (evocazione legno/metallo) | `--color-surface-*` |
| **Semantic** | success / warning / danger / info | `--color-success` ecc. |

Regole:
- Contrasto testo/sfondo conforme **WCAG 2.1 AA** (≥ 4.5:1 per testo normale).
- Il colore non è mai l'unico veicolo di informazione (accessibilità).
- La palette scura (dark mode) è di pari dignità della chiara.

---

## Tipografia

- **Font display / headings:** sans-serif geometrico, essenziale.
- **Font testo:** sans-serif ad alta leggibilità per UI e paragrafi lunghi.
- **Font mono:** per codici, SKU, parametri laser.
- Scala tipografica modulare definita in `05_DESIGN_SYSTEM.md`.
- Evitare più di due famiglie tipografiche in una stessa interfaccia.

---

## Tono di voce

| Contesto | Tono |
|----------|------|
| Storefront | Caldo, competente, essenziale. Parla di materia e personalizzazione. |
| Admin | Diretto, chiaro, orientato all'azione. Nessun gergo inutile. |
| Errori | Empatico e utile: dire cosa è successo e cosa fare. |
| Email / PDF preventivi | Professionale, cordiale, preciso sui numeri. |

Principi di scrittura:
- Frasi brevi. Verbi attivi.
- Niente marketing gonfiato ("rivoluzionario", "incredibile").
- Coerenza terminologica con il **linguaggio ubiquo** dei domini (DDD).

---

## Diagramma testuale — Dal brand al pixel

```
VALORI BRAND (questo doc)
   │  precisione · materia · essenzialità · contrasto
   ▼
DESIGN TOKEN (doc 05)  ── colori, spaziature, tipografia, radius, shadow
   ▼
COMPONENTI UI (doc 05/06/07) ── Button, Card, Table, Form...
   ▼
INTERFACCE (Admin/Storefront) e OUTPUT (email, PDF, notifiche)
```

---

## Convenzioni

- Ogni colore/asset usato in UI deve derivare da un token, mai hardcoded.
- Le comunicazioni automatiche (email/PDF) usano un template brandizzato centrale.
- Le eccezioni al brand richiedono approvazione e vengono documentate.

---

## Best Practice

- Verificare contrasto e leggibilità ad ogni nuovo componente.
- Testare logo e colori in dark mode e in stampa (PDF preventivi).
- Mantenere un unico set di asset di brand nella Media Library.

---

## Checklist brand (per ogni schermata/output)

- [ ] Colori derivati da token (nessun hex hardcoded).
- [ ] Contrasto WCAG AA verificato.
- [ ] Logo usato in variante corretta e con area di rispetto.
- [ ] Tono di voce coerente con il contesto.
- [ ] Funziona in light e dark mode.

---

## Roadmap

1. Definizione asset logo definitivi nella Media Library.
2. Palette e token consolidati (doc 05).
3. Template email/PDF brandizzati.
4. Brand guidelines pubblicabili come pagina interna.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Colori hardcoded nel codice | Lint/review su uso token |
| Incoerenza output automatici | Template centralizzati brandizzati |
| Drift del brand nel tempo | Revisione periodica, asset unica sorgente |

---

## Estensioni future

- Brand kit esportabile per partner/rivenditori.
- Theming multi-brand (se nascono sub-brand).
- Motion design guidelines (micro-animazioni).

---

## Compatibilità con Evershop

Evershop fornisce temi e componenti storefront/admin personalizzabili via CSS/Tailwind e override di componenti. Il branding Ingly si applica tramite token e override ufficiali, senza modificare il core.

## Compatibilità con aggiornamenti futuri

I token di brand sono centralizzati; un aggiornamento del tema Evershop non altera i valori Ingly finché si usano gli override ufficiali. Verificare i componenti sovrascritti ad ogni upgrade.

---

## See also
- [05 Design System](05_DESIGN_SYSTEM.md)
- [07 Website](07_WEBSITE.md)
- [12 Media Library](12_MEDIA_LIBRARY.md)
