# 05 — DESIGN SYSTEM · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Design System Lead — Ingly Design
**Destinatari:** Frontend, Design, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire il **Design System** di INGLY Enterprise: i design token, i componenti UI riutilizzabili, la griglia, la tipografia e le regole di composizione. Traduce i valori di brand (`04_BRANDING.md`) in artefatti tecnici usabili da Storefront e Admin Panel, garantendo coerenza (Component Driven Design) e riuso (DRY).

---

## Visione

Un unico linguaggio visivo condiviso da tutte le interfacce, incarnato in componenti indipendenti, accessibili e testabili. Il Design System è **codice**, non solo documentazione: token e componenti vivono nel repository ed evolvono con esso.

---

## Obiettivi

1. Un'unica fonte di verità per token e componenti (DRY).
2. Componenti accessibili (WCAG 2.1 AA) e responsivi.
3. Supporto nativo light/dark mode.
4. Riuso tra Storefront e Admin senza duplicazione.
5. Estensibilità: nuovi componenti seguono un contratto stabile.

---

## Stack di riferimento

- **Tailwind v4 + PostCSS** per utilità e token.
- **React 18** con SSR + hydration (MPA, non SPA).
- **react-hook-form** wrappato da `components/common/form/Form.tsx`.
- Token esposti come **CSS custom properties** (`:root`) + mapping Tailwind.

---

## Design Token

I token sono la primitiva del sistema. Categorie:

### Colore
```
--color-primary            /* azione principale, brand */
--color-primary-hover
--color-neutral-50 ... 900 /* scala grigi calda */
--color-surface            /* superfici */
--color-surface-raised
--color-success / --color-warning / --color-danger / --color-info
--color-text / --color-text-muted / --color-border
```
Ogni token ha una variante dark risolta via `@media (prefers-color-scheme: dark)` e `:root[data-theme="dark"]`.

### Spaziatura (scala 4px)
```
--space-1: 4px   --space-2: 8px   --space-3: 12px  --space-4: 16px
--space-6: 24px  --space-8: 32px  --space-12: 48px --space-16: 64px
```

### Tipografia
```
--font-sans / --font-display / --font-mono
--text-xs 12 · --text-sm 14 · --text-base 16 · --text-lg 18
--text-xl 20 · --text-2xl 24 · --text-3xl 30 · --text-4xl 36
--leading-tight / --leading-normal / --leading-relaxed
--weight-regular 400 / --weight-medium 500 / --weight-semibold 600 / --weight-bold 700
```

### Forma
```
--radius-sm 4 · --radius-md 8 · --radius-lg 12 · --radius-full 9999
--shadow-sm / --shadow-md / --shadow-lg
--border-width 1
```

### Motion
```
--duration-fast 120ms · --duration-base 200ms · --duration-slow 320ms
--ease-standard cubic-bezier(0.2, 0, 0, 1)
```

**Regola:** nessun valore visivo hardcoded nei componenti. Tutto passa dai token.

---

## Tipografia — scala e uso

| Stile | Token | Uso |
|-------|-------|-----|
| Display | `--text-4xl` / display / bold | Titoli di pagina hero |
| H1–H3 | `--text-3xl`…`--text-xl` / semibold | Titoli di sezione |
| Body | `--text-base` / regular | Testo corrente |
| Small | `--text-sm` / regular | Metadati, caption |
| Mono | `--font-mono` | SKU, codici, parametri laser |

---

## Griglia e layout

