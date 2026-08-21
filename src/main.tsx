import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import 'drawably/style.css'
import './index.css'
import App from './App'
import { AuthProvider } from './lib/AuthContext'
import { SketchCardProvider } from './components/ui/rough'
import './i18n'

const rootEl = document.getElementById('root')!

// The home page is prerendered at build time (see vite.config.ts
// "prerender-home" plugin + src/entry-server.tsx): when the server HTML
// already contains the rendered app, hydrate it instead of re-rendering
// from scratch — that's what lets the browser paint before JS downloads.
//
// Hydrate ONLY when the current URL is the home route ("/"), which is the
// only route the prerender produced. Deep links (/pricing, /fr, ...) and
// language-prefixed variants re-render client-side: their client output
// can't match the English home HTML, and React would log hydration errors
// (#418) and regenerate the tree anyway.
const pathname = window.location.pathname
const isPrerenderedRoute =
  pathname === '' || pathname === '/' || pathname === '/index.html'

const rootNode = (
  <StrictMode>
    <AuthProvider>
      <App />
      <SketchCardProvider />
    </AuthProvider>
  </StrictMode>
)

if (rootEl.hasChildNodes() && isPrerenderedRoute) {
  hydrateRoot(rootEl, rootNode)
} else {
  createRoot(rootEl).render(rootNode)
}
