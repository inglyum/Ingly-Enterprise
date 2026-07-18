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

echo Verifico che Node.js sia installato...
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo *** Node.js NON risulta installato. ***
  echo Installa Node.js ^(versione LTS^) da: https://nodejs.org
  echo Poi riprova questo file.
  echo.
  pause
  exit /b 1
)

echo Verifico che Docker sia installato...
where docker >nul 2>nul
if errorlevel 1 (
  echo.
  echo *** Docker NON risulta installato. ***
  echo Installa "Docker Desktop" da: https://www.docker.com/products/docker-desktop
  echo Aprilo almeno una volta ^(deve restare in esecuzione^), poi riprova questo file.
  echo.
  pause
  exit /b 1
)

echo.
echo [1 di 5] Installazione dei componenti ^(npm install^)...
call npm install || goto :errore

echo.
echo [2 di 5] Compilazione del programma ^(npm run compile^)...
call npm run compile || goto :errore

echo.
echo [3 di 5] Avvio del database PostgreSQL con Docker...
docker compose up -d database || goto :errore
echo Attendo 15 secondi che il database sia pronto...
timeout /t 15 /nobreak >nul

echo.
echo [4 di 5] Preparazione del file di configurazione ^(.env^)...
if not exist ".env" copy ".env.ingly.example" ".env" >nul

echo.
echo [5 di 5] Creazione delle tabelle nel database ^(npm run setup^)...
call npm run setup || goto :errore

echo.
echo ============================================================
echo    FATTO! Ora fai doppio clic su:  AVVIO-2-crea-admin.bat
echo ============================================================
echo.
pause
exit /b 0

:errore
echo.
echo *** Si e' verificato un errore. Leggi il messaggio qui sopra. ***
echo Suggerimenti:
echo  - Controlla che Docker Desktop sia APERTO e in esecuzione.
echo  - Controlla la connessione a internet.
echo  - Riprova a eseguire di nuovo questo file.
echo.
pause
exit /b 1
