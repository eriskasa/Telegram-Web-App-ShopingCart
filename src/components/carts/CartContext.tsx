import { createContext, useState, useEffect, ReactNode } from 'react';

interface MyCartContextType {
  id: number,
  name: string,
  title: string,
  quantity: number,
  image: string,
  price: number,
}

interface CartContentType {
  cart: MyCartContextType[];
  addToCart: (product: MyCartContextType, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
  Checkout: () => void;
  totalItems: number;
}

export const CartContext = createContext<CartContentType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [ cart, setCart ] = useState<MyCartContextType[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      try {
        const parsedCart: MyCartContextType[] = JSON.parse(savedCart)
        setCart(parsedCart);
      } catch (error) {
        console.log('Error parsing cart from localstorage', error);
        setCart([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

    // Add a product to the cart
    const addToCart = (product: MyCartContextType, quantity: number) => {
      setCart((prev) => {
        const existingItem = prev.find((item) => item.id === product.id);
        if (existingItem) {
          // If the item already exists, update the quantity
          return prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          // If the item doesn't exist, add it to the cart
          return [...prev, { ...product, quantity }];
        }
      });
    };
  
    // Remove a product from the cart
    const removeFromCart = (itemId: number) => {
      setCart((prev) => prev.filter((item) => item.id !== itemId));
    };
 
    const Checkout = () => {
      setCart([]);
    }
    // Calculate the total number of items in the cart
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems, Checkout }}>
        {children}
      </CartContext.Provider>
    );
}