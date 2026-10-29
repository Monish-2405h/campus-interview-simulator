@echo off
echo ========================================================
echo Starting Campus Interview Simulator (Backend + Frontend)
echo ========================================================

start "Backend (FastAPI)" cmd /k "npm run backend"
timeout /t 2 /nobreak >nul
start "Frontend (Next.js)" cmd /k "npm run dev"

echo.
echo Servers started in new windows:
echo - Frontend: http://localhost:3000
echo - Backend:  http://localhost:8000/docs
echo.
