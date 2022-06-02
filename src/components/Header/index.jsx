import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import style from "./Header.module.css"

export default function Header() {
    const cartCount = useSelector((state) => state.cart.size)
    const finalPrice = useSelector((state) => state.cart.finalPrice)
    return (
        <div className={style.wrapper}>
            <Link className={style.link} to="/">Главная</Link>
            <Link className={style.link} to="/cart">Корзина</Link>

            <div className={style.count_area}>
                <p>Товаров в корзине</p>
                <div>
                    <p>{cartCount}</p>
                </div>
            </div>

            <div className={style.price_area}>
                <p>Итоговая сумма</p>
                <p>{finalPrice}₽</p>
            </div>

        </div>
    )
}