import React from "react";
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Header from "./components/Headers/Header";
import {
    Routes,
    Route,
} from "react-router-dom";

function App() {

    return (
        <div>
            <Header/>

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