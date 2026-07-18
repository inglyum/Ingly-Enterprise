# 12 — MEDIA LIBRARY · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Platform Architect — Ingly Design
**Destinatari:** Backend, Frontend, Marketing, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Progettare la **Media Library**: il sistema di gestione degli asset digitali (immagini, PDF, file di progetto, video) usato da catalogo, CMS, portfolio, preventivi e branding. Fornisce upload, organizzazione, ricerca, varianti ottimizzate, metadati e permessi.

---

## Visione

Un'unica sorgente autorevole per tutti i media aziendali. Ogni immagine mostrata nello storefront o nell'admin, ogni asset di brand, ogni allegato di preventivo passa dalla Media Library, che ne garantisce ottimizzazione, coerenza e controllo accessi.

---

## Obiettivi

1. Archiviazione affidabile e scalabile degli asset.
2. Varianti ottimizzate automatiche (thumbnail, formati moderni).
3. Metadati, tag e ricerca efficiente.
4. Permessi e riuso cross-modulo.
5. Integrazione con storage/CDN e performance (doc 25).

---

## Bounded Context

Modulo `modules/ingly/media/`. Entità principali:

- **Asset**: file originale + metadati (nome, tipo, dimensione, hash, tag, owner).
- **Variant**: derivato ottimizzato (thumbnail, formato/dimensione).
- **Folder/Collection**: organizzazione logica.
- **Usage**: riferimenti d'uso (dove l'asset è utilizzato) per evitare cancellazioni rotte.

Tabelle: `ingly_media_asset`, `ingly_media_variant`, `ingly_media_folder`, `ingly_media_usage`.

---

## Storage e CDN

- Astrazione **storage provider** dietro interfaccia (`IMediaStorage`): filesystem locale in dev, object storage (S3-compatibile/Azure) in produzione.
- Evershop offre già estensioni storage (`s3_file_storage`, `azure_file_storage`): riusarle come adapter.
- Distribuzione via **CDN** in produzione; URL firmati per asset privati.
- Nomi file basati su hash/UUID per cache busting e deduplica.

---

## Pipeline di ottimizzazione

```
Upload originale
   │  validazione (tipo, dimensione, malware-scan opz.)
   ▼
Salvataggio originale (storage)
   │
   ▼  generazione varianti (async, event-driven)
   ├─ thumbnail (griglie/liste)
   ├─ formati moderni (WebP/AVIF) responsive
   └─ derivati specifici (es. preview preventivo)
   ▼
Indicizzazione metadati + tag ─► ricerca
```

Le varianti si generano in modo asincrono per non bloccare l'upload; l'evento `MediaUploaded` innesca la pipeline.

---

## Metadati, tag e ricerca

- Metadati tecnici (dimensioni, tipo, hash) + editoriali (titolo, alt text, descrizione, tag).
- **Alt text obbligatorio** per immagini usate in UI (accessibilità, doc 05/07).
- Ricerca per nome, tag, tipo, collezione, data.
- Tag di sistema riservati (es. `brand/logo`) per asset ufficiali di brand.

---

## Permessi e cancellazione sicura

- Permessi RBAC (doc 11): `media.asset.read/upload/delete`.
- Asset privati con URL firmato a scadenza.
- **Cancellazione sicura**: verificare `ingly_media_usage` prima di eliminare; se in uso, avvisare/impedire (evita immagini rotte in produzione).

---

## Best Practice

- Nessuna immagine originale servita direttamente allo storefront: sempre variante ottimizzata.
- Alt text e metadati come parte della Definition of Done dell'upload.
- Deduplica per hash per risparmiare storage.
- Storage dietro interfaccia per portabilità (dev/prod).

---

## Checklist media

- [ ] Upload validato (tipo/dimensione).
- [ ] Varianti ottimizzate generate.
- [ ] Alt text/metadati presenti (immagini UI).
- [ ] Permessi RBAC applicati.
- [ ] URL firmato per asset privati.
- [ ] Usage tracciato; cancellazione verificata.
- [ ] Servite varianti, non originali.

---

## Diagramma testuale — Uso cross-modulo

```
        ┌─────────────── MEDIA LIBRARY ───────────────┐
        │  Asset · Variant · Folder · Usage            │
        └───▲───────▲──────────▲──────────▲────────────┘
            │       │          │          │
        Catalogo  CMS/Blog   Portfolio  Quoter/Brand
        (doc 13)  (doc 14)   (doc 07)   (doc 18/04)
```

---

## Roadmap

1. CRUD asset + storage adapter (local/dev).
2. Pipeline varianti async + WebP/AVIF.
3. Tag/ricerca + alt text obbligatorio.
4. Storage produzione (S3/Azure) + CDN + URL firmati.
5. Usage tracking + cancellazione sicura.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Immagini pesanti → performance | Varianti ottimizzate obbligatorie |
| Cancellazione rompe pagine | Usage tracking, verifica pre-delete |
| Asset privati esposti | URL firmati, permessi |
| Costi storage | Deduplica, retention, lifecycle policy |

---

## Estensioni future

- Editing base immagini (crop/resize) in-app.
- Riconoscimento/tagging AI automatico.
- DAM avanzato (versioning asset, approvazioni).

---

## Compatibilità con Evershop

Si riusano le estensioni storage ufficiali (`s3_file_storage`, `azure_file_storage`) come adapter e i meccanismi di gestione media del core dove esistono. La Media Library Ingly aggiunge varianti/metadati/usage come modulo, senza modificare il core.

## Compatibilità con aggiornamenti futuri

L'astrazione `IMediaStorage` isola dai cambi di provider; le tabelle Ingly sono additive. Un upgrade Evershop non rompe la libreria finché si usano gli adapter storage ufficiali.

---

## See also
- [04 Branding](04_BRANDING.md)
- [07 Website](07_WEBSITE.md)
- [25 Performance](25_PERFORMANCE.md)
