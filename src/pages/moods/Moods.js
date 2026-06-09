import "./Moods.css"
import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import PrivateNavbar from '../../layouts/PrivateNavbar'
import PrivateSidebar from '../../layouts/PrivateSidebar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { config } from '../../constants/Constants'
import jwt_decode from "jwt-decode"
import toast, { Toaster } from 'react-hot-toast'

export default function Moods() {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [jwt, setJwt] = useState()
  const [errors, setErrors] = useState()
  const [decodedJwtSub, setDecodedJwtSub] = useState()
  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem(config.WELLBEINGv1_JWT))
    if (jwt) {
      let decodedJwt = jwt_decode(jwt)
      let currentDate = new Date()
      if (decodedJwt.exp * 1000 < currentDate.getTime()) {
        localStorage.setItem(config.WELLBEINGv1_JWT, null)
        navigate("/signin")
      } else {
        setJwt(jwt)
        setDecodedJwtSub(decodedJwt.sub)
      }
    } else {
      navigate("/signin")
    }
  }, [])

  const moodsUI = (<>
    <p className="fs-3">Moods</p>
    <p>Under construction...</p>
  </>)
  return (<>
    <PrivateNavbar active="moods" />
    <Container fluid>
      <Row>
        <Col lg="3" className="border d-none d-lg-block bg-light position-fixed p-0">
          <PrivateSidebar active="moods" />
        </Col>
        <Col className="col-lg-9 offset-lg-3 col-md-12 offset-md-0">
          {moodsUI}
          <Toaster />
        </Col>
      </Row>
    </Container>
  </>)
}