# 23 — PLUGIN SYSTEM · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Platform / Extensibility Architect — Ingly Design
**Destinatari:** Backend, Partner, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire il **Plugin System**: come estensioni interne o di terze parti si installano e integrano **senza alterare** il core Evershop né i moduli Ingly principali. Si basa sul sistema di **moduli/estensioni** e sugli **hook/eventi** ufficiali di Evershop.

---

## Visione

La piattaforma è aperta: nuove capacità arrivano come plugin isolati, con confini chiari e punti di estensione ufficiali. Un plugin non "tocca" il core: si aggancia. Questo abilita un marketplace interno e la collaborazione con partner, mantenendo aggiornabilità e stabilità.

---

## Obiettivi

1. Estendere la piattaforma senza modificare core/moduli.
2. Confini e contratti chiari per i plugin.
3. Sicurezza e isolamento (least privilege).
4. Ciclo di vita gestito (install/enable/disable/uninstall).
5. Base per un marketplace interno di plugin Ingly.

---

## Anatomia di un plugin/estensione

I plugin vivono in `extensions/` (root di progetto) o come moduli, e seguono le convenzioni Evershop:

```
extensions/<plugin>/
├── bootstrap.ts        # UNICO punto di registrazione (hook/processor/widget/job/...)
├── package.json        # metadati, dipendenze, versione
├── migration/          # Version-X.Y.Z.ts (tabelle proprie del plugin)
├── api/                # endpoint REST v1 propri
├── pages/              # UI admin/frontStore
├── graphql/            # tipi/resolver propri
├── subscribers/        # reazioni a eventi
├── services/           # logica del plugin
└── README.md           # documentazione + permessi + punti di estensione usati
```

**Regola d'oro:** tutte le registrazioni (`addProcessor`, `hookBefore/After`, `registerWidget`, `registerJob`, `registerEmailService`, `registerPaymentMethod`, permessi) avvengono **solo in `bootstrap.ts`** — il registry è **locked** dopo il bootstrap; registrare altrove **lancia**.

---

## Punti di estensione ufficiali

| Meccanismo | Uso | Import |
|-----------|-----|--------|
| **Hook** (before/after) | Intercettare funzioni hookable | `@evershop/evershop/lib/util/hookable` |
| **Processor / registry** | Trasformare valori estendibili | `@evershop/evershop/lib/util/registry` |
| **Eventi / subscriber** | Reagire a eventi di dominio | `@evershop/evershop/lib/event` |
| **Widget** | UI page-builder | `@evershop/evershop/lib/widget` |
| **Payment method** | Nuovi metodi pagamento | `registerPaymentMethod` |
| **Email service** | Provider email | `registerEmailService` |
| **Route/Pages** | Nuove pagine/API | `route.json` + `pages/` |
| **GraphQL** | Tipi/resolver | file `.graphql` |

> Attenzione (pitfall CLAUDE.md): `hookable()` indicizza per **`.name`** della funzione avvolta. Usare un'espressione di funzione **nominata** il cui nome è la chiave dell'hook, altrimenti gli hook pubblici non scattano silenziosamente.

---

## Ciclo di vita

```
INSTALL ─► (migration) ─► ENABLE ─► [attivo: bootstrap registra] ─► DISABLE ─► UNINSTALL
   │                                                                            │
  dipendenze/compatibilità verificate                              cleanup dati (opz.)
```

- **Compatibilità** dichiarata (versione core/moduli richiesta).
- **Dipendenze** verificate prima dell'enable.
- **Disable** senza perdita dati; **uninstall** con cleanup opzionale.

---

## Sicurezza e isolamento

- Permessi dichiarati dal plugin (doc 11), least privilege.
- Un plugin non accede a tabelle/infrastruttura di altri moduli se non tramite i loro service/API.
- Validazione input e handler sicuri (firma 3-arg, doc 09).
- Review/approvazione prima della pubblicazione (governance).

---

## Diagramma testuale — Plugin come cittadino di prima classe

```
        CORE EVERSHOP (intatto)
              ▲   ▲   ▲
   hook ──────┘   │   └────── eventi
                  │
        ┌─────────┴──────────┐
        │   PLUGIN (bootstrap)│  ← registra hook/widget/job/api/permessi
        └─────────┬──────────┘
                  │ usa service/API pubbliche
        MODULI INGLY (CRM, Quoter, ...)
```

---

## Best Practice

- Tutte le registrazioni in `bootstrap.ts`; niente registrazioni a runtime.
- `hookable()` con funzione nominata (nome = chiave hook).
- Tabelle proprie con prefisso plugin; niente accesso diretto a tabelle altrui.
- Dichiarare compatibilità e dipendenze.
- README con permessi e punti di estensione usati.

---

## Checklist plugin

- [ ] Registrazioni solo in `bootstrap.ts`.
- [ ] `hookable()` con named function expression.
- [ ] Migration con prefisso proprio; nessuna alterazione tabelle core.
- [ ] Permessi dichiarati (least privilege).
- [ ] Handler API sicuri (3-arg, validazione).
- [ ] Compatibilità/dipendenze dichiarate.
- [ ] Ciclo di vita gestito (enable/disable/uninstall).
- [ ] README completo.
- [ ] Test in isolamento.

---

## Roadmap

1. Convenzioni plugin + template scaffold.
2. Gestione ciclo di vita (Admin, doc 06).
3. Verifica compatibilità/dipendenze.
4. Marketplace interno di plugin Ingly.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Plugin che rompe il core | Solo estensioni ufficiali, review |
| Hook silenziosamente inattivo | Named function expression, guard test |
| Accoppiamento tra plugin/moduli | Solo service/API pubbliche |
| Plugin malevolo | Review, permessi minimi, isolamento |

---

## Estensioni future

- Sandboxing più forte / limiti risorse.
- Firma e verifica dei plugin.
- Marketplace pubblico partner con revenue share.

---

## Compatibilità con Evershop

Il Plugin System **è** il sistema di moduli/estensioni + hook/eventi di Evershop, documentato e disciplinato per l'uso Ingly. È il pilastro della strategia di non-modifica del core.

## Compatibilità con aggiornamenti futuri

Poiché i plugin usano solo punti di estensione ufficiali, gli aggiornamenti del core li preservano. La dichiarazione di compatibilità e i test di regressione validano ogni upgrade.

---

## See also
- [03 System Architecture](03_SYSTEM_ARCHITECTURE.md)
- [09 API](09_API.md)
- [11 User Roles](11_USER_ROLES.md)
- [31 Claude Guidelines](31_CLAUDE_GUIDELINES.md)
