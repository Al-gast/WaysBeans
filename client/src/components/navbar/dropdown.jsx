// depedencies
import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from "react";

// file
import profileNavbar from '../../assets/img/profileNavbar.svg'
import profileDropdown from '../../assets/img/profileDropdown.svg'
import beanDropdown from '../../assets/img/beanDropdown.svg'
import logoutDropdown from '../../assets/img/logoutDropdown.svg'
import { UserContext } from '../context/UserContext';

export default function Dropdown() {
    // logout
    const [state, dispatch] = useContext(UserContext);
    // const status = state.user.status;
    const navigate = useNavigate();

    const logout = () => {
        dispatch({
        type: "LOGOUT",
        });
        navigate("/");
    };

    return (
        <NavDropdown
        title={<img src={profileNavbar} alt="photoProfile" className="navbarPhoto" />}
        className="navImg"
        >
        <div className={ state.user.status === "customer" ? "" : "d-none"}>
            <Link to="/profile" className="navbarItem" >
                <img
                    src={profileDropdown}
                    alt="profile"
                    className="d-flex dropdown-img me-2 ms-4"
                />
                <p className="d-flex mb-0  dropAdmin align-items-center ms-2" >Profile</p>
            </Link>
        </div>

        <div className={state.user.status === "admin" ? "mb-2 mt-2 ps-3 " : "d-none"}>
            <Link to="/add-product" className="navbarItem">
            <img
                src={beanDropdown}
                alt="AddProduct"
                className="d-flex dropdown-img ms-1"
            />
            <p className="d-flex mb-0 ps-3 dropAdmin">Add Product</p>
            </Link>
        </div>

        <div className={state.user.status === "admin" ? "mb-2 mt-2 ps-3 " : "d-none"}>
            <Link to="/list-product" className="navbarItem">
            <img
                src={beanDropdown}
                alt="ListProduct"
                className="d-flex dropdown-img ms-1"
            />
            <p className="d-flex mb-0 ps-3 dropAdmin">List Product</p>
            </Link>
        </div>

        <hr className="mt-2 mb-2"/>
        <div className="d-flex" onClick={logout}>
            <img src={logoutDropdown} alt="logout" className="d-flex dropdown-img me-2 ms-4" />
            <p className="d-flex mb-0 dropAdmin ms-2">Logout</p>
        </div>
        </NavDropdown>
    );
}