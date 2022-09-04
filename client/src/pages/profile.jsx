import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Navbar from '../components/navbar/navbar'
import PhotoProfile from '../assets/img/photoProfile.svg'
import barcode from '../assets/img/barcode.png'
import LogoBrown from '../assets/img/logoBrown.svg'
import Coffee from '../assets/img/coffee2.svg'

export default function Profile() {
    return (
        <div>
        <Navbar />
        <Container className='mt-5 pt-5'>
            <Row>
            <Col>
            <div>
                <p className='fw-bold fs-2 mb-3 mt-3 ps-5' style={{color:'#613D2B'}}>My Profile</p>
            </div>
            <div className='d-flex ps-5'>
                <img src={PhotoProfile} alt='' style={{width:'9rem', borderRadius:'3px'}} />
                <div className='ms-5'>
                <div>
                    <p className='fs-4 fw-bold'>Name :</p>
                    <p>Radif Ganteng</p>
                </div>
                <div>
                    <p className='fs-4 fw-bold'>Email :</p>
                    <p>radifganteng@gmail.com</p>
                </div>
                </div>
            </div>
            </Col>
            <Col>
            <div>
                <div>
                <p className='fw-bold fs-2 mb-3 mt-3 ps-3' style={{color:'#613D2B'}}>My Transaction</p>
                </div>
                <div>
                <div className='p-3 between' style={{width:'100%', backgroundColor:'#F6E6DA'}}>
                    <div className='d-flex' >
                    <img src={Coffee} alt='product' style={{width:'30%',height:'80%',borderRadius:'5px'}} />
                    <div className='ms-3'>
                        <h5 className='mb-0 colorPrimary fw-bold'>Guatemala Beans</h5>
                        <p className='colorSecondary'><span className='colorPrimary fw-bold'>Saturday, </span> 25 agustus 2022</p>
                        <p className='mb-0 colorSecondary'>Price : Rp. 300.900,-</p>
                        <p className='mb-0 colorSecondary'>Qty : 2</p>
                        <h6 className='mb-0 colorSecondary fw-bold'>Subtotal : Rp.300.900,-</h6>
                    </div>
                    <div>
                    </div>
                    </div>
                    <div className='flexcolend'>
                        <img src={LogoBrown} alt='product' style={{width:'50%',borderRadius:'5px'}} className='mb-2' />
                        <img src={barcode} alt='product' style={{width:'50%',borderRadius:'5px'}} className='mb-2' />
                        <p className='completed px-4 py-1' style={{backgroundColor:'#613D2B', color:'white', borderRadius:'3px'}}>Completed</p>
                    </div>
                </div>
                </div>
            </div>
            </Col>
            </Row>
        </Container>
        </div>
    )
}
