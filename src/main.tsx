
import React from 'react'
import ReactDom from 'react-dom/client'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CartProvider } from './components/carts/CartContext.jsx'
import { Suspense } from 'react'
import LoadingSpiner from './components/loadingComponent/LoadingSpinner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryCliet = new QueryClient();
const App = React.lazy(() => import('./App'))

const rootElement = document.getElementById('root');
if (!rootElement) {
  document.body.innerHTML = "<p>Faild to find the 'root' element. </p>"
} else {
  
  
  ReactDom.createRoot(rootElement).render(
  
    <React.StrictMode>
      <Suspense fallback={<LoadingSpiner/>}>
      <QueryClientProvider client={queryCliet}>
    <WishlistProvider>
    <CartProvider>
        <App/>
    </CartProvider>
    </WishlistProvider>
      </QueryClientProvider>
      </Suspense>
  </React.StrictMode>
)
}
