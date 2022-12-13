import React, {useState} from "react";
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Header from "./components/Headers/Header";
import './Themes.css'
import './App.css'

import {
    Routes,
    Route,
} from "react-router-dom";



function App() {
    const [darkTheme, setDark] = useState(false)
    return (
        <div className={[darkTheme ? 'darkTheme': 'lightTheme','wrapper'].join(' ')}>
            <button>123</button>
            <Header setDark={() => setDark(!darkTheme)}/>
            <Routes>
                <Route path="/" element={
                    <Home/>
                }/>
                <Route path="/cart" element={
                    <Cart/>
                }/>
            </Routes>

        </div>
    );
}

export default App;