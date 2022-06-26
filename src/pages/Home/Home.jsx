import style from "./Home.module.css";
import FoodBlock from "../../components/FoodBlock/FoodBlock";
import axios from "axios";
import debounce from "lodash.debounce";


import {useSelector} from "react-redux";
import React from "react";


export default function Home() {

    const isMobile = useSelector((state) => state.device.isMobile)
    const [foodArray, setFood] = React.useState([]);
    const [find, setFind] = React.useState("");
    const [currentCategory, setCategory] = React.useState("");

    const refreshFood = debounce(() =>
        getBackend(refreshFoodIndex + 1), 500
    );
    const [refreshFoodIndex, getBackend] = React.useState(0);

    const PrintToBackendCategory = {
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

    const contentRef = React.useRef(null);

    const refreshGrid = () => {

        let contentWidth = parseFloat(window.getComputedStyle(contentRef.current).width);
        let gridGap = contentWidth * 0.005 + 7;
        let cellWidth = (330 + gridGap);
        // console.log(contentWidth, cellWidth, contentWidth / cellWidth, window.devicePixelRatio)
        contentRef.current.style.gridTemplateColumns = 'repeat(' + Math.floor(
            contentWidth * (isMobile == true ? (window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio) : 1) / cellWidth
        ) + ',1fr)'
        contentRef.current.style.gridGap = gridGap + 'px'
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
                    {Object.keys(PrintToBackendCategory).map((str) => <
                        button onClick={() => {
                        setCategory(PrintToBackendCategory[str])
                    }}
                               className={PrintToBackendCategory[str] == currentCategory ? style["active"] : ""}
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
                {foodArray.map((food, i) => <FoodBlock food={food} key={i}/>)}

            </div>

        </div>
    )
}