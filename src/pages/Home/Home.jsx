import style from "./Home.module.css";
import FoodBlock from "../../components/FoodBlock/FoodBlock";
import React, {useEffect, useState} from "react";
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

    //Сзодание дополнительных блоков еды для форматирования
    const contentRef = React.useRef(null);


    // let [extraCells, setExtraCells] = React.useState([]);
    //
    //
    // const [cellWidth, setCellWidth] = React.useState(200);

    // const createExtraCells = (cellWidth) => {
    //
    //     let contentWidth = contentRef.current.clientWidth;
    //     let lineMaxLength = Math.floor(contentWidth / cellWidth); //сколь максимум в одной строчке
    //     let inLast = foodArray.length % lineMaxLength;
    //     let needCount = lineMaxLength - inLast;
    //
    //     if (inLast == 0 || isNaN(needCount)) needCount = 0;
    //     setExtraCells([...Array(needCount).keys()]);
    // }

    // let [resize, setResize] = React.useState(0);
    // window.onresize = () => {
    //     setResize(resize + 1)
    // }
    // React.useEffect(() => {
    //         if (contentRef.current != null && contentRef.current.children.length > 0) {
    //             let currentCellWidth = parseInt(window.getComputedStyle(contentRef.current.children[0]).width);
    //             setCellWidth(currentCellWidth);
    //             createExtraCells(currentCellWidth);
    //         }
    //     }
    //     , [resize, contentRef.current?.children])
    // React.useEffect(()=>{
    //     console.log(contentRef.current?.style.width)
    // },[contentRef.current])

    React.useRef(
    setInterval(()=>{
            contentRef.current.style.gridTemplateColumns='repeat(' + Math.floor(parseInt(contentRef.current!=null?(window.getComputedStyle(contentRef.current)).width:1000) / 330) + ',1fr)'
        },200)
    ,[])
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    window.onresize = () => setWindowWidth(window.innerWidth);
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
            <div className={style.content} ref={contentRef}
//           (windowWidth>500?Math.floor(windowWidth / 500):2)
//                  style={{'grid-template-columns': 'repeat(' + Math.floor(parseInt(contentRef.current!=null?(window.getComputedStyle(contentRef.current)).width:100) / 330) + ',1fr)'}}
            >
                {foodArray.map((food, i) => <FoodBlock food={food} key={i}/>)}

                {/*{console.log(contentRef.current!=null&&contentRef.current.children.length>0?contentRef.current.children[0]:'')}*/}
                {/*{console.log(contentRef.current!=null&&contentRef.current.children.length>0?parseInt(window.getComputedStyle(contentRef.current.children[0]).width):'')}*/}
                {/*{extraCells.map((x, index) =>*/}
                {/*    <div key={index} style={{'width': cellWidth + 'px'}}>*/}
                {/*    </div>*/}
                {/*)}*/}

            </div>
            {/*{console.log(parseInt(contentRef.current!=null?(window.getComputedStyle(contentRef.current)).width:1000))}*/}

        </div>
    )
}