# 01 — PROJECT VISION · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** CEO / CTO — Ingly Design
**Destinatari:** Tutti gli stakeholder, Team di sviluppo, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Questo documento definisce la **visione strategica**, la **missione**, i **valori** e gli **obiettivi di lungo periodo** di INGLY Enterprise. Rappresenta il "perché" del progetto: la stella polare a cui ogni decisione di prodotto e di architettura deve tendere. Dove i documenti tecnici rispondono al "come", questo risponde al "perché" e al "cosa".

Ogni feature proposta deve poter essere ricondotta a uno o più obiettivi elencati qui. Se non lo è, va rimessa in discussione (principio YAGNI).

---

## Visione

> **Trasformare Ingly Design da laboratorio di personalizzazione laser a piattaforma digitale integrata, dove ogni processo — dalla vendita alla produzione, dal preventivo alla consegna — è orchestrato da un unico sistema intelligente.**

INGLY Enterprise è la spina dorsale operativa dell'azienda. Non un insieme di strumenti scollegati (un ecommerce qui, un gestionale là, un foglio Excel per i preventivi), ma un **organismo software unico**, costruito su fondamenta open-source solide (Evershop), esteso in modo modulare e governato da principi Enterprise.

La visione a 3 anni: qualsiasi collaboratore di Ingly Design — dal commerciale all'operatore laser, dal marketing all'amministrazione — lavora dentro un'unica piattaforma, con dati condivisi in tempo reale, automazioni che eliminano il lavoro ripetitivo e assistenza AI che accelera le decisioni.

---

## Missione

1. **Digitalizzare** l'intera catena del valore di Ingly Design.
2. **Unificare** i dati aziendali in un modello di dominio coerente.
3. **Automatizzare** i flussi ripetitivi (preventivi, notifiche, avanzamento produzione).
4. **Potenziare** le persone con strumenti AI, non sostituirle.
5. **Scalare** senza riscrivere: un'architettura che cresce con l'azienda.

---

## Valori

| Valore | Significato operativo |
|--------|-----------------------|
| **Qualità artigianale nel software** | Il codice è curato come un prodotto laser: preciso, pulito, senza sbavature. |
| **Trasparenza** | Ogni decisione è documentata e tracciabile. Nessuna "magia" nascosta. |
| **Semplicità** | Preferiamo la soluzione più semplice che risolve il problema reale (KISS). |
| **Autonomia dei moduli** | Ogni dominio è padrone di sé; comunica per contratti, non per accoppiamento. |
| **Aggiornabilità** | Non ipotechiamo il futuro: restiamo compatibili con l'upstream Evershop. |
| **Dati come asset** | I dati sono il patrimonio dell'azienda; li proteggiamo e li valorizziamo. |

---

## Obiettivi strategici

### Breve termine (0–6 mesi)
- Consolidare il core Evershop e stabilire il framework `/docs`.
- Implementare il modulo **CRM** e il modulo **Media Library**.
- Prototipo del **Quoter** (preventivi) con regole deterministiche.

### Medio termine (6–18 mesi)
- Modulo **Produzione** e **Laser Center** operativi.
- **AI Assistant** integrato nel Quoter e nel supporto clienti.
- Dashboard di **Business Intelligence** con KPI in tempo reale.

### Lungo termine (18–36 mesi)
- **Plugin System** maturo con marketplace interno.
- Estrazione dei moduli ad alto carico in servizi indipendenti.
- Automazioni cross-dominio complete (ordine → produzione → spedizione → CRM).

---

## Personas principali

| Persona | Ruolo | Bisogni chiave |
|---------|-------|----------------|
| **Cliente finale** | Acquista prodotti personalizzati online | Configuratore chiaro, preventivo rapido, tracciamento ordine |
| **Commerciale / Account** | Gestisce lead e clienti B2B | CRM, storico, preventivi, comunicazioni |
| **Operatore laser** | Esegue la produzione | Coda di lavoro, parametri macchina, avanzamento |
| **Responsabile produzione** | Pianifica il laboratorio | Scheduling, materiali, capacità macchine |
| **Marketing** | Cresce il brand | SEO, campagne, analytics, media library |
| **Amministrazione** | Controlla numeri e conformità | Report, fatturato, GDPR, backup |
| **Amministratore di sistema** | Gestisce la piattaforma | Ruoli, permessi, plugin, deployment |

