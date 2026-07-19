@echo off
chcp 65001 >nul
cd /d "%~dp0"
color 0B
echo ============================================================
echo    INGLY Enterprise  -  PASSO 4: Carica categorie e prodotti demo
echo ============================================================
echo.
echo Crea le categorie (Eventi + Tutto l'Anno) e alcuni prodotti di esempio,
echo e imposta nome negozio "Ingly Design", valuta EUR e lingua Italiano.
echo.
echo Il negozio (AVVIO-2) deve essere AVVIATO in un'altra finestra.
echo Inserisci le stesse EMAIL e PASSWORD dell'amministratore (PASSO 3).
echo.

set "IE_EMAIL="
set /p "IE_EMAIL=EMAIL amministratore: "
set "IE_PASS="
set /p "IE_PASS=PASSWORD amministratore: "

echo.
echo Carico categorie e prodotti...
set "ADMIN_EMAIL=%IE_EMAIL%"
set "ADMIN_PASSWORD=%IE_PASS%"
node extensions/ingly/seed/ingly-seed.mjs

echo.
echo ============================================================
echo    FATTO! Apri http://localhost:3000 e vai su una categoria,
echo    oppure il pannello admin -> Products / Categories.
echo ============================================================
echo.
pause
