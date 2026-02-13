# 🤝 Contributing to VADER-GEM

Thanks for your interest in contributing! Here's how to get started.

## 🚀 Getting Started

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/yourusername/vader-gem-bot.git
   cd vader-gem-bot
   ```
3. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Set up** the development environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # or .venv\Scripts\activate on Windows
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env with your test credentials
   ```

## 📝 Development Guidelines

### Code Style
- Follow PEP 8 for Python code
- Use type hints where possible
- Add docstrings to all functions and classes
- Keep functions focused and under 50 lines when possible

### Commit Messages
Use clear, descriptive commit messages:
```
feat: add user whitelist feature
fix: handle empty API response gracefully
docs: update README with Docker instructions
refactor: extract rate limiter into separate module
```

### Testing
- Test your changes locally before submitting
- Ensure the bot starts without errors
- Test all commands: `/start`, `/help`, `/status`, `/clear`, `/whoami`
- Test error scenarios (invalid input, rate limiting)

## 🔧 Areas for Contribution

### High Priority
- [ ] Add persistent conversation storage (SQLite/Redis)
- [ ] Add user whitelist/blacklist functionality
- [ ] Add webhook mode for production deployment
- [ ] Add unit tests

### Nice to Have
- [ ] Add inline keyboard buttons
- [ ] Add image/document handling
- [ ] Add multi-language support
- [ ] Add admin commands (broadcast, stats)
- [ ] Add conversation export feature

### Documentation
- [ ] Improve deployment guides for specific platforms
- [ ] Add API documentation
- [ ] Add architecture diagrams

## 📋 Pull Request Process

1. Update documentation if you've changed functionality
2. Ensure no secrets or API keys are in your code
3. Test your changes thoroughly
4. Submit a PR with a clear description of changes
5. Reference any related issues

## ⚠️ Important Notes

- **Never commit `.env` files** or any secrets
- **Don't modify `SOUL.md`** without discussion — it defines the bot's core personality
- **Keep backward compatibility** when changing configuration
- **Log appropriately** — use the existing logging patterns

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.
