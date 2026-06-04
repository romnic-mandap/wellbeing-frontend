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
import { yearMonth, yearMonthDay, incrementYearMonth, decrementYearMonth, yearMonthPlusDay } from '../../util/helperfunctions'
import { update, reset, updateDates, updatePage } from './thoughtMapSlice'
import PaginationComponent from '../../components/PaginationComponent'
import ThoughtMapThoughtRecordItem from '../../components/ThoughtMapThoughtRecordItem'

export default function ThoughtMap() {
  const navigate = useNavigate()

  const moodHashMap = new Map()
  moodHashMap.set("AFRAID", -1)
  moodHashMap.set("ANGRY", -3)
  moodHashMap.set("ANXIOUS", -1)
  moodHashMap.set("ASHAMED", -3)
  moodHashMap.set("CHEERFUL", 5)
  moodHashMap.set("CONTENT", 3)
  moodHashMap.set("DEPRESSED", -3)
  moodHashMap.set("DISAPPOINTED", -3)
  moodHashMap.set("DISGUSTED", -3)
  moodHashMap.set("GRATEFUL", 3)
  moodHashMap.set("EAGER", 1)
  moodHashMap.set("EMBARRASSED", -1)
  moodHashMap.set("ENRAGED", -5)
  moodHashMap.set("EXCITED", 5)
  moodHashMap.set("FRIGHTENED", -3)
  moodHashMap.set("FRUSTRATED", -3)
  moodHashMap.set("GRIEF", -5)
  moodHashMap.set("GUILTY", -3)
  moodHashMap.set("HAPPY", 3)
  moodHashMap.set("HUMILIATED", -5)
  moodHashMap.set("HURT", -1)
  moodHashMap.set("INSECURE", -1)
  moodHashMap.set("IRRITATED", -1)
  moodHashMap.set("LOVING", 5)
  moodHashMap.set("MAD", -3)
  moodHashMap.set("NERVOUS", -1)
  moodHashMap.set("PANIC", -5)
  moodHashMap.set("PROUD", 3)
  moodHashMap.set("SAD", -1)
  moodHashMap.set("SCARED", -3)
  const getMoodBadgeColorClass = (mood) => {
    switch (true) {
      case moodHashMap.get(mood) > 0:
        return "badge rounded-pill bg-primary me-1"
      case moodHashMap.get(mood) < 0:
        return "badge rounded-pill bg-secondary me-1"
    }
  }



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

  const [selectedYearMonth, setSelectedYearMonth] = useState()  // yyyy-mm
  useEffect(() => {
    setSelectedYearMonth(yearMonth())
  }, [])
  const incrementSelectedYearMonth = () => {
    console.log(incrementYearMonth(selectedYearMonth))
    setSelectedYearMonth(incrementYearMonth(selectedYearMonth))
  }
  const decrementSelectedYearMonth = () => {
    console.log(decrementYearMonth(selectedYearMonth))
    setSelectedYearMonth(decrementYearMonth(selectedYearMonth))
  }

  const [monthMoodsList, setMonthMoodsList] = useState()
  useEffect(() => {
    if (selectedYearMonth === null) {
      return
    }
    setErrors(null)
    setLoading(true)
    if (jwt === null || jwt === undefined) {
      setLoading(false)
      return
    }

    fetch(config.BASE_URL + "/thought-records/month-moods?" + new URLSearchParams({
      d: selectedYearMonth
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
      setMonthMoodsList(data)
      console.log(data)
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }, [selectedYearMonth])

  const [moodScoreList, setMoodScoreList] = useState()
  useEffect(() => {
    if (selectedYearMonth === null) {
      return
    }
    setErrors(null)
    setLoading(true)
    setThoughtRecordObjList(null)
    setMoodScoreList(null)
    if (jwt === null || jwt === undefined) {
      setLoading(false)
      return
    }

    fetch(config.BASE_URL + "/thought-records/month-mood-scores-list?" + new URLSearchParams({
      d: selectedYearMonth
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
  }, [selectedYearMonth])

  const getColorClass = (score) => {
    switch (true) {
      case score == -9000:
        return "card m-0"
      case score == 0:
        return "card border-secondary m-0"
      case (score < 1.0 && score > -1.0):
        return "card border-primary m-0 bg-light"
      case (score <= -7.5):
        return "card border-primary m-0 bg-danger"
      case (score <= -1.0):
        return "card border-primary m-0 bg-secondary"
      case (score >= 7.5):
        return "card border-primary m-0 bg-primary"
      case (score >= 1.0):
        return "card border-primary m-0 bg-info"
    }
  }

  const getMonthDayScore = (ms) => {
    switch (true) {
      case ms == -9000:
        return ""
      default:
        return Math.round(ms)
    }

  }


  const foPageCurrent = useSelector((state) => state.thoughtMap.pageCurrent)
  const foPagesCount = useSelector((state) => state.thoughtMap.pagesCount)
  const dispatch = useDispatch()
  const [thoughtRecordObjList, setThoughtRecordObjList] = useState()

  const handleMonthMoodOnClick = (mood) => {
    setErrors(null)
    setLoading(true)
    if (jwt === null || jwt === undefined) {
      setLoading(false)
      return
    }

    fetch(config.BASE_URL + "/thought-records/month-moods-list?" + new URLSearchParams({
      d: selectedYearMonth,
      m: mood
    }), {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "GET"
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      }
      return res.json().then(data => {
        throw data
      })
    }).then(data => {
      setThoughtRecordObjList(data)
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }

  const handleOnClick = (ms, index) => {
    var skips = 0
    for (let i = 0; i < 42; i++)
      if (moodScoreList[i] == -9000)
        skips++
      else
        break

    if (ms === -9000) return
    var day = index - skips + 1

    setErrors(null)
    setLoading(true)
    if (jwt === null || jwt === undefined) {
      setLoading(false)
      return
    }

    var startDateValue = yearMonthPlusDay(selectedYearMonth, day)
    var endDateValue = yearMonthPlusDay(selectedYearMonth, day)

    fetch(config.BASE_V2_URL + "/thought-records?" + new URLSearchParams({
      sd: startDateValue,
      ed: endDateValue,
      s: 24
    }), {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "GET"
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      }
      return res.json().then(data => {
        throw data
      })
    }).then(data => {
      setThoughtRecordObjList(data.content)
      dispatch(updatePage({ pageCurrent: data.pageable.pageNumber + 1, pagesCount: data.totalPages }))
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }

  const thoughtMap = (<>
    <div className="pt-3">
      <p className="fs-3">Mood Map</p>
    </div>


    <div className="card">
      <div className="card-box">
        <div className="input-group mb-2">
          <button className="btn btn-primary" type="button" onClick={() => decrementSelectedYearMonth()}>Prev</button>
          <span className="flex-grow-1 d-flex align-items-center justify-content-center">{selectedYearMonth}</span>
          <button className="btn btn-primary" type="button" onClick={() => incrementSelectedYearMonth()}>Next</button>
        </div>
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
                return <td className="col-1" onClick={() => handleOnClick(ms, index)}><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
              })
            }
          </>}
        </tr>
        <tr>
          {(moodScoreList) && <>
            {
              moodScoreList.slice(7, 14).map((ms, index) => {
                return <td className="col-1" onClick={() => handleOnClick(ms, 7 + index)}><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
              })
            }
          </>}
        </tr>
        <tr>
          {(moodScoreList) && <>
            {
              moodScoreList.slice(14, 21).map((ms, index) => {
                return <td className="col-1" onClick={() => handleOnClick(ms, 14 + index)}><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
              })
            }
          </>}
        </tr>
        <tr>
          {(moodScoreList) && <>
            {
              moodScoreList.slice(21, 28).map((ms, index) => {
                return <td className="col-1" onClick={() => handleOnClick(ms, 21 + index)}><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
              })
            }
          </>}
        </tr>
        <tr>
          {(moodScoreList) && <>
            {
              moodScoreList.slice(28, 35).map((ms, index) => {
                return <td className="col-1" onClick={() => handleOnClick(ms, 28 + index)}><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
              })
            }
          </>}
        </tr>
        <tr>
          {(moodScoreList) && <>
            {
              moodScoreList.slice(35, 42).map((ms, index) => {
                return <td className="col-1" onClick={() => handleOnClick(ms, 35 + index)}><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
              })
            }
          </>}
        </tr>

      </tbody>
    </Table>

    {(monthMoodsList) && (<div className="card"><div className="card-box">
      <p>Mood(s): </p>
      <div className="d-flex flex-row justify-content-start align-items-start flex-wrap mb-1">
        {monthMoodsList?.map((m,index) => {
          return <h6><span className={getMoodBadgeColorClass(m)} onClick={()=>handleMonthMoodOnClick(m)}>{m}</span></h6>
        })}
      </div>
    </div></div>)}

    {(loading) && (
      <div className="d-flex justify-content-center col-12 flex-grow-1">
        <div className="spinner-grow text-secondary">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>

    )}

    {(errors) && (
      <div className="alert alert-danger">
        {errors['error(s)']?.map(e => { return <p>{e}</p> })}
      </div>
    )}

    {!thoughtRecordObjList ? null : (
      <>
        {
          thoughtRecordObjList.map((tro, index) => {
            if (index > 0 && tro.date !== thoughtRecordObjList[index - 1].date) {
              return <ThoughtMapThoughtRecordItem thoughtRecordObj={tro} />
            } else {
              return <ThoughtMapThoughtRecordItem thoughtRecordObj={tro} />
            }

          }
          )
        }
      </>
    )
    }

  </>)

  return (
    <>
      <PrivateNavbar active="moodmap" />
      <Container fluid>
        <Row>
          <Col lg="3" className="border d-none d-lg-block bg-light position-fixed p-0">
            <PrivateSidebar active="moodmap" />
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