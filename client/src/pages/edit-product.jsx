//depedencies
import { useNavigate, useParams } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from 'react-query';

//api config
import { API } from "../config/api";

//component
import FileImg from '../assets/img/paperclip.png'
import Navbar from '../components/navbar/navbar';
import datas from '../components/DummyData/transaction';


const EditProduct = () => {

const { id } = useParams()

const navigate = useNavigate()
const [datas, setData] = useState()
const [preview, setPreview] = useState(null)
const [nameUrl, setNameUrl] = useState()
const [ addProduct, setAddProduct] = useState({
    name:"",
    price:"",
    image:"",
    desc:"",
    stock:"",
})

useEffect(() => {
    const findProduct = async () => {
        try {
            let response = await API.get("/product/" + id);
            setData(response.data.data);
            setAddProduct({
            name: response.data.data.name,
            price: response.data.data.price,
            desc: response.data.data.desc,
            stock: response.data.data.stock,
            });
            setPreview(response.data.data.image);
        } catch (e) {
            console.log(e.message);
        }
        };
        findProduct();
    }, [id]);

    const handleChange = (e) => {
        setAddProduct({
            ...addProduct,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
            });

            if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
            setNameUrl(e.target.name[0]);
            }
        };

        const handleSubmit = useMutation(async (e) => {
            try {
                e.preventDefault();

                // Configuration
                const config = {
                    headers: {
                    "Content-type": "multipart/form-data",
                    },
                };

                // Store data with FormData as object
                const formData = new FormData();
                if (addProduct.image) {
                    formData.set("image", addProduct?.image[0], addProduct?.image[0]?.name);
                }
                formData.set("name", addProduct.name);
                formData.set("desc", addProduct.desc);
                formData.set("price", addProduct.price);
                formData.set("stock", addProduct.stock);
                // Insert product data
                await API.patch("/product/" + id, formData, config);

                alert("product has been updated successfully");
                // regClose();
                navigate("/list-product");
                } catch (error) {
                console.log(error);
                }
            });
            console.log(addProduct.image)

    return (
        <>
        <Navbar/>
        <div className=" container cAddProduct d-flex justify-content-center align-items-center" id="add-product">
            <div className="left-side col-7">
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <div className="tx-product mt-5 mb-5">
                    <h1>Update Product</h1>
                </div>
                <Form.Group>
                    <Form.Control
                        id="input"
                        type="text"
                        name="name"
                        placeholder="Name Product"
                        value={addProduct.name}
                        className='input mb-3'
                        onChange={handleChange}
                    />
                    <Form.Control
                        id="input"
                        type="text"
                        name="stock"
                        placeholder="Stock"
                        value={addProduct.stock}
                        className='input mb-3'
                        onChange={handleChange}
                    />
                    <Form.Control
                        id="input"
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={addProduct.price}
                        className='input mb-3'
                        onChange={handleChange}
                    />
                    <textarea
                        id="input"
                        type="textarea"
                        name="desc"
                        placeholder="Description"
                        value={addProduct.desc}
                        className='input mb-3'
                        onChange={handleChange}
                    />
                    </Form.Group>
                    <input
                        type="file"
                        id="addProductImage"
                        hidden
                        className="photoProduct"
                        name="image"
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="addProductImage"
                        className={preview === "" ? "addProductImage" : "previewName"}
                        >
                        {preview === "" ? "Photo Product" : preview}
                        <img src={FileImg} alt="paperClip" />
                    </label>
                    <div className="d-grid gap-2">
                        <Button type='submit' className="btn-product mx-auto">
                            Update Product
                        </Button>
                    </div>
                </Form>
            </div>
                    {preview && (
                    <div className="addProductRight">
                        <img src={preview} alt="preview" className='mt-5'/>
                    </div>
                    )}
        </div>
        </>
    )
}

export default EditProduct;