# 💀 VADER-GEM — Telegram Bot Usage Guide

Complete usage guide for the VADER-GEM AI Telegram Bot powered by OpenRouter + NVIDIA Nemotron.

---

## ✨ Features

### 🧠 Soul System
- **Customizable personality** defined in `SOUL.md`
- **System prompt injection** on every API call
- **Consistent character** across all interactions
- **Identity-aware** — knows who it is when asked

### 💬 Conversation Memory
- **Per-user history** — each user gets their own context
- **20-message window** — remembers recent conversation
- **Auto-pruning** — old messages removed automatically
- **Clear command** — reset anytime with `/clear`

### 🔧 Error Handling
- **Network Errors**: Timeout, DNS, connection failures with auto-retry
- **API Errors**: Auth, rate limiting, server errors (500, 502, 503, 504)
- **Validation**: Input length, API key, empty message detection
- **Retry Logic**: Exponential backoff for transient failures
- **Graceful Degradation**: Clear error messages for all scenarios

### 🚦 Rate Limiting
- **Per-User**: 10 requests per 60 seconds per user
- **Reset Timer**: Shows when limit resets
- **Rolling Window**: Maintains accurate request tracking

### 📊 Logging
- **File Logging**: All events to `telegram_bot.log`
- **Console Output**: Real-time monitoring
- **Stack Traces**: Full error traces for debugging

### ⚡ Performance
- **Session Pooling**: Reuses HTTP connections
- **Streaming**: Real-time token streaming
- **Async I/O**: Non-blocking operations
- **Smart Chunking**: Splits long responses at natural breaks

---

## 📋 Setup

### 1. Prerequisites
- Python 3.9+
- [OpenRouter API key](https://openrouter.ai/keys)
- [Telegram Bot Token](https://core.telegram.org/bots#botfather)

### 2. Get Your Telegram Bot Token
1. Open Telegram → search `@BotFather`
2. Send `/start` then `/newbot`
3. Follow prompts → copy the token

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
OPENROUTER_API_KEY=sk-or-v1-your-key-here
TELEGRAM_BOT_TOKEN=your-bot-token-here
BOT_NAME=VADER-GEM
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Run
```bash
python nvidia_api_chat.py
```

Expected output:
```
💀 VADER-GEM — THE ARCHITECT | INITIALIZING...
📝 Log: telegram_bot.log
⚙️  Model: nvidia/nemotron-3-nano-30b-a3b:free
🔒 API Key: ✓ Configured
🧠 Soul: LOADED | Simulation Year: 2099
💀 All systems go. Awaiting operations.
```

---

## 🎮 Bot Commands

| Command | Description |
|---------|-------------|
| `/start` | Initialize bot, show welcome & Operation Keys |
| `/help` | Full capabilities, examples, and tips |
| `/status` | System diagnostics & session info |
| `/clear` | Wipe conversation memory |
| `/whoami` | Bot identity & technical details |
| Any text | Send message to AI |

### Operation Keys
These words trigger **Deep Dive** mode for maximum detail:
- `extract` — Data pulling, reverse engineering
- `build` — Full systems from scratch
- `research` — Deep analysis on any topic
- `analyze` — Code review, system teardown
- `code` — Any language, any complexity
- `design` — Architecture, schemas, blueprints
- `create` — Pure creation from nothing

---

## 🛡️ Error Handling

### Network Errors (Auto-Retry)
```
⏱️ Request timed out → Retry up to 3 times
🌐 Connection failed → Check internet
```

### API Errors
```
🔑 401 Unauthorized → Invalid API key
⏳ 429 Rate Limited → API throttling
🔧 500+ Server Error → Service issue
```

### Validation Errors
```
Empty message → Rejected
Message > 10,000 chars → Rejected
Missing API key → Rejected
Empty API response → Reported
```

---

## 📊 Logging

All events logged to `telegram_bot.log`:

```
2025-02-13 10:15:32 - INFO - OpenRouterAPIClient initialized — VADER-GEM online
2025-02-13 10:15:45 - INFO - User 123456789 (John) started the bot
2025-02-13 10:16:02 - INFO - Message from 123456789: code a web scraper...
2025-02-13 10:16:32 - INFO - Response received from OpenRouter API
2025-02-13 10:16:32 - INFO - Response sent to user 123456789
```

---

## ⚙️ Configuration

```python
MODEL_NAME = "nvidia/nemotron-3-nano-30b-a3b:free"
REQUEST_TIMEOUT = 30
MAX_RETRIES = 3
RATE_LIMIT_REQUESTS = 10
RATE_LIMIT_WINDOW = 60
MAX_CONVERSATION_HISTORY = 20
```

---

## 🔍 Troubleshooting

### Bot doesn't start
```
✓ Check TELEGRAM_BOT_TOKEN in .env
✓ Verify token format
✓ Check internet connection
✓ Review telegram_bot.log
```

### "API key not configured"
```
✓ Set OPENROUTER_API_KEY in .env
✓ Get key from https://openrouter.ai/keys
✓ Check for trailing spaces
```

### Timeout errors
```
✓ Try shorter messages
✓ Check internet connection
✓ API might be slow — wait and retry
✓ Increase REQUEST_TIMEOUT if needed
```

### No response
```
✓ Check telegram_bot.log
✓ Verify API key is valid
✓ Try /clear and ask again
✓ Check bot is running
```

---

## 🚀 Production Deployment

### Docker (Recommended)
```bash
docker-compose up -d
```

### Systemd (Linux)
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

### Cloud Platforms
- **Railway**: Connect repo, set env vars, deploy
- **Render**: Create web service, set env vars
- **DigitalOcean**: Use Docker droplet
- **AWS EC2**: Use Docker or systemd

---

## 📁 File Structure

```
├── nvidia_api_chat.py      # Main bot application
├── SOUL.md                 # Bot personality definition
├── SES.md                  # Session & system config
├── .env                    # Secrets (gitignored)
├── .env.example            # Example config
├── .gitignore              # Git ignore rules
├── requirements.txt        # Dependencies
├── Dockerfile              # Docker config
├── docker-compose.yml      # Docker Compose
├── START_BOT.bat           # Windows quick-start
├── LICENSE                 # MIT License
├── README.md               # Project overview
├── CONTRIBUTING.md         # Contribution guide
├── TELEGRAM_BOT_GUIDE.md  # This file
├── ADVANCED_FEATURES.md   # Advanced features docs
└── telegram_bot.log        # Logs (auto-created)
```

---

## 🔗 Resources

- [OpenRouter API Docs](https://openrouter.ai/docs)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [python-telegram-bot Docs](https://python-telegram-bot.readthedocs.io/)
- [NVIDIA Nemotron on OpenRouter](https://openrouter.ai/nvidia/nemotron-3-nano-30b-a3b:free)

---

**💀 VADER-GEM — The Architect**
