@echo off
chcp 65001 >nul
cd /d "%~dp0"
color 0B
echo ============================================================
echo    INGLY Enterprise  -  PASSO 2: Crea l'amministratore
echo ============================================================
echo.
echo Ora crei l'utente per entrare nel pannello di gestione.
echo Ti verranno chiesti in ordine:
echo    - EMAIL   ^(es. tua@email.it^)
echo    - PASSWORD
echo    - NOME
echo.
echo NOTA: mentre digiti la password NON si vede nulla sullo schermo.
echo       E' normale: scrivi e premi INVIO.
echo.
pause
echo.
call npm run user:create

echo.
echo ============================================================
echo    FATTO! Ora fai doppio clic su:  AVVIO-3-avvia.bat
echo ============================================================
echo.
pause
