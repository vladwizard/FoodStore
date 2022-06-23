import React from "react";
import style from './App.module.css';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Header from './components/Header/Header'
import {
    Routes,
    Route,
} from "react-router-dom";


function App() {
    const headerRef = React.useRef();
    const verticalOrientation = window.innerWidth > window.innerHeight;
    const mobile = window.innerWidth < 1080;
    const [headerToggle, setHeaderToggle] = React.useState(!mobile);

    const headerWidth = verticalOrientation ? [300,'px'] : [100,'%'];

    return (
        <div className={style.wrapper}>
            <svg className={style.headerButton} viewBox="0 0 32 32"
                 onClick={() => {
                     setHeaderToggle(!headerToggle);
                     // headerRef.current.style.visibility=headerToggle?"visible":"hidden";
                     // headerRef.current.style.width=Boolean(headerToggle)*headerWidth+'px'
                 }}
            >
                <path
                    d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/>
            </svg>
            {/*{console.log(Boolean(headerToggle) *  headerWidth[0] + headerWidth[1])}*/}
            <div className={[style.header+" "+(headerToggle?style.activeHeader:"")]} ref={headerRef} c
                 style={{
                     // 'visibility': headerToggle ? "visible" : "hidden",
                     // 'width': Boolean(headerToggle) * headerWidth[0] + headerWidth[1]
                 }}
            >
                <Header closerHeader={() => {
                    if (mobile)
                        setHeaderToggle(false)
                }}/>
            </div>

            {/*<div className={style.contentWrapper}></div>*/}
            <div className={style.content}>

                <Routes>
                    <Route path="/" element={
                        <Home/>
                    }/>
                    <Route path="/cart" element={
                        <div>
                            {
                                <Cart/>
                            }
                        </div>
                    }/>
                </Routes>
            </div>
        </div>
    );
}

export default App;