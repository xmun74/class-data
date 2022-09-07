import React, { useState } from "react";
import Nav from "./components/Nav";
import ItemListContainer from "./pages/ItemListContainer";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingCart from "./pages/ShoppingCart";
import { initialState } from "./assets/state";

function App() {
  const [items, setItems] = useState(initialState.items);
  const [cartItems, setCartItems] = useState(initialState.cartItems);

  return (
    <Router>
      <Nav cartItems={cartItems} />
      <Routes>
        <Route
          path="/"
          element={
            <ItemListContainer
              items={items}
              setCartItems={setCartItems}
              cartItems={cartItems}
            />
          }
        />
        <Route
          path="/shoppingcart"
          element={
            <ShoppingCart
              cartItems={cartItems}
              items={items}
              setCartItems={setCartItems}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
