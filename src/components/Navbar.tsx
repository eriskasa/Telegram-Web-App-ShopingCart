import { useState } from "react"; // Add this import
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Logo from './logo.svg';
import HomeIcon from '../assets/navbarimages/home.svg?react';
import CartIcon from '../assets/navbarimages/cart.svg?react';
import WishlistIcon from '../assets/navbarimages/wishlist.svg?react';
import { useContext } from "react";
import { CartContext } from "./carts/CartContext";

const Navbar = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Navbar must be used within a CartProvider");
  }

  const { totalItems } = context;
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  return (
    <nav className="navbar">
      <Link to='/'>
        <img src={Logo} alt="logo" className="logo" />
      </Link>

      {/* Hamburger Button */}
      <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>

      {/* Navigation Menu */}
      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
            <HomeIcon className='Icons' width='24px' height='24px' />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="shop" onClick={() => setIsMenuOpen(false)}>
            <CartIcon className='Icons' width='24px' height='24px' />
            {totalItems > 0 && <span className="nav-totalitems">({totalItems})</span>}
            Shop Cart
          </NavLink>
        </li>
        <li>
          <NavLink to="wishlist" onClick={() => setIsMenuOpen(false)}>
            <WishlistIcon className='Icons' width='24px' height='24px' />
            Wishlist
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;