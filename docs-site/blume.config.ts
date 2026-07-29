import { defineConfig } from "blume";

export default defineConfig({
  // ── Site ──
  title: "Twent Docs",
  description:
    "Step-by-step guides for Twent AI agent on Android — automate apps, run Ubuntu terminal & connect 1000+ services.",
  logo: "/twent-logo-48.webp",

  // ── Content ──
  content: {
    root: "docs",
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
  },

  // ── Search ──
  search: {
    provider: "orama",
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

  // ── AI ──
  ai: {
    llmsTxt: true,
  },

  // ── SEO ──
  seo: {
    og: { enabled: true },
    rss: { enabled: false },
    sitemap: true,
    robots: true,
  },

  // ── Export ──
  export: {
    pdf: true,
    epub: true,
  },

  // ── Deployment ──
  deployment: {
    site: "https://twent.xyz",
    base: "/docs",
  },
});
