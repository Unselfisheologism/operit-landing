import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression2'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // ─── Critical Path Preloads ───────────────────────────────────────────────
    // Inject modulepreload for the main entry JS right before the closing </head>.
    // Reads the already-built dist/index.html (from the PREVIOUS build run)
    // and patches it to add preloads. On first run this is a no-op.
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'critical-preloads',
      apply: 'build',
      enforce: 'post',
      async writeBundle() {
        const htmlPath = path.join(__dirname, 'dist', 'index.html')
        try {
          let html = readFileSync(htmlPath, 'utf-8')

          // Remove the Rollup-injected blocking <link rel="stylesheet"> tag.
          // Our non-blocking preload is already in <head> — this duplicate causes
          // a render-blocking CSS request that delays LCP.
          // It looks like:   <link rel="stylesheet" crossorigin href="/assets/index-XXXX.css">
          html = html.replace(
            /\n    <link rel="stylesheet" crossorigin href="\/assets\/index-[^"]+\.css">/,
            '',
          )

          // Skip if already patched
          if (html.includes('Critical path preloads')) return

          const entryJs = html.match(/src="(\/assets\/index-[^"]+\.js)"/)?.[1] ?? ''

          const criticalPreloads = [
            entryJs
              ? `    <link rel="modulepreload" crossorigin href="${entryJs}">`
              : '',
            // CSS is now inlined as critical CSS in index.html — skip duplicate preload injection
          ]
            .filter(Boolean)
            .join('\n')

          if (!criticalPreloads) return

          // Inject before </head> — handle both CRLF and LF line endings
          html = html.replace(
            /<\/head>/,
            `${criticalPreloads}
  </head>`,
          )

          writeFileSync(htmlPath, html, 'utf-8')
          console.log('[critical-preloads] Injected critical path preloads')
        } catch (err) {
          // No-op on first build before dist/index.html exists
        }
      },
    },

    // ─── GZIP + Brotli Pre-compression ───────────────────────────────────────
    compression({
      algorithms: ['gzip', 'brotliCompress'],
      threshold: 1024,
      deleteOriginalAssets: false,
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

  // ─── Vendor Chunk Separation ───────────────────────────────────────────────
  // Split vendor libs into separate chunks so they load in parallel with
  // the app shell, not sequentially after it. Reduces critical path latency.
  // ─────────────────────────────────────────────────────────────────────────
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) {
            return 'vendor-i18n'
          }
          if (id.includes('node_modules/@databuddy')) {
            return 'vendor-databuddy'
          }
          if (id.includes('node_modules/@radix-ui')) {
            return 'vendor-radix'
          }
        },
      },
    },
  },
})