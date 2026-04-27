import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Databuddy } from '@databuddy/sdk/react'

// Font imports
import '@fontsource-variable/inter'
import '@fontsource/saira-condensed/500.css'
import '@fontsource/special-elite'
import '@fontsource/swanky-and-moo-moo'

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
