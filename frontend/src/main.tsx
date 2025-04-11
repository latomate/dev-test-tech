import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserContext } from './services/context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContext.Provider value={{ userId: 1, setUserId: () => {} }}>
      <App />
    </UserContext.Provider>
  </StrictMode>,
)
