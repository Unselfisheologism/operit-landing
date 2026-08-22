---
title: Privacy-First AI on Android — BYOK & Local Models
description: Your data never leaves your device. Bring your own API keys (encrypted locally), run offline AI models. Zero telemetry.
type: landing
keywords: [privacy, BYOK, local AI, offline, zero telemetry, GGUF, MNN]
ai-readability:
  tokens: 1043
  score: 100
  level: Advanced
---

# Privacy-First AI on Android — BYOK & Local Models

> Your data never leaves your device. Bring your own API keys (encrypted locally), run offline AI models. Zero telemetry.

## Privacy Architecture

Twent is built around one principle: your data never leaves your device unless you explicitly choose to send it.

## BYOK — Bring Your Own Key

When you configure an AI model in Twent, you enter your own API key. That key is:

1. **Encrypted immediately** with Android KeyStore — the same standard used by banking apps
2. **Stored locally** on your device — never transmitted to Twent's servers
3. **Used only for API calls** — your key is sent only to the AI provider (OpenAI, Anthropic, etc.)
4. **Never logged or stored** on any external system

```
You: "Configure Claude as my AI model"
Twent:
  1. API key encrypted with Android KeyStore (AES-256)
  2. Key stored in device keystore — hardware-backed on supported devices
  3. When making API call:
     - Key retrieved from keystore (in memory, never persisted)
     - Only your query sent to Anthropic's API
     - No logs, no tracking, no telemetry
  4. Response returned to you
  5. Key cleared from memory
```

## Local AI Models

Run AI models entirely on your device — no internet required:

### GGUF Models (llama.cpp)
Download any GGUF model file and run it locally:

```
# Download a GGUF file (e.g., Llama 3 8B Q4)
# Place it in /sdcard/Models/llama-3-8b.Q4_K_M.gguf

Settings → Model & Parameters Configuration → Local Model
  → Select GGUF file
  → Model loads entirely in RAM
  → AI runs locally, no network calls ever
```

### MNN Models (Mobile Neural Networks)
Optimized for mobile inference with hardware acceleration:

```
Settings → Model & Parameters Configuration → Local Model → MNN
  → Browse available models
  → Download and install
  → Runs on CPU/GPU with NPU acceleration where available
```

### Supported Local Models
- Llama 3 / Llama 3.1 (8B, 70B GGUF)
- Phi-3 (Q4 GGUF)
- Mistral 7B (Q4 GGUF)
- Gemma 2B / 7B (GGUF)
- Any GGUF-compatible model
- Custom MNN models

## Zero Telemetry

Twent collects **absolutely nothing**:

| Data Type | Collected? | Notes |
|---|---|---|
| API keys | ❌ Never | Stored in Android KeyStore only |
| Chat messages | ❌ Never | Processed in memory only |
| Files accessed | ❌ Never | All file operations are local |
| Location | ❌ Never | No GPS access for analytics |
| Usage patterns | ❌ Never | No analytics SDK |
| Crash reports | ❌ Never | No crash reporting |
| Device info | ❌ Never | No telemetry |
| AI provider logs | ❌ Never | API responses never stored |

## What Twent Does NOT Do

- **Does NOT send your messages to Twent's servers** — all processing is on-device or directly to your chosen AI provider
- **Does NOT log your conversations** — chat history is stored locally and only locally
- **Does NOT require internet** — local models work fully offline
- **Does NOT share data with third parties** — no analytics, no tracking, no ads in the telemetry layer
- **Does NOT require Google Play Services** — works on any Android device

## Encryption Details

| Layer | Standard | Details |
|---|---|---|
| API Key Storage | AES-256-GCM | Android KeyStore, hardware-backed |
| Local Storage | Device Default | Depends on Android full-disk encryption |
| Network | TLS 1.3 | API calls to OpenAI, Anthropic, etc. |
| Memory | RAM only | API keys cleared after each call |

## Privacy Comparison

| Feature | Twent | ChatGPT | Claude | Gemini |
|---|---|---|---|---|
| API keys stored on cloud | ❌ | ✅ | ✅ | ✅ |
| Messages logged | ❌ | ✅ | ✅ | ✅ |
| Analytics/telemetry | ❌ | ✅ | ✅ | ✅ |
| Local model support | ✅ | ❌ | ❌ | ❌ |
| BYOK (your key) | ✅ | ❌ | ❌ | ❌ |
| Offline mode | ✅ | ❌ | ❌ | ❌ |
| Zero data collection | ✅ | ❌ | ❌ | ❌ |

## For Developers

Use Twent's privacy features in your workflows:

```python
# Privacy-preserving data processing
# Run entirely on-device with local model

from transformers import AutoModelForCausalLM

# Load local model (no network calls)
model = AutoModelForCausalLM.from_pretrained(
    "/sdcard/Models/llama-3-8b.Q4_K_M.gguf",
    device="cpu"
)

# Process sensitive data locally
result = model.generate(sensitive_user_data)

# Write to local storage only
write_file("/sdcard/results.txt", result)
```

## Related Pages

- [Home](/) — Main landing page
- [Ubuntu Terminal](/terminal-on-android) — Local development
- [Android Automation](/android-automation-power-user) — Local automation

## Download

Get Twent at https://twent.xyz — direct APK, no Play Store, no credit card.

