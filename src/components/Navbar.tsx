import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Logo from './logo.svg';
import HomeIcon from '../assets/navbarimages/home.svg?react';
import  CartIcon  from '../assets/navbarimages/cart.svg?react';
import  WishlistIcon from '../assets/navbarimages/wishlist.svg?react';
import { useContext } from "react";
import { CartContext } from "./carts/CartContext";



const Navbar = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Navbar must be used within a CartProvider")
  }

  const { totalItems } = context;
  return (
    <nav className="navbar">
      <Link to='/'>
      <img src={Logo} alt="logo" className="logo" />
      </Link>
      <ul>
        <li>
          <NavLink to="/">
          <HomeIcon className='Icons'  width='24px' height='24px'/>
           Home</NavLink>
        </li>
        <li>
            <NavLink to="shop">
            <CartIcon className='Icons'  width='24px' height='24px'/>
            {totalItems > 0 && <span className="nav-totalitems" >({totalItems})</span>}
            Shop Cart</NavLink>
        </li>
        <li>
          <NavLink to="wishlist">
          <WishlistIcon className='Icons'   width='24px' height='24px'/>
          Wishlist</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;