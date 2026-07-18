# docs/core-patches — Patch isolate al core Evershop

Questa cartella documenta le **eccezionali** modifiche al core Evershop. Per regola (vedi `../00_MASTER_PROMPT.md`), **il core non si modifica** se non per **bug critici bloccanti**, e solo con un'analisi di impatto documentata qui.

## Regola

> Ogni modifica al core è isolata in file separati con nomi espliciti (es. `originalFile.ingly.patch.ts`), documentata e testata. L'override di template/hook/eventi usa **esclusivamente** i meccanismi ufficiali di estensione di Evershop. Preferire sempre l'estensione (hook/eventi/override/API) alla patch.

## Quando è ammessa una patch

- Bug critico bloccante nel core, non risolvibile via estensione.
- In attesa (o in sostituzione) di una fix upstream.

## Cosa documentare per ogni patch

Crea `patch-<data>-<breve-descrizione>.md`:

```md
# Core patch — <descrizione>

**Data:** YYYY-MM-DD · **Autore:** <nome/Claude>
**File core toccato:** packages/evershop/src/...
**Motivazione (bug bloccante):**
**Analisi di impatto:** (moduli/upgrade coinvolti)
**Alternativa via estensione valutata:** (perché non praticabile)
**Piano di rientro:** (fix upstream attesa / rimozione patch)
**Test di regressione:**
```

## Compatibilità upgrade

Ogni patch qui elencata deve essere **riverificata a ogni upgrade Evershop** (vedi `../36_RELEASE_PROCESS.md`, sezione "Assorbimento upgrade Evershop"): se l'upstream risolve il problema, la patch va rimossa.
