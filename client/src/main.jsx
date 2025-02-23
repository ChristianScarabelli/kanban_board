import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'animate.css'
import App from './App.jsx'
import GlobalProvider from './contexts/GlobalContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Uso quì i context per non creare conflitti in App.jsx */}
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
)
