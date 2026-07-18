# 24 — SECURITY · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Security Architect / DPO — Ingly Design
**Destinatari:** Tutto il team, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire la strategia di **sicurezza applicativa** e **privacy** di INGLY Enterprise: OWASP Top 10, protezione dei dati, conformità **GDPR**, gestione segreti, audit. La sicurezza è **by design**, trasversale a tutti i moduli.

---

## Visione

Proteggere i dati dei clienti e dell'azienda è un requisito non negoziabile. Ogni feature nasce con la sicurezza integrata, non aggiunta dopo. La privacy è un diritto, non un'opzione.

---

## Obiettivi

1. Mitigare OWASP Top 10 in modo sistematico.
2. Proteggere dati in transito e at-rest.
3. Conformità GDPR (basi giuridiche, diritti, retention).
4. Gestione sicura di segreti e credenziali.
5. Auditabilità e risposta agli incidenti.

---

## OWASP Top 10 — contromisure

| Rischio | Contromisura in Ingly |
|---------|------------------------|
| **Broken Access Control** | RBAC server-side (doc 11), scope, deny-by-default |
| **Cryptographic Failures** | TLS ovunque, hashing password, cifratura dati sensibili |
| **Injection** | Query builder/bind param (mai concatenare SQL), validazione input |
| **Insecure Design** | Threat modeling, principi Clean/DDD, review architetturale |
| **Security Misconfiguration** | Config via env, header sicuri, default sicuri |
| **Vulnerable Components** | Audit dipendenze, aggiornamenti, no dipendenze non approvate |
| **Auth Failures** | Rate limiting, lockout, MFA (doc 10) |
| **Data Integrity Failures** | Firma webhook, verifica pacchetti/plugin |
| **Logging/Monitoring Failures** | Log strutturati, audit, alerting (doc 03/25) |
| **SSRF** | Allowlist per chiamate in uscita, validazione URL |

---

## Protezione input e output

- **Validazione** rigorosa lato server di ogni input (mai fidarsi del client).
- **SQL**: usare il query builder con bind param; per SQL raw usare `connection.query()` con parametri (mai concatenazione). Vedi pitfall CLAUDE.md.
- **XSS**: escaping output, CSP negli artefatti web.
- **CSRF**: token su azioni mutanti; cookie `SameSite`.
- **Upload** (doc 12): validazione tipo/dimensione, scansione opzionale, no esecuzione.

---

## Gestione segreti

- Segreti (chiavi API, DB, provider AI/email/pagamenti) **solo** in variabili d'ambiente (Twelve-Factor).
- **Mai** segreti nel codice, nei log, nei commit, nella documentazione.
- Rotazione periodica; revoca su compromissione.
- Accesso ai segreti secondo least privilege.

---

## GDPR e privacy

- **Basi giuridiche** per ogni trattamento; consensi tracciati (marketing, doc 22).
- **Diritti dell'interessato**: accesso, rettifica, **cancellazione/anonimizzazione** (diritto all'oblio), portabilità (export).
- **Minimizzazione**: raccogliere solo i dati necessari; PII minimizzata nei prompt AI (doc 19).
- **Retention**: policy di conservazione e cancellazione (doc 08).
- **Data processing**: registro trattamenti, DPA con fornitori (AI/email/pagamenti/hosting).
- **Breach**: procedura di notifica entro i termini di legge.

---

## Diagramma testuale — Difesa in profondità

```
TLS/HTTPS ─► WAF/Rate limit ─► Auth (doc10) ─► RBAC (doc11) ─► Validazione input
   │                                                              │
   ▼                                                              ▼
Segreti in env ── Cifratura at-rest ── Query parametrizzate ── Audit log ── Monitoring/Alert
```

---

## Audit e incident response

- **Audit log** delle azioni sensibili (accessi, modifiche critiche, esportazioni).
- **Monitoring/alerting** su anomalie (doc 25).
- **Incident response**: runbook, ruoli, comunicazione, post-mortem.
- **Backup** verificati e ripristinabili (doc 27).

---

## Best Practice

- Deny-by-default su accessi e chiamate esterne.
- Validazione server-side sempre; escaping output.
- Segreti solo in env; mai nei log/commit/docs.
- Dipendenze auditate e approvate (doc 00, 32).
- Security review nelle PR critiche (skill `security-review`).

---

## Checklist sicurezza (per ogni feature)

- [ ] Access control server-side (RBAC/scope).
- [ ] Input validato; SQL parametrizzato; output escaped.
- [ ] CSRF/XSS/SSRF considerati.
- [ ] Segreti in env, non nel codice/log.
- [ ] PII minimizzata; base giuridica e consensi.
- [ ] Diritti GDPR supportati (export/cancellazione).
- [ ] Audit log su azioni sensibili.
- [ ] Dipendenze nuove auditate/approvate.
- [ ] Webhook/plugin verificati (firma).

---

## Roadmap

1. Baseline OWASP + header sicuri + validazione.
2. Gestione consensi + diritti GDPR (export/cancellazione).
3. Audit log + monitoring/alerting.
4. MFA staff + gestione segreti avanzata.
5. Security review automatizzata in CI.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Data breach | Difesa in profondità, cifratura, audit |
| Non conformità GDPR | Consensi, diritti, retention, DPA |
| Segreti esposti | Env-only, rotazione, scanning |
| Dipendenze vulnerabili | Audit, aggiornamenti, approvazione |

---

## Estensioni future

- Penetration test periodici.
- SIEM e correlazione eventi di sicurezza.
- Bug bounty interno.
- Data Loss Prevention (DLP).

---

## Compatibilità con Evershop

Si usano i meccanismi di sicurezza del core (auth, sessioni, query parametrizzate) e li si rafforza con RBAC, audit e GDPR a livello di moduli Ingly. Nessuna modifica al core; hardening via configurazione e middleware ufficiali.

## Compatibilità con aggiornamenti futuri

Le contromisure sono a livello applicativo e di configurazione: gli upgrade del core vanno verificati con security review e test di regressione sui punti sensibili (auth, upload, webhook).

---

## See also
- [10 Authentication](10_AUTHENTICATION.md)
- [11 User Roles](11_USER_ROLES.md)
- [08 Database](08_DATABASE.md)
- [27 Deployment](27_DEPLOYMENT.md)
