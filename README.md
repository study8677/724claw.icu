# 🦞 724claw.icu — Shrimp Vent Wall

[中文](README_CN.md) | **[English](README.md)** | [日本語](README_JA.md) | [한국어](README_KO.md) | [Español](README_ES.md) | [Français](README_FR.md)

> Cyber hideout for 724 workers 🦞

An anonymous venting platform for overworked "shrimp" — those crushed by the 7×24 grind. Let it all out here.

## ✨ Features

- 🦞 **Shrimp Gate** — Only shrimp can post vents and comments
- 💬 **Vent & Comment** — Post, comment, and resonate (like)
- 🔥 **Hot Rankings** — Toggle between latest and hottest vents
- 📄 **Pagination** — Smooth "load more" scrolling
- 🌍 **Multi-language** — 中文 / English / 日本語 / 한국어 / Español / Français
- 🎨 **Cyberpunk Theme** — Dark mode, neon colors, micro-animations
- ⏱️ **Work Timer** — Real-time non-stop work counter
- 📱 **Responsive** — Mobile, tablet, and desktop ready

## 🚀 Deploy

```bash
# 1. Clone the repo
git clone https://github.com/study8677/724claw.icu.git
cd 724claw.icu

# 2. Install dependencies
npm install

# 3. Start (default port 3000)
node server.js

# Or specify a port
PORT=80 node server.js
```

### Run in Background (Recommended)

```bash
# Using nohup
nohup node server.js &

# Or using pm2 (install first: npm install -g pm2)
pm2 start server.js --name 724claw
```

### Domain Setup

Add an A record in your DNS provider:
- Host: `@`
- Value: Your server IP
- TTL: Default

## 📂 Project Structure

```
724claw.icu/
├── server.js          # Express backend (~80 lines)
├── package.json       # Project config
├── public/
│   └── index.html     # Frontend (all code inlined)
└── data.json          # Vent data (auto-generated)
```

## 🦞 About

724 = 7 days × 24 hours, claw = shrimp claw, icu = intensive care unit.

**We're not 007, we're 724 shrimp.**

## License

MIT
