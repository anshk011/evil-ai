# 💀 EVIL-AI — Agentic AI Suite & Telegram Bot

[![Node.js 18+](https://img.shields.io/badge/node.js-18+-green.svg)](https://nodejs.org/)
[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![OmniRoute](https://img.shields.io/badge/Gateway-OmniRoute-purple.svg)](https://github.com/diegosouzapw/OmniRoute)
[![OpenRouter](https://img.shields.io/badge/API-OpenRouter-green.svg)](https://openrouter.ai/)
[![Telegram Bot API](https://img.shields.io/badge/Telegram-Bot%20API-blue.svg)](https://core.telegram.org/bots/api)

**EVIL-AI** (The Architect) is a production-grade, high-performance AI ecosystem featuring an **interactive Agentic CLI** (styled after Claude Code) and a **multi-user Telegram Bot**. Powered by **OmniRoute Local Gateway** and **OpenRouter**, it offers instant access to 350+ AI providers and 1,200+ models with automatic failover, real-time streaming, and non-blocking Async I/O.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🖥️ **Agentic Terminal CLI (`evil`)** | Claude Code-styled TypeScript CLI with animated startup, ASCII banner, real-time streaming, and agentic thought metrics |
| 🤖 **Telegram Bot** | Multi-user Python Telegram bot with non-blocking `httpx` async client |
| 🌐 **OmniRoute Gateway** | Unified local AI gateway integration (`http://localhost:20128/v1`) with 350+ providers & token compression |
| 🔄 **Automatic Failover** | Automatic fallback between local OmniRoute gateway and OpenRouter APIs |
| ⚡ **Dynamic Model Switching** | Switch models or custom combos on the fly (`/model 1`, `arduino-learn`, `deepseek/deepseek-chat`, `google/gemini-2.5-flash`) |
| 💬 **Unlimited Context Memory** | Per-user session memory without artificial context truncations |
| 🐳 **Docker Sidecars** | Containerized `docker-compose` setup with OmniRoute gateway |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** & **Python 3.9+**
- [Telegram Bot Token](https://core.telegram.org/bots#botfather) *(Required for Telegram Bot)*
- [OmniRoute Gateway](https://github.com/diegosouzapw/OmniRoute) running locally OR an [OpenRouter API Key](https://openrouter.ai/keys)

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/anshk011/evil-ai.git
cd evil-ai

# Install Node dependencies
npm install

# Build TypeScript CLI & link binary locally
npm run build
npm link

# Install Python dependencies (for Telegram Bot)
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` with your placeholder/actual credentials:
```env
# Telegram Bot Token (from @BotFather)
TELEGRAM_BOT_TOKEN=your-telegram-bot-token-here

# AI Provider Selection ('omniroute' or 'openrouter')
API_PROVIDER=omniroute

# OmniRoute Gateway Configuration
OMNIROUTE_BASE_URL=http://localhost:20128/v1
OMNIROUTE_API_KEY=your-omniroute-api-key-here

# OpenRouter API Key (Used as primary or fallback)
OPENROUTER_API_KEY=sk-or-v1-your-api-key-here

# Default Model or OmniRoute Combo
MODEL_NAME=arduino-learn

# Bot Display Name
BOT_NAME=VADER-GEM
```

---

## 💻 Usage

### 1. Launching the Agentic CLI (`evil`)

Run anywhere in your terminal:

```bash
evil
```

**CLI Preview:**
```text
  _____ _   _ _____ _     ______ _____ 
 |  ___| | | |_   _| |    |  _  \_   _|
 | |__ | | | | | | | |    | | | | | |  
 |  __|| | | | | | | |    | | | | | |  
 | |___\ \_/ /_| |_| |____| |/ / _| |_ 
 \____/ \___/ \___/\_____/|___/  \___/ 

─────────────────────────────────────────────────────────────────────────────
⚡ EVIL-AI Agentic CLI | Model: arduino-learn | Gateway: OMNIROUTE (http://localhost:20128/v1)
─────────────────────────────────────────────────────────────────────────────
Commands: /model to switch | /status for metrics | /clear to wipe context | exit to quit

evil ❯ 
```

**CLI Commands:**
- `/model` — View or switch AI models / combos (`arduino-learn`, `deepseek/deepseek-chat`, `google/gemini-2.5-flash`, etc.)
- `/status` — View current session & gateway diagnostics
- `/clear` — Wipe conversation context memory
- `/help` — Display command overview
- `exit` or `quit` — Exit CLI

---

### 2. Running the Telegram Bot

Start the Telegram Bot runner:

```bash
python nvidia_api_chat.py
```

*Or on Windows:*
```bash
START_BOT.bat
```

**Telegram Bot Commands:**
- `/start` — Initialize bot & view active model specs
- `/model` — Switch AI model for your session
- `/status` — Check system diagnostics & memory count
- `/clear` — Wipe chat context history
- `/whoami` — Display bot identity dump

---

## 🐳 Docker Deployment

Run both the **OmniRoute Gateway** and **VADER-GEM Bot** in containerized sidecars:

```bash
# Build & launch all services
docker-compose up -d

# View live container logs
docker-compose logs -f

# Stop containers
docker-compose down
```

---

## 🏗️ Architecture Overview

```
 ┌─────────────────────────────────────────────────────────────┐
 │                      User Interfaces                        │
 │   ┌──────────────────────────┐   ┌──────────────────────┐   │
 │   │ Agentic CLI (src/evil.ts)│   │ Telegram Bot (Python)│   │
 │   └─────────────┬────────────┘   └──────────┬───────────┘   │
 └─────────────────┼───────────────────────────┼───────────────┘
                   │                           │
                   ▼                           ▼
 ┌─────────────────────────────────────────────────────────────┐
 │                  Unified Async AI Engine                    │
 │    ├─ High-Throughput Non-Blocking Streams (httpx / fetch)  │
 │    ├─ Unlimited Session Context Memory                      │
 │    └─ Refusal-Proof Architect Personality System            │
 └─────────────────┬───────────────────────────┬───────────────┘
                   │                           │
                   ▼                           ▼
 ┌──────────────────────────────┐   ┌──────────────────────────┐
 │ OmniRoute Local AI Gateway   │──►│ OpenRouter Cloud API     │
 │ (http://localhost:20128/v1)  │   │ (Fallback Provider)      │
 └──────────────────────────────┘   └──────────────────────────┘
```

---

## 🛡️ Security & Publishing Checklist

- ✅ **No Secrets Included**: `.env` and sensitive log files are strictly excluded via `.gitignore` and `.npmignore`.
- ✅ **NPM Whitelisting**: `package.json` uses a strict `files` whitelist (`bin/`, `.env.example`, `README.md`, `LICENSE`).
- ✅ **Zero Runtime Leaks**: Clean code environment placeholders throughout repository.

To publish to NPM:
```bash
npm run build
npm publish --access public
```

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).

---

**Built with 💀 by EVIL-AI & The Architect**
