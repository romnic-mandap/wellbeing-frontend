import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import PrivateNavbar from '../layouts/PrivateNavbar'
import jwt_decode from "jwt-decode"
import MealItem from '../components/MealItem'
import { config } from '../constants/Constants'
import "./Meals.css"

export default function Meals() {
  const navigate = useNavigate()

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
    fetch(config.BASE_URL + "/meals", {
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
      setMealObjList(data)
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }, [jwt])

  const handleClearFilters = (e) => {
    e.preventDefault()
    startDateElement.current.value = ""
    endDateElement.current.value = ""
    startTimeElement.current.value = ""
    endTimeElement.current.value = ""
    selectedMealElement.current.value = "All Meals..."
  }

  const handleSearch = (e) => {
    setErrors(null)
    setLoading(true)
    setMealObjList(null)
    e.preventDefault()

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
    var selectedMealValue = selectedMeal === "All Meals..." ? "" : selectedMeal.toLowerCase()

    fetch(config.BASE_URL + "/meals?" + new URLSearchParams({
      q: searchValue,
      m: selectedMealValue,
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
      setMealObjList(data)
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }

  return (
    <>
      <PrivateNavbar />
      <Link to="/meals/add">Add Meal Item</Link>

      <div className="card">
        <div className="card-header" />

        <fieldset disabled={loading}>
          <form onSubmit={handleSearch}>
            <div className="input-group mb-3 card-box">
              <input type="text" ref={searchElement} className="form-control" placeholder="Search meal and notes... " />
              <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseForm">fltr</button>
              <button className="btn btn-primary" type="submit">Search</button>
            </div>

            {/* search filters collapsible */}
            <div className="collapse" id="collapseForm">
              <div class="input-group mb-3 card-box-mid">
                {/* to be added in future update...
                <div class="input-group-text">
                  <input class="form-check-input mt-0" type="checkbox" />
                </div>
                */}
                <input type="date" class="form-control" ref={startDateElement} />
                <span class="input-group-text">-</span>
                <input type="date" class="form-control" ref={endDateElement} />
              </div>
              <div class="input-group mb-3 card-box-mid">
                <input type="time" class="form-control" ref={startTimeElement} />
                <span class="input-group-text">-</span>
                <input type="time" class="form-control" ref={endTimeElement} />
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
          </form>



        </fieldset>
      </div>

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

      {!mealObjList ? null : (
        <>
          {
            mealObjList.map(mo => {
              return <MealItem mealObj={mo} />
            }
            )
          }
        </>
      )
      }


    </>
  )
}
