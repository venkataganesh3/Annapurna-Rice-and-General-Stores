import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Needed for dropdown toggle
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';
import CartProvider from './context/CartProvider';
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <CartProvider>
            <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
