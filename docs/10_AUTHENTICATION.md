# 10 — AUTHENTICATION · INGLY Enterprise

**Versione:** 1.0.0
**Stato:** Approvato
**Proprietario:** Security / Identity Architect — Ingly Design
**Destinatari:** Backend, Security, Claude Code
**Data creazione:** 18 luglio 2026
**Ultima modifica:** 18 luglio 2026

---

## Scopo

Definire i meccanismi di **autenticazione** (chi sei) di INGLY Enterprise per i tre soggetti: **clienti** (storefront), **utenti admin** (staff), **integrazioni** (API esterne). L'autorizzazione (cosa puoi fare) è trattata in `11_USER_ROLES.md`. La sicurezza trasversale in `24_SECURITY.md`.

---

## Visione

Identità sicura e semplice: sessioni robuste per l'uso interattivo, token per l'accesso programmatico, estendibilità verso OAuth2/SSO senza riscrivere l'app. Sicurezza by design, minimo attrito per l'utente.

---

## Obiettivi

1. Autenticazione affidabile per clienti, staff e integrazioni.
2. Gestione sicura delle credenziali (hashing, no plaintext).
3. Sessioni sicure e revocabili.
4. Base pronta per OAuth2/SSO e MFA.
5. Conformità a best practice OWASP.

---

## Soggetti e metodi

| Soggetto | Metodo primario | Note |
|----------|-----------------|------|
| Cliente (storefront) | Sessione (login email/password) | Registrazione, reset password, opz. social login futuro |
| Utente admin (staff) | Sessione admin Evershop | MFA (estensione), policy password |
| Integrazione / API | Token / API key (Bearer) | Scope limitati, rotazione, revoca |
| Servizio interno | Credenziali di servizio | Least privilege |

Evershop fornisce già l'autenticazione base di customer e admin: si **estende**, non si sostituisce.

---

## Gestione credenziali

- Password **hashate** con algoritmo forte (bcrypt/argon2 secondo core Evershop); mai in chiaro.
- Policy password: lunghezza minima, complessità, blacklist password comuni.
- Reset password con token a scadenza, monouso.
- Rate limiting e lockout progressivo sui tentativi di login.

---

## Sessioni

- Sessione server-side, cookie `HttpOnly`, `Secure`, `SameSite` appropriato.
- Sessione **esterna al processo** (store condiviso) per scalabilità orizzontale (stateless app).
- Scadenza e rinnovo; revoca su logout e su cambio password.
- Protezione CSRF sulle azioni mutanti (doc 24).

---

## Token per API (integrazioni)

- **Bearer token** / API key con scope e scadenza.
- Rotazione e revoca gestite; audit degli accessi.
- Nessun token con privilegi globali di default (least privilege).
- Predisposizione a **JWT** per token stateless e **OAuth2 client credentials** per partner.

---

## Diagramma testuale — Flussi di autenticazione

```
CLIENTE
  login (email/pwd) ─► verifica hash ─► crea sessione (cookie HttpOnly) ─► storefront

ADMIN
  login staff ─► verifica ─► [MFA opz.] ─► sessione admin ─► RBAC (doc 11)

INTEGRAZIONE
  richiesta con Bearer token ─► validazione token/scope ─► API v1 (doc 09) ─► RBAC

RESET PASSWORD
  richiesta ─► token monouso via email (doc 12/email) ─► nuova password ─► invalida sessioni
```

---

## Estensioni pianificate

- **MFA/2FA** per staff (TOTP).
- **OAuth2 / OpenID Connect** per SSO e social login clienti.
- **JWT** per API stateless.
- **Passkey/WebAuthn** (lungo termine).

Tutte introdotte come strati additivi, dietro configurazione, senza rompere il flusso base.

---

## Best Practice

- Mai loggare credenziali o token.
- Sempre HTTPS/TLS (doc 24, 27).
- Cookie di sessione con flag di sicurezza.
- Rate limiting su login, reset, endpoint token.
- Revoca immediata su compromissione o cambio password.

---

## Checklist autenticazione (per ogni flusso)

- [ ] Credenziali hashate, mai in chiaro.
- [ ] Sessione/token con scadenza e revoca.
- [ ] Cookie HttpOnly/Secure/SameSite.
- [ ] Protezione CSRF su azioni mutanti.
- [ ] Rate limiting e lockout.
- [ ] Nessun leak in log/errori.
- [ ] Audit degli accessi sensibili.

---

## Roadmap

1. Consolidare auth customer/admin Evershop + policy password.
2. Token API v1 con scope.
3. MFA staff (TOTP).
4. OAuth2/OIDC + social login.

---

## Rischi

| Rischio | Mitigazione |
|---------|-------------|
| Credential stuffing | Rate limiting, lockout, MFA |
| Furto sessione | Cookie sicuri, TLS, rotazione |
| Token esposti | Scope minimi, rotazione, revoca |
| Reset password abusato | Token monouso a scadenza, rate limit |

---

## Estensioni future

- SSO aziendale (SAML/OIDC).
- Passkey/WebAuthn.
- Device management e sessioni attive per utente.

---

## Compatibilità con Evershop

Si estende l'auth nativa di Evershop (customer/admin) con policy, token API e futuri provider, tramite middleware e configurazione ufficiali. Nessuna modifica al core di autenticazione.

## Compatibilità con aggiornamenti futuri

Gli strati aggiuntivi (MFA, OAuth2, token) sono additivi e configurabili: un upgrade del core auth Evershop non li rompe finché si usano gli hook/middleware ufficiali. Verifica dei middleware auth dopo ogni upgrade.

---

## See also
- [11 User Roles](11_USER_ROLES.md)
- [09 API](09_API.md)
- [24 Security](24_SECURITY.md)
