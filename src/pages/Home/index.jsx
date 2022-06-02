import style from "./Home.module.css";
import FoodBlock from "../../components/FoodBlock";
import React, {useState} from "react";
import axios from "axios";
import debounce from "lodash.debounce";


export default function Home() {

    const [foodArray, setFood] = React.useState([]);
    const [find, setFind] = React.useState("");
    const [currentCategory, setCategory] = React.useState("");

    const refreshFood = debounce(() =>
        getBackend(refreshFoodIndex + 1), 500
    );
    const [refreshFoodIndex, getBackend] = useState(0);

    const mapCategory = {
        "Всё": "",
        "Первое": "первое",
        "Закуски": "закуска",
        "Десерты": "десерт",
        "Напитки": "напиток"
    };

    React.useEffect(() => {
        axios
            .get(
                `https://6294876663b5d108c18d5377.mockapi.io/items?${currentCategory == "" ? "" : `type=${currentCategory}`}&${find == '' ? '' : `title=${find}`}`
            )
            .then((res) => {
                    setFood(res.data);
                }
            )
    }, [currentCategory, refreshFoodIndex])

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <div className={style.category_area}>
                    {Object.keys(mapCategory).map((str) => <
                        button onClick={() => {
                        setCategory(mapCategory[str])
                    }}
                               className={mapCategory[str] == currentCategory ? style["active"] : ""}
                               key={str}>
                        {str}</button>)}

                </div>
                <input className={style.find} type='text' value={find} placeholder='Строка поиска' onChange={(e) => {
                    setFind(e.target.value);
                    refreshFood();
                }}/>
            </div>
            <div className={style.content}>
                {foodArray.map((food, i) => <FoodBlock food={food} key={i}/>)}
            </div>
        </div>
    )
}