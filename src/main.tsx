import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router'

import Stairs from './components/Stairs.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
 
    <Router basename={import.meta.env.BASE_URL}>
       <Stairs >
         <App />
       </ Stairs>
    </Router>
    
  </StrictMode>,
)