---

## Diagramma testuale — Ecosistema di valore

```
                        ┌─────────────────────────┐
                        │     CLIENTE FINALE      │
                        └────────────┬────────────┘
                                     │ ordina / configura
                                     ▼
   ┌──────────┐   evento   ┌──────────────────┐   evento   ┌──────────────┐
   │   CRM    │◄───────────│    ECOMMERCE     │───────────►│   QUOTER/AI  │
   └────┬─────┘            └────────┬─────────┘            └──────┬───────┘
        │                           │ OrderPlaced                 │
        │                           ▼                             │
        │                  ┌──────────────────┐                   │
        └─────────────────►│   PRODUZIONE     │◄──────────────────┘
                           │  + LASER CENTER  │
                           └────────┬─────────┘
                                    │ ProductionCompleted
                                    ▼
                           ┌──────────────────┐
                           │  SPEDIZIONE/OMS  │──► ANALYTICS / BI
                           └──────────────────┘
```

---

## Metriche di successo (North Star)

- **Time-to-quote**: tempo medio da richiesta a preventivo inviato (target: < 5 minuti).
- **Order-to-production lead time**: da ordine confermato ad avvio produzione (target: automatico, < 1 ora).
- **Automation rate**: % di task operativi automatizzati (target: > 60% a 18 mesi).
- **Data unification**: % di dati aziendali dentro la piattaforma (target: > 90%).
- **Upstream compatibility**: numero di aggiornamenti Evershop assorbiti senza rottura (target: 100%).

---

## Convenzioni

- La visione è espressa in termini di **outcome** (risultati), non di **output** (funzionalità).
- Ogni obiettivo strategico ha un documento tecnico di riferimento in `/docs`.
- Le personas guidano le priorità: una feature senza persona chiara è sospetta.

---

## Best Practice

- Rileggere questo documento all'inizio di ogni ciclo di pianificazione (roadmap).
- Validare ogni epic contro missione e valori prima dello sviluppo.
- Aggiornare le metriche North Star trimestralmente con dati reali.

---

## Checklist di allineamento (per ogni nuova epic)

- [ ] L'epic serve almeno una persona identificata?
- [ ] È riconducibile a un obiettivo strategico?
- [ ] Rispetta i valori (semplicità, autonomia, aggiornabilità)?
- [ ] Ha una metrica di successo misurabile?
- [ ] Non viola YAGNI (non è "per il futuro")?

---

## Roadmap sintetica

Vedi `29_ROADMAP.md` per il dettaglio. In sintesi: **Fondamenta → CRM/Media → Quoter/AI → Produzione/Laser → BI/Automazioni → Marketplace Plugin**.

---

## Rischi

| Rischio | Impatto | Mitigazione |
|---------|---------|-------------|
| Scope creep (ambizione eccessiva) | Alto | Disciplina YAGNI, roadmap prioritizzata |
| Dipendenza da singolo fornitore AI | Medio | Astrazione multi-provider (vedi doc 19) |
| Resistenza al cambiamento interno | Medio | UX curata, formazione, rollout graduale |
| Divergenza dall'upstream Evershop | Alto | Politica di non-modifica del core (doc 00, 03) |

---

## Estensioni future

- Apertura della piattaforma a clienti B2B come portale self-service.
- Integrazione con marketplace esterni (Etsy, Amazon Handmade).
- Modulo di sostenibilità (tracciamento materiali, scarti, footprint).

---

## Compatibilità con Evershop

La visione è deliberatamente costruita **sopra** Evershop, non contro di esso. Evershop fornisce ecommerce, catalogo, checkout, CMS di base; INGLY estende con i domini verticali. Questo garantisce che la visione resti realizzabile senza forkare il core.

## Compatibilità con aggiornamenti futuri

La visione non dipende da dettagli implementativi di Evershop, quindi resta valida attraverso le versioni. Gli obiettivi strategici sono espressi a livello di dominio, non di framework.

---

## See also
- [00 Master Prompt](00_MASTER_PROMPT.md) — contratto operativo radice
- [02 Product Requirements](02_PRODUCT_REQUIREMENTS.md) — requisiti derivati da questa visione
- [29 Roadmap](29_ROADMAP.md) — piano temporale
