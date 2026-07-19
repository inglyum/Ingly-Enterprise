# 🚀 Avviare INGLY Enterprise su Windows — guida facile

Non serve essere esperti. Segui i passaggi **in ordine**. Questa procedura è stata
**verificata funzionante** end-to-end.

---

## 🟦 PRIMA VOLTA: installa 2 programmi (solo una volta)

### 1) Node.js — il "motore"
- Vai su **https://nodejs.org** → scarica il pulsante grande **LTS**.
- Apri il file → **Avanti → Avanti → Installa → Fine**.

### 2) Docker Desktop — per il database
- Vai su **https://www.docker.com/products/docker-desktop** → scarica **Docker Desktop for Windows** → installa.
- **Aprilo** dal menu Start e lascialo aperto: in basso a destra deve esserci la **balena 🐳 accesa**.

> Se Docker ti dà problemi, scrivimi "**Docker non va**": ti do un metodo alternativo.

---

## 🟩 PRIMA VOLTA: scarica il progetto

Se non hai già la cartella `Ingly-Enterprise` sul PC:
1. Apri la pagina GitHub del progetto → pulsante verde **`< > Code`** → **Download ZIP**.
2. Tasto destro sullo ZIP → **Estrai tutto** → ottieni la cartella `Ingly-Enterprise`.

---

## 🟨 AVVIO — la prima volta (4 doppi-click, in ordine)

Apri la cartella `Ingly-Enterprise` e fai **doppio clic**:

| Ordine | File | Cosa fa |
|--------|------|---------|
| **1️⃣** | `AVVIO-1-installa.bat` | Installa e prepara tutto. Aspetta la scritta **"FATTO"** (qualche minuto). |
| **2️⃣** | `AVVIO-2-avvia.bat` | Accende il negozio. La **prima volta** prepara il database da solo. **Lascia questa finestra nera aperta.** Aspetta: *"Your website is running at http://localhost:3000"*. |
| **3️⃣** | `AVVIO-3-crea-admin.bat` | (Solo la prima volta) Crea il tuo accesso: ti chiede **email** e **password**. |
| **4️⃣** | Apri il browser | Vai su `http://localhost:3000/admin` ed entra con email e password del passo 3. |

> Se compare l'avviso blu **"Windows ha protetto il PC"** → **Ulteriori informazioni → Esegui comunque**.

---

## 🌐 Gli indirizzi

Con la finestra nera del passo 2 aperta:

- 🛍️ **Negozio Ingly:** http://localhost:3000
- 🔐 **Pannello admin:** http://localhost:3000/admin

Vedrai la barra **INGLY Enterprise** nell'admin e l'announcement bar Ingly nel negozio.

---

## 🔁 Le volte successive (uso quotidiano)

Non rifai tutto. Solo **2 doppi-click**:
1. Apri **Docker Desktop** (aspetta la balena accesa).
2. Doppio clic su **`AVVIO-2-avvia.bat`**.

Poi apri http://localhost:3000. Per **fermare**: chiudi la finestra nera.
(Non serve rifare `AVVIO-1` né `AVVIO-3`: il tuo accesso resta salvato.)

---

## ❓ Se qualcosa non va

Fai uno **screenshot della finestra nera** con l'errore e mandamelo. Casi tipici:
- *"Node.js non installato"* → rifai il programma 1.
- Errori database / *"Docker..."* → apri Docker Desktop, aspetta la balena accesa, riprova.
- La pagina non si apre → assicurati che la finestra del passo 2 sia aperta e abbia scritto *"running at http://localhost:3000"*.

---

## Note

- La lingua è impostata su **italiano** e la valuta su **EUR** per lo storefront; alcune etichette
  del pannello admin restano in inglese (traduzione completa = attività separata).
- Per cambiare **logo**: sostituisci `public/assets/ingly-logo.svg`.
- Per **spegnere** la personalizzazione: in `config/default.json` metti `"enabled": false` nell'extension `ingly`.
