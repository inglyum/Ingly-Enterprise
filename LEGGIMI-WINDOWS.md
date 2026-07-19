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
| **4️⃣** | `AVVIO-4-prodotti-demo.bat` | (Facoltativo, la prima volta) Carica **categorie e prodotti demo** e imposta nome/valuta/lingua. Usa la stessa email/password del passo 3. |
| **5️⃣** | Apri il browser | Vai su `http://localhost:3000/admin` ed entra con email e password del passo 3. |

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

## 🎨 Come personalizzare / modificare

### Mettere il TUO logo (nel negozio in alto)
Il logo dell'intestazione si carica dal pannello, in 4 clic:
1. Entra in `http://localhost:3000/admin`
2. Menu **SETTING** (in basso a sinistra) → **Store**
3. Sezione **Branding/Logo** → **carica** il tuo file logo (PNG o JPG)
4. **Salva**. Ricarica il negozio: il tuo logo appare in alto.

### Aggiungere le FOTO ai prodotti
1. Admin → **Products** → clic sul prodotto
2. Sezione **Images** → **carica** le foto → **Save**

### Aggiungere/modificare prodotti e categorie
- Admin → **Products** → **New Product** (nome, prezzo, categoria, foto…)
- Admin → **Categories** → per creare/modificare le categorie.

### Cambiare nome negozio, valuta, lingua
- Admin → **SETTING → Store** (nome, valuta, lingua).

### Cambiare i colori/testi della personalizzazione Ingly
I file sono nella cartella `extensions/ingly/src/pages/` (si aggiornano da soli mentre il negozio gira):
- Barra viola/blu del negozio → `frontStore/all/InglyTopBar.tsx`
- Barra e pannello dell'admin → `admin/all/InglyAdminBar.tsx`, `admin/dashboard/InglyDashboard.tsx`
- Colori del brand usati: navy `#14182B`, blu `#2E6FD1`, giallo `#F2C21A`.

### Spegnere la personalizzazione Ingly
In `config/default.json`, nell'extension `ingly`, metti `"enabled": false` e riavvia.

---

## Note

- La lingua è **italiano** e la valuta **EUR**; alcune etichette dell'admin restano in inglese
  (traduzione completa = attività separata).
- I prodotti demo appaiono nelle **pagine categoria** (es. *Home → Eventi → Matrimonio*) e nella
  ricerca; la **homepage** resta semplice finché non aggiungi contenuti/vetrine dall'admin.
