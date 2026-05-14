import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Databuddy } from '@databuddy/sdk/react'

// Font imports
import '@fontsource-variable/inter'

// i18n imports
import './i18n'

import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Databuddy
      clientId={import.meta.env.VITE_DATABUDDY_CLIENT_ID}
      trackWebVitals
      trackErrors
      trackHashChanges
    />
    <App />
  </StrictMode>,
)

// Deferred CalivePixel font — unblocks CSS parse on critical path (was 1,146ms bottleneck)
// Load after first paint so it doesn't block LCP
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => loadCalivePixel())
} else {
  setTimeout(loadCalivePixel, 200)
}

function loadCalivePixel() {
  const style = document.createElement('style')
  style.textContent = `
    @font-face {
      font-family: "Calive Pixel";
      src: url("/CalivepixelRegularDemo-OG8p8.otf") format("opentype");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
  `
  document.head.appendChild(style)
}
