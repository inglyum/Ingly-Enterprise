# 02 — PRODUCT REQUIREMENTS · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Product Owner — Ingly Design
**Destinatari:** Team di sviluppo, QA, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Questo documento raccoglie i **requisiti funzionali (FR)** e **non funzionali (NFR)** di INGLY Enterprise. Traduce la visione (`01_PROJECT_VISION.md`) in capacità concrete, verificabili e tracciabili. È la base per la pianificazione, lo sviluppo e il collaudo (QA).

Ogni requisito ha un identificativo stabile (`FR-xxx`, `NFR-xxx`) usato nei documenti di analisi, nei test e nei commit.

---

## Visione (sintesi operativa)

I requisiti realizzano una piattaforma gestionale unificata costruita su Evershop, che copre ecommerce, CRM, produzione, preventivi AI, media, analytics e automazioni, mantenendo compatibilità con l'upstream.

---

## Obiettivi

1. Definire in modo non ambiguo cosa il sistema deve fare.
2. Stabilire i vincoli qualitativi (performance, sicurezza, disponibilità).
3. Fornire criteri di accettazione tracciabili per QA e Claude Code.
4. Prevenire scope creep collegando ogni requisito a un obiettivo di visione.

---

## Requisiti funzionali per dominio

### Ecommerce (Evershop core + estensioni)
- **FR-ECM-01** Il sistema deve gestire catalogo prodotti con varianti e attributi.
- **FR-ECM-02** Il sistema deve gestire carrello, checkout e pagamenti (Stripe, PayPal, COD).
- **FR-ECM-03** Il sistema deve supportare prodotti personalizzabili con configuratore.
- **FR-ECM-04** Il sistema deve calcolare spedizioni e tasse per area geografica.

### CRM
- **FR-CRM-01** Il sistema deve gestire anagrafica clienti (B2C e B2B) e lead.
- **FR-CRM-02** Il sistema deve tracciare interazioni, note e comunicazioni per cliente.
- **FR-CRM-03** Il sistema deve collegare ordini e preventivi al profilo cliente.
- **FR-CRM-04** Il sistema deve supportare pipeline di vendita con stati configurabili.

### Produzione & Laser Center
- **FR-PRD-01** Il sistema deve generare ordini di produzione dagli ordini ecommerce.
- **FR-PRD-02** Il sistema deve gestire una coda di lavoro per il laboratorio.
- **FR-PRD-03** Il sistema deve tracciare materiali, macchine laser e loro parametri.
- **FR-PRD-04** Il sistema deve registrare l'avanzamento produzione con stati.

### Quoter (Preventivi AI)
- **FR-QUO-01** Il sistema deve calcolare preventivi da parametri (materiale, dimensioni, lavorazioni).
- **FR-QUO-02** Il sistema deve supportare regole di prezzo deterministiche e configurabili.
- **FR-QUO-03** Il sistema deve permettere assistenza AI nella stima e nel testo del preventivo.
- **FR-QUO-04** Il sistema deve generare un documento PDF di preventivo e inviarlo via email.

### Media Library
- **FR-MED-01** Il sistema deve archiviare, organizzare e cercare asset digitali.
- **FR-MED-02** Il sistema deve generare varianti ottimizzate (thumbnail, formati).
- **FR-MED-03** Il sistema deve gestire metadati, tag e permessi sugli asset.

### CMS / Blog / Portfolio
- **FR-CMS-01** Il sistema deve gestire pagine, blog e portfolio con contenuti dinamici.
- **FR-CMS-02** Il sistema deve supportare SEO on-page (meta, slug, sitemap).

### AI Assistant & Automazioni
- **FR-AI-01** Il sistema deve fornire un assistente AI per operatori e clienti.
- **FR-AUT-01** Il sistema deve eseguire automazioni event-driven (trigger → azioni).

### Analytics / BI
- **FR-BI-01** Il sistema deve fornire dashboard con KPI configurabili in tempo quasi reale.

### Piattaforma
- **FR-PLT-01** Il sistema deve supportare più utenti con ruoli e permessi granulari.
- **FR-PLT-02** Il sistema deve fornire un Plugin System per estensioni isolate.
- **FR-PLT-03** Il sistema deve esporre API versionate (`/api/v1/...`).
- **FR-PLT-04** Il sistema deve supportare backup e versioning dei dati critici.

---

## Requisiti non funzionali

