import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import ShopItems from './pages/Shop';
import { useEffect, useState } from 'react';

const App: React.FC = () => {
  const tg = window.Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user || { first_name: 'Guest' };
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'wishlist'>('home');

  useEffect(() => {
    if (tg) {
      tg.ready(); // Notify Telegram that the app is ready
      tg.expand(); // Expand the app to full screen
      console.log('Telegram Web App initialized');
      console.log('initDataUnsafe:', tg.initDataUnsafe); // Log all data
      console.log('User:', tg.initDataUnsafe.user); // Log user data
    }
  }, [tg]);

  return (
    <div>
      <h1>Hello, {user.first_name}!</h1>
      {!tg && <p>This app is designed for Telegram. Open it in Telegram for the best experience.</p>}
      <Navbar setCurrentPage={setCurrentPage} />
      {currentPage === 'home' && <Home />}
      {currentPage === 'shop' && <ShopItems />}
      {currentPage === 'wishlist' && <Wishlist />}
    </div>
  );
};

export default App;