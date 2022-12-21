import React from "react";
import style from "./CartBlock.module.css"
import {useDispatch} from "react-redux";
import {removeFromCart} from "../../Redux/slices/cartSlice";
import {Food} from "../../@types/common";

export default function ({item}: { item: { food: Food, portionMap: Map<number, number> } }) {
    const food = item.food;
    const portionMap = item.portionMap;
    const dispatch = useDispatch()

    return (
        <article className={style.cartBlock}>
            <p className={style.title}>{food.title}</p>
            <div>

                <img className={style.img} src={food.img} alt=""/>


                <div className={style.countArea}>

                    {Array.from(portionMap.entries()).map(([portion, count], index) =>
                        <section key={index}>

                            {food.notation == 'граммы' && <p>{food.portionsizes[portion] + 'гр'}</p>}

                            <p>{count}шт</p>
                            <p>{count * +food.prices[portion] + '₽'}</p>

                            <button onClick={() => {
                                dispatch(removeFromCart([food, portion]));
                            }}>Убрать из<br/>корзины
                            </button>
                        </section>
                    )
                    }

                </div>
            </div>
        </article>
    )
}