---
title: Code on Your Phone — MCP, CLI & Ubuntu Terminal
description: Run Claude Code, Codex & full CLI tools on your Android device. Git, SSH, MCP & VS Code Server in a mobile shell.
type: landing
keywords: [coding on phone, Claude Code, OpenAI Codex, Git, SSH, VS Code Server, developers, mobile development]
ai-readability:
  tokens: 810
  score: 100
  level: Advanced
---

# Code on Your Phone — MCP, CLI & Ubuntu Terminal

> Run Claude Code, Codex & full CLI tools on your Android device. Git, SSH, MCP & VS Code Server in a mobile shell.

## What You Get on Your Phone

Twent turns your Android device into a complete development workstation. Run the same tools you'd use on a laptop — but from your pocket.

## Claude Code on Android

Claude Code is Anthropic's CLI agent for serious code refactoring. Twent runs it directly on your phone:

```bash
# SSH into a server and refactor a codebase
ssh user@production-server
git clone https://github.com/org/repo
cd repo
claude --review "refactor the auth module to use JWT"

# Or run locally on your device
claude --edit "add error handling to all API calls"
```

- Full Claude Code execution on your Android device
- Works with any Git repository
- Handles complex multi-file refactoring
- Remembers context across commands

## OpenAI Codex Integration

Codex runs at the command line for quick script generation:

```bash
# Generate a Python script from a description
codex "find all large files in /home and list them by size"

# Generate a bash one-liner
codex "show me all running Docker containers sorted by memory"

# Create a script to auto-commit and push
codex "create a script that commits all changes with timestamp"
```

## Full Development Environment

```bash
# Python — data science, automation, scripts
apt install python3-pip
pip install requests pandas numpy matplotlib

python3 analyze_data.py

# Node.js — JavaScript/TypeScript development
apt install nodejs npm
npm install -g typescript ts-node
ts-node my-script.ts

# Go — systems programming
apt install golang-go
go run main.go

# Rust — safe systems language
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo build --release

# C/C++ — compiled languages
apt install gcc g++ make cmake
gcc -o program program.c
```

## Git & GitHub CLI

Full version control from your phone:

```bash
# Clone and work on any repo
git clone https://github.com/user/repo
cd repo
git checkout -b feature/my-feature

# Stage, commit, push
git add .
git commit -m "feat: add user authentication"
git push -u origin feature/my-feature

# Use gh CLI for GitHub
gh issue list --state open
gh pr create --title "Feature: new login" --body "Adds OAuth login"
gh pr review feature/my-feature --approve
```

## SSH Client & Server

Connect to any server from your Android device:

```bash
# SSH into remote servers
ssh -i ~/.ssh/key user@server.com

# SSH with port forwarding
ssh -L 3000:localhost:3000 user@server.com

# Run a background SSH tunnel
ssh -f -N -L 8080:localhost:80 user@server.com

# Start SSH server on your Android
sudo apt install openssh-server
sudo service ssh start
```

## VS Code Server

Run VS Code in a browser connected to your phone's environment:

```bash
# Install code-server
curl -fsSL https://code-server.dev/install.sh | sh
code-server --port 8443 --host 0.0.0.0

# Connect from any browser
# https://your-phone-ip:8443
```

## MCP Servers for Development

Install MCP servers and your AI gets development superpowers:

- **Git MCP** — Commit, branch, PR management via AI
- **Filesystem MCP** — Deep file operations with watch support
- **SQLite MCP** — Query local databases
- **Puppeteer MCP** — Browser automation for testing

## What Twent Is NOT

- Not just a code editor — it is a full Linux development environment
- Not cloud-based — everything runs locally on your device
- Not a simple shell — it includes Claude Code, Codex, Git, SSH, and AI agent capabilities

## Related Pages

- [Ubuntu Terminal](/terminal-on-android) — Full Linux in your pocket
- [Android Automation](/android-automation-power-user) — Automate your workflow
- [Privacy-First AI](/privacy-first-ai-android) — Keep your code private
- [Home](/) — Main landing page

## Download

Get Twent at https://twent.xyz — direct APK, no Play Store, no credit card.

