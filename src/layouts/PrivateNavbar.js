import React from 'react'
import { useNavigate, Link } from "react-router-dom"
import { useState } from 'react';
import "./PrivateNavbar.css"
import { config } from '../constants/Constants'
import Container from 'react-bootstrap/Container';
import { List } from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PrivateSidebar from './PrivateSidebar';

export default function PrivateNavbar({ active = "meals" }) {
  const navigate = useNavigate()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem(config.WELLBEINGv1_JWT, null)
    navigate("/signin")
  }

  return (
    <>
      <Navbar sticky="top" className="navbar navbar-dark bg-primary">
        <Container fluid>
          <Button variant="primary" className="d-lg-none" onClick={handleShow}>
            <List />
          </Button>
          <Navbar.Brand className="navbar-brand sidebar-brand flex-grow-1">
            <Link to="/" id="navheadertext">Wellbeing</Link> 
            <span>_-_{active}</span>
          </Navbar.Brand>
          
          <form className="d-flex" onSubmit={handleSubmit}>
            <button className="btn btn-primary" type="submit">Sign out</button>
          </form>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} className='bg-light'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Wellbeing</Offcanvas.Title>
        </Offcanvas.Header>
        <PrivateSidebar active={active} />

      </Offcanvas>
    </>



  )
}
