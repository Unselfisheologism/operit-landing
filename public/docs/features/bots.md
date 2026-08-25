---
title: Bots
description: Twent agents with a specific task, triggered manually, on a schedule, by webhook, or by MCP events.
sidebar:
  label: Bots
  order: 5
---

Bots are essentially [AI agents](https://en.wikipedia.org/wiki/Intelligent_agent) that are given a specific task — and they keep doing it without you having to ask each time. You can create a bot yourself, or your Twent agent can create one on your behalf.

## Triggers

Each bot runs on one of four trigger types:

- **Manual** — no automatic firing; you (or the chat agent) trigger it whenever you want
- **Scheduled** — fires automatically on a [cron](https://en.wikipedia.org/wiki/Cron) schedule you set
- **Webhook** — fires when Twent's local HTTP server receives a matching POST request
- **MCP event** — fires when a subscribed [MCP server](https://modelcontextprotocol.io/docs/getting-started/intro) emits a matching event

Any bot can also be fired manually at any time — via the calendar page button or by asking the chat agent. Bots can be created by you directly in the bot form, or by the chat agent itself.

## Managing bots

All of your bots appear in the app alongside the agent's work — see the **"Bots & Tasks"** page for the bird's-eye overview (covered in [Subagents](/features/subagents)).

:::tip
A bot is just an agent plus a task plus a trigger — describe what should happen and when, and let Twent handle the rest.
:::
