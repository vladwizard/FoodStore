import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import './Header.css'

import {RootState} from "../../Redux/store";

export default function Header({setDark}: { setDark: () => void }) {

    const cartCount: number = useSelector((state: RootState) => state.cart.size)
    const finalPrice: number = useSelector((state: RootState) => state.cart.finalPrice)

    return (
        <header className='mainHeader'>
            <nav>
                <Link to="/">Главная</Link>
                <Link to="/cart">Корзина</Link>
            </nav>
            <div className='cartDescription'>
                <p className={'possiblyNoneDisplay'}>Товаров в корзине:</p>
                <p>{cartCount}</p>
                <p>{finalPrice + '₽'}</p>
                <button onClick={setDark}>Тема</button>
            </div>

        </header>
    )
}