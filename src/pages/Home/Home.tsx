import style from "./Home.module.css";
import FoodBlock from "../../components/FoodBlock/FoodBlock";
import axios from "axios";
import debounce from "lodash.debounce";

import {useSelector} from "react-redux";
import React from "react";

import {RootState} from "../../Redux/store";

export default function Home() {

    const isMobile: boolean = useSelector((state: RootState) => state.device.isMobile)

    const [find, setFind] = React.useState<string>("");

    const refreshFood = debounce(() =>
        getBackend(refreshFoodIndex + 1), 500
    );

    const [refreshFoodIndex, getBackend] = React.useState(0);
    const [currentCategory, setCategory] = React.useState(0);

    const printCategories: string[] = ['Всё', 'Первое', 'Закуски', 'Десерты', 'Напитки'];
    const backendNameCategories: string[] = ['', 'первое', 'закуска', 'десерт', 'напиток'];

    //Запрос на беккенд
    const [foodArray, setFood] = React.useState([]);
    React.useEffect(() => {
        axios
            .get(
                `https://6294876663b5d108c18d5377.mockapi.io/items?${backendNameCategories[currentCategory]}&${find == '' ? '' : `title=${find}`}`
            )
            .then((res) => {
                    setFood(res.data);
                }
            )
    }, [currentCategory, refreshFoodIndex])


    const contentRef = React.useRef<HTMLDivElement>(null);
    const refreshGrid = () => {

        let content = contentRef.current as HTMLElement;

        let contentWidth = parseFloat(window.getComputedStyle(content).width);
        let gridGap = contentWidth * 0.005 + 7;
        let cellWidth = (240 + gridGap);
        if (isMobile) {
            cellWidth = 170;
        }
        contentWidth += gridGap;
        // contentRef.current.style.gridTemplateColumns = 'repeat(' + Math.floor(contentWidth / cellWidth) + ',1fr)'
        // contentRef.current.style.gridGap = gridGap + 'px'
        content.style.gridTemplateColumns = 'repeat(' + Math.floor(contentWidth / cellWidth) + ',1fr)'
        content.style.gridGap = gridGap + 'px'
    }
    React.useEffect(() => {
        setTimeout(() => {
                refreshGrid()
            }
            , 400)
    }, [contentRef.current != null && window.getComputedStyle(contentRef.current).width])

    window.onresize = () => refreshGrid();

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <div className={style.category_area}>
                    {printCategories.map((str, index) =>
                        <button onClick={() => {
                            setCategory(index)
                        }}
                                className={index == currentCategory && style.active}
                                key={str}>
                            {str}</button>)}

                </div>
                <input className={[style.find].join(' ')} id='findContentLine' type='text' value={find}
                       placeholder='Строка поиска'
                       onChange={(e) => {
                           setFind(e.target.value);
                           refreshFood();
                       }}/>
            </div>
            <div className={style.content} ref={contentRef}>
                {foodArray.map((food, i) => <FoodBlock food={food} key={'food'+i}/>)}

            </div>

        </div>
    )
}