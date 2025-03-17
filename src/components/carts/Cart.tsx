import  { useContext, useState , ReactNode, useMemo, useCallback} from "react";
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

  const isFavorite = useMemo(() => wishlist.some((item) => item.id === products.id),[wishlist, products.id]
  ); 

  const handleFavoriteToogle = useCallback(() => {
    if (isFavorite) {
      removeFromWishlist(products.id);
    } else {
      addToWishList(products)}
  },[isFavorite, products, removeFromWishlist, addToWishList]);

  const handleIcremenet = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
    }
  },[quantity]);

  const handleDecrement = useCallback(() => {
    if (quantity < 9) {
      setQuantity(quantity + 1);
    }
  },[quantity]);

  const handleAddToCart = useCallback(() => {
    if (quantity > 0) {
      addToCart(products, quantity)
      setQuantity(1);
    }
  },[addToCart, quantity, products]);

  const truncadedTitle = useMemo(() => 
  products.title.length > 25 ? products.title.slice(0, 25) + "..." : products.title,
  [products.title]);

  return (
    <div className="CartComponent">
      <div>
        <div className="title-favorite-div">
          <h3 className="title-text">{truncadedTitle}</h3>
          <FavoriteButton isFavorite={isFavorite} onToggleFavorite={handleFavoriteToogle} />
        </div>
      <img src={products.image} 
      width="250" 
      height="250" 
      loading="lazy"
      style={{paddingBottom: "1rem", paddingTop: "1rem"}} 
      alt={products.title} />
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