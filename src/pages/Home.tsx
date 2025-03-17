import React, { Suspense } from "react";
import { useQuery } from '@tanstack/react-query';

const LoadingSpiner = React.lazy(() => import("@/components/loadingComponent/LoadingSpinner"));
const ProductCart = React.lazy(() => import("../components/carts/Cart"));

interface HomeCartProduct {
  id: number;
  name: string;
  title: string;
  quantity: number;
  isFavorite?: boolean;
  icon?: React.ReactNode;
  price: number;
  image: string;
}

const fetchProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

const Home: React.FC = () => {
  const { data: products, error, isLoading } = useQuery<HomeCartProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <div className="Carts-div">
        {isLoading ? (
          <Suspense fallback={<div>Loading...</div>}>
            <LoadingSpiner />
          </Suspense>
        ) : (
          products?.map((product) => (
            <Suspense key={product.id} fallback={<div>Loading product...</div>}>
              <ProductCart products={product} />
            </Suspense>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;