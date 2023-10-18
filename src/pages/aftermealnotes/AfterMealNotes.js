import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { compareByIdDesc } from '../../util/helperfunctions'
import PrivateNavbar from '../../layouts/PrivateNavbar'
import "./AfterMealNotes.css"
import { useSelector, useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PrivateSidebar from '../../layouts/PrivateSidebar'
import { config } from '../../constants/Constants'
import jwt_decode from "jwt-decode"
import AfterMealNoteItem from '../../components/AfterMealNoteItem'
import { dayOfWeek, dayOfWeekShort, daysBetweenDates, dateFromDate } from '../../util/helperfunctions'
import { update, reset, updateDates, updatePage } from './afterMealNotesSlice'
import PaginationComponent from '../../components/PaginationComponent'

export default function AfterMealNotes() {
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

  const searchElement = useRef()
  const startDateElement = useRef()
  const endDateElement = useRef()
  const startTimeElement = useRef()
  const endTimeElement = useRef()


  const [selectedDateRange, setSelectedDateRange] = useState('Custom Date Range')
  const filterOptions = useSelector((state) => state.afterMealNote)
  const foPageCurrent = useSelector((state) => state.afterMealNote.pageCurrent)
  const foPagesCount = useSelector((state) => state.afterMealNote.pagesCount)

  useEffect(() => {
    searchElement.current.value = filterOptions.search
    startDateElement.current.value = filterOptions.startDate
    endDateElement.current.value = filterOptions.endDate
    startTimeElement.current.value = filterOptions.startTime
    endTimeElement.current.value = filterOptions.endTime

    if (filterOptions.startDate == filterOptions.endDate && filterOptions.startDate) {
      setSelectedDateRange(filterOptions.startDate + ", " + dayOfWeekShort(filterOptions.startDate))
    } else if (filterOptions.startDate != filterOptions.endDate && filterOptions.startDate && filterOptions.endDate) {
      setSelectedDateRange(filterOptions.startDate + ", " + dayOfWeekShort(filterOptions.startDate) + " - " + filterOptions.endDate + ", " + dayOfWeekShort(filterOptions.endDate))
    } else if (filterOptions.startDate && !filterOptions.endDate) {
      setSelectedDateRange(filterOptions.startDate + ", " + dayOfWeekShort(filterOptions.startDate) + " onwards")
    } else if (!filterOptions.startDate && filterOptions.endDate) {
      setSelectedDateRange("up through " + filterOptions.endDate + ", " + dayOfWeekShort(filterOptions.endDate))
    } else {
      setSelectedDateRange('Custom Date Range')
    }
  }, [filterOptions])


  const dispatch = useDispatch()

  const [afterMealNotesObjList, setAfterMealNotesObjList] = useState()
  useEffect(() => {
    setErrors(null)
    setLoading(true)
    setAfterMealNotesObjList(null)
    if (jwt === null || jwt === undefined) {
      setLoading(false)
      return
    }

    var searchValue = filterOptions.search
    var startDateValue = filterOptions.startDate
    var endDateValue = filterOptions.endDate
    var startTimeValue = filterOptions.startTime
    var endTimeValue = filterOptions.endTime
    var pageCurrent = filterOptions.pageCurrent - 1

    fetch(config.BASE_V2_URL + "/after-meal-notes?" + new URLSearchParams({
      q: searchValue,
      sd: startDateValue,
      ed: endDateValue,
      st: startTimeValue,
      et: endTimeValue,
      p: pageCurrent
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
      setAfterMealNotesObjList(data.content)
      dispatch(updatePage({ pageCurrent: data.pageable.pageNumber + 1, pagesCount: data.totalPages }))
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }, [jwt])


  const [isExpandedFilter, setIsExpandedFilter] = useState(false)

  const handleMoveDateRangePrev = (e) => {
    if (filterOptions.startDate && filterOptions.endDate) {
      var days = daysBetweenDates(filterOptions.startDate, filterOptions.endDate)
      if (days == 0) {
        const payload = {
          startDate: dateFromDate(filterOptions.startDate, -1),
          endDate: dateFromDate(filterOptions.startDate, -1)
        }
        dispatch(updateDates(payload))
      } else {
        const payload = {
          startDate: dateFromDate(filterOptions.startDate, (-1 * days) - 1),
          endDate: dateFromDate(filterOptions.startDate, -1)
        }
        dispatch(updateDates(payload))
      }

    }

  }
  const handleMoveDateRangeNext = (e) => {
    if (filterOptions.startDate && filterOptions.endDate) {
      var days = daysBetweenDates(filterOptions.startDate, filterOptions.endDate)
      if (days == 0) {
        const payload = {
          startDate: dateFromDate(filterOptions.startDate, 1),
          endDate: dateFromDate(filterOptions.startDate, 1)
        }
        dispatch(updateDates(payload))


      } else {
        const payload = {
          startDate: dateFromDate(filterOptions.endDate, 1),
          endDate: dateFromDate(filterOptions.endDate, days + 1)
        }
        dispatch(updateDates(payload))


      }

    }

  }

  const handleClearFilters = (e) => {
    e.preventDefault()
    //searchElement.current.value = ""
    startDateElement.current.value = ""
    endDateElement.current.value = ""
    startTimeElement.current.value = ""
    endTimeElement.current.value = ""

    //dispatch(reset())
  }

  const handleSearch = (e) => {
    if (e) {
      e.preventDefault()
    }

    setErrors(null)
    setLoading(true)
    setAfterMealNotesObjList(null)

    const search = searchElement.current.value
    var searchValue = search || ""
    // filter values
    const startDate = startDateElement.current.value
    const endDate = endDateElement.current.value
    const startTime = startTimeElement.current.value
    const endTime = endTimeElement.current.value

    var startDateValue = startDate || ""
    var endDateValue = endDate || ""
    var startTimeValue = startTime || ""
    var endTimeValue = endTime || ""

    const payload = {
      search: searchValue,
      startDate: startDateValue,
      endDate: endDateValue,
      startTime: startTimeValue,
      endTime: endTimeValue,
    }
    dispatch(update(payload))


    fetch(config.BASE_V2_URL + "/after-meal-notes?" + new URLSearchParams({
      q: searchValue,
      sd: startDateValue,
      ed: endDateValue,
      st: startTimeValue,
      et: endTimeValue
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
      setAfterMealNotesObjList(data.content)
      dispatch(updatePage({ pageCurrent: data.pageable.pageNumber + 1, pagesCount: data.totalPages }))
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }

  const getDifferentPage = (page) => {
    setErrors(null)
    setLoading(true)
    setAfterMealNotesObjList(null)

    var searchValue = filterOptions.search
    var startDateValue = filterOptions.startDate
    var endDateValue = filterOptions.endDate
    var startTimeValue = filterOptions.startTime
    var endTimeValue = filterOptions.endTime

    fetch(config.BASE_V2_URL + "/after-meal-notes?" + new URLSearchParams({
      q: searchValue,
      sd: startDateValue,
      ed: endDateValue,
      st: startTimeValue,
      et: endTimeValue,
      p: page - 1
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
      setAfterMealNotesObjList(data.content)
      dispatch(updatePage({ pageCurrent: data.pageable.pageNumber + 1, pagesCount: data.totalPages }))
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })

  }

  const setPageFunction = (page) => {
    if (foPageCurrent != page) {
      getDifferentPage(page)
    }
  }

  const afterMealNotes = (
    <>
      <div className="card">
        <div className="card-header" />

        <fieldset disabled={loading}>
          <form onSubmit={handleSearch}>
            {/*
                  <div className="input-group mb-3 card-box">
                    <button className="btn btn-primary" type="button">Prev</button>
                    <select className="form-select">
                      <option selected>Day</option>
                      <option>Week</option>
                      <option>Custom</option>
                    </select>
                    <input type="date" className="form-control" />
                    <button className="btn btn-primary" type="button">Next</button>
                  </div>
                  <div className="input-group mb-3 card-box-mid">
                      
                      <input type="date" className="form-control" ref={startDateElement} />
                      <span className="input-group-text">-</span>
                      <input type="date" className="form-control" ref={endDateElement} />
                    </div>
                  */}



            <div className="input-group mb-3 card-box">
              <span className="input-group-text flex-grow-1"><div className="text-center date-range-display">{selectedDateRange}</div></span>
              <button className="btn btn-primary" type="button" onClick={handleMoveDateRangePrev}>Prev</button>
              <button className="btn btn-primary" type="button" onClick={handleMoveDateRangeNext}>Next</button>
            </div>

            <div className="input-group mb-3 card-box-mid">
              <input type="text" ref={searchElement} className="form-control" placeholder="Search meal and notes... " />
              {/*<button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseForm">fltr</button>*/}
              <button className="btn btn-outline-secondary" type="button" onClick={() => { searchElement.current.value = '' }}>X</button>
              <button className="btn btn-primary" type="button" onClick={() => { setIsExpandedFilter(prevVal => !prevVal) }}>fltr</button>
              <button className="btn btn-primary" type="submit">Search</button>
            </div>

            {/* search filters collapsible */}
            <div className={isExpandedFilter ? "collapse show" : "collapse"}>
              <div className="input-group mb-3 card-box-mid">

                <input type="date" className="form-control" ref={startDateElement} />
                <span className="input-group-text">-</span>
                <input type="date" className="form-control" ref={endDateElement} />
              </div>
              <div className="input-group mb-3 card-box-mid">
                <input type="time" className="form-control" ref={startTimeElement} />
                <span className="input-group-text">-</span>
                <input type="time" className="form-control" ref={endTimeElement} />
                <button className="btn btn-outline-secondary" type="button" onClick={handleClearFilters}>Clear Filters...</button>
              </div>

            </div>
          </form>



        </fieldset>
      </div>

      <PaginationComponent
        pagenum={foPageCurrent}
        pagetotal={foPagesCount}
        setpagefunction={(p) => setPageFunction(p)}
      />

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

      {!afterMealNotesObjList ? null : (
        <>
          {
            afterMealNotesObjList.map((amno, index) => {
              if (index > 0 && amno.date !== afterMealNotesObjList[index - 1].date) {
                return <><hr className="hr hrc" /><AfterMealNoteItem afterMealNoteObj={amno} /></>
              } else {
                return <AfterMealNoteItem afterMealNoteObj={amno} />
              }

            }
            )
          }
        </>
      )
      }

      <PaginationComponent
        pagenum={foPageCurrent}
        pagetotal={foPagesCount}
        setpagefunction={(p) => setPageFunction(p)}
      />
    </>
  )

  return (
    <>
      <PrivateNavbar active="aftermealnotes" />
      <Container fluid>
        <Row>
          <Col lg="3" className="border d-none d-lg-block bg-light position-fixed p-0">
            <PrivateSidebar active="aftermealnotes" />
          </Col>
          <Col className="col-lg-9 offset-lg-3 col-md-12 offset-md-0">
            {afterMealNotes}
          </Col>
        </Row>
      </Container>
    </>
  )
}


