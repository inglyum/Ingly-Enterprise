@echo off
chcp 65001 >nul
cd /d "%~dp0"
color 0B
echo ============================================================
echo    INGLY Enterprise  -  PASSO 1: Installazione e preparazione
echo ============================================================
echo.
echo Questo passo puo' richiedere alcuni minuti. Non chiudere la finestra.
echo.

echo Verifico Node.js...
where node >nul 2>nul
if errorlevel 1 (
  echo *** Node.js NON installato. Scaricalo da https://nodejs.org ^(pulsante LTS^) e riprova. ***
  pause & exit /b 1
)

echo Verifico Docker...
where docker >nul 2>nul
if errorlevel 1 (
  echo *** Docker NON installato. Installa "Docker Desktop" da https://www.docker.com/products/docker-desktop ***
  echo Aprilo ^(icona balena accesa^) e riprova.
  pause & exit /b 1
)

echo.
echo [1 di 5] Installazione componenti ^(npm install^)...
set CYPRESS_INSTALL_BINARY=0
call npm install || goto :errore

echo.
echo [2 di 5] Compilazione programma ^(compile^)...
call npm run compile || goto :errore

echo.
echo [3 di 5] Compilazione modulo database ^(compile:db^)...
call npm run compile:db || goto :errore

echo.
echo [4 di 5] Avvio database PostgreSQL con Docker...
docker compose up -d database || goto :errore
echo Attendo 15 secondi che il database sia pronto...
timeout /t 15 /nobreak >nul

echo.
echo [5 di 5] Preparazione file di configurazione ^(.env^)...
if not exist ".env" copy ".env.ingly.example" ".env" >nul

echo.
echo ============================================================
echo    FATTO! Ora fai doppio clic su:  AVVIO-2-avvia.bat
echo    ^(la PRIMA volta lascialo aperto e poi apri AVVIO-3-crea-admin.bat^)
echo ============================================================
echo.
pause
exit /b 0

:errore
echo.
echo *** Errore. Leggi il messaggio qui sopra. ***
echo Suggerimenti: Docker Desktop aperto? Connessione internet attiva? Riprova questo file.
pause
exit /b 1
