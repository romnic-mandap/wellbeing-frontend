import React from 'react'
import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import "./PrivateNavbar.css"
import { config } from '../constants/Constants'
import Container from 'react-bootstrap/Container';
import { List } from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PrivateSidebar from './PrivateSidebar';
import jwt_decode from "jwt-decode"
import exit_door from '../assets/icons/exit-door.svg';
import character from '../assets/icons/character.svg';
import king from '../assets/icons/king.svg';

export default function PrivateNavbar({ active = "meals" }) {
  const navigate = useNavigate()

  const [show, setShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem(config.WELLBEINGv1_JWT))
    if (jwt) {
      let decodedJwt = jwt_decode(jwt)
      let currentDate = new Date()
      if (decodedJwt.exp * 1000 < currentDate.getTime()) {
        localStorage.setItem(config.WELLBEINGv1_JWT, null)
        navigate("/signin")
      } else {
        if (decodedJwt.rle == "ROLE_ADMIN") {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
      }
    } else {
      navigate("/signin")
    }
  }, [])

  const handleSubmit = () => {
    localStorage.setItem(config.WELLBEINGv1_JWT, null)
    navigate("/signin")
  }

  const handleProfile = () => {
    navigate("/profile")
  }

  const handleAdmin = () => {
    navigate("/admin")
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
          </Navbar.Brand>

          <div className="d-flex">
            {(isAdmin) ? <button className="btn btn-primary" onClick={() => handleAdmin()}><img src={king} alt="ADMIN" width="32" height="32" /></button> : null}
            <button className="btn btn-primary" onClick={() => handleProfile()}><img src={character} alt="Profile" width="32" height="32" /></button>
            <button className="btn btn-primary" onClick={() => handleSubmit()}><img src={exit_door} alt="Sign out" width="32" height="32" /></button>
          </div>
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
