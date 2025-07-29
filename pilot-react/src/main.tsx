import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'devextreme/dist/css/dx.material.blue.light.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
