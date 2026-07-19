@echo off
chcp 65001 >nul
cd /d "%~dp0"
color 0B
echo ============================================================
echo    INGLY Enterprise  -  PASSO 3: Crea il tuo accesso (admin)
echo ============================================================
echo.
echo Fallo UNA sola volta (la prima), mentre il negozio (AVVIO-2) e' avviato.
echo Serve a creare l'utente per entrare nel pannello di gestione.
echo.

set "IE_EMAIL="
set /p "IE_EMAIL=Scrivi la tua EMAIL e premi INVIO: "
if "%IE_EMAIL%"=="" (
  echo Email vuota. Riprova.
  pause & exit /b 1
)

set "IE_PASS="
set /p "IE_PASS=Scrivi una PASSWORD (almeno 8 caratteri) e premi INVIO: "
if "%IE_PASS%"=="" (
  echo Password vuota. Riprova.
  pause & exit /b 1
)

echo.
echo Creo l'utente amministratore...
node packages/evershop/dist/bin/evershop.js user:create --name "Amministratore" --email "%IE_EMAIL%" --password "%IE_PASS%"

echo.
echo ============================================================
echo    FATTO! Ora vai su  http://localhost:3000/admin
echo    ed entra con l'email e la password appena scelte.
echo ============================================================
echo.
pause
