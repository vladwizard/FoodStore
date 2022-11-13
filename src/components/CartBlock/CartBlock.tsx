import React from "react";
import style from "./CartBlock.module.css"
import {useDispatch} from "react-redux";
import {removeFromCart} from "../../Redux/slices/cartSlice";
import {Food} from "../../@types/common";

export default function FoodBlock({item}: { item: { food: Food, portionMap: Map<number, number> } }) {
    const food = item.food;
    const portionMap = item.portionMap;
    const dispatch = useDispatch()

    return (
        <div className={style.wrapper}>

            <img src={food.img} alt=""/>
            <div className={style.right_area}>
                <p className={style.title}>{food.title}</p>

                {Array.from(portionMap.entries()).map(([portion, count], index) =>
                    <div className={style.count_area} key={index}>

                        {food.notation == 'граммы' && <p>{food.portionsizes[portion]}гр</p>}

                        <p>{count}шт</p>
                        <p>{count * +food.prices[portion]}₽</p>

                        <button onClick={() => {
                            dispatch(removeFromCart([food, portion]));
                        }}>Убрать из<br/>корзины
                        </button>
                    </div>
                )
                }

            </div>
        </div>
    )
}