import "./App.css";
import React, { useEffect, useState, useContext } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const cart = React.createContext();
export const categories = React.createContext();
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [category, setCategory] = useState("mens");
  return (
    <div className="App">
      <cart.Provider value={[cartItems, setCartItems]}>
        <categories.Provider value={[category, setCategory]}>
          <Header></Header>
          <Router>
            <Routes>
              <Route path="/" element={<Main></Main>}></Route>
              <Route path="/mens" element={<Main></Main>}></Route>
              <Route path="/womens" element={<Main></Main>}></Route>
            </Routes>
          </Router>
        </categories.Provider>
      </cart.Provider>
    </div>
  );
}

export default App;
