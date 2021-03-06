import style from "./Cart.module.css";
import CartBlock from "../../components/CartBlock/CartBlock";
import {useSelector} from "react-redux";
import React from "react";

import {RootState} from "../../Redux/store";

export default function Home() {

    const cartMap = useSelector((state:RootState) => state.cart.items)

    return (
        <div className={style.content}>
            {cartMap.size == 0 && (
                <div className={style.empty}>Корзина пуста</div>
            )}
            {

                [...Array.from(cartMap.entries())].map((item, index) =>

                    <CartBlock item={item} key={index}/>
                )
            }

        </div>

    )

}