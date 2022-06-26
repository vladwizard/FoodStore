import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import style from "./Header.module.css"

import {RootState} from "../../Redux/store";

export default function Header({closerHeader}:any) {

    const cartCount:number = useSelector((state:RootState) => state.cart.size)
    const finalPrice:number = useSelector((state:RootState) => state.cart.finalPrice)

    return (
        <div className={style.wrapper}>
            <Link className={style.link} onClick={closerHeader} to="/">Главная</Link>
            <Link className={style.link} onClick={closerHeader} to="/cart">Корзина</Link>

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