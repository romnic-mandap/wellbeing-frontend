import "./ThoughtMap.css"
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
import { useSelector, useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'

export default function ThoughtMap() {
  const navigate = useNavigate()

  const [errors, setErrors] = useState()
  const [loading, setLoading] = useState(false)
  const [jwt, setJwt] = useState()
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
      }
    } else {
      navigate("/signin")
    }
  }, [])


  const thoughtMap = (<>
    <div className="pt-3"></div>

    {(loading) && (
      <div class="d-flex justify-content-center col-12 flex-grow-1">
        <div className="spinner-grow text-secondary">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

    )}

    {(errors) && (
      <div className="alert alert-danger">
        {errors['error(s)']?.map(e => { return <p>{e}</p> })}
      </div>
    )}

  </>)

  return (
    <>
      <PrivateNavbar active="thoughtmap" />
      <Container fluid>
        <Row>
          <Col lg="3" className="border d-none d-lg-block bg-light position-fixed p-0">
            <PrivateSidebar active="thoughtmap" />
          </Col>
          <Col className="col-lg-9 offset-lg-3 col-md-12 offset-md-0">
            {thoughtMap}
            <Toaster />
          </Col>
        </Row>
      </Container>
    </>
  )
}