import { useState, useEffect, useCallback } from "react";

//in the custom hooks, you have to use the word "use" before the name, here for example it is useFetch
//this useFetch custom hook retuns an object consisting of "loading" and "products"
export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    const response = await fetch(url);
    const products = await response.json();
    setProducts(products);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getProducts();
  }, [url, getProducts]);
  return { loading, products };
};
