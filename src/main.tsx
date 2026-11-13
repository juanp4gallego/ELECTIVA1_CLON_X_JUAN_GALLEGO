import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ClonApp } from './ClonApp';
import { AuthProvider } from './auth/contexts/AuthProvider';

createRoot(document.getElementById('root')!).render(
 <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ClonApp />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

