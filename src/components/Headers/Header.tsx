import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import style from './Header.module.css'

import {RootState} from "../../Redux/store";

export default function Header({setDark}: { setDark: () => void }) {

    const cartCount: number = useSelector((state: RootState) => state.cart.size)
    const finalPrice: number = useSelector((state: RootState) => state.cart.finalPrice)

    return (
        <header className={style.wrapper}>
            <div>
                <Link className={style.link} to="/">Главная</Link>
                <Link className={style.link} to="/cart">Корзина</Link>
            </div>
            <div className={style.cartDescription}>
                <p className={style.possiblyNoneDisplay}>Товаров в корзине:</p>
                <p>{cartCount}</p>
                <p>{finalPrice + '₽'}</p>
                <button onClick={setDark}>Тема</button>
            </div>

        </header>
    )
}