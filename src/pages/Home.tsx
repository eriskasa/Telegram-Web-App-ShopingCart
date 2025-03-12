import { useMemo, useEffect, useState, ReactNode } from "react";
import ProductCart from "../components/carts/Cart";

interface HomeCartProduct {
  id: number,
  name: string,
  title: string,
  quantity: number,
  isFavorite?: boolean,
  icon?: ReactNode,
  price: number,
  image: string,
}

const Home: React.FC = () => {
  const [ products, setProducts ] = useState<HomeCartProduct[]>([]);
  const [ error, setError ]  = useState<string | null>(null); 
   
  const tg = window.Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user || {first_name: "Guest"}
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/products');
          const data = await response.json();
           setProducts(data.map((products: any) => ({...products, isFavorite: false})) as HomeCartProduct[]);
        } catch (error) {
          console.error("Error fetching products", error);
          setError("Faild to fetch products. Please try again later!")
        }
      }
      
      fetchProducts();
    },[]) 

    if (error) {
      return <p>{error}</p>
    }

    const memoizedProducts = useMemo(() => products, [products]);

    console.log('ProductCart re-rendered with products:', products);
    return (
      <div>

      <h1>Hello User, {user?.first_name}!</h1>  
      <div className="Carts-div">
       {memoizedProducts.length === 0 ? (<p>Loading...</p>) : ( memoizedProducts.map((product) => (
         <ProductCart products={product} key={product.id}/>
        ))
      )}
      </div>
    </div>
  );
};

export default Home;