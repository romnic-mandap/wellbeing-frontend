import "./Profile.css"
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

export default function Profile() {
  const profileUI = (<>
    <p className="fs-3">Profile</p>
    <p>Under construction...</p>
  </>)
  return (<>
    <PrivateNavbar active="" />
    <Container fluid>
      <Row>
        <Col lg="3" className="border d-none d-lg-block bg-light position-fixed p-0">
          <PrivateSidebar active="" />
        </Col>
        <Col className="col-lg-9 offset-lg-3 col-md-12 offset-md-0">
          {profileUI}
          <Toaster />
        </Col>
      </Row>
    </Container>
  </>)
}



