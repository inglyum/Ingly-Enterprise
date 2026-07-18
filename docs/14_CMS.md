# 14 — CMS (CONTENT MANAGEMENT) · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Content Platform Lead — Ingly Design
**Destinatari:** Backend, Frontend, Marketing, Content, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire il sistema di gestione contenuti: **pagine**, **blog** e **portfolio**, con SEO integrata e supporto al page-builder di Evershop. Consente al team marketing/content di pubblicare contenuti dinamici senza intervento sviluppo.

---

## Visione

Contenuti come leva di crescita: pagine istituzionali, articoli di blog e portfolio di lavori laser, gestiti in autonomia, ottimizzati per SEO e coerenti con brand e Design System. Il CMS estende quello Evershop con tipi di contenuto Ingly (portfolio).

---

## Obiettivi

1. Gestione pagine/blog/portfolio con contenuti dinamici.
2. SEO on-page (meta, slug, sitemap, structured data).
3. Riuso del page-builder e dei widget Evershop.
4. Integrazione con Media Library (doc 12).
5. Workflow editoriale (bozza → revisione → pubblicazione).

---

## Tipi di contenuto

| Tipo | Descrizione | Origine |
|------|-------------|---------|
| **Pagina** | Contenuti istituzionali (chi siamo, servizi) | core CMS Evershop |
| **Blog post** | Articoli, guide, SEO | estensione (blog core presente) |
| **Portfolio item** | Progetti/lavori laser con media | modulo Ingly `modules/ingly/portfolio/` |

Il portfolio è specifico Ingly: mostra i lavori con immagini (Media Library), materiali, tecniche.

---

## Page-builder e widget

- Evershop offre un **page-builder** e un sistema di **widget** registrabili (`registerWidget` in `bootstrap.ts`).
- I widget Ingly (es. "griglia portfolio", "CTA preventivo") si registrano da bootstrap.
- **Attenzione (pitfall CLAUDE.md):** i settaggi widget con liste vanno letti con `useArraySetting`/`asArray` (o `useFieldArray`), perché la pagina legacy `/admin/widgets/edit` serializza le liste come stringa JSON. Evitare `watch('settings.x') ?? initial`.

---

## SEO on-page

- Meta title/description, canonical, slug configurabili per contenuto.
- Sitemap e robots aggiornati automaticamente.
- Structured data (JSON-LD) per articoli e portfolio.
- Dettagli e strategia in `22_MARKETING.md`.

---

## Workflow editoriale

```
Bozza ─► Revisione ─► Programmazione/Pubblicazione ─► Aggiornamento ─► Archiviazione
  │         │               │                                            │
 Autore  Editor/Marketing  Slug+SEO+Media                        Redirect se rimosso
```

- Stati di pubblicazione con permessi RBAC (doc 11): `cms.page/post/portfolio . create/update/publish`.
- Anteprima prima della pubblicazione.
- Gestione redirect quando un contenuto viene rimosso/spostato (SEO).

---

## Diagramma testuale — Composizione pagina

```
Contenuto (CMS) ──► Page-builder (aree/widget) ──► SSR (React) ──► HTML+SEO
      │                    │                                  │
   Media Library      Widget Ingly                      Structured data
   (doc 12)           (portfolio, CTA)                  (doc 22)
```

---

## Best Practice

- Ogni contenuto pubblicato ha SEO completa e media ottimizzati.
- Widget con impostazioni liste: usare `useArraySetting`/`asArray`.
- Redirect per contenuti rimossi (evita 404/perdita ranking).
- Contenuti coerenti con tono di voce (doc 04).

---

## Checklist contenuto

- [ ] Slug, meta title/description, canonical.
- [ ] Media ottimizzati (Media Library, alt text).
- [ ] Structured data se applicabile.
- [ ] Permessi/stato pubblicazione corretti.
- [ ] Anteprima verificata.
- [ ] Redirect gestito se sostituisce/rimuove contenuto.
- [ ] Widget liste letti con `useArraySetting`/`asArray`.

---

## Roadmap

1. Pagine + blog SEO (core + estensioni).
2. Modulo Portfolio Ingly + widget griglia.
3. Workflow editoriale con stati/permessi.
4. Structured data e sitemap avanzata.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| SEO incompleta | Checklist SEO obbligatoria |
| Widget list-field crash | `useArraySetting`/`asArray` (pitfall) |
| 404 da contenuti rimossi | Redirect management |
| Media pesanti | Media Library ottimizzata |

---

## Estensioni future

- Localizzazione contenuti multilingua avanzata.
- Versioning contenuti + rollback.
- Landing page builder marketing.

---

## Compatibilità con Evershop

Si riusano CMS, page-builder e widget system di Evershop; il Portfolio è un modulo Ingly additivo. Nessuna modifica al core; widget registrati in `bootstrap.ts`.

## Compatibilità con aggiornamenti futuri

Widget e contenuti Ingly sono additivi. Un upgrade del page-builder core richiede verifica dei `settingComponent` dei widget (attenzione al trap list-field). Test dopo ogni upgrade.

---

## See also
- [07 Website](07_WEBSITE.md)
- [12 Media Library](12_MEDIA_LIBRARY.md)
- [22 Marketing](22_MARKETING.md)
