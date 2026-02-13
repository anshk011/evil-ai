@echo off
REM ============================================
REM VADER-GEM Telegram Bot — Quick Start Script
REM ============================================

echo.
echo ====================================
echo  VADER-GEM - THE ARCHITECT
echo  AI Telegram Bot - Quick Start
echo ====================================
echo.

REM Check if .env exists
if not exist .env (
    echo [!] .env file not found!
    echo [*] Creating .env from .env.example...
    if exist .env.example (
        copy .env.example .env > nul
    ) else (
        (
            echo # OpenRouter API Configuration
            echo OPENROUTER_API_KEY=your-openrouter-api-key-here
            echo.
            echo # Telegram Bot Token
            echo TELEGRAM_BOT_TOKEN=your-telegram-bot-token-here
            echo.
            echo # Bot Personality
            echo BOT_NAME=VADER-GEM
        ) > .env
    )
    echo [+] .env created. Please edit it with your credentials.
    echo.
    echo     1. Get OpenRouter API key: https://openrouter.ai/keys
    echo     2. Get Telegram token: Talk to @BotFather
    echo.
    pause
    exit /b 0
)

REM Check if virtual environment exists
if not exist .venv (
    echo [*] Creating virtual environment...
    python -m venv .venv
    if errorlevel 1 (
        echo [-] Failed to create virtual environment
        echo     Make sure Python 3.9+ is installed
        pause
        exit /b 1
    )
    echo [+] Virtual environment created
) else (
    echo [+] Virtual environment found
)

REM Activate virtual environment
echo [*] Activating virtual environment...
call .venv\Scripts\activate.bat
if errorlevel 1 (
    echo [-] Failed to activate virtual environment
    pause
    exit /b 1
)

REM Install dependencies
echo [*] Installing dependencies...
pip install --upgrade pip setuptools wheel > nul 2>&1
pip install -r requirements.txt
if errorlevel 1 (
    echo [-] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ====================================
echo [+] Setup Complete!
echo ====================================
echo.
echo Starting VADER-GEM...
echo.
python nvidia_api_chat.py

pause
