import React from "react";
import style from './App.css';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Header from './components/Header/Header'
import {
    Routes,
    Route,
} from "react-router-dom";
import {useSelector} from "react-redux";

function App() {
    const isMobile = useSelector(state => state.device.isMobile);
    const headerRef = React.useRef();
    const [headerToggle, setHeaderToggle] = React.useState(!isMobile);


    return (
        <div className={['wrapper', isMobile && 'mobile'].join(' ')}>
            <svg className={'headerButton'} viewBox="0 0 32 32"
                 onClick={() => {
                     setHeaderToggle(!headerToggle);

                 }}
            >
                <path
                    d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/>
            </svg>

            <div className={['header', headerToggle && 'activeHeader'].join(' ')} ref={headerRef}>
                <Header closerHeader={() => {
                    if (isMobile)
                        setHeaderToggle(false)
                }}/>
            </div>

            <div className={'content'}>

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