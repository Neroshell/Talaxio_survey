import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ContextStep from './components/ContextStep.tsx'

createRoot(document.getElementById('root')!).render(

  
  <StrictMode>
    <ContextStep>
      <App />
    </ContextStep>
  </StrictMode>
 ,
)
