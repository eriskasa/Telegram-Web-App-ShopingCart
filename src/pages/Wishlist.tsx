import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import ProductCart from "../components/carts/Cart";
import '../index.css'

const Wishlist = () => {
  const wishlistContext = useContext(WishlistContext);

  if (!wishlistContext) {
    throw new Error("WishlistPage must be used with a wishlistProvider")
  }
  const { wishlist } = wishlistContext;

  return (
    <div className="wishlist-cart">
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div  className="Carts-div">
          {wishlist.map((item) => (
            <ProductCart products={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;