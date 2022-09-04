// depedencies
import {Link} from 'react-router-dom'
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useContext, useState } from "react";
import Rp from 'rupiah-format'
import { useQuery } from "react-query"
import { API } from '../config/api'

// assets
import banner from "../assets/img/banner.svg"
import logoBlack from "../assets/img/logoBlack.svg"

// component
import Navbar from '../components/navbar/navbar'
import {UserContext} from '../components/context/UserContext'

export default function Landing(){
    // user data
    const [state] = useContext(UserContext);

    // modal login
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(true);

    // Fetching product data from database
    let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
});

    return(
        <>
        <Navbar setShow={setShow} show={show}/>
            <Container className="mt-5">
                <Row>
                    <Col className="position-relative">
                        <div className="card-item">
                            <Card className="card-landing mt-5">
                                <div className="mt-5 ms-1">
                                    <img src={logoBlack} alt="logo" className="mt-3 ms-5" />
                                </div>
                                <div className="ms-3 mt-2">
                                    <p className="content-card ms-5">
                                        BEST QUALITY COFFEE BEANS
                                    </p>
                                </div>
                                <div className="ms-5 mt-2">
                                    <p className="ms-3">
                                        Quality fresh roasted coffee made just for you. <br />
                                        Pour brew and enjoy
                                    </p>
                                </div>
                            </Card>
                            <img src={banner} alt="banner" className="banner ms-3"/>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container className="mx-auto mt-5" >
            <Row className="mx-auto containerProductGird">
                {products?.map((item, index) => (
                    <Col className="mapping-card ms-3 mb-5" key={index}>
                        <Card className="card-product" >
                            <div className="img-drink">
                            <Link
                            to={
                                state.isLogin === true ? `/detail-product/${item.id}` : ""
                            }
                                onClick={state.isLogin === false ? handleClick : ""}
                            >
                                <Card.Img variant="top" src={item.image}/>
                            </Link>
                            </div>
                            <div className=" ms-2 mt-3">
                                <p className="name-product mb-1">{item.name}</p>
                            </div>
                            <div className="ms-2">
                                <p className="price-product">{Rp.convert(item.price)}</p>
                                <p className="price-product"> Stock: {(item.stock)}</p>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </>
    )
}
