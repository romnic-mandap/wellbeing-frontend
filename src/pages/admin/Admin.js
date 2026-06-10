import "./Admin.css"
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

export default function Admin() {
  const navigate = useNavigate()

  const [errors, setErrors] = useState()
  const [generatedPassword, setGeneratedPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [jwt, setJwt] = useState()
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

  const usernameElement = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(null)

    const username = usernameElement.current.value

    fetch(config.BASE_URL + "/user/admin/reset-user-password", {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "PUT",
      body: JSON.stringify({
        "username": username
      })
    }
    ).then(res => {
      if (res.status === 200) {
        return res.json()
      }
      return res.json().then(data => {
        throw data
      })
    }).then(data => {
      usernameElement.current.value = ""
      setGeneratedPassword(username+" "+data.generatedPassword)
      toast.success("password reset")
      setErrors(null)
    }).catch(err => {
      setErrors(err)
    })
  }

  const adminUI = (<>
    <p className="fs-3">Admin</p>
    <hr />
    <p className="fs-5">Reset User Password</p>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label for="inputUsername" className="form-label">Username:</label>
        <input type="text" className="form-control" id="inputUsername" ref={usernameElement} />
      </div>
      <button type="submit" className="btn btn-primary mb-3">Submit</button>
      {(generatedPassword) && (
        <div className="alert alert-success">
          {generatedPassword}
        </div>
      )}
      {(errors) && (
        <div className="alert alert-danger">
          {errors['error(s)']?.map(e => { return <p>{e}</p> })}
        </div>
      )}
    </form>
  </>)
  return (<>
    <PrivateNavbar active="" />
    <Container fluid>
      <Row>
        <Col lg="3" className="border d-none d-lg-block bg-light position-fixed p-0">
          <PrivateSidebar active="" />
        </Col>
        <Col className="col-lg-9 offset-lg-3 col-md-12 offset-md-0">
          {adminUI}
          <Toaster />
        </Col>
      </Row>
    </Container>
  </>)
}