import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "./index.css"
import { EmployeeProvider } from './context/EmployeeContext'
import { SettingsProvider } from "./context/SettingsContext";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </SettingsProvider>
  </StrictMode>,
)
