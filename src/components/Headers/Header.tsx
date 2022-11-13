import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import style from './Header.module.css'

import {RootState} from "../../Redux/store";

export default function Header() {

    const cartCount: number = useSelector((state: RootState) => state.cart.size)
    const finalPrice: number = useSelector((state: RootState) => state.cart.finalPrice)

    return (
        <div className={style.wrapper}>
            <div>
                <Link className={style.link} to="/">Главная</Link>
                <Link className={style.link} to="/cart">Корзина</Link>
            </div>
            <div>
                <p className={style.possiblyNoneDisplay}>Товаров в корзине:</p>

                <p>{cartCount}</p>
                <p>{finalPrice}₽</p>
            </div>
        </div>
    )
}