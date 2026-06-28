import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { useAuthStore } from './store/authStore.js'
import './index.css'
import App from './App.jsx'

useAuthStore.getState().initializeAuth();

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </StrictMode>
)
