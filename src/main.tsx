import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Font imports
import '@fontsource-variable/inter'
import '@fontsource/saira-condensed/500.css'
import '@fontsource/special-elite'
import '@fontsource/swanky-and-moo-moo'

import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
