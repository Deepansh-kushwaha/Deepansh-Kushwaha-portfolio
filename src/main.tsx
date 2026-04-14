import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
 
    <Router basename={import.meta.env.BASE_URL}>
      <App />
    </Router>

    
  </StrictMode>,
)

// Register Service Worker for Caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Portfolio Cache Ready:', reg.scope))
      .catch(err => console.log('Cache Setup Failed:', err));
  });
}
