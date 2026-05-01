import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // ─── GZIP + Brotli Pre-compression ───────────────────────────────────────
    // Generates .gz and .br files alongside originals.
    // Cloudflare Pages serves these directly — no on-the-fly recompression.
    // Covers: JS, CSS, HTML, JSON, SVG (anything text-based).
    // ─────────────────────────────────────────────────────────────────────────

    // GZIP: max compression, threshold 1KB (1024 bytes)
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      verbose: true,
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html|svg|xml|txt)$/i,
    }),

    // Brotli: better ratio than gzip, same threshold
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      verbose: true,
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html|svg|xml|txt)$/i,
    }),
  ],
})
