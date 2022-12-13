import style from "./Home.module.css";
import FoodBlock from "../../components/FoodBlock/FoodBlock";
import axios from "axios";
import debounce from "lodash.debounce";
import {Food} from "../../@types/common";

import React, {useState} from "react";

export default function Home() {

    const [find, setFind] = React.useState<string>("");

    const refreshFood = debounce(() =>
        getBackend(refreshFoodIndex + 1), 500
    );

    const [refreshFoodIndex, getBackend] = React.useState(0);
    const [currentCategory, setCategory] = React.useState(0);

    const printCategories: string[] = ['Всё', 'Первое', 'Закуски', 'Десерты', 'Напитки'];
    const backendNameCategories: string[] = ['', 'первое', 'закуска', 'десерт', 'напиток'];

    //Запрос на беккенд
    const [foodArray, setFood] = React.useState<Food[]>([]);

    React.useEffect(() => {
        axios
            .get(
                `https://6294876663b5d108c18d5377.mockapi.io/items?${'filter=' + backendNameCategories[currentCategory]}${find == '' ? '' : `&title=${find}`}`
            )
            .then((res) => {
                    setFood(res.data);
                }
            )
    }, [currentCategory, refreshFoodIndex])

    const contentRef = React.useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState(false)
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    function handleTabletChange(e: any) {
        let result = e.matches
        if (result != isMobile) {

            setIsMobile(result)
        }
    }

    mediaQuery.addListener(handleTabletChange)
    handleTabletChange(mediaQuery)

    return (
        <main className={style.wrapper}>
            <article className={style.header}>
                <div className={style.category_area}>
                    {isMobile ?
                        printCategories.map((str, index) =>
                            <button onClick={() => {
                                setCategory(index)
                            }}
                                    className={index == currentCategory ? style.active : undefined}
                                    key={str}>
                                {str}</button>)
                        :
                        <select className="changingLanguage">
                            {printCategories.map((item, index) => {
                                return <option key={index}>{item}</option>
                            })}
                        </select>
                    }

                </div>
                <input type='search' id='findContentLine' value={find}
                       placeholder='Строка поиска'
                       onChange={(e) => {
                           setFind(e.target.value);
                           refreshFood();
                       }}/>
            </article>
            <main ref={contentRef}>
                {foodArray.map((food1, i) => <FoodBlock food={food1} key={'food' + i}/>)}
            </main>

        </main>
    )
}
