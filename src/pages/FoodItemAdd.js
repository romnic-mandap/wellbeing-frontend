import React from 'react'
import PrivateNavbar from '../layouts/PrivateNavbar'
import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "../util/helperfunctions"
import jwt_decode from "jwt-decode"
import { config } from '../constants/Constants'
import toast, { Toaster } from 'react-hot-toast'

export default function FoodItemAdd() {
  const navigate = useNavigate()
  {/* check if jwt else go to sign in */ }
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
        if (decodedJwt.rle == "ROLE_ADMIN") {
          setJwt(jwt)
        } else {
          navigate("/food-items")
        }
      }
    } else {
      navigate("/signin")
    }
  }, [])

  const [foodType, setFoodType] = useState("LEGUME")
  const foodNameElement = useRef()
  const servingSizeElement = useRef()
  const kcalElement = useRef()
  const carbsElement = useRef()
  const fatElement = useRef()
  const proteinElement = useRef()
  const noteElement = useRef()
  const fiberElement = useRef()
  const sodiumElement = useRef()

  const [errors, setErrors] = useState()
  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(null)

    fetch(config.BASE_URL + "/food-items", {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "POST",
      body: JSON.stringify({
        "foodName": foodNameElement.current.value,
        "servingSize": servingSizeElement.current.value,
        "kcal": kcalElement.current.value,
        "carbs": carbsElement.current.value,
        "fat": fatElement.current.value,
        "protein": proteinElement.current.value,
        "fiber": fiberElement.current.value,
        "sodium": sodiumElement.current.value,
        "foodType": foodType,
        "note": noteElement.current.value
      })
    }).then(res => {
      if (res.status === 201) {
        foodNameElement.current.value = ""
        servingSizeElement.current.value = 0
        kcalElement.current.value = 0
        carbsElement.current.value = 0
        fatElement.current.value = 0
        proteinElement.current.value = 0
        fiberElement.current.value = 0
        sodiumElement.current.value = 0
        noteElement.current.value = ""
        toast.success("Added food item...")
        return
      }
      return res.json().then(data => {
        throw data
      })
    }).catch(err => {
      setErrors(err)
    })
  }

  return (<>
    <PrivateNavbar active="fooditems"/>
    <nav className='m-2'>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/food-items">Food items</Link></li>
        <li className="breadcrumb-item active">Food Item</li>
      </ol>
    </nav>

    <div className="card">
      <div className="card-header">
        <h3>Add Food Item</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Food Name: </label>
            <input autoFocus type="text" className="form-control" ref={foodNameElement} />
          </div>
          <div className="mb-3">
            <label className="form-label">Serving Size (g): </label>
            <input type="number" className="form-control" ref={servingSizeElement} />
          </div>
          <div className="mb-3">
            <label className="form-label">Kcal: </label>
            <input type="number" className="form-control" ref={kcalElement} />
          </div>
          <div className="mb-3">
            <label className="form-label">Carbs: </label>
            <input type="number" className="form-control" ref={carbsElement} />
          </div>
          <div className="mb-3">
            <label className="form-label">Fat: </label>
            <input type="number" className="form-control" ref={fatElement} />
          </div>
          <div className="mb-3">
            <label className="form-label">Protein: </label>
            <input type="number" className="form-control" ref={proteinElement} />
          </div>
          <div className="mb-3">
            <label className="form-label">Fiber: </label>
            <input type="number" className="form-control" ref={fiberElement} />
          </div>
          <div className="mb-3">
            <label className="form-label">Sodium (mg): </label>
            <input type="number" className="form-control" ref={sodiumElement} />
          </div>
          <div className="mb-3">
            <div className="btn-group">
              <input type="radio" className="btn-check" name="foodtype" id="foodtype1" value="LEGUME" checked={foodType === "LEGUME"} onChange={(e) => setFoodType(e.target.value)} />
              <label className="btn btn-outline-primary" for="foodtype1">LEGUME</label>

              <input type="radio" className="btn-check" name="foodtype" id="foodtype2" value="FRUIT" checked={foodType === "FRUIT"} onChange={(e) => setFoodType(e.target.value)} />
              <label className="btn btn-outline-primary" for="foodtype2">FRUIT</label>

              <input type="radio" className="btn-check" name="foodtype" id="foodtype3" value="VEGETABLE" checked={foodType === "VEGETABLE"} onChange={(e) => setFoodType(e.target.value)} />
              <label className="btn btn-outline-primary" for="foodtype3">VEGETABLE</label>

              <input type="radio" className="btn-check" name="foodtype" id="foodtype4" value="GRAIN" checked={foodType === "GRAIN"} onChange={(e) => setFoodType(e.target.value)} />
              <label className="btn btn-outline-primary" for="foodtype4">GRAIN</label>

              <input type="radio" className="btn-check" name="foodtype" id="foodtype5" value="MEAT" checked={foodType === "MEAT"} onChange={(e) => setFoodType(e.target.value)} />
              <label className="btn btn-outline-primary" for="foodtype5">MEAT</label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Note: </label>
            <input type="text" className="form-control" ref={noteElement} />
            <p className="form-text">*optional</p>
          </div>

          <button type="submit" className="btn btn-primary mb-3">Submit</button>

          {(errors) && (
            <div className="alert alert-danger">
              {errors['error(s)']?.map(e => { return <p>{e}</p> })}
            </div>
          )}
        </form>
      </div>


    </div>

    <Toaster />
  </>)
}