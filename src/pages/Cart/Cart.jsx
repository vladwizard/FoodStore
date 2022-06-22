import style from "./Cart.module.css";
import CartBlock from "../../components/CartBlock/CartBlock";
import {useSelector} from "react-redux";


export default function Home() {

    const cartMap = useSelector((state) => state.cart.items)

    return (
        <div className={style.content}>
            {/*{console.log(cartMap)}*/}
            {cartMap.size==0?(
                <div className={style.empty}>Корзина пуста</div>
            ):""}
            {

                [...cartMap.entries()].map((item, index) =>

                    <CartBlock item={item} key={index}/>
                )
            }

        </div>

    )

}