
import React from 'react'
import ReactDom from 'react-dom/client'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CartProvider } from './components/carts/CartContext.jsx'
import { Suspense } from 'react'
import LoadingSpiner from './components/loadingComponent/LoadingSpinner'

const App = React.lazy(() => import('./App'))

const rootElement = document.getElementById('root');
if (!rootElement) {
  document.body.innerHTML = "<p>Faild to find the 'root' element. </p>"
} else {
  
  
  ReactDom.createRoot(rootElement).render(
  
    <React.StrictMode>
      <Suspense fallback={<LoadingSpiner/>}>
    <WishlistProvider>
    <CartProvider>
        <App/>
    </CartProvider>
    </WishlistProvider>
      </Suspense>
  </React.StrictMode>
)
}
