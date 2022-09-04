//depedencies
import { Container, Col, Row } from "react-bootstrap";
import Rp from 'rupiah-format'
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

// file
import Navbar from "../components/navbar/navbar";
import Bin from '../assets/img/bin.svg'
import coffee from '../assets/img/coffee1.svg'
import Plus from '../assets/img/plus.svg'
import Minus from '../assets/img/minus.svg'

export default function Cart() {

    const handleClickplus = async (qty, id, price) => {
        // Counter state is incremented
        const config = {
            headers: {
                "Content-type": "application/json",
            },
            };
            const newQty = qty + 1;
            const newTotal = price * newQty;
            const req = JSON.stringify({
            qty: newQty,
            sub_amount: newTotal,
            });
            await API.patch(`/cart/${id}`, req, config);
            refetch();
        };

        const handleClickmin = async (id, qty, price, sub_amount) => {
            const config = {
            headers: {
                "Content-type": "application/json",
            },
            };
            console.log(sub_amount);
            console.log(price);
            // Counter state is decremented
            if (qty === 1) {
            return;
            }
            const newQty = qty - 1;
            const newTotal = sub_amount - price * newQty;
            console.log(newTotal);
            const req = JSON.stringify({
            qty: newQty,
            sub_amount: newTotal * newQty,
            });
            await API.patch(`/cart/${id}`, req, config);
            refetch();
        };

        let navigate = useNavigate();
        // Get data transaction by ID
        let { data: transaction, refetch } = useQuery("transCache", async () => {
            const response = await API.get("/transaction-status");
            return response.data.data;
        });

        let handleDelete = async (id) => {
            await API.delete(`cart/${id}`);
            refetch();
        };

        // total Payment
        let Total = transaction?.carts?.reduce((a, b) => {
            return a + b.sub_amount;
        }, 0);
        let TotalQTY = transaction?.carts?.reduce((a, b) => {
            return a + b.qty;
        }, 0);

        // pay Handler
        const form = {
            status: "failed",
            total: Total,
        };

    return (
        <div>
            <Navbar/>
            <Container className='pt-5 mt-5'>
                <div className='mb-0'>
                <h2 className="colorPrimary fw-bold mb-3">MY CART</h2>
                <h5 className="colorPrimary mb-0">Review Your Order</h5>
                </div>
                <Row className='mt-5'>
                <Col xs={12} md={7}>
                    <div>
                    <div className='cartlist py-4'>
                        <Row>
                        <div>
                        {transaction?.carts.map((item, index) => (
                            <div className='d-flex mb-2' style={{width:'100%'}}>
                                <img src={"http://localhost:5000/uploads/" + item.product?.image} alt='productimage' style={{width:'20%'}} />
                                <div className="d-flex justify-content-between" style={{width:'100%'}}>
                                        <div className='detailcartlist ps-3'>
                                            <p className='fw-semibold mb-3 colorPrimary' style={{fontSize:'22px'}}>{item.product.name}</p>
                                        <div className='counter'>
                                            <img src={Minus} alt="minus" onClick={() =>
                                                handleClickmin(
                                                    item.id,
                                                    item.qty,
                                                    item.product.price,
                                                    item.sub_amount
                                                ) }/>
                                        <p className='mb-0 px-2 py-1 ms-2 fs-5 fw-bold' style={{backgroundColor:'#F6E6DA', width:'fit-content', borderRadius:'5px' }}>{item?.qty}</p>
                                            <img src={Plus} alt="plus" className='ms-2' onClick={() => handleClickplus(item.qty, item.id, item.product.price)} />
                                        </div>
                                        </div>
                                    <div className='flexcolend'>
                                        <p className='fs-5 mb-4 text-end colorSecondary'>{Rp.convert(item.product.price)}</p>
                                        <img src={Bin} alt='trash' onClick={() => handleDelete(item.id)} />
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        </Row>
                    </div>
                    </div>
                </Col>
                <Col xs={12} md={5}>
                    <div className='cartlist py-4 between'>
                    <div>
                        <p className="colorSecondary">Subtotal</p>
                        <p className="colorSecondary">Qty</p>
                    </div>
                    <div className='flexcolend'>
                    <p className="colorSecondary">{Rp.convert(Total)}</p>
                    <p className="colorSecondary">{TotalQTY}</p>
                    </div>
                    </div>
                    <div className='pt-4 between fw-bold mb-3'>
                    <p className="colorSecondary fw-semibold">Total:</p>
                    <p className="colorSecondary fw-semibold">{Rp.convert(Total)}</p>
                    </div>
                    <button className='btnAddToCart' style={{width:'100%'}}>Pay</button>
                </Col>
                </Row>
            </Container>
            </div>
        );
}