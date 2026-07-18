# 17 — LASER CENTER · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Manufacturing Tech Lead — Ingly Design
**Destinatari:** Backend, Produzione, Preventivi, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Progettare il **Laser Center**: la gestione di **macchine laser**, **materiali** e **parametri di incisione/taglio**. È la base tecnica condivisa da Produzione (doc 16) e Quoter (doc 18): definisce cosa si può produrre, con quale macchina, su quale materiale e a quali parametri/costi.

---

## Visione

Un catalogo tecnico vivo del laboratorio: ogni macchina con le sue capacità, ogni materiale con le sue proprietà e costi, ogni combinazione materiale/lavorazione con parametri validati. Questa conoscenza alimenta preventivi accurati e produzione senza errori.

---

## Obiettivi

1. Anagrafica macchine laser e loro capacità/disponibilità.
2. Catalogo materiali con proprietà e costi.
3. Libreria parametri di incisione/taglio per combinazione materiale/macchina.
4. Fornire dati a Quoter (prezzo) e Produzione (esecuzione/scheduling).
5. Tracciare manutenzione e stato macchine.

---

## Bounded Context

Modulo `modules/ingly/laser/`. Entità principali:

- **Machine**: macchina laser (potenza, area di lavoro, materiali supportati, stato).
- **Material**: materiale (tipo, spessore, dimensioni lastra, costo, fornitore, giacenza).
- **LaserParam**: parametri per combinazione materiale×macchina×lavorazione (velocità, potenza, passaggi, tempo stimato/unità).
- **Maintenance**: interventi/manutenzioni e disponibilità.

Tabelle: `ingly_laser_machine`, `ingly_laser_material`, `ingly_laser_param`, `ingly_laser_maintenance`.

---

## Macchine

- Attributi: potenza (W), area di lavoro (mm), materiali supportati, velocità max, stato (`AVAILABLE`, `BUSY`, `MAINTENANCE`, `OFFLINE`).
- Disponibilità usata dallo scheduling produzione (doc 16).
- Storico manutenzioni e prossime scadenze.

---

## Materiali

- Attributi: tipo (legno, acrilico, metallo, pelle…), spessore, dimensioni lastra, costo unitario, fornitore, **giacenza**.
- Giacenza aggiornata dal consumo in produzione (doc 16) — feedback per riordino.
- Un materiale è utilizzabile solo se supportato dalla macchina scelta.

---

## Parametri laser

- Per ogni combinazione **materiale × macchina × lavorazione** (taglio/incisione): velocità, potenza, numero passaggi, **tempo stimato per unità di area/lunghezza**.
- Parametri **validati** dal laboratorio (non stime cieche): sono la base di verità per Quoter e Produzione.
- Versionati: modifiche ai parametri tracciate (impatto su prezzi e qualità).

---

## Diagramma testuale — Laser Center come base tecnica

```
        ┌──────────────── LASER CENTER ────────────────┐
        │ Machine · Material · LaserParam · Maintenance │
        └───▲───────────────────────────────▲──────────┘
            │ tempo/costo/parametri          │ disponibilità/consumo
            │                                │
        QUOTER (doc 18)                 PRODUZIONE (doc 16)
        prezzo dinamico                 scheduling & esecuzione
```

---

## Contributo al Quoter (prezzo)

Il Quoter (doc 18) calcola il prezzo usando i dati del Laser Center:

```
prezzo ≈ costo_materiale(area, sfrido) 
       + tempo_macchina(LaserParam) × costo_ora_macchina
       + costo_manodopera(tempo) 
       + margine + regole (doc 18)
```

I `LaserParam` forniscono il **tempo macchina** stimato; i `Material` forniscono **costo** e **sfrido**.

---

## Best Practice

- Parametri laser sempre validati dal laboratorio prima dell'uso in preventivo.
- Giacenza materiali aggiornata dal consumo reale (produzione).
- Disponibilità macchina come vincolo hard nello scheduling.
- Versionare i parametri: sono input critici di prezzo e qualità.

---

## Checklist Laser Center

- [ ] Macchine con capacità/stato/disponibilità.
- [ ] Materiali con costo/spessore/giacenza/fornitore.
- [ ] Parametri per ogni combinazione materiale×macchina×lavorazione.
- [ ] Parametri validati e versionati.
- [ ] Integrazione con Quoter (tempo/costo) e Produzione (disponibilità/consumo).
- [ ] Manutenzioni e scadenze tracciate.

---

## Roadmap

1. Anagrafica macchine + materiali + giacenza.
2. Libreria parametri validati + versioning.
3. Integrazione Quoter (tempo macchina, costo materiale).
4. Integrazione Produzione (disponibilità, consumo).
5. Manutenzione predittiva + telemetria (IoT).

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Parametri errati → preventivi/qualità | Validazione laboratorio, versioning |
| Giacenza non aggiornata | Consumo automatico da produzione |
| Scheduling su macchina non disponibile | Stato/disponibilità come vincolo |
| Costi materiale obsoleti | Aggiornamento periodico, alert |

---

## Estensioni future

- Telemetria macchine (IoT) e stato reale.
- Ottimizzazione nesting/sfrido.
- Manutenzione predittiva basata su utilizzo.
- Riordino automatico materiali sotto soglia.

---

## Compatibilità con Evershop

Il Laser Center è interamente un modulo Ingly, indipendente dal core ecommerce. Si collega al catalogo (materiali/prodotti) via riferimenti, senza modificare il core.

## Compatibilità con aggiornamenti futuri

Essendo un dominio Ingly autonomo, non è impattato dagli aggiornamenti del core Evershop. Le integrazioni con Quoter/Produzione sono interne ai moduli Ingly.

---

## See also
- [16 Production](16_PRODUCTION.md)
- [18 Quoter](18_QUOTER.md)
- [13 Ecommerce](13_ECOMMERCE.md)
