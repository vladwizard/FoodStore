import React from "react";
import style from "./FoodBlock.module.css"
import {useDispatch} from 'react-redux'
import {addToCart} from "../../Redux/slices/cartSlice.js";

export default function FoodBlock({food}) {
    const dispatch = useDispatch();

    const [count, setCount] = React.useState(1);
    const [portionSize, setPortion] = React.useState(0);

    return (
        <div className={style.wrapper}>
            <img src={food.img} alt=""/>
            <div className={style.user_settings}>
                <p className={style.title}>{food.title}</p>
                {
                    food.notation == "граммы" ?
                        <div className={style.portion_area}>
                            {food.portionsizes.map((portion, i) => <button
                                className={i == portionSize ? style.active : ""}
                                onClick={() => setPortion(i)}
                                key={i}>

                                {portion + "гр"} </button>)}
                        </div>
                        : ""
                }
                <div className={style.count_area}>
                    <button onClick={() => count > 1 ? setCount(count - 1) : ""}>&lt;</button>
                    <p>{count}</p>
                    <button onClick={() => setCount(count + 1)}>&gt;</button>
                </div>
                <div className={style.bottom_area}>
                    <p>{food.prices[portionSize] * count} ₽</p>
                    <button onClick={() => {
                        dispatch(addToCart([
                                food,
                                portionSize
                            ]
                        ));
                        setCount(1)
                    }}>
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    )
}