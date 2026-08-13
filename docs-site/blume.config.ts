import { defineConfig } from "blume";
import { z } from "zod";

export default defineConfig({
  // ── Site ──
  title: "Twent Docs",
  description:
    "Step-by-step guides for Twent AI agent on Android — automate apps, run Ubuntu terminal & connect 1000+ services.",
  logo: "/twent-logo-48.webp",

  // ── GitHub ──
  github: {
    owner: "Unselfisheologism",
    repo: "operit-landing",
    branch: "main",
    dir: "docs-site",
  },

  // ── Content ──
  content: {
    root: "docs",
    types: {
      doc: {
        facets: ["category"],
        frontmatter: {
          category: z.string().optional(),
        },
      },
    },
  },

  // ── Theme ──
  theme: {
    accent: "orange",
    radius: "md",
    mode: "system",
    fonts: {
      display: "inter-tight",
      body: "inter",
      mono: "jetbrains-mono",
    },
  },

  // ── Navigation ──
  navigation: {
    tabs: [
      { label: "Getting Started", path: "/getting-started", icon: "rocket" },
      { label: "Tools", path: "/tools", icon: "wrench" },
      { label: "Advanced", path: "/automation", icon: "zap" },
      { label: "Reference", path: "/more", icon: "book-open" },
    ],
    sidebar: {
      display: "group",
    },
    featured: [
      { label: "Twent Home", href: "https://twent.xyz", icon: "home" },
      { label: "Changelog", href: "/changelog", icon: "git-commit" },
      { label: "GitHub", href: "https://github.com/Unselfisheologism/operit-landing", icon: "github" },
    ],
  },

  // ── Table of contents ──
  toc: {
    minHeadingLevel: 2,
    maxHeadingLevel: 3,
  },

  // ── Markdown ──
  markdown: {
    imageZoom: true,
    headingAnchors: true,
    code: {
      icons: true,
      wrap: false,
    },
    codeBlocks: {
      theme: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },

  // ── Search ──
  search: {
    provider: "orama",
    popular: [
      { href: "/getting-started/installation", icon: "download", label: "Installation" },
      { href: "/tools/overview", icon: "wrench", label: "Tools Overview" },
      { href: "/automation/overview", icon: "zap", label: "Automation" },
      { href: "/chat/overview", icon: "message-circle", label: "Chat" },
    ],
    indexing: {
      includeHiddenPages: false,
    },
  },

  // ── AI ──
  ai: {
    llmsTxt: true,
    webmcp: true,
    ask: {
      enabled: false,
      provider: "gateway",
      model: "openai/gpt-5.5",
      instructions:
        "You are the Twent Docs assistant. Answer only from Twent documentation. If something isn't covered, say so and link to the closest page.",
      suggestions: [
        { label: "How do I install Twent?", icon: "download" },
        { label: "What can Twent automate on Android?", icon: "smartphone" },
        { label: "How do I configure AI providers?", icon: "settings" },
      ],
    },
    mcp: {
      enabled: false,
      route: "/mcp",
      instructions:
        "Use these tools to answer questions about Twent docs. Cite pages when you can.",
    },
  },

  // ── SEO ──
  seo: {
    og: {
      enabled: true,
      palette: {
        accent: "#ff5410",
        background: "#0f0f0f",
        foreground: "#fff6f2",
        muted: "#a6a19f",
        border: "#1f1f1f",
      },
      titles: {
        "/": "Twent Docs",
      },
    },
    rss: {
      enabled: true,
      types: ["blog", "changelog"],
      limit: 50,
    },
    sitemap: true,
    robots: true,
    structuredData: true,
    agentReadability: true,
    contentSignals: {
      search: true,
      aiInput: true,
      aiTrain: true,
    },
    x: {
      handle: "twentapp",
      creator: "twentapp",
    },
  },

  // ── Analytics ──
  analytics: {
    scripts: [
      {
        src: "https://cdn.databuddy.cc/analytics.js",
        strategy: "defer",
        attributes: {
          "data-site": "twent.xyz",
        },
      },
    ],
  },

  // ── Feedback ──
  feedback: true,

  // ── Export ──
  export: {
    pdf: true,
    epub: true,
  },

  // ── Deployment ──
  deployment: {
    site: "https://twent.xyz/docs",
    base: "/docs",
    output: "static",
  },

  // ── Redirects ──
  redirects: [
    { from: "/getting-started", to: "/getting-started/installation", status: 301 },
  ],
});
