@echo off
echo ================================
echo Social Mentor - Quick Start
echo ================================
echo.

REM Check if node_modules exists in backend
if not exist "backend\node_modules\" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
    echo.
)

REM Check if node_modules exists in frontend
if not exist "frontend\node_modules\" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
    echo.
)

REM Check if .env exists in backend
if not exist "backend\.env" (
    echo Creating backend .env file...
    copy "backend\.env.example" "backend\.env"
    echo Please update backend\.env with your configuration!
    echo.
)

echo ================================
echo Starting Services...
echo ================================
echo.
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:3000
echo.
echo Press Ctrl+C to stop all services
echo.

REM Start backend in new window
start "Social Mentor Backend" cmd /k "cd backend && npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend in new window
start "Social Mentor Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ================================
echo Services Started!
echo ================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Check the opened terminal windows for logs
echo Press any key to exit this window...
pause > nul
