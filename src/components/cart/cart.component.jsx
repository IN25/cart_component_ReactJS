import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useFetch } from "../useFetch/useFetch.component";
import "../../index.css";

const url = "https://course-api.com/javascript-store-products";


const Cart = () => {
  const { products } = useFetch(url);
  const [cart, setCart] = useState(0);

  //we use the useCallBack() hook and add a dependency array [cart] to tell React to create addToCart function only when cart value is changed to avoid re-render in React.memo()
  const addToCart = useCallback(() => {
    setCart(cart + 1);
  }, [cart]);


  return (
    <>
      <h1 style={{ marginTop: "3rem" }}>cart : {cart}</h1>
      {/* <h1>Most expensive : ${mostExpensive}</h1> */}
      <BigList products={products} addToCart={addToCart} />
    </>
  );
};

//we use React.memo() for optimization, which is optional in React (because React is fast by default) to tell React to check whether "products" object has been changed after the first render or not. If it did not change, there is not going to be a re-render when setCount is called (in our case, products does not change because when we invoke setCount, it only increments count, and triggers re-render)
const BigList = React.memo(({ products, addToCart }) => {
  useEffect(() => {
    console.log("big list called");
  });

  return (
    <section className="products">
      {products.map((product) => {
        return (
          <SingleProduct
            key={product.id}
            {...product}
            addToCart={addToCart}
          ></SingleProduct>
        );
      })}
    </section>
  );
});

const SingleProduct = ({ fields, addToCart }) => {
  useEffect(() => {
    console.log("single product called");
  });

  let { name, price } = fields;
  price = price / 100;
  const image = fields.image[0].url;

  return (
    <article className="product">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <button onClick={addToCart}>add to cart</button>
    </article>
  );
};
export default Cart;
