# docs/analysis — Documenti di analisi delle feature

Questa cartella contiene i **mini-documenti di analisi** prodotti nella **Fase 1 (Analisi)** del workflow a 7 fasi (vedi `../31_CLAUDE_GUIDELINES.md` e `../00_MASTER_PROMPT.md`).

## Quando creare un documento qui

Prima di scrivere codice per una feature non banale, crea `feature-<nome>.md` che risponda a:

- **Requisito**: quale `FR/NFR` (doc 02) copre questa feature?
- **Codice coinvolto**: quali file/moduli esistenti sono toccati?
- **Punti di estensione Evershop**: quali hook/eventi/override/API si usano (nessuna modifica al core)?
- **Piano**: file nuovi/modificati, impatto sugli altri moduli.
- **Test**: cosa verrà testato (unit/integration/E2E).
- **Rischi**: cosa può andare storto e come si mitiga.

## Template minimo

```md
# Analisi — <feature>

**Requisito:** FR-XXX-NN
**Autore:** <nome/Claude> · **Data:** YYYY-MM-DD

## Contesto e codice coinvolto
## Punti di estensione Evershop
## Piano (file nuovi/modificati, impatto)
## Test previsti
## Rischi e mitigazioni
## Decisione / Approvazione
```

Un documento di analisi è il prerequisito per passare alla Fase 2 (Piano) e 3 (Approvazione).
