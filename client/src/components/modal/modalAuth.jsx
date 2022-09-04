import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap"
import { UserContext } from "../context/UserContext";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";

export default function ModalAuth({ show, setShow }) {

    // modal-check
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [shows, setShows] = useState(false);
    const handleShows = () => setShows(true);
    const handleCloses = () => setShows(false);

    const handleSwitchRegister = () => {
        setShow(false);
        setShows(true);
    };

    const handleSwitchLogin = () => {
        setShows(false);
        setShow(true);
    };

    const navigate = useNavigate()

    // _________login
    const [state, dispatch] = useContext(UserContext);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    //
    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
        e.preventDefault();

        const config = {
            headers: {
            "Content-type": "application/json",
            },
        };

        const body = JSON.stringify(form);

        const response = await API.post("/login", body, config);

        if (response?.status === 200) {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data.data,
            });
        }
        if (response.data.data.status === "admin") {
            navigate('/transaction')
        }else{
            navigate('/')
        }

        setShow(false);
        } catch (error) {
        console.log(error);
        }
    }
    );

    // ____________register
    const [register, setRegister] = useState({
        email: "",
        password: "",
        name: "",
    });

    const handleChangeRegister = (e) => {
        setRegister({
        ...register,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmitRegister = useMutation(async (e) => {
        e.preventDefault();

        // Configuration Content-type
        const config = {
        headers: {
            "Content-type": "application/json",
        },
        };

        // Data body
        const body = JSON.stringify(register);

        // Insert data user to database
        await API.post("/register", body, config);

        // Handling response here
        setShows(false);
    });

    return(
        <>
            <>
                <button onClick={handleShow} className='btnNavbar btnLogin'>Login</button>
                <Modal show={show} onHide={handleClose}>
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <div className="authContainer">
                            <h1 className="authTitle">Login</h1>
                            <input
                            type="email"
                            className="inputAuth p-2"
                            placeholder="Email"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            />
                            <input
                            type="password"
                            className="inputAuth p-2"
                            placeholder="password"
                            name="password"
                            id="password"
                            onChange={handleChange}
                            />
                            <button type="submit" className="btnAuth">Login</button>
                            <p className="toRegist">
                                Don't have an account ? Click{""}
                                <strong onClick={handleSwitchRegister} > Here</strong>
                            </p>
                        </div>
                    </form>
                </Modal>
            </>

            <>
                <button onClick={handleShows} className='btnNavbar btnRegister'>Register</button>
                <Modal show={shows} onHide={handleCloses} >
                    <form onSubmit={(e) => handleSubmitRegister.mutate(e)}>
                        <div className="authContainer">
                            <h1 className="authTitle">Register</h1>
                            <input
                            type="email"
                            className="inputAuth p-2"
                            placeholder="Email"
                            name="email"
                            onChange={handleChangeRegister}
                            />
                            <input
                            type="password"
                            className="inputAuth p-2"
                            placeholder="password"
                            name="password"
                            onChange={handleChangeRegister}
                            />
                            <input
                            type="text"
                            className="inputAuth p-2"
                            placeholder="Full Name"
                            name="name"
                            onChange={handleChangeRegister}
                            />
                            <button type="submit" className="btnAuth">Register</button>
                            <p className="toRegist">
                                Already have an account ? Click{""}
                                <strong onClick={handleSwitchLogin} > Here</strong>
                            </p>
                        </div>
                    </form>
                </Modal>
            </>
        </>
    )
}