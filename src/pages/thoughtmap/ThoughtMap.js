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
import { yearMonth } from '../../util/helperfunctions'

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

  const [moodScoreList, setMoodScoreList] = useState()
  useEffect(() => {
    setErrors(null)
    setLoading(true)
    setMoodScoreList(null)
    if (jwt === null || jwt === undefined) {
      setLoading(false)
      return
    }

    fetch(config.BASE_URL + "/thought-records/month-mood-scores-list?" + new URLSearchParams({
      d: yearMonth()
    }), {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "Get"
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      }
      return res.json().then(data => {
        throw data
      })
    }).then(data => {
      setMoodScoreList(data)
      console.log(data)
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }, [jwt])

  const getColorClass = (score) => {
    switch (true) {
      case score == -9000:
        return "card border-primary m-1"
      case (score < 1.0 && score > -1.0):
        return "card border-primary m-1 bg-light"
      case (score <= -7.5):
        return "card border-primary m-1 bg-danger"
      case (score <= -1.0):
        return "card border-primary m-1 bg-secondary"
      case (score >= 7.5):
        return "card border-primary m-1 bg-primary"
      case (score >= 1.0):
        return "card border-primary m-1 bg-info"
    }
  }

  const thoughtMap = (<>
    <div className="pt-3"></div>

    <div className="card">
      <div className="card-body text-center">
        {yearMonth()}
      </div>
    </div>
    <Table className="text-end" bordered size="sm">
      <tbody>
        <tr>
          <td className="col-1 text-center">S</td>
          <td className="col-1 text-center">M</td>
          <td className="col-1 text-center">T</td>
          <td className="col-1 text-center">W</td>
          <td className="col-1 text-center">T</td>
          <td className="col-1 text-center">F</td>
          <td className="col-1 text-center">S</td>
        </tr>
        <tr>
          {(moodScoreList) && <>
            {
              moodScoreList.slice(0, 7).map((ms, index) => {
                return <td className="col-1"><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
              })
            }
          </>}
        </tr>
        <tr>
          {(moodScoreList) && <>
            {
              moodScoreList.slice(7, 14).map((ms, index) => {
                return <td className="col-1"><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
              })
            }
          </>}
        </tr>
        <tr>
          {(moodScoreList) && <>
            {
              moodScoreList.slice(14, 21).map((ms, index) => {
                return <td className="col-1"><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
              })
            }
          </>}
        </tr>
        <tr>
          {(moodScoreList) && <>
            {
              moodScoreList.slice(21, 28).map((ms, index) => {
                return <td className="col-1"><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
              })
            }
          </>}
        </tr>
        <tr>
          {(moodScoreList) && <>
            {
              moodScoreList.slice(28, 35).map((ms, index) => {
                return <td className="col-1"><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
              })
            }
          </>}
        </tr>
        <tr>
          {(moodScoreList) && <>
            {
              moodScoreList.slice(35, 42).map((ms, index) => {
                return <td className="col-1"><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
              })
            }
          </>}
        </tr>

      </tbody>
    </Table>

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