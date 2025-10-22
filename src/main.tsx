import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore: CSS module import
import './index.css'
import App from './App.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)