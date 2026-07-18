# 22 — MARKETING · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Growth / Marketing Lead — Ingly Design
**Destinatari:** Marketing, Frontend, Backend, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire le capacità di **marketing**: SEO, campagne email, sconti/promozioni, gestione lead e attribuzione. Collega storefront (doc 07), CMS (doc 14), CRM (doc 15) e Analytics (doc 21) per far crescere il brand e le vendite.

---

## Visione

Crescita misurabile e sostenibile. Il marketing usa contenuti SEO, campagne mirate e promozioni intelligenti, con dati chiari su cosa funziona. Ogni azione è tracciata e conforme (GDPR, consensi).

---

## Obiettivi

1. SEO on-page e tecnica solida.
2. Campagne email integrate con CRM e consensi.
3. Promozioni/sconti configurabili (core Evershop + estensioni).
4. Attribuzione e KPI marketing (doc 21).
5. Conformità privacy (doc 24).

---

## SEO

### On-page (doc 14/07)
- Meta title/description, canonical, slug puliti.
- Structured data (JSON-LD): Product, Article, BreadcrumbList, Organization.
- Heading semantici, alt text immagini (Media Library, doc 12).

### Tecnica
- Sitemap.xml e robots.txt aggiornati.
- Performance/Core Web Vitals (doc 25) come fattore SEO.
- URL stabili + **redirect** su contenuti spostati/rimossi.
- Multilingua/hreflang se applicabile (i18n).

---

## Email marketing

- Integrazione con servizi email (estensioni `resend`/`sendgrid`) via `registerEmailService` (bootstrap).
- Campagne segmentate sui **segmenti CRM** (doc 15).
- **Doppio opt-in** e gestione consensi/preferenze (GDPR, doc 24).
- Template brandizzati (doc 04); tracciamento aperture/click (privacy-aware).
- Email transazionali (ordine, preventivo, produzione) separate da quelle marketing.

---

## Promozioni e sconti

- Modulo `promotion` core Evershop per coupon/regole sconto.
- Estensioni Ingly per promozioni specifiche (es. sconto quantità su lavorazioni).
- Regole testate per evitare abusi (cumulabilità, minimi, scadenze).

---

## Attribuzione e KPI

```
Sorgente (UTM/canale) ─► Visita ─► Lead (CRM) ─► Preventivo/Ordine ─► Ricavo
        │                                                              │
        └──────────────── Analytics (doc 21): CAC, conversione, ROI ───┘
```

- UTM e canale tracciati sul lead/ordine.
- KPI: traffico, lead, conversione, CAC, LTV, ROI campagne.

---

## Diagramma testuale — Funnel marketing

```
SEO/Contenuti (doc14) ─► Storefront (doc07) ─► Lead (doc15) ─► Nurturing (email/automazioni doc20)
        │                       │                   │                    │
     Sitemap/JSON-LD       CWV/perf (doc25)     Consensi (doc24)   Segmenti (doc15)
                                                                          │
                                                                   Preventivo/Ordine ─► Analytics (doc21)
```

---

## Best Practice

- Ogni contenuto pubblicato ha SEO completa (checklist doc 14).
- Email solo con consenso valido; opt-out sempre disponibile.
- Promozioni testate contro abusi e cumulabilità.
- Attribuzione tracciata dall'inizio (UTM su lead).
- Performance come parte della SEO.

---

## Checklist marketing

- [ ] SEO on-page completa (meta, slug, JSON-LD).
- [ ] Sitemap/robots aggiornati, redirect gestiti.
- [ ] Email con consenso (doppio opt-in) e opt-out.
- [ ] Segmentazione CRM usata per le campagne.
- [ ] Promozioni testate (minimi, scadenze, cumulabilità).
- [ ] UTM/attribuzione tracciati.
- [ ] KPI marketing in Analytics.
- [ ] Conformità GDPR (consensi/tracciamento).

---

## Roadmap

1. SEO on-page/tecnica + sitemap.
2. Email transazionali + template brandizzati.
3. Campagne segmentate + consensi.
4. Attribuzione UTM + KPI.
5. Automazioni marketing (doc 20) + AI content (doc 19).

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Violazione GDPR (email) | Consenso, opt-out, audit |
| SEO negativa da redirect mancanti | Redirect management |
| Abuso promozioni | Regole/limiti testati |
| Attribuzione incompleta | UTM dall'inizio, tracciamento lead |

---

## Estensioni future

- Marketing automation avanzata (journey multi-step).
- Personalizzazione contenuti per segmento.
- A/B testing landing/email.
- Programmi loyalty/referral.

---

## Compatibilità con Evershop

Si riusano `promotion` core e le estensioni email (`resend`/`sendgrid`) via meccanismi ufficiali. Le capacità marketing Ingly sono additive (segmenti, attribuzione, campagne), senza modificare il core.

## Compatibilità con aggiornamenti futuri

Promozioni ed email si basano su API ufficiali (`registerEmailService`, modulo promotion). Un upgrade del core non le rompe finché si usano questi meccanismi. Verifica dopo ogni upgrade.

---

## See also
- [07 Website](07_WEBSITE.md)
- [14 CMS](14_CMS.md)
- [15 CRM](15_CRM.md)
- [21 Analytics](21_ANALYTICS.md)
