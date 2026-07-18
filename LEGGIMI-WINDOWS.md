# 🚀 Avviare INGLY Enterprise su Windows — guida facile

Non serve essere esperti. Segui questi passaggi **in ordine**, una volta sola.

---

## Prima cosa: installa 2 programmi (solo la prima volta)

### 1) Node.js
- Vai su **https://nodejs.org**
- Scarica il pulsante grande a sinistra (**LTS**).
- Apri il file scaricato e clicca **Avanti → Avanti → Installa → Fine**.

### 2) Docker Desktop (serve per il database)
- Vai su **https://www.docker.com/products/docker-desktop**
- Scarica **Docker Desktop for Windows** e installalo (**Avanti → Fine**).
- **Aprilo** dal menu Start e lascialo aperto (l'icona della balena 🐳 in basso a destra deve essere accesa).

> Se Docker ti dà problemi, scrivimi: ti do un metodo alternativo senza Docker.

---

## Poi: scarica il progetto (solo la prima volta)

Se non hai già la cartella del progetto sul PC:
1. Vai alla pagina GitHub del progetto.
2. Pulsante verde **`< > Code`** → **Download ZIP**.
3. **Estrai** lo ZIP (tasto destro → *Estrai tutto*). Otterrai una cartella `Ingly-Enterprise`.

---

## Infine: avvia (3 doppi-click)

Apri la cartella `Ingly-Enterprise` e fai **doppio clic**, in questo ordine:

1. **`AVVIO-1-installa.bat`** → installa e prepara tutto. Aspetta il messaggio "FATTO".
2. **`AVVIO-2-crea-admin.bat`** → crea il tuo accesso. Ti chiede **email** e **password** (la password non si vede mentre la scrivi: è normale).
3. **`AVVIO-3-avvia.bat`** → accende il negozio. **Lascia questa finestra aperta.**

> Se Windows mostra un avviso blu "Windows ha protetto il PC": clicca **Ulteriori informazioni → Esegui comunque**. Gli script sono i file `.bat` di questo progetto.

---

## Apri nel browser

Con la finestra del passo 3 aperta, vai su:

- 🛍️ **Negozio:** http://localhost:3000
- 🔐 **Pannello admin:** http://localhost:3000/admin  (entra con l'email e la password del passo 2)

---

## Le volte successive

Non devi rifare tutto. Basta:
1. Apri **Docker Desktop** (aspetta la balena accesa).
2. Doppio clic su **`AVVIO-3-avvia.bat`**.

Per **fermare** il negozio: chiudi la finestra nera del passo 3.

---

## Se qualcosa non va

Fai uno screenshot della finestra nera con l'errore e mandamelo. Errori tipici:
- *"Node.js non installato"* → rifai il programma 1 qui sopra.
- *"Docker non installato"* / errori database → apri Docker Desktop e aspetta la balena accesa, poi riprova.
- La pagina non si apre → assicurati che la finestra del passo 3 sia ancora aperta.
