// depedencies
import { Container, Row, Col } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import Rp from 'rupiah-format'
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";


// pages
import Navbar from "../components/navbar/navbar";

export default function DetailProduct(){
    const title = "Product";
    document.title = "Waysbucks | " + title;

    let navigate = useNavigate();
    const { id } = useParams();
    // Product Fetch
    const [product, SetProduct] = useState();
    const findProduct = async () => {
        try {
        let response = await API.get("/product/" + id);
        SetProduct(response.data.data);
        } catch (e) {
        console.log(e.message);
        }
    };

    useEffect(() => {
        findProduct();
        }, []);
        console.log(product);

      // Check Transaction
    const [transaction, setTransaction] = useState();
    const getTrans = async () => {
    try {
        let response = await API.get("/transaction-status");
        setTransaction(response.data.data);
        } catch (e) {
        console.log(e.message);
        }
    };

        useEffect(() => {
        getTrans();
        }, []);

    // Handle for Add to cart
    const handleAddToCart = useMutation(async (e) => {
        try {
        e.preventDefault();

        const config = {
            headers: {
            "Content-type": "application/json",
            },
        };
        await API.post("/transaction", config);

        const data = {
            product_id: product.id,
            qty: 1,
            sub_amount: product.price,
        };

        const body = JSON.stringify(data);

        await API.post("/cart", body, config);
        navigate("/cart");
        } catch (error) {
        console.log(error);
        }
    });


    const moving = useNavigate()
    const moveToDetailProduct = (id) => {
        moving('/detail-product/' + id)
    }

    return(
        <>
        <Navbar/>
        <Container>
            <Row className="colContainer d-flex align-items-center">
                <Col>
                    <img src={product?.image} alt="coffee" className='img-detail-product shadow-lg' onClick={() => moveToDetailProduct(product?.id)}/>
                </Col>
                <Col>
                    <h1 className="detailProductName">{product?.name}</h1>
                    <p className="detailProductStock">Stock: {product?.stock}</p>
                    <p className="mb-4">{product?.desc}</p>
                    <h3 className="detailProductPrice">{Rp.convert(product?.price)}</h3>
                    <button  className="btnAddToCart" onClick={ (e) => handleAddToCart.mutate(e)}>
                    {" "}
                    Add Cart
                </button>
                </Col>
            </Row>
        </Container>
        </>
    )
}