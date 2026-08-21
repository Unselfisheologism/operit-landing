import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'drawably/style.css'
import './index.css'
import App from './App'
import { AuthProvider } from './lib/AuthContext'
import './i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
