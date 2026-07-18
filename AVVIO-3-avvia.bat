@echo off
chcp 65001 >nul
cd /d "%~dp0"
color 0A
echo ============================================================
echo    INGLY Enterprise  -  PASSO 3: Avvio del negozio
echo ============================================================
echo.
echo Il negozio si sta avviando... attendi il messaggio di pronto.
echo.
echo Quando e' pronto, apri il browser ^(Chrome/Edge^) su questi indirizzi:
echo.
echo    NEGOZIO :  http://localhost:3000
echo    ADMIN   :  http://localhost:3000/admin
echo.
echo Per FERMARE il negozio: chiudi questa finestra oppure premi CTRL+C.
echo ------------------------------------------------------------
echo.
call npm run dev
echo.
echo Il negozio e' stato fermato.
pause
