import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ProductContainer from "./components/ProductContainer";
import ShoppingCart from "./components/ShoppingCart";
import ProductPage from "./components/ProductPage";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./components/Login";
import { useDispatch } from "react-redux";
import { ITEMS } from "./features/cartActions";
import { useEffect } from "react";

function App() {
  let dispatch = useDispatch();
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((json) => {
        const formattedData = json.map((item) => ({
          id: item.id,
          image: item.image,
          description: item.description,
          title: item.title,
          price: item.price,
          category: item.category,
        }));
        dispatch(ITEMS(formattedData));
        console.log("hello");
      });
  }, [dispatch]);

  return (
    <div className="w-auto h-[100%] bg-slate-400 flex flex-col">
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ProductContainer />
            </>
          }
        />
        <Route path="/products" element={<ProductContainer />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/productpage/:title" element={<ProductPage />} />
        <Route path="*" element={<div>Hello</div>} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
