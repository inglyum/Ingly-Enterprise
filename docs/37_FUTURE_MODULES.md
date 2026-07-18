# 37 — FUTURE MODULES · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** CTO / Product Strategy — Ingly Design
**Destinatari:** Management, Team di sviluppo, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Raccogliere il **backlog strategico**: idee per moduli e capacità future, oltre la roadmap corrente (doc 29). È un "parcheggio" disciplinato: cattura le opportunità senza violare YAGNI (non si implementa finché non entra in roadmap).

---

## Visione

Un luogo dove le idee vivono senza inquinare lo sviluppo corrente. Quando un'idea matura (valore chiaro, dipendenze pronte), passa da qui alla roadmap con un documento di analisi. Fino ad allora, resta un'ipotesi.

---

## Obiettivi

1. Catturare opportunità future senza implementarle prematuramente.
2. Valutare valore, rischio e dipendenze di ogni idea.
3. Fornire un percorso chiaro da idea → roadmap → sviluppo.
4. Preservare focus e YAGNI.

---

## Regola YAGNI

> Un modulo in questo documento **non** viene sviluppato finché non è promosso nella roadmap (doc 29) con requisiti (doc 02) e analisi (`docs/analysis/`). L'inclusione qui **non** è un'autorizzazione a costruire.

---

## Backlog moduli futuri

### Portale B2B self-service
- Clienti business gestiscono ordini ricorrenti, preventivi, listini dedicati.
- **Valore:** alto (fidelizzazione B2B). **Dipendenze:** CRM, Quoter, auth avanzata.

### Integrazioni marketplace esterni
- Etsy, Amazon Handmade, eBay: sync catalogo/ordini.
- **Valore:** medio-alto (nuovi canali). **Dipendenze:** ecommerce, OMS, mapping catalogo.

### Sostenibilità & tracciamento scarti
- Tracciare materiali, sfridi, footprint; report ESG.
- **Valore:** medio (brand + efficienza). **Dipendenze:** Laser Center, Produzione, Analytics.

### Forecasting & anomaly detection (ML)
- Previsione domanda/materiali; rilevamento anomalie vendite/produzione.
- **Valore:** medio-alto (efficienza). **Dipendenze:** Analytics (data warehouse), storico.

### Telefonia / WhatsApp nel CRM
- Comunicazioni omnicanale integrate.
- **Valore:** medio. **Dipendenze:** CRM, consensi/GDPR.

### IoT macchine laser
- Telemetria reale, stato macchina, manutenzione predittiva.
- **Valore:** alto (produzione). **Dipendenze:** Laser Center, infra IoT.

### Nesting & ottimizzazione sfrido
- Ottimizzazione automatica del taglio per ridurre lo scarto.
- **Valore:** alto (costi). **Dipendenze:** Laser Center, Quoter, Produzione.

### Loyalty & referral
- Punti, premi, programmi referral.
- **Valore:** medio. **Dipendenze:** ecommerce, CRM, marketing.

### Marketplace di plugin pubblico
- Partner pubblicano estensioni (revenue share).
- **Valore:** strategico (ecosistema). **Dipendenze:** Plugin System maturo (doc 23), sicurezza/firma.

### Estrazione microservizi (AI, Analytics)
- Servizi indipendenti per moduli ad alto carico.
- **Valore:** scalabilità. **Dipendenze:** eventi/contratti stabili, infra (doc 03/27).

---

## Percorso idea → sviluppo

```
IDEA (questo doc)
   │  valutazione: valore · rischio · dipendenze
   ▼
CANDIDATA (dipendenze pronte, valore chiaro)
   │  requisiti (doc 02) + analisi (docs/analysis)
   ▼
ROADMAP (doc 29): pianificata in una fase
   │
   ▼
SVILUPPO (workflow 7 fasi, doc 31)
```

---

## Criteri di promozione a roadmap

- Valore per una persona/obiettivo chiaro (doc 01).
- Dipendenze tecniche pronte (moduli base esistenti).
- Rischio gestibile e stimabile.
- Coerenza con architettura e compatibilità Evershop.
- Capacità del team disponibile.

---

## Diagramma testuale — Imbuto delle idee

```
[ molte IDEE ] ─► valutazione ─► [ poche CANDIDATE ] ─► requisiti+analisi ─► [ ROADMAP ] ─► sviluppo
        │                              │                                          │
     cattura                     valore/rischio                            YAGNI rispettato
```

---

## Best Practice

- Registrare le idee qui invece di implementarle "al volo".
- Rivedere il backlog a fine fase (doc 29).
- Promuovere solo con valore/dipendenze chiari.
- Ogni promozione genera requisiti + analisi.

---

## Checklist promozione idea

- [ ] Valore per persona/obiettivo esplicito.
- [ ] Dipendenze pronte.
- [ ] Rischio valutato.
- [ ] Coerenza architetturale + compatibilità Evershop.
- [ ] Requisiti (doc 02) e analisi (`docs/analysis/`) creati.
- [ ] Inserita in una fase di roadmap (doc 29).

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Implementazione prematura | Regola YAGNI, gate di promozione |
| Backlog dimenticato | Revisione a fine fase |
| Idee senza valore | Criteri di promozione |
| Dipendenze sottovalutate | Analisi prima della roadmap |

---

## Estensioni future

Questo documento è il contenitore delle estensioni future dell'intero sistema: si aggiorna man mano che emergono nuove opportunità. Le idee promosse migrano nella roadmap; quelle superate vengono archiviate con nota.

---

## Compatibilità con Evershop

Ogni idea futura sarà valutata anche per compatibilità con il core (estensione vs modifica). I moduli futuri seguiranno la stessa disciplina: `modules/ingly/` o `extensions/`, agganci ufficiali, nessuna modifica al core.

## Compatibilità con aggiornamenti futuri

Poiché i moduli futuri nasceranno come estensioni isolate, non pregiudicheranno l'aggiornabilità. La valutazione di compatibilità è parte dei criteri di promozione.

---

## See also
- [01 Project Vision](01_PROJECT_VISION.md)
- [29 Roadmap](29_ROADMAP.md)
- [23 Plugin System](23_PLUGIN_SYSTEM.md)
- [03 System Architecture](03_SYSTEM_ARCHITECTURE.md)
