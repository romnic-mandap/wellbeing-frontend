import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { compareByIdDesc } from '../../util/helperfunctions'
import PrivateNavbar from '../../layouts/PrivateNavbar'
import { dayOfWeek, dayOfWeekShort, daysBetweenDates, dateFromDate } from '../../util/helperfunctions'
import jwt_decode from "jwt-decode"
import MealItem from '../../components/MealItem'
import { config } from '../../constants/Constants'
import "./Meals.css"
import { useSelector, useDispatch } from 'react-redux'
import { update, reset, updateDates, updatePage } from './mealSlice'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PrivateSidebar from '../../layouts/PrivateSidebar'
import PaginationComponent from '../../components/PaginationComponent'

import { useGetPokemonByNameQuery } from '../../services/pokemon'

export default function Meals() {
  const navigate = useNavigate()

  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery('pikachu')
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  const [selectedDateRange, setSelectedDateRange] = useState('Custom Date Range')

  const filterOptions = useSelector((state) => state.meal)

  const foPageCurrent = useSelector((state) => state.meal.pageCurrent)
  const foPagesCount = useSelector((state) => state.meal.pagesCount)

  useEffect(() => {
    searchElement.current.value = filterOptions.search
    startDateElement.current.value = filterOptions.startDate
    endDateElement.current.value = filterOptions.endDate
    startTimeElement.current.value = filterOptions.startTime
    endTimeElement.current.value = filterOptions.endTime
    selectedMealElement.current.value = filterOptions.selectedMeal == "" ? "All Meals..." : filterOptions.selectedMeal

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

  const [isExpandedFilter, setIsExpandedFilter] = useState(false)

  const [errors, setErrors] = useState()

  const [loading, setLoading] = useState(false)

  const searchElement = useRef()
  const startDateElement = useRef()
  const endDateElement = useRef()
  const startTimeElement = useRef()
  const endTimeElement = useRef()
  const selectedMealElement = useRef()

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

  const [mealObjList, setMealObjList] = useState()
  useEffect(() => {
    setErrors(null)
    setLoading(true)
    if (jwt === null || jwt === undefined) {
      setLoading(false)
      return
    }

    var searchValue = filterOptions.search
    var startDateValue = filterOptions.startDate
    var endDateValue = filterOptions.endDate
    var startTimeValue = filterOptions.startTime
    var endTimeValue = filterOptions.endTime
    var selectedMealValue = filterOptions.selectedMeal === "All Meals..." ? "" : filterOptions.selectedMeal.toLowerCase()
    var pageCurrent = filterOptions.pageCurrent - 1

    fetch(config.BASE_V2_URL + "/meals?" + new URLSearchParams({
      q: searchValue,
      m: selectedMealValue,
      sd: startDateValue,
      ed: endDateValue,
      st: startTimeValue,
      et: endTimeValue,
      p: pageCurrent,
      s: config.MEALS_PAGE_SIZE
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
      let newdata = data.content.map(mobj => {
        return {
          ...mobj,
          afterMealNotes: [...mobj.afterMealNotes.sort(compareByIdDesc)]
        }
      })
      setMealObjList(newdata)
      dispatch(updatePage({pageCurrent: data.pageable.pageNumber + 1, pagesCount: data.totalPages}))
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }, [jwt])

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

  /*
  const handleMovePagePrev = (e) => {
    if(filterOptions.pageCurrent > 0){

    }
  }
  const handleMovePageNext = (e) => {

  }
  */

  const handleClearFilters = (e) => {
    e.preventDefault()
    startDateElement.current.value = ""
    endDateElement.current.value = ""
    startTimeElement.current.value = ""
    endTimeElement.current.value = ""
    selectedMealElement.current.value = "All Meals..."

    //dispatch(reset())
  }

  const handleSearch = (e) => {
    if (e) {
      e.preventDefault()
    }

    setErrors(null)
    setLoading(true)
    setMealObjList(null)

    const search = searchElement.current.value
    var searchValue = search || ""
    // filter values
    const startDate = startDateElement.current.value
    const endDate = endDateElement.current.value
    const startTime = startTimeElement.current.value
    const endTime = endTimeElement.current.value
    const selectedMeal = selectedMealElement.current.value

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
      selectedMeal: selectedMeal
    }
    dispatch(update(payload))

    var selectedMealValue = selectedMeal === "All Meals..." ? "" : selectedMeal.toLowerCase()

    fetch(config.BASE_V2_URL + "/meals?" + new URLSearchParams({
      q: searchValue,
      m: selectedMealValue,
      sd: startDateValue,
      ed: endDateValue,
      st: startTimeValue,
      et: endTimeValue,
      s: config.MEALS_PAGE_SIZE
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
      let newdata = data.content.map(mobj => {
        return {
          ...mobj,
          afterMealNotes: [...mobj.afterMealNotes.sort(compareByIdDesc)]
        }
      })
      setMealObjList(newdata)
      dispatch(updatePage({pageCurrent: data.pageable.pageNumber + 1, pagesCount: data.totalPages}))
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }

  const getDifferentPage = (page) => {
    setErrors(null)
    setLoading(true)
    setMealObjList(null)

    var searchValue = filterOptions.search
    var startDateValue = filterOptions.startDate
    var endDateValue = filterOptions.endDate
    var startTimeValue = filterOptions.startTime
    var endTimeValue = filterOptions.endTime
    var selectedMealValue = filterOptions.selectedMeal === "All Meals..." ? "" : filterOptions.selectedMeal.toLowerCase()
    
    fetch(config.BASE_V2_URL + "/meals?" + new URLSearchParams({
      q: searchValue,
      m: selectedMealValue,
      sd: startDateValue,
      ed: endDateValue,
      st: startTimeValue,
      et: endTimeValue,
      p: page - 1,
      s: config.MEALS_PAGE_SIZE
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
      let newdata = data.content.map(mobj => {
        return {
          ...mobj,
          afterMealNotes: [...mobj.afterMealNotes.sort(compareByIdDesc)]
        }
      })
      setMealObjList(newdata)
      dispatch(updatePage({pageCurrent: data.pageable.pageNumber + 1, pagesCount: data.totalPages}))
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }

  const setPageFunction = (page) => {
    if(foPageCurrent != page){
      getDifferentPage(page)
    }
  }

  return (
    <>
      <PrivateNavbar />

      <Container fluid>
        <Row>
          <Col lg="3" className="border d-none d-lg-block bg-light position-fixed p-0">
            <PrivateSidebar />
          </Col>
          <Col className="col-lg-9 offset-lg-3 col-md-12 offset-md-0">

            <Link to="/meals/add">Add Meal Item</Link>

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
                    </div>
                    <div className="input-group mb-3 card-box-mid">
                      <select className="form-select" ref={selectedMealElement}>
                        <option selected>All Meals...</option>
                        <option >Light</option>
                        <option >Medium</option>
                        <option >Heavy</option>
                      </select>
                      <button className="btn btn-outline-secondary" type="button" onClick={handleClearFilters}>Clear Filters...</button>
                    </div>
                  </div>

                  <div className="input-group mb-3 card-box-mid d-none">
                    <span className="input-group-text flex-grow-1"><div className="text-center date-range-display">123</div></span>
                    <span className="input-group-text flex-grow-1"><div className="text-center date-range-display">1-22</div></span>
                    <span className="input-group-text flex-grow-1"><div className="text-center date-range-display">1/1</div></span>
                    <button className="btn btn-primary" type="button">Prev</button>
                    <button className="btn btn-primary" type="button">Next</button>
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



            {!mealObjList ? null : (
              <>
                {
                  mealObjList.map((mo, index) => {
                    if (index > 0 && mo.date !== mealObjList[index - 1].date) {
                      return <><hr className="hr hrc" /><MealItem mealObj={mo} /></>
                    } else {
                      return <MealItem mealObj={mo} />
                    }

                  }
                  )
                }
              </>
            )
            }


            <div className="card">
              <div className="card-body text-center">
                {error ? (
                  <>Oh no, there was an error</>
                ) : isLoading ? (
                  <>Loading...</>
                ) : data ? (
                  <>
                    <h3>{data.species.name}</h3>
                    <img src={data.sprites.front_shiny} alt={data.species.name} />
                  </>
                ) : null}
              </div>

            </div>

            <PaginationComponent 
              pagenum={foPageCurrent}
              pagetotal={foPagesCount}
              setpagefunction={(p) => setPageFunction(p)}
            />

          </Col>
        </Row>
      </Container>
    </>
  )
}
