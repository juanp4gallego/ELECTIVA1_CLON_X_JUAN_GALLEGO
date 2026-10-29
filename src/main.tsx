import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { BaseRouter } from './routes/BaseRouter';
import { AuthProvider } from './auth/contexts/AuthProvider';

createRoot(document.getElementById('root')!).render(
 <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BaseRouter />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
