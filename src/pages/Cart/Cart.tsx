import style from "./Cart.module.css";
import CartBlock from "../../components/CartBlock/CartBlock";
import {useSelector} from "react-redux";
import React from "react";

import {RootState} from "../../Redux/store";

export default function Home() {

    const cartMap = useSelector((state: RootState) => state.cart.items)

    return (
        <main className={style.content}>
            {cartMap.size == 0 && (
                <h1 className={style.empty}>Корзина пуста</h1>
            )}
            {
                Array.from(cartMap).map((item, index) =>
                    <CartBlock item={{food: item[0], portionMap: item[1]}} key={index}/>
                )
            }

        </main>

    )

}