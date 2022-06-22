import React from "react";
import style from "./CartBlock.module.css"
import {useDispatch} from "react-redux";
import {removeFromCart} from "../../Redux/slices/cartSlice.js";

export default function FoodBlock({item}) {
    const food = item[0];
    const portionMap = item[1];

    const dispatch = useDispatch()

    return (
        <div className={style.wrapper}>

            <img src={food.img} alt=""/>
            <div className={style.right_area}>
                <p className={style.title}>{food.title}</p>

                {food.notation == 'граммы' ?
                    [...portionMap.entries()].map(([portion, count], index) =>
                        <div className={style.count_area} key={index}>
                            <p>{food.portionsizes[portion]}гр</p>
                            <p>{count}шт</p>

                            <p>{count * food.prices[portion]}₽</p>
                            <button onClick={() => {
                                dispatch(removeFromCart([food, portion]));
                            }}>Убрать из<br/>корзины
                            </button>
                        </div>
                    )
                    :
                    <div className={style.count_area}>
                        <p>{portionMap.get(0)}шт</p>
                        <p>{portionMap.get(0) * food.prices[0]}₽</p>
                        <button onClick={() => {
                            dispatch(removeFromCart([food, 0]));
                        }}>Убрать из<br/>корзины
                        </button>
                    </div>

                }

            </div>
        </div>
    )
}