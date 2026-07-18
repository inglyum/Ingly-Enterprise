# 26 — TESTING · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** QA Lead — Ingly Design
**Destinatari:** Tutto il team, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire la **strategia di test**: livelli, coperture, strumenti e workflow. Il test è parte della **Definition of Done** (doc 00): nessuna feature è completa senza test adeguati. Runner: **Jest** (`npm test`).

---

## Visione

Qualità garantita da test automatici affidabili. La piramide dei test privilegia molti unit test veloci, integrazione mirata sui confini e pochi E2E sui flussi critici. I test proteggono anche la compatibilità con gli aggiornamenti di Evershop.

---

## Obiettivi

1. Copertura ≥ 80% sui moduli critici (NFR-MAINT-01).
2. Test veloci e deterministici (no flaky).
3. Test di integrazione sui confini (DB, eventi, API).
4. E2E sui flussi chiave (ordine, preventivo, produzione).
5. Test di regressione per gli upgrade upstream.

---

## Piramide dei test

```
            ╱‾‾‾‾‾‾╲   E2E (pochi): flussi critici end-to-end
           ╱────────╲
          ╱ Integr.  ╲  Integrazione (mirati): DB, eventi, API, resolver
         ╱────────────╲
        ╱   Unit test  ╲ Unit (molti): dominio, service, funzioni pure
       ╱────────────────╲
```

| Livello | Cosa testa | Strumenti |
|---------|-----------|-----------|
| **Unit** | Logica di dominio/service, funzioni pure | Jest |
| **Integration** | Repository/Postgres, eventi/subscriber, API v1, resolver GraphQL | Jest + DB di test |
| **E2E** | Flussi utente completi (storefront/admin) | Playwright (Chromium preinstallato) |

---

## Cosa testare per modulo Ingly

- **Domain**: invarianti, transizioni di stato (es. produzione doc 16), calcoli (es. Quoter doc 18).
- **Application/Service**: casi d'uso, gestione errori, idempotenza.
- **Infrastructure**: repository (query builder), adapter esterni (mockati).
- **Eventi**: emissione post-commit, subscriber idempotenti, doppio evento.
- **API**: contratti, validazione, permessi (RBAC), formato risposta/errore.
- **Hook alignment**: che gli hook pubblici scattino (vedi guard test `hookNameAlignment` in oms).

---

## Convenzioni

- Test accanto al modulo: `modules/ingly/<dominio>/tests/{unit,integration}/`.
- Nome file: `*.test.ts` / `*.test.js` (nuovi in `.ts`).
- Test **deterministici**: niente dipendenze da tempo reale/rete non mockata.
- Dati di test isolati; DB di test resettabile (`seed/`).
- Un test per comportamento, nome descrittivo.

---

## Test e principi (dal Master Prompt)

Ogni feature, per essere "done", richiede:
- Unit test sulla logica di dominio.
- Integration test sui confini toccati.
- E2E se tocca un flusso critico.
- Verifica che i test esistenti passino (nessuna regressione).

---

## Diagramma testuale — Test nel workflow

```
Analisi ─► Piano ─► Implementazione ─► TEST ─► Documentazione ─► Review
                          │              │
                     scrivo codice   unit+integration+e2e
                                         │
                                    CI gate: test + coverage + lint + budget (doc25)
```

---

## Regressione e compatibilità Evershop

- Suite di **regressione** sui punti di integrazione col core (eventi ordine, checkout, payment, widget).
- Eseguita **prima** di ogni upgrade upstream (doc 00/36).
- Guard test per trappole note (hook name alignment, list-field widget, handler 3-arg).

---

## Best Practice

- Testare comportamento, non implementazione.
- Mockare i confini esterni (rete, provider AI/email/pagamenti).
- Evitare flaky test (attese fisse, ordini non deterministici).
- Coverage come indicatore, non come fine: coprire i percorsi critici.
- Aggiungere un test di regressione per ogni bug risolto.

---

## Checklist test (per ogni PR)

- [ ] Unit test sulla logica nuova/modificata.
- [ ] Integration test sui confini toccati.
- [ ] E2E se flusso critico.
- [ ] Test esistenti verdi (nessuna regressione).
- [ ] Coverage moduli critici ≥ 80%.
- [ ] Nessun test flaky introdotto.
- [ ] Test di regressione per bug risolti.

---

## Roadmap

1. Setup Jest + DB di test + seed.
2. Unit test dominio (Quoter, Produzione, CRM).
3. Integration test API/eventi.
4. E2E Playwright su ordine/preventivo.
5. Suite di regressione upgrade Evershop.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Test flaky | Determinismo, mock, no attese fisse |
| Coverage illusoria | Focus percorsi critici, mutation testing (futuro) |
| Regressioni da upgrade | Suite di regressione pre-upgrade |
| Test lenti | Piramide corretta (più unit, meno E2E) |

---

## Estensioni future

- Mutation testing.
- Contract testing per API/plugin.
- Visual regression sui componenti (doc 05).
- Performance test in CI (doc 25).

---

## Compatibilità con Evershop

Si usa Jest come il core; Playwright con Chromium preinstallato per E2E. I test Ingly vivono nei moduli e non modificano il setup core. La suite di regressione protegge le integrazioni durante gli upgrade.

## Compatibilità con aggiornamenti futuri

I test di regressione sono lo strumento primario per assorbire gli upgrade upstream senza rotture. Eseguirli è un gate del processo di release (doc 36).

---

## See also
- [02 Product Requirements](02_PRODUCT_REQUIREMENTS.md)
- [25 Performance](25_PERFORMANCE.md)
- [31 Claude Guidelines](31_CLAUDE_GUIDELINES.md)
- [36 Release Process](36_RELEASE_PROCESS.md)
