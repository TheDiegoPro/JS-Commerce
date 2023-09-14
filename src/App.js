import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  // Llama a la API para obtener la lista de productos
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  // Llama a la API para obtener el carrito
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  // // Agrega un producto al carrito
  // const handleAddToCart = async (productId, quantity) => {
  //   const { cart } = await commerce.cart.add(productId, quantity);
  //   setCart(cart);
  // };

  //// Agrega un producto al carrito
  const handleAddToCart = async (productId, quantity) => {
    setCart(await commerce.cart.add(productId, quantity));
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    setCart(await commerce.cart.update(productId, { quantity }));

    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    setCart(await commerce.cart.remove(productId));

    setCart(cart);
  };

  const handleEmptyCart = async () => {
    setCart(await commerce.cart.empty());

    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  //console.log(cart);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          />

          <Route exact path="/checkout" element={<Checkout cart = { cart }/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
