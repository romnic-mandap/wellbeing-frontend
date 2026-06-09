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
  const navigate = useNavigate()

  const [errors, setErrors] = useState()
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

  const oldPasswordElement = useRef()
  const passwordElement = useRef()
  const confirmPasswordElement = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(null)

    const oldPassword = oldPasswordElement.current.value
    const password = passwordElement.current.value
    const confirmPassword = confirmPasswordElement.current.value

    fetch(config.BASE_URL + "/user/reset-password", {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "PUT",
      body: JSON.stringify({
        "oldPassword": oldPassword,
        "password": password,
        "passwordConfirmation": confirmPassword
      })
    }
    ).then(res => {
      if (res.status === 200) {
        oldPasswordElement.current.value = ""
        passwordElement.current.value = ""
        confirmPasswordElement.current.value = ""
        toast.success("password updated")
        setErrors(null)
        return
      }
      return res.json().then(data => {
        throw data
      })
    }).catch(err => {
      setErrors(err)
    })
  }

  const profileUI = (<>
    <p className="fs-3">Profile</p>

    <hr />
    <p className="fs-5">Reset Password</p>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label for="inputOldPassword" className="form-label">Old Password:</label>
        <input type="password" className="form-control" id="inputOldPassword" ref={oldPasswordElement} />
      </div>
      <div className="mb-3">
        <label for="inputPassword1" className="form-label">New Password:</label>
        <input type="password" className="form-control" id="inputPassword1" ref={passwordElement} />
        <p className="form-text">must be between 6 and 128 characters</p>
      </div>
      <div className="mb-3">
        <label for="inputPassword2" className="form-label">Confirm Password:</label>
        <input type="password" className="form-control" id="inputPassword2" ref={confirmPasswordElement} />
        <p className="form-text">must be between 6 and 128 characters</p>
      </div>
      <button type="submit" className="btn btn-primary mb-3">Submit</button>
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
          {profileUI}
          <Toaster />
        </Col>
      </Row>
    </Container>
  </>)
}



