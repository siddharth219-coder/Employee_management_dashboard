import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "./index.css"
import { SettingsProvider } from "./context/SettingsContext";
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Provider } from "react-redux";
import { store } from "./app/store";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <SettingsProvider>
              <App />
          </SettingsProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
