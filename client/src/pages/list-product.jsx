import { Container, Button } from "react-bootstrap"
import Navbar from "../components/navbar/navbar"
import Table from 'react-bootstrap/Table';
import React, { useState} from 'react';
import { useQuery } from "react-query";
import { API } from "../config/api";
import { Link } from 'react-router-dom';

function ListProduct() {

    // Fetching product data from database
    let { data: products, refetch } = useQuery("productsCache", async () => {
        const response = await API.get("/products");
        return response.data.data;
    });

    let handleDelete = async (id) => {
        let confirm = prompt(" Type 'confirm' for Delete Product", "confirm")
        if (confirm === "confirm") {
            await API.delete(`product/${id}`)
        }
    refetch()
    }

    return(
        <Container>
            <Navbar/>
            <div className="mt-5 px-5 pt-5">
                <h3 className="colorPrimary mb-4 fw-bold">List Product</h3>
                <Table hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* MAPPING */}
                        {products?.map((item,index) => (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td><img src={item?.image} alt="" width={'100rem'} /></td>
                            <td>{item?.name}</td>
                            <td>{item?.stock}</td>
                            <td className="tdPrice">{item?.price}</td>
                            <td style={{maxWidth:'20rem'}}>{item?.desc}</td>
                            <td className="text-center">
                                <Link to={"/add-product/" + item.id}
                                    className=" text-decoration-none me-1 ">
                                    <Button variant="success" className="ms-1">Update</Button>
                                </Link>
                                <Button variant="danger" className="ms-1" onClick={ () => handleDelete(item.id)} >Delete</Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            {/* <ModalTransaction showTransaction={showTransaction} close={handleClose}/> */}
        </Container>
    )
}

export default ListProduct