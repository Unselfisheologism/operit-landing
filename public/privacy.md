---
title: Twent Privacy Policy — Your Data, Your Control
description: How your data is handled: encryption standards, what we never collect, and our transparency commitments.
type: legal
ai-readability:
  tokens: 312
  score: 100
  level: Advanced
---

# Twent Privacy Policy — Your Data, Your Control

> How your data is handled: encryption standards, what we never collect, and our transparency commitments.

## Data We Collect

**None.**

Twent does not collect, store, or transmit:
- Your messages or conversations
- Your files or documents
- Your API keys (stored in Android KeyStore, never leaves device)
- Your location or device information
- Your usage patterns or analytics

## Data Processing

All data processing happens on your device:
- **Chat messages** — Processed in memory, never stored by Twent
- **Files** — Accessed locally only, never uploaded
- **API calls** — Made directly to your chosen AI provider (OpenAI, Anthropic, etc.), Twent never sees the content
- **Local models** — Run entirely on-device, no network calls

## API Keys

Your API keys (for OpenAI, Claude, etc.) are:
- Encrypted immediately with Android KeyStore (AES-256)
- Stored only on your device in the Android secure keystore
- Sent only to the AI provider when you make a request
- Never logged, stored externally, or transmitted to Twent's infrastructure

## Third-Party Services

When you use Twent with a cloud AI model:
- Your queries are sent directly to the AI provider (OpenAI, Anthropic, etc.)
- Those providers have their own privacy policies
- Twent has no control over, and is not responsible for, their data practices

## Local Models

When you use local GGUF/MNN models:
- All processing happens on your device
- No data leaves your device
- No network calls are made
- Zero telemetry from model inference

## Children's Privacy

Twent is not directed to children under 13. We do not knowingly collect information from children.

## Changes to This Policy

We will update this policy if our practices change. Significant changes will be announced via the Twent blog.

## Contact

For privacy concerns: privacy@twent.xyz or support@twent.xyz

## Related Pages

- [Terms of Service](/terms) — User agreement
- [Home](/) — Main landing page
