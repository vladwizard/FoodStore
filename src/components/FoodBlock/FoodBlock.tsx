import React from "react";
import style from "./FoodBlock.module.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/slices/cartSlice";
import { Food } from "../../@types/common";

export default function FoodBlock({ food }: { food: Food }) {
  const dispatch = useDispatch();
  const [count, setCount] = React.useState(1);
  const [portionSize, setPortion] = React.useState(0);

  return (
    <article className={style.foodBlock}>
      <img src={food.img} alt="" />

      <main>
        <p className={style.title}>{food.title}</p>
        {food.notation == "граммы" ? (
          <div className={style.portion_area}>
            {food.portionsizes.map((portion: string, i: number) => (
              <button
                className={i == portionSize ? "selected" : ""}
                onClick={() => setPortion(i)}
                key={i}
              >
                {portion + "гр"}{" "}
              </button>
            ))}
          </div>
        ) : (
          ""
        )}
        <div className={style.count_area}>
          <button className="bad" onClick={() => (count > 1 ? setCount(count - 1) : "")}>
            <span className="material-symbols-outlined">remove</span>
          </button>

          <p>{count}</p>

          <button className="good" onClick={() => setCount(count + 1)}>
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
        <div className={[style.cart_area,'good'].join(' ')}>
          <p>{+food.prices[portionSize] * count} ₽</p>
          <button
            onClick={() => {
              dispatch(addToCart({ food, portionSize, count }));
              console.log(count);
            }}
          >
            Добавить
          </button>
        </div>
      </main>
    </article>
  );
}
