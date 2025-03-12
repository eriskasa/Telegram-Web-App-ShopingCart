
import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CartProvider } from './components/carts/CartContext.jsx'


const themeParams: { bg_color?: string; text_color?: string} = 
window.Telegram?.WebApp?.themeParams || {};

document.body.style.backgroundColor = themeParams.bg_color || '#ffffff';
document.body.style.color = themeParams.text_color || '#000000';

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