- **Container** con `max-width` responsivo; il body non scrolla mai orizzontalmente.
- **Grid** a 12 colonne per Admin; layout fluido per Storefront.
- **Breakpoint** (allineati Tailwind): `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.
- Contenuti larghi (tabelle, diagrammi) scrollano dentro un contenitore `overflow-x:auto`.

---

## Libreria componenti (contratto)

Componenti base (atomi/molecole), condivisi da Admin e Storefront:

| Componente | Note |
|-----------|------|
| `Button` | varianti: primary/secondary/ghost/danger; stati: loading/disabled |
| `Input`, `Textarea`, `Select` | integrati con `Form` (react-hook-form) |
| `Checkbox`, `Radio`, `Switch` | accessibili via label/aria |
| `Card`, `Surface` | superfici con shadow/radius da token |
| `Table` / `DataGrid` | ordinamento, paginazione, colonne configurabili |
| `Modal`, `Drawer` | focus trap, chiusura ESC, aria-modal |
| `Toast`/`Notification` | stati semantici |
| `Tabs`, `Accordion` | navigazione secondaria |
| `Badge`, `Tag`, `Chip` | stati e categorie |
| `Form` | wrapper react-hook-form, validazione, errori |

Ogni componente: props tipizzate (TS), stati accessibili, varianti via token, storia d'uso nel README del Design System.

---

## Diagramma testuale — Anatomia del sistema

```
TOKEN (css vars) ──► PRIMITIVES (Text, Box, Stack) ──► COMPONENTS (Button, Table)
                                                   └──► PATTERNS (Form page, List page)
                                                        └──► TEMPLATES (Admin layout, Storefront layout)
```

---

## Accessibilità (WCAG 2.1 AA)

- Contrasto ≥ 4.5:1 (testo), ≥ 3:1 (UI/grafica).
- Focus visibile su tutti gli elementi interattivi.
- Navigabilità completa da tastiera.
- `aria-*` corretti su modali, tab, menu, form.
- Il colore non è mai unico veicolo informativo.

---

## Convenzioni

- Componenti in `.tsx`, props tipizzate, `export default` o named export coerente.
- Nessun hex/px hardcoded: usare token.
- Un componente = una responsabilità (SRP).
- Attenzione alla **regola degli hook**: nessun hook dopo un early return (vedi CLAUDE.md).

---

## Best Practice

- Comporre da primitivi; non duplicare stili.
- Definire prima il contratto (props/varianti), poi l'implementazione.
- Test di accessibilità e visual regression sui componenti chiave.
- Verificare light **e** dark mode ad ogni componente.

---

## Checklist componente

- [ ] Props tipizzate e documentate.
- [ ] Solo token (nessun valore hardcoded).
- [ ] Accessibile (focus, aria, tastiera, contrasto).
- [ ] Responsivo, nessun overflow orizzontale del body.
- [ ] Light + dark mode verificati.
- [ ] Nessun hook dopo early return.
- [ ] Esempio d'uso documentato.

---

## Roadmap

1. Consolidare i token in CSS vars + mapping Tailwind.
2. Estrarre i componenti base condivisi.
3. Documentare pattern (list page, form page, dashboard).
4. Valutare pacchetto pubblicabile `@ingly/design-system`.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Duplicazione componenti Admin/Storefront | Libreria condivisa, review |
| Drift dai token | Lint, review, nessun hardcode |
| Regressioni visive | Visual regression test |
| Inaccessibilità | Checklist a11y obbligatoria |

---

## Estensioni future

- Theming multi-brand via set di token alternativi.
- Motion system e micro-interazioni.
- Design tokens sincronizzati con strumenti di design (Figma tokens).

---

## Compatibilità con Evershop

Evershop usa Tailwind v4 + componenti React con override ufficiali. Il Design System Ingly si innesta estendendo il tema e sovrascrivendo componenti tramite i meccanismi ufficiali (`components/`, aree, `layout`), senza toccare il core.

## Compatibilità con aggiornamenti futuri

I token disaccoppiano il look dai componenti core: un aggiornamento del tema Evershop non altera l'identità Ingly finché i token restano la sorgente. Verificare i componenti sovrascritti ad ogni upgrade.

---

## See also
- [04 Branding](04_BRANDING.md)
- [06 Admin Panel](06_ADMIN_PANEL.md)
- [07 Website](07_WEBSITE.md)
