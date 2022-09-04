//depedencies
import { useNavigate } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import React, { useState } from "react";
import { useMutation } from "react-query";

//api config
import { API } from "../config/api";

//component
import FileImg from '../assets/img/paperclip.png'
import Navbar from '../components/navbar/navbar';


const AddProduct = () => {

    const title = "Add Product";
    document.title = "Waysbeans | " + title;

    const [previewName, setPreviewName] = useState(""); //name
    const [preview, setPreview] = useState(null); //image

    const [form, setForm] = useState({
        name: "",
        desc: "",
        price: "",
        image:"",
        stock:""
      }); //Store data product

      //handle chahnge data on from
    const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
        setPreviewName(e.target.files[0].name);
        }
    };

    let navigate = useNavigate();

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration
            const config = {
                headers: {
                "Content-type": "multipart/form-data",
                },
            };

            const formData = new FormData();
            formData.set("image", form.image[0], form.image[0].name);
            formData.set("name", form.name);
            formData.set("price", form.price);
            formData.set("desc", form.desc);
            formData.set("stock", form.stock);

            // Insert category data
            await API.post("/product", formData, config);

            alert("Product added successfully");

            navigate("/list-product");
            } catch (error) {
            console.log(error);
            }
        });

    return (
        <>
        <Navbar/>
        <div className=" container cAddProduct d-flex justify-content-center align-items-center" id="add-product">
            <div className="left-side col-7">
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <div className="tx-product mt-5 mb-5">
                    <h1>Add Product</h1>
                </div>
                <Form.Group>
                    <Form.Control
                        id="input"
                        type="text"
                        name="name"
                        placeholder="Name Product"
                        className='input mb-3'
                        onChange={handleChange}
                    />
                    <Form.Control
                        id="input"
                        type="text"
                        name="stock"
                        placeholder="Stock"
                        className='input mb-3'
                        onChange={handleChange}
                    />
                    <Form.Control
                        id="input"
                        type="number"
                        name="price"
                        placeholder="Price"
                        className='input mb-3'
                        onChange={handleChange}
                    />
                    <textarea
                        id="input"
                        type="textarea"
                        name="desc"
                        placeholder="Description"
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
                        className={previewName === "" ? "addProductImage" : "previewName"}
                        >
                        {previewName === "" ? "Photo Product" : previewName}
                        <img src={FileImg} alt="paperClip" />
                    </label>
                    <div className="d-grid gap-2">
                        <Button type='submit' className="btn-product mx-auto">
                        Add Product
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

export default AddProduct;