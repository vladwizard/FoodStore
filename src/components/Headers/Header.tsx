import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import style from './Header.module.css'


import {RootState} from "../../Redux/store";

export default function Header({closerHeader}: any) {


    const cartCount: number = useSelector((state: RootState) => state.cart.size)
    const finalPrice: number = useSelector((state: RootState) => state.cart.finalPrice)

    const [activeHeader, setActive] = React.useState(false)
    return (
        <div className={style.wrapper}>
            <svg className={style.headerButton} viewBox="0 0 32 32"
                 onClick={() => {
                     setActive(!activeHeader)
                 }}
            >
                <path
                    d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/>
            </svg>
            <div className={[style.content, activeHeader && style.noneActiveContent].join(' ')}
            >
                <div>
                    <Link className={style.link} onClick={closerHeader} to="/">Главная</Link>
                    <Link className={style.link} onClick={closerHeader} to="/cart">Корзина</Link>
                </div>
                <div>
                    <p>Товаров в корзине</p>


                    <p>{cartCount}</p>


                    <p>{finalPrice}₽</p>
                </div>
            </div>
        </div>
    )
}