| ID | Categoria | Requisito | Target |
|----|-----------|-----------|--------|
| **NFR-PERF-01** | Performance | Time-to-first-byte pagine storefront | < 500 ms (p95) |
| **NFR-PERF-02** | Performance | Risposta API interne | < 200 ms (p95) |
| **NFR-SCAL-01** | Scalabilità | Scalabilità orizzontale stateless | processi stateless, session esterna |
| **NFR-AVAIL-01** | Disponibilità | Uptime piattaforma | ≥ 99.5% |
| **NFR-SEC-01** | Sicurezza | Conformità OWASP Top 10 | audit periodico |
| **NFR-SEC-02** | Sicurezza | Cifratura dati sensibili at-rest e in-transit | TLS + cifratura DB |
| **NFR-PRIV-01** | Privacy | Conformità GDPR (diritto all'oblio, export) | procedura documentata |
| **NFR-MAINT-01** | Manutenibilità | Copertura test moduli critici | ≥ 80% |
| **NFR-COMPAT-01** | Compatibilità | Aggiornamenti Evershop assorbibili | 0 modifiche core non isolate |
| **NFR-OBS-01** | Osservabilità | Logging strutturato + tracing | stdout JSON, correlazione richieste |
| **NFR-A11Y-01** | Accessibilità | Interfacce conformi WCAG 2.1 AA | verifica per componente |
| **NFR-I18N-01** | Internazionalizzazione | Supporto multilingua storefront/admin | i18n via translations/ |

---

## Diagramma testuale — Tracciabilità requisiti

```
VISIONE (doc 01)
   │
   ├─► Obiettivo strategico ──► FR-xxx ──► Documento analisi (/docs/analysis)
   │                                  └──► Test (unit/integration/e2e)
   │                                  └──► Modulo (src/modules/ingly/...)
   │
   └─► Vincolo qualitativo ───► NFR-xxx ──► Benchmark / audit / gate CI
```

---

## Workflow di gestione requisiti

1. Un nuovo bisogno viene registrato come richiesta.
2. Si valuta l'allineamento alla visione (doc 01). Se non allineato → respinto.
3. Si assegna un ID `FR/NFR`.
4. Si crea un documento di analisi (`/docs/analysis/`).
5. Si pianifica in roadmap (doc 29).
6. Si implementa, testa e documenta.
7. Si aggiorna lo stato del requisito (Proposto → Approvato → Implementato → Verificato).

---

## Convenzioni

- ID requisiti: `FR-<DOMINIO>-NN` e `NFR-<CATEGORIA>-NN`, immutabili.
- Ogni requisito è **atomico** e **verificabile** (evitare "il sistema deve essere veloce").
- I criteri di accettazione sono espressi in formato Given/When/Then quando utile.

---

## Best Practice

- Un requisito senza criterio di accettazione non è pronto per lo sviluppo.
- Preferire requisiti osservabili dall'esterno (comportamento) rispetto a implementazione.
- Rivedere gli NFR ad ogni release: sono facili da dimenticare e costosi da recuperare.

---

## Checklist di completezza requisito

- [ ] Ha un ID univoco e stabile.
- [ ] È atomico e non ambiguo.
- [ ] Ha criteri di accettazione verificabili.
- [ ] È tracciato a un obiettivo di visione.
- [ ] Ha un documento di analisi collegato (se in sviluppo).
- [ ] Ha test associati.

---

## Roadmap dei requisiti

I requisiti sono prioritizzati per fase (vedi doc 29). Fase 1: FR-PLT-*, FR-CRM-*, FR-MED-*. Fase 2: FR-QUO-*, FR-AI-*. Fase 3: FR-PRD-*, FR-BI-*, FR-AUT-*.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Requisiti ambigui → rework | Criteri di accettazione obbligatori |
| NFR trascurati | Gate CI su performance/security/coverage |
| Requisiti in conflitto tra moduli | Revisione architetturale (doc 03) |

---

## Estensioni future

- Requisiti per portale B2B self-service.
- Requisiti per integrazioni marketplace esterni.
- Requisiti di sostenibilità e tracciamento scarti.

---

## Compatibilità con Evershop

I requisiti ecommerce (FR-ECM) sono in larga parte coperti dal core Evershop; le estensioni Ingly aggiungono i domini verticali. Nessun requisito impone modifiche al core non isolabili.

## Compatibilità con aggiornamenti futuri

Gli NFR-COMPAT garantiscono che l'assorbimento degli aggiornamenti upstream sia esso stesso un requisito di prodotto verificabile.

---

## See also
- [01 Project Vision](01_PROJECT_VISION.md)
- [03 System Architecture](03_SYSTEM_ARCHITECTURE.md)
- [26 Testing](26_TESTING.md)
