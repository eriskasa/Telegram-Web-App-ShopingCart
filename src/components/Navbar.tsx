import { useState } from "react"; // Add this import
import Logo from './logo.svg';
import HomeIcon from '../assets/navbarimages/home.svg?react';
import CartIcon from '../assets/navbarimages/cart.svg?react';
import WishlistIcon from '../assets/navbarimages/wishlist.svg?react';
import { useContext } from "react";
import { CartContext } from "./carts/CartContext";

interface NavbarProps {
  setCurrentPage: (page: 'home' | 'shop' | 'wishlist') => void;
}

const Navbar: React.FC<NavbarProps> = ({setCurrentPage}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Navbar must be used within a CartProvider");
  }
  const { totalItems } = context;


  return (
    <nav className="navbar">
      <div onClick={() => setCurrentPage('home')}>
        <img src={Logo} alt="logo" className="logo" />
      </div>

      {/* Hamburger Button */}
      <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>

      {/* Navigation Menu */}
      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li onClick={() => setIsMenuOpen(false)}>
          <div  onClick={() => setCurrentPage('home')}>
            <HomeIcon className='Icons' width='24px' height='24px' />
            Home
          </div>
        </li>
        <li onClick={() => setIsMenuOpen(false)}>
          <div onClick={() => setCurrentPage('shop')}>
            <CartIcon className='Icons' width='24px' height='24px' />
            {totalItems > 0 && <span className="nav-totalitems">({totalItems})</span>}
            Shop Cart
          </div>
        </li>
        <li onClick={() => setIsMenuOpen(false)}>
          <div onClick={() => setCurrentPage('wishlist')}>
            <WishlistIcon className='Icons' width='24px' height='24px' />
            Wishlist
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;