import "./App.css";
import React, { useEffect, useState, useContext } from "react";
import Header from "./components/Header";
import Home from "./components/categories/Home";
import ProductsPage from "./components/categories/ProductsPage";
import About from "./components/categories/About";
import Contact from "./components/categories/Contact";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";
import ProductPage from "./components/ProductPage";

export const cart = React.createContext();
export const categories = React.createContext();
export const overlay = React.createContext();

const ProductsRoutes = () =>
  useRoutes([
    { path: "/mens", element: <ProductsPage></ProductsPage> },
    { path: "/womens", element: <ProductsPage></ProductsPage> },
    { path: "/about", element: <About></About> },
    { path: "/contact", element: <Contact></Contact> },
    { path: "/", element: <Home></Home> },
    { path: "/product/:title", element: <ProductPage></ProductPage> },
  ]);

function App() {
  const type = sessionStorage.getItem("categories")
    ? sessionStorage.getItem("categories")
    : "collections";
  const [cartItems, setCartItems] = useState([]);
  const [category, setCategory] = useState(type);
  const [Overlay, setOverlay] = useState(false)
  sessionStorage.setItem("categories", category);
  return (
    <div className="App">
      <div className={Overlay? "overlay active": "overlay"}></div>
      <overlay.Provider value={[Overlay, setOverlay]}>
        <cart.Provider value={[cartItems, setCartItems]}>
          <categories.Provider value={[category, setCategory]}>
            <Router>
              <Header></Header>
              <ProductsRoutes></ProductsRoutes>
            </Router>
          </categories.Provider>
        </cart.Provider>
      </overlay.Provider>
    </div>
  );
}

export default App;
