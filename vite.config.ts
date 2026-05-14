import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression2'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

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
