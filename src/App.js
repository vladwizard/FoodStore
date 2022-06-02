import React, {useState} from "react";
import style from './App.module.css';
import Home from './pages/Home'
import Cart from './pages/Cart'
import Header from './components/Header'
import {
    Routes,
    Route,
} from "react-router-dom";


function App() {

    return (
        <div className={style.wrapper}>

            <div className={style.header}>
                <Header/>
            </div>
            <div className={style.content}>
                <Routes>
                    <Route path="/" element={
                        <Home/>
                    }/>
                    <Route path="/cart" element={
                        <div>
                            {
                                <Cart/>
                            }
                        </div>
                    }/>
                </Routes>
            </div>
        </div>
    );
}

export default App;