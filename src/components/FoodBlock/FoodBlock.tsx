import React from "react";
import style from "./FoodBlock.module.css"
import {useDispatch} from 'react-redux'
import {addToCart} from "../../Redux/slices/cartSlice";
import {Food} from "../../@types/common";

export default function FoodBlock({food}: { food: Food }) {
    const dispatch = useDispatch();
    const [count, setCount] = React.useState(1);
    const [portionSize, setPortion] = React.useState(0);

    return (
        <article className={style.wrapper}>
            <img src={food.img} alt=""/>
            <p className={style.title}>{food.title}</p>
            <div className={style.user_settings}>
                {
                    food.notation == "граммы" ?
                        <div className={style.portion_area}>
                            {food.portionsizes.map((portion: string, i: number) => <button
                                className={i == portionSize ? style.active : ""}
                                onClick={() => setPortion(i)}
                                key={i}>

                                {portion + "гр"} </button>)}
                        </div>
                        : ""
                }
                <div className={style.count_area}>

                    <button onClick={() => count > 1 ? setCount(count - 1) : ""}>
                        <div>-</div>
                    </button>

                    <p>{count}</p>

                    <button onClick={() => setCount(count + 1)}>
                        <div>+</div>
                    </button>
                </div>
                <div className={style.cart_area}>
                    <p>{+food.prices[portionSize] * count} ₽</p>
                    <button onClick={() => {
                        dispatch(
                            addToCart({food, portionSize, count}
                            ));
                        console.log(count)
                    }}>
                        Добавить
                    </button>
                </div>
            </div>
        </article>
    )
}