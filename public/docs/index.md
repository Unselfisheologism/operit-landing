---
title: Introduction
description: Twent is a personal AI agent for Android — automate any app, run a full Ubuntu terminal, and connect to 1000+ services. Free, local-first, and extensible.
sidebar:
  label: Introduction
  order: 0
---

Twent runs on **Android 8.0+** and gives you a real AI assistant that can see your screen, control any app, run shell commands, browse the web, manage files, and connect to external tools — all from a floating bubble or the main chat interface.

<CardGroup cols={2}>
  <Card title="Installation" href="/getting-started/installation" icon="download">
    Download the APK and install Twent on your device.
  </Card>
  <Card title="First Setup" href="/getting-started/first-setup" icon="settings">
    Configure your AI provider and start chatting.
  </Card>
  <Card title="Tools" href="/tools/overview" icon="wrench">
    40+ built-in tools — file system, shell, web, media, UI automation.
  </Card>
  <Card title="Workflows" href="/workflows/overview" icon="zap">
    Multi-step automations with triggers and conditions.
  </Card>
</CardGroup>

## Why Twent exists

Most AI assistants live in a chat bubble and can't touch your device. Twent is different — it runs **on your phone** with full access to the OS, giving AI real agency: reading your screen, tapping buttons, running commands, and managing files.

<CardGroup cols={3}>
  <Card title="Local-First" icon="shield">
    All data stays on your device. BYOK model — your keys, your data.
  </Card>
  <Card title="Open Source" icon="code">
    Transparent, auditable, and extensible by the community.
  </Card>
  <Card title="Extensible" icon="plug">
    MCP servers, packages, skills, and workflows for infinite capability.
  </Card>
</CardGroup>

## What Twent can do

<Accordion>
  <AccordionItem title="Automate any Android app">
    The AI can see your screen via Accessibility service, tap buttons, fill forms, swipe, scroll, and type — automating any app without API access or special integrations.
  </AccordionItem>
  <AccordionItem title="Run a full Linux environment">
    Built-in Ubuntu 24.04 terminal — no root required. Install packages with apt, run Python scripts, use Git, SSH to servers, and build software.
  </AccordionItem>
  <AccordionItem title="Manage files and code">
    Read, write, search, and edit files on your device. Run JavaScript/TypeScript code. Compress, decompress, and transfer files.
  </AccordionItem>
  <AccordionItem title="Browse the web">
    Fetch web pages as markdown, search with DuckDuckGo/Bing/Scholar, download files, and use a built-in browser with JavaScript execution.
  </AccordionItem>
  <AccordionItem title="Process media">
    Full FFmpeg engine, camera integration, OCR, image analysis, speech-to-text, and text-to-speech — all built in.
  </AccordionItem>
</Accordion>

## Quick start

1. **Download Twent**

    Get the latest APK from [twent.xyz](https://twent.xyz). The APK is ~80MB and includes everything you need.

2. **Install and grant permissions**

    Open the APK, enable "Install from unknown sources" if prompted, then grant the requested permissions. Storage and Network are required; Accessibility enables UI automation.

3. **Configure your AI provider**

    Go to Settings → Model & Parameters Configuration. Add your API key (OpenAI, Claude, Gemini, OpenRouter, or many more).

4. **Start chatting**

    Tap the floating bubble or open the chat screen. Ask Twent to do anything — run commands, automate apps, browse the web, or manage files.

:::tip
Twent is completely free. Paid model API usage is billed by your chosen provider (OpenAI, Anthropic, etc.). If someone asks you to pay for Twent itself, it's a scam.
:::

## Next steps

<CardGroup cols={2}>
  <Card title="Installation Guide" href="/getting-started/installation" icon="download">
    Full system requirements and download instructions.
  </Card>
  <Card title="First Setup" href="/getting-started/first-setup" icon="settings">
    Configure providers, set API keys, and pick a model.
  </Card>
  <Card title="Chat Overview" href="/chat/overview" icon="message-circle">
    Streaming, tool calls, conversation management, and more.
  </Card>
  <Card title="Tool Reference" href="/more/tool-reference" icon="list">
    Complete parameter reference for every built-in tool.
  </Card>
</CardGroup>
