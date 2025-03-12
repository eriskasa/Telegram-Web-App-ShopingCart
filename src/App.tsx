import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import ShopItems from './pages/Shop';
import { useEffect, useState } from 'react';


const App: React.FC = () => {
  const tg = window.Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user || { first_name: 'Guest' };
  const [ currentPage, setCurrentPage ] = useState<'home' | 'shop' | 'wishlist'>('home');

  useEffect(() => {
      if (tg) {
        tg.ready();
        tg.expand();
      }
   },[tg]);


  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage}/> 
      {currentPage  === 'home' && <Home/>}
      {currentPage === 'shop' && <ShopItems/>}
      {currentPage === 'wishlist' && <Wishlist/>}
    </div>
    );
};

export default App
