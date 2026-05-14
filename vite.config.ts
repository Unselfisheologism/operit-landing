import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression2'

// ─── Plugin: Non-blocking CSS via JS injection ───────────────────────────────
// Vite auto-injects <link rel="stylesheet"> for each CSS chunk at end of <head>.
// This blocks rendering (~330ms delay on twent.xyz). We strip those links and
// inject them via a tiny inline script that fires AS SOON as the body parser
// sees it — before any JS framework boots, and without blocking HTML parsing.
//
// NOTE: We intentionally do NOT use rel="preload" as="style" + onload trick.
// That approach doesn't actually apply the stylesheet in many browser scenarios.
// The inline JS approach is the only reliable non-blocking pattern.
// ─────────────────────────────────────────────────────────────────────────────
function nonBlockingCss() {
  return {
    name: 'non-blocking-css',
    enforce: 'post' as const,
    transformIndexHtml(html: string) {
      // Find all blocking CSS links Vite injected (end of head, before </head>)
      // and replace them with inline script that injects them non-blocking
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]*\.css)">\s*/g,
        (_, href) =>
          `<script>!function(){var l=document.createElement('link');l.rel='stylesheet';l.href='${href}';document.head.appendChild(l)}();</script>`
      )
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nonBlockingCss(),

    // ─── GZIP + Brotli Pre-compression ───────────────────────────────────────
    // Generates .gz and .br files alongside originals.
    // Cloudflare Pages serves these directly — no on-the-fly recompression.
    // Covers: JS, CSS, HTML, JSON, SVG, XML, TXT (anything text-based).
    // ─────────────────────────────────────────────────────────────────────────
    compression({
      algorithms: [
        'gzip',
        'brotliCompress',
      ],
      // Compress text-based assets ≥ 1KB
      threshold: 1024,
      // Keep originals so Cloudflare can choose best format per client
      deleteOriginalAssets: false,
      // Filter: JS bundles, CSS, HTML, SVGs, sitemaps, llms.txt
      include: [
        /\.js$/,
        /\.mjs$/,
        /\.css$/,
        /\.html$/,
        /\.svg$/,
        /\.xml$/,
        /\.txt$/,
        /\.json$/,
      ],
      logLevel: 'info',
    }),
  ],
})
