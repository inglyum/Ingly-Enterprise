@echo off
chcp 65001 >nul
cd /d "%~dp0"
color 0A
echo ============================================================
echo    INGLY Enterprise  -  PASSO 2: Avvio del negozio
echo ============================================================
echo.
echo Il negozio si sta avviando.
echo La PRIMA volta prepara il database e i contenuti: puo' volerci
echo qualche minuto. Attendi il messaggio:
echo    "Your website is running at http://localhost:3000"
echo.
echo Quando e' pronto, apri Chrome/Edge su:
echo    NEGOZIO :  http://localhost:3000
echo    ADMIN   :  http://localhost:3000/admin
echo.
echo LA PRIMA VOLTA: lascia questa finestra aperta e apri
echo AVVIO-3-crea-admin.bat per creare il tuo accesso.
echo.
echo Per FERMARE il negozio: chiudi questa finestra.
echo ------------------------------------------------------------
echo.
node packages/evershop/dist/bin/dev/index.js
echo.
echo Il negozio e' stato fermato.
pause
