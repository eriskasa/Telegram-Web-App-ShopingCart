import  { useContext, useState , ReactNode} from "react";
import './Cart.css';
import Button from "../buttons/Buttons";
import CartIcon from '../../assets/navbarimages/cart.svg?react';
import FavoriteButton from "../buttons/FavoriteButton";
import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "./CartContext";

interface ProductType {
  id: number,
  name: string,
  title: string,
  quantity: number,
  image: string,
  price: number,
}

interface ProductsCartProps {
  products: ProductType;
}

const ProductCart = ({ products }: ProductsCartProps ) => {

  const wishlistContext = useContext(WishlistContext);
  const cartContext = useContext(CartContext);

  if (!wishlistContext || !cartContext) {
    throw new Error("ProductCart must be used with a Providers")
  }

  const { wishlist, addToWishList, removeFromWishlist } = wishlistContext;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = cartContext;

  const isFavorite = wishlist.some((item) => item.id === products.id);

  const handleFavoriteToogle = () => {
    console.log('Toggling Favorite for:', products.id); // Debug: Log the product ID being toggled
    if (isFavorite) {
      console.log('Removing from Wishlist:', products.id); // Debug: Log removal
      removeFromWishlist(products.id); // Remove from wishlist if already favorited
    } else {
      console.log('Adding to Wishlist:', products); // Debug: Log addition
      addToWishList(products); // Add to wishlist if not favorited
    }
  };

  const handleIcremenet = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
    }
  };

  const handleDecrement = () => {
    if (quantity < 9) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(products, quantity)
      setQuantity(1);
    }
  }

  return (
    <div className="CartComponent">
      <img src={products.image} width="250px" height="250x" alt={products.title} />
      <div>
        <div className="title-favorite-div">
          <h3>{products.title.length > 25 ? products.title.slice(0, 25) + "..." : products.title}</h3>
          <FavoriteButton isFavorite={isFavorite} onToggleFavorite={handleFavoriteToogle} />
        </div>
        <div className="quantitySection">
          <button disabled={quantity === 1} onClick={handleIcremenet}> - </button>
          <input value={quantity} disabled />
          <button disabled={quantity === 9} onClick={handleDecrement}> + </button>
          <div>
            <h3>{`$${products.price}`}</h3>
          </div>
        </div>
        <Button onClick={handleAddToCart} variant="primary" icon={<CartIcon width="24px" height="24px" />}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};


export default ProductCart;