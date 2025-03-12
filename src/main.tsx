
import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CartProvider } from './components/carts/CartContext.jsx'

if (!window.Telegram?.WebApp) {
  console.error("Telegram WebApp API is not available.")
} else {
  console.error("Telegram WebApp API is available.", window.Telegram.WebApp);
}

const themeParams = window.Telegram?.WebApp?.themeParams || {
  bg_color: '#ffffff', // Fallback background color
  text_color: '#000000', // Fallback text color
};

(document.body as HTMLElement).style.backgroundColor = themeParams.bg_color || '#ffffff'; 
(document.body as HTMLElement).style.color = themeParams.text_color || '#000000';

const rootElement = document.getElementById('root');
if (!rootElement) {
  document.body.innerHTML = "<p>Faild to find the 'root' element. </p>"
} else {
  
  
  ReactDom.createRoot(rootElement).render(
  
    <React.StrictMode>
    <WishlistProvider>
    <CartProvider>
        <App/>
    </CartProvider>
    </WishlistProvider>
  </React.StrictMode>
)
}
