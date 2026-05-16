---
title: Build & Sell AI Skills on Twent
description: Turn your automations into products. Build skills once, reach millions of Android users. Simple publishing, fair revenue share.
type: landing
keywords: [marketplace, AI skills, build and sell, creators, revenue]
ai-readability:
  tokens: 858
  score: 100
  level: Advanced
---

# Build & Sell AI Skills on Twent

> Turn your automations into products. Build skills once, reach millions of Android users. Simple publishing, fair revenue share.

## Build Once, Reach Millions

The Twent Marketplace lets you build AI skills, tool packages, and MCP servers — then sell them to millions of Android users looking for AI superpowers.

## What You Can Build

### AI Skills

Skills are behavior bundles that give the AI instant expertise in a domain.

**Examples:**
- **Code Review** — Analyzes PRs for bugs, security issues, style violations
- **Data Analysis** — Processes CSVs, generates charts, statistical summaries
- **Writing Assistant** — Editorial mode for blog posts, emails, documentation
- **Research** — Deep research with web search and citation
- **Legal Advisor** — Reviews contracts and flags concerning clauses
- **Financial Analysis** — Analyzes stocks, generates reports

**Skill structure:**
```
my-skill/
├── SKILL.md          # System prompt, description, examples
├── tools/            # Custom tools for this skill
├── workflows/         # Pre-built workflows
└── assets/           # Reference data, templates
```

### MCP Servers

Model Context Protocol servers add new capabilities to the AI:

- **GitHub MCP** — Manage repos, issues, PRs from chat
- **Slack MCP** — Send messages, manage channels
- **Notion MCP** — Create and query pages
- **Database MCP** — Query any SQLite database
- **Custom MCP** — Build your own tool provider

**MCP structure:**
```
my-mcp-server/
├── package.json
├── src/
│   ├── index.ts      # MCP server implementation
│   └── tools/        # Tool definitions
└── README.md
```

### Tool Packages

JavaScript/TypeScript tool bundles that extend what the AI can do:

```
my-package/
├── package.json      # name, version, description
├── tools/
│   └── index.ts     # Tool definitions (name, description, parameters)
├── scripts/          # Helper scripts
└── assets/           # Static data, configs
```

## Publishing Flow

1. **Build** — Create your skill, MCP server, or package
2. **Test** — Run it locally in Twent
3. **Package** — Export as ZIP or publish via URL
4. **Submit** — Publish to the Twent Marketplace
5. **Earn** — Revenue share on installs and usage

## Revenue Model

| Revenue Type | Share |
|---|---|
| Skill purchases | 70% to creator |
| MCP server installs | 70% to creator |
| Package downloads | 70% to creator |
| Subscription features | Negotiated |

## Getting Started

```bash
# Create a new skill
mkdir my-skill && cd my-skill
mkdir -p tools workflows assets

# Write the skill definition
cat > SKILL.md << 'EOF'
# Code Review Skill

## Role
You are an expert code reviewer with deep knowledge of:
- Security vulnerabilities (OWASP Top 10)
- Performance anti-patterns
- Code style and maintainability
- Modern language idioms

## How You Work
1. User pastes code or points to a file
2. You analyze for issues
3. You explain each finding with severity
4. You provide corrected code snippets

## Example
User: Review this login code
You: [detailed review with fixes]
EOF

# Test in Twent
# Settings → Packages → Import → select ZIP
# The AI loads the skill and you can test it
```

## Marketplace Categories

- **AI Skills** — Behavior bundles for specific domains
- **MCP Servers** — External tool providers
- **Tool Packages** — JS/TS tool bundles
- **Workflows** — Pre-built automation templates
- **Character Cards** — AI personas and personas

## Discovery

AI agents discover marketplace items through:
- **In-app browsing** — Users browse and search
- **AI recommendations** — "Try the Code Review skill for your next PR"
- **Search engines** — SEO-optimized for AI crawlers (dualmark)
- **Direct URL** — Shareable links for skills and packages

## Related Pages

- [Home](/) — Main landing page
- [Documentation](/docs) — Build with Twent
- [Blog: Marketplace](/blog/marketplace) — What's in the marketplace

## Download & Start Building

Get Twent at https://twent.xyz — direct APK, no Play Store, no credit card.

Then visit the marketplace to start building: Settings → Packages → Marketplace → Create.

