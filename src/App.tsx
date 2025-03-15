import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import React from 'react';
import ShopItems from './pages/Shop';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';

// const ShopingItems = React.lazy(() => import('./pages/Shop'))
// const WishList = React.lazy(() => import('./pages/Wishlist')) 
// const Home = React.lazy(() => import('./pages/Home'))

const App: React.FC = () => {
  const tg = window.Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user || { first_name: 'Guest' };
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'wishlist'>('home');

  useEffect(() => {
    if (tg) {
      tg.ready(); // Notify Telegram that the app is ready
      tg.expand(); // Expand the app to full screen
    }
  }, [tg]);

  return (
    <div>
      {!tg && <p>This app is designed for Telegram. Open it in Telegram for the best experience.</p>}
      <Navbar setCurrentPage={setCurrentPage} />
      <h3 style={{textAlign: 'center'}}>Hello, {user.first_name}!</h3>
      {currentPage === 'home' && <Home />}
      {currentPage === 'shop' && <ShopItems />}
      {currentPage === 'wishlist' && <Wishlist />}
    </div>
  );
};

export default App;