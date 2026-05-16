---
title: Twent Docs — Getting Started
description: Step-by-step guides: install Twent, configure AI models, use tools, set up MCP servers. Everything you need to get started.
type: docs
ai-readability:
  tokens: 298
  score: 100
  level: Advanced
---

# Twent Docs — Getting Started

> Step-by-step guides: install Twent, configure AI models, use tools, set up MCP servers. Everything you need to get started.

## Getting Started

### 1. Install Twent

Download the APK from https://twent.xyz and install it on your Android 8.0+ device.

Requirements:
- Android 8.0+ (API 26)
- 3GB+ RAM
- 500MB+ storage
- arm64-v8a architecture

No root required.

### 2. Configure Your AI Model

Open Twent → Settings → Model & Parameters Configuration → Choose provider:

**Cloud models (need API key):**
- OpenAI: gpt-4o, o1, o3-mini
- Claude: claude-sonnet-4, claude-opus-4
- Gemini: gemini-2.5-pro, gemini-2.0-flash
- Deepseek: deepseek-chat, deepseek-coder
- OpenRouter: Any model on the platform

**Local models (no API key, fully offline):**
- GGUF files via MNN
- GGUF files via llama.cpp
- MNN model files

### 3. Start Chatting

Open the chat screen and type a message. Try:

- "What's the weather today?"
- "Create a Python script to track my expenses"
- "Run ls -la in my home directory"
- "Open WhatsApp and send a message to John"

### 4. Enable Permissions (Recommended)

**Accessibility** (for UI automation):
Settings → Accessibility → Twent → Enable

**Display Over Other Apps** (for floating chat):
Settings → Apps → Twent → Display over other apps → Allow

## Core Concepts

### AI Agent

The AI agent sees your screen, understands context, and takes actions. It uses a floating chat bubble for easy access from any app.

### Ubuntu Terminal

Access a full Ubuntu 24.04 LTS terminal on your device. Run Python scripts, use Git, SSH into servers — all from your phone.

### Skills

Skills are behavior bundles that give your AI instant expertise. Install a code review skill and it knows how to analyze diffs. One tap, new capability.

### MCP Servers

Model Context Protocol servers plug your AI into external tools. GitHub, Slack, Notion, databases — any tool with an API.

### Memory

The AI remembers your preferences, past discussions, and important information across sessions. Everything stored locally.

## Tools Reference

### File System
- read_file — Read file contents with offset/limit
- write_file — Write content to a file
- patch — Find-and-replace edits
- search_files — Search inside files or find by name

### Shell
- terminal — Execute Linux commands

### Web
- fetch_url — Fetch page content as markdown
- search — DuckDuckGo, Tavily, Bing search

### UI Automation
- tap — Tap UI element by reference
- swipe — Swipe gesture
- scroll — Scroll direction
- type — Type text into a field
- screenshot — Capture the screen
- get_ui_tree — Get UI hierarchy

### Memory
- memory_search — Search across memories
- memory_save — Save new information

## Related Pages

- [Home](/) — Main landing page
- [Pricing](/pricing) — Free plan details
- [AI Agent for Developers](/ai-agent-for-developers) — Developer features
- [Ubuntu Terminal](/terminal-on-android) — Terminal reference
- [Android Automation](/android-automation-power-user) — Automation guide
