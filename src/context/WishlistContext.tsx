
import React, { createContext, useEffect, useState, ReactNode } from 'react';

interface MyWishlistCartContent {
  id: number,
  name: string,
  title: string,
  quantity: number,
  image: string,  
  price: number,
}

interface MyWishListContextType {
  wishlist: MyWishlistCartContent[];
  addToWishList: (item: MyWishlistCartContent)  => void;
  removeFromWishlist: (itemId: number) =>  void;
}

export const WishlistContext  = createContext<MyWishListContextType | null>(null);

interface WishListPropsProvider {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishListPropsProvider> = ({ children }) => {
  const [wishlist, setWishlist] = useState<MyWishlistCartContent[]>([]);

  // load wishlist from localstorage  on initial render
  useEffect(() => {
    const saveWishlist = localStorage.getItem('wishlist');
    if (saveWishlist) {
      try {
        const parsedWishlist: MyWishlistCartContent[] = JSON.parse(saveWishlist);
        setWishlist(parsedWishlist);
      } catch (error) {
        console.log("Error passing wishlist to localSoreage",error);
        setWishlist([]);
      }
    }
  }, [])

  // save wishlist to localstorage whnever changes it 
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist)); 
  },[wishlist])

  const addToWishList = (item: MyWishlistCartContent) => {
    setWishlist((prev) => {
      if (!prev.some((prevItem) => prevItem.id === item.id)) {
        return [...prev, item]
      }
      return prev;
    }); // Add item to wishlist
  };

  const removeFromWishlist = (itemId: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== itemId)); // Remove item from wishlist
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishList, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
