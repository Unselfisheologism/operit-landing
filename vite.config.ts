import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression2'
import { readFileSync, writeFileSync } from 'fs'
import { gzipSync, brotliCompressSync } from 'zlib'
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

          // Skip if already patched
          if (html.includes('Critical path preloads')) return

          const entryJs = html.match(/src="(\/assets\/index-[^"]+\.js)"/)?.[1] ?? ''
          const entryCss = html.match(/href="(\/assets\/index-[^"]+\.css)"/)?.[1] ?? ''

          const criticalPreloads = [
            entryJs
              ? `    <link rel="modulepreload" crossorigin href="${entryJs}" />`
              : '',
            entryCss
              ? `    <link rel="preload" as="style" crossorigin href="${entryCss}" />`
              : '',
          ]
            .filter(Boolean)
            .join('\n')

          if (!criticalPreloads) return

          // Inject before </head> — handle both CRLF and LF line endings
          html = html.replace(
            /<\/head>/,
            `${criticalPreloads}\n  </head>`,
          )

          writeFileSync(htmlPath, html, 'utf-8')
          console.log('[critical-preloads] Injected critical path preloads (CSS preload, NOT stripped)')
        } catch (err) {
          // No-op on first build before dist/index.html exists
        }
      },
    },

    // ─── Docs Scroll Progress Auto-Injection ────────────────────────────────────
    // Ensures all current and future /docs pages automatically include the
    // scroll-progress widget by injecting the shared script into every docs
    // HTML file at build time.
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'docs-scroll-progress',
      apply: 'build',
      enforce: 'post',
      async writeBundle() {
        const tag = '<script defer src="/docs/scroll-progress.js"></script>'
        const docsDir = path.join(__dirname, 'dist', 'docs')
        const fs = await import('fs')
        if (!fs.existsSync(docsDir)) return

        const htmlFiles = []
        const walk = (dir) => {
          for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name)
            if (entry.isDirectory()) walk(full)
            else if (entry.isFile() && entry.name === 'index.html') htmlFiles.push(full)
          }
        }
        walk(docsDir)

        let count = 0
        for (const htmlPath of htmlFiles) {
          let html = readFileSync(htmlPath, 'utf-8')
          if (!html.includes(tag)) {
            html = html.replace(/<\/body>/i, `${tag}\n</body>`)
            writeFileSync(htmlPath, html, 'utf-8')
            count++
          }
        }

        if (count > 0) {
          console.log(`[docs-scroll-progress] Injected scroll-progress script into ${count} docs pages`)
        }
      },
    },

    // ─── GZIP + Brotli Pre-compression
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

    // ─── Home Page Prerender ──────────────────────────────────────────────────
    // Renders the home route to static HTML at build time (SSG) and injects it
    // into <div id="root"> in dist/index.html. The browser can then paint the
    // nav + hero instantly — no JS download needed for first paint — and the
    // client hydrates over it (see main.tsx). This collapses the LCP "element
    // render delay" that a pure client-side SPA suffers.
    //
    // MUST run after the compression plugin (registered above): index.html is
    // re-compressed here because we rewrite it after compression ran.
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'prerender-home',
      apply: 'build',
      enforce: 'post',
      async writeBundle() {
        const htmlPath = path.join(__dirname, 'dist', 'index.html')
        let page: string
        try {
          page = readFileSync(htmlPath, 'utf-8')
          // Skip if already prerendered
          if (page.includes('data-prerendered="true"')) return
        } catch {
          return // no dist/index.html yet — nothing to patch
        }

        const { createServer } = await import('vite')
        const server = await createServer({
          server: { middlewareMode: true },
          appType: 'custom',
          logLevel: 'error',
        })
        try {
          const { renderHome } = await server.ssrLoadModule('/src/entry-server.tsx')
          const body = await renderHome()

          // Inject the prerendered DOM into the root div
          page = page.replace(
            '<div id="root"></div>',
            `<div id="root" data-prerendered="true">${body}</div>`,
          )
          // Force dark theme on the <html> element so the pre-hydration paint
          // matches the app's default (One Dark) theme.
          page = page.replace(
            '<html lang="en">',
            '<html lang="en" class="dark">',
          )

          writeFileSync(htmlPath, page, 'utf-8')
          // Re-compress: index.html changed after vite-plugin-compression2 ran
          writeFileSync(htmlPath + '.gz', gzipSync(page))
          writeFileSync(htmlPath + '.br', brotliCompressSync(page))
          console.log(
            `[prerender-home] Injected ${body.length} chars of HTML into dist/index.html`,
          )
        } finally {
          await server.close()
        }
      },
    },
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