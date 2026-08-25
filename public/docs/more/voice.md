---
title: Voice
description: Speak to your AI and hear it respond — TTS, speech-to-text, and hands-free voice sessions.
sidebar:
  label: Voice
  order: 2
---

Speak to your AI and hear it respond. Twent supports configurable text-to-speech and speech-to-text engines, plus hands-free voice sessions.

## Text-to-Speech Engines

| Engine | Type |
| --- | --- |
| System TTS | Built-in Android |
| OpenAI TTS | Cloud |
| SiliconFlow TTS | Cloud |

Configure under `Settings → Speech Services`.

## Speech-to-Text Engines

| Engine | Offline |
| --- | --- |
| Sherpa-NCNN (on-device) | Yes |
| OpenAI STT | No |
| Deepgram STT | No |

Cloud STT engines automatically fall back to on-device recognition when a network connection isn't available.

## Hands-free voice

Start a voice session and speak your command — the AI listens, transcribes, responds with its own voice ("Wanna get something done?"), and can drive your screen while talking. The overlay agent (home/power long-press) uses the same voice pipeline.
