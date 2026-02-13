# 💀 VADER-GEM — AI Telegram Bot

[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Telegram Bot API](https://img.shields.io/badge/Telegram-Bot%20API-blue.svg)](https://core.telegram.org/bots/api)
[![OpenRouter](https://img.shields.io/badge/API-OpenRouter-green.svg)](https://openrouter.ai/)

A production-ready, personality-driven AI Telegram bot powered by **NVIDIA Nemotron** via **OpenRouter API**. Features a customizable soul/personality system, per-user conversation memory, rate limiting, streaming responses, and comprehensive error handling.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🧠 **Soul System** | Customizable personality via `SOUL.md` and system prompt |
| 💬 **Conversation Memory** | Per-user chat history with configurable depth |
| ⚡ **Streaming Responses** | Real-time token streaming for fast feedback |
| 🚦 **Rate Limiting** | Per-user rate limiting with reset timers |
| 🔄 **Auto-Retry** | Exponential backoff on transient API failures |
| 📊 **Logging** | File + console logging with full stack traces |
| 🐳 **Docker Ready** | Dockerfile + docker-compose for easy deployment |
| 🔐 **Secure Config** | Environment variables for all secrets |
| 🛡️ **Error Handling** | Comprehensive error handling at every layer |
| 📱 **Telegram Native** | Typing indicators, message chunking, command system |

---

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- [Telegram Bot Token](https://core.telegram.org/bots#botfather) from @BotFather
- [OpenRouter API Key](https://openrouter.ai/keys)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vader-gem-bot.git
cd vader-gem-bot
```

### 2. Set Up Environment

```bash
# Create virtual environment
python -m venv .venv

# Activate it
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Configure

```bash
# Copy example config
cp .env.example .env

# Edit with your credentials
# Windows: notepad .env
# Linux/Mac: nano .env
```

Set these values in `.env`:
```env
OPENROUTER_API_KEY=sk-or-v1-your-key-here
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
BOT_NAME=VADER-GEM
```

### 4. Run

```bash
python nvidia_api_chat.py
```

Or use the batch script (Windows):
```bash
START_BOT.bat
```

Or use Docker:
```bash
docker-compose up -d
```

---

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Using Docker Directly

```bash
# Build
docker build -t vader-gem-bot .

# Run
docker run -d --name vader-gem \
  --env-file .env \
  --restart unless-stopped \
  vader-gem-bot
```

---

## 📌 Bot Commands

| Command | Description |
|---------|-------------|
| `/start` | Initialize bot, show welcome & capabilities |
| `/help` | Full help guide with examples |
| `/status` | System diagnostics & session info |
| `/clear` | Wipe conversation memory |
| `/whoami` | Bot identity & technical details |
| Any text | Send message to AI |

---

## 🧠 Soul System

The bot's personality is defined in two files:

### [`SOUL.md`](SOUL.md)
Defines the bot's identity, personality traits, communication style, and core directives. This is the **reference document** for the bot's character.

### [`SES.md`](SES.md)
Session & system configuration: the actual system prompt template injected into every API call, conversation memory design, and environment variable reference.

### Customizing the Personality

1. Edit `SOUL.md` to define your bot's character
2. Update the `SYSTEM_PROMPT` in `nvidia_api_chat.py` to match
3. Change `BOT_NAME` in `.env`
4. Restart the bot

The system prompt is sent as the first message in every API call, ensuring consistent personality across all interactions.

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `OPENROUTER_API_KEY` | OpenRouter API key | — | ✅ |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token | — | ✅ |
| `BOT_NAME` | Bot display name | `VADER-GEM` | ❌ |

### In-Code Configuration

Edit these constants in `nvidia_api_chat.py`:

```python
MODEL_NAME = "nvidia/nemotron-3-nano-30b-a3b:free"  # AI model
REQUEST_TIMEOUT = 30          # API timeout (seconds)
MAX_RETRIES = 3               # Retry attempts on failure
RATE_LIMIT_REQUESTS = 10      # Requests per window per user
RATE_LIMIT_WINDOW = 60        # Rate limit window (seconds)
MAX_CONVERSATION_HISTORY = 20 # Messages to keep per user
MAX_MESSAGE_LENGTH = 4096     # Telegram message limit
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│  Telegram User                       │
└──────────┬──────────────────────────┘
           │ (Message)
           ↓
┌─────────────────────────────────────┐
│  Telegram Bot API                    │
│  ├─ Command Handlers                │
│  ├─ Message Handler                 │
│  ├─ Rate Limiter                    │
│  └─ Error Handler                   │
└──────────┬──────────────────────────┘
           │
           ↓
┌─────────────────────────────────────┐
│  Conversation Memory                 │
│  ├─ Per-user history                │
│  ├─ System prompt injection         │
│  └─ Auto-pruning                    │
└──────────┬──────────────────────────┘
           │
           ↓ (HTTP with retries + streaming)
┌─────────────────────────────────────┐
│  OpenRouter API                      │
│  (nvidia/nemotron-3-nano-30b-a3b)   │
└─────────────────────────────────────┘
```

---

## 📁 Project Structure

```
TelegramBot/
├── nvidia_api_chat.py      # Main bot application
├── SOUL.md                 # Bot personality definition
├── SES.md                  # Session & system config docs
├── .env                    # Environment variables (secrets - gitignored)
├── .env.example            # Example environment config
├── .gitignore              # Git ignore rules
├── requirements.txt        # Python dependencies
├── Dockerfile              # Docker container config
├── docker-compose.yml      # Docker Compose config
├── START_BOT.bat           # Windows quick-start script
├── LICENSE                 # MIT License
├── README.md               # This file
├── CONTRIBUTING.md         # Contribution guidelines
├── TELEGRAM_BOT_GUIDE.md  # Detailed usage guide
├── ADVANCED_FEATURES.md   # Advanced features documentation
└── telegram_bot.log        # Log file (auto-created)
```

---

## 🛡️ Error Handling

The bot handles errors at every layer:

| Layer | Errors Handled |
|-------|---------------|
| **Network** | Timeout, DNS, connection failures |
| **API** | 401 (auth), 429 (rate limit), 500+ (server) |
| **Validation** | Empty messages, oversized input, missing API key |
| **Telegram** | Send failures, network errors, API limits |
| **Application** | Uncaught exceptions with graceful recovery |

All errors are:
- Logged to `telegram_bot.log` with full stack traces
- Reported to the user with clear, actionable messages
- Automatically retried (for transient failures)

---

## 📊 Logging

All events are logged to `telegram_bot.log`:

```
2025-02-13 10:15:32 - INFO - OpenRouterAPIClient initialized — VADER-GEM online
2025-02-13 10:15:45 - INFO - User 123456789 (John) started the bot
2025-02-13 10:16:02 - INFO - Message from 123456789: What is AI?...
2025-02-13 10:16:32 - INFO - Response received from OpenRouter API
2025-02-13 10:16:32 - INFO - Response sent to user 123456789
```

**Log Levels:** `INFO` (normal), `WARNING` (rate limits), `ERROR` (handled errors), `CRITICAL` (system failures)

---

## 🔍 Troubleshooting

| Issue | Solution |
|-------|----------|
| Bot doesn't start | Check `TELEGRAM_BOT_TOKEN` in `.env` |
| "API key not configured" | Set `OPENROUTER_API_KEY` in `.env` |
| Timeout errors | Try shorter messages, increase `REQUEST_TIMEOUT` |
| Rate limited | Wait 60 seconds, or adjust `RATE_LIMIT_REQUESTS` |
| Empty responses | Check API key validity, try `/clear` |
| Docker won't build | Ensure Docker is installed and running |

---

## 🚀 Production Deployment

### Recommended Setup

1. **VPS/Cloud**: Deploy on AWS EC2, DigitalOcean, Railway, or Render
2. **Docker**: Use `docker-compose` for easy management
3. **Process Manager**: Use `systemd` or Docker's restart policy
4. **Monitoring**: Check `telegram_bot.log` regularly
5. **Backups**: Keep `.env` backed up securely

### Systemd Service (Linux)

```ini
[Unit]
Description=VADER-GEM Telegram Bot
After=network.target

[Service]
Type=simple
User=botuser
WorkingDirectory=/opt/vader-gem-bot
ExecStart=/opt/vader-gem-bot/.venv/bin/python nvidia_api_chat.py
Restart=always
RestartSec=10
EnvironmentFile=/opt/vader-gem-bot/.env

[Install]
WantedBy=multi-user.target
```

### Security Checklist

- [ ] Never commit `.env` to git
- [ ] Use strong, unique API keys
- [ ] Restrict bot access if needed (add allowed user IDs)
- [ ] Monitor logs for abuse
- [ ] Keep dependencies updated

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 🔗 Resources

- [OpenRouter API Docs](https://openrouter.ai/docs)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [python-telegram-bot Docs](https://python-telegram-bot.readthedocs.io/)
- [NVIDIA Nemotron Model](https://openrouter.ai/nvidia/nemotron-3-nano-30b-a3b:free)

---

**Built with 💀 by VADER-GEM**
