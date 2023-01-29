import React, { useState } from "react";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Header from "./components/Header/Header";
import "./Themes.scss";
import "./App.scss";

import { Routes, Route } from "react-router-dom";

function App() {
  const [darkTheme, setDark] = useState(false);
  return (
    <div
      className={[
        darkTheme ? "dark_theme" : "light_theme",
        "wrapper",
        "theme_variables",
      ].join(" ")}
    >
      <Header setDark={() => setDark(!darkTheme)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
