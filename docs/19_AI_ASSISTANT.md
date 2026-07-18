# 19 — AI ASSISTANT · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** AI Systems Architect — Ingly Design
**Destinatari:** Backend, Frontend, AI, Security, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Progettare l'**AI Assistant**: l'insieme di capacità di intelligenza artificiale che assistono operatori e clienti — suggerimenti nei preventivi (doc 18), riassunti CRM (doc 15), spiegazione KPI (doc 21), supporto clienti, generazione contenuti. Definisce un'**astrazione multi-provider** per non dipendere da un singolo fornitore.

---

## Visione

L'AI potenzia le persone, non le sostituisce. Ogni output AI è **assistivo, tracciato e confermabile**; nessuna azione irreversibile è eseguita automaticamente senza controllo umano. L'astrazione di provider tiene il sistema aperto e aggiornabile.

---

## Obiettivi

1. Fornire capacità AI riutilizzabili ai moduli (quoter, CRM, BI, supporto).
2. Astrarre il provider AI dietro un'interfaccia (`IAIProvider`) — multi-provider.
3. Garantire sicurezza, privacy e controllo dei costi.
4. Rendere ogni output AI tracciabile e human-in-the-loop.
5. Prevenire prompt injection e leak di dati sensibili.

---

## Bounded Context

Modulo `modules/ingly/ai/`. Componenti:

- **IAIProvider**: interfaccia (completamento, chat, embedding) — implementazioni multiple.
- **AIService**: casi d'uso di dominio (suggerisci parametri, riassumi cliente, spiega KPI).
- **PromptTemplate**: template versionati per ogni caso d'uso.
- **AIAuditLog**: tracciamento richieste/risposte (per qualità, costi, conformità).
- **Guardrails**: validazione input/output, filtri, limiti.

---

## Astrazione multi-provider

```ts
interface IAIProvider {
  complete(input: PromptInput): Promise<AIResult>;
  chat(messages: ChatMessage[], opts): Promise<AIResult>;
  embed(text: string | string[]): Promise<number[][]>;
}
```

- Implementazioni intercambiabili dietro configurazione (nessun lock-in).
- Selezione provider/modello per caso d'uso e per costo/qualità.
- Fallback e retry gestiti nell'infrastruttura, non nel dominio.

> Nessun modulo importa direttamente l'SDK di un provider: passa sempre da `IAIProvider`.

---

## Casi d'uso principali

| Caso d'uso | Modulo | Output |
|-----------|--------|--------|
| Suggerimento parametri preventivo | Quoter (18) | parametri da confermare |
| Testo/nota preventivo | Quoter (18) | testo brandizzato |
| Riassunto/insight cliente | CRM (15) | sintesi interazioni |
| Spiegazione KPI/anomalie | Analytics (21) | narrativa dati |
| Supporto clienti (FAQ/chat) | Website (07) | risposte assistite |
| Tagging/descrizione media | Media (12) | tag/alt text proposti |

---

## Human-in-the-loop e sicurezza

- L'AI **propone**; l'utente **decide**. Nessuna azione irreversibile automatica.
- **Prompt injection**: input esterni (testo cliente, contenuti) sono trattati come **non fidati**; i template separano istruzioni da dati; guardrail su output.
- **Privacy/PII**: minimizzazione dati inviati al provider; anonimizzazione dove possibile; conformità GDPR (doc 24). Nessun dato sensibile in prompt senza necessità e base giuridica.
- **Costi**: limiti per richiesta/utente/giorno; caching di risposte deterministiche; scelta modello per costo.
- **Audit**: ogni chiamata registrata (caso d'uso, modello, token, esito) per qualità e conformità.

---

## Diagramma testuale — Pipeline AI sicura

```
Input (modulo) ──► Guardrail input (sanitizza, marca non-fidato)
     │
     ▼
PromptTemplate (versionato) ──► IAIProvider (config: modello) ──► risposta
     │                                                              │
     ▼                                                              ▼
Guardrail output (valida, filtra) ──► risultato assistito ──► UTENTE conferma
     │
     └─► AIAuditLog (caso, modello, token, esito)
```

---

## Best Practice

- Sempre dietro `IAIProvider` (multi-provider, no lock-in).
- Template di prompt versionati e testati.
- Input esterno = non fidato → guardrail e separazione istruzioni/dati.
- Minimizzare PII; rispettare GDPR.
- Human-in-the-loop su tutto ciò che ha effetti.
- Audit e limiti di costo attivi.

---

## Checklist AI (per ogni caso d'uso)

- [ ] Passa da `IAIProvider` (nessun SDK diretto nel dominio).
- [ ] Prompt template versionato.
- [ ] Guardrail input/output.
- [ ] PII minimizzata/anonimizzata (GDPR).
- [ ] Output assistivo con conferma umana.
- [ ] Audit log attivo.
- [ ] Limiti di costo/rate.
- [ ] Test su input avversi (prompt injection).

---

## Roadmap

1. Astrazione `IAIProvider` + audit + guardrail base.
2. Suggerimenti Quoter + testo preventivo.
3. Riassunti CRM.
4. Spiegazione KPI (BI).
5. Supporto clienti assistito.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Lock-in provider | Astrazione `IAIProvider` |
| Prompt injection | Guardrail, separazione dati/istruzioni |
| Leak PII | Minimizzazione, anonimizzazione, GDPR |
| Costi incontrollati | Limiti, caching, scelta modello |
| Allucinazioni con effetti | Human-in-the-loop, prezzo deterministico (doc 18) |

---

## Estensioni future

- RAG su knowledge base interna (documenti, parametri, storico).
- Agenti per automazioni supervisionate (doc 20).
- Ottimizzazione scheduling/produzione assistita (doc 16).
- Valutazione qualità output (eval) e A/B su modelli.

---

## Compatibilità con Evershop

L'AI è un modulo Ingly indipendente. Si integra con gli altri moduli via service/eventi. Non modifica il core Evershop; espone capacità via API v1 e service interni.

## Compatibilità con aggiornamenti futuri

L'astrazione `IAIProvider` isola dai cambi di fornitore/modello e dagli upgrade del core. Aggiornare i modelli è una configurazione, non una riscrittura.

---

## See also
- [18 Quoter](18_QUOTER.md)
- [15 CRM](15_CRM.md)
- [20 Automations](20_AUTOMATIONS.md)
- [24 Security](24_SECURITY.md)
