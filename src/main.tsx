import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "./index.css"
import { EmployeeProvider } from './context/EmployeeContext'
import { SettingsProvider } from "./context/SettingsContext";
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <EmployeeProvider>
            <App />
          </EmployeeProvider>
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
