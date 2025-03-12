import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import ShopItems from './pages/Shop';
import { useEffect } from 'react';

const App: React.FC = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/shop' element={<ShopItems/>} />
        <Route path='/wishlist' element={<Wishlist/>}/>
      </Routes>
    </Router>
    )
}

export default App
