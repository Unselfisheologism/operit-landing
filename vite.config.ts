import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression2'

// ─── Plugin: Remove Vite-injected blocking CSS link ─────────────────────────
// Vite automatically injects <link rel="stylesheet"> for each CSS chunk at the
// end of <head>. This blocks rendering for ~330ms per stylesheet. This plugin
// strips those injected links — the non-blocking preload in index.html (via
// rel="preload" as="style" onload trick) handles CSS loading without blocking.
// ─────────────────────────────────────────────────────────────────────────────
function removeBlockingCssLinks() {
  return {
    name: 'remove-blocking-css-links',
    enforce: 'post' as const,
    transformIndexHtml(html: string) {
      // Remove all Vite-injected blocking <link rel="stylesheet"> for .css assets
      return html.replace(
        /<link rel="stylesheet" crossorigin href="\/assets\/[^"]*\.css">\s*/g,
        ''
      )
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    removeBlockingCssLinks(),

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
