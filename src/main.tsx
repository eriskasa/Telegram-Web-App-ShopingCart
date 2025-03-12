import React, { useEffect } from 'react';
import ReactDom from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { CartProvider } from './components/carts/CartContext.jsx';

const Root = () => {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      console.log("Telegram WebApp API is available:", window.Telegram.WebApp);
    } else {
      console.error("Telegram WebApp API is not available.");
    }

    const themeParams = window.Telegram?.WebApp?.themeParams || {
      bg_color: '#ffffff', // Fallback background color
      text_color: '#000000', // Fallback text color
    };

    if (document.body) {
    (document.body as HTMLElement).style.backgroundColor = themeParams.bg_color || "#d4d4d4";
      document.body.style.color = themeParams.text_color || "#0d0d0d";
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <WishlistProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </WishlistProvider>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  document.body.innerHTML = "<p>Failed to find the 'root' element.</p>";
} else {
  ReactDom.createRoot(rootElement).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
}