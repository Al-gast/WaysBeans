// depedencies
import {Link} from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import { UserContext } from '../context/UserContext';
import {useQuery} from 'react-query'

// components
import ModalAuth from '../modal/modalAuth'
import Dropdown from './dropdown';
import { API } from '../../config/api'

// assets
import logoBrown from '../../assets/img/logoBrown.svg'
import Cart from '../../assets/img/cart.svg'

export default function Navbar ({ setShow, show }) {
    const [state] = useContext(UserContext);
    const isLogin = state.isLogin;

    const [counter, setCounter] = useState([]);

    useEffect( () => {

        const findCounter = async () => {
            try {
                let response = await API.get("/transaction-status")
                setCounter (response.data.data.carts.length)
            } catch (e) {
                console.log(e.message)
            }
    }
    findCounter()
    },[]);

    return(
        <nav className='shadow d-flex justify-content-between align-items-center p-2 fixed-top bg-white'>
            <div>
                <Link to={state.user.status === "admin" ? "/transaction" : "/"}>
                    <img src={logoBrown} alt="logo" className='navbarLogo'/>
                </Link>
            </div>
            {isLogin ? (
                <div className="navbarRight">
                <div
                    className={
                        counter === undefined
                        ? "d-none"
                        : counter === 0
                        ? "d-none"
                        : "circle"
                    }
                    >
                    {counter}
                    </div>
                    <div className='d-flex align-items-center me-3'>
                        <Link to={"/cart"} className='me-3'>
                        <img
                            src={Cart}
                            alt="cart"
                            className={
                            state.user.status === "customer" ? "navbarCart" : "d-none"
                            }
                        />
                        </Link>
                        <Dropdown />
                    </div>
                </div>
            ) : (
                <div className='navbarAuth'>
                    <ModalAuth show={show} setShow={setShow}/>
                </div>
            )}
        </nav>
    )
}