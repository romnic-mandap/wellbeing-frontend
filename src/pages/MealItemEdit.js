import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useNavigate, Link, useParams } from 'react-router-dom'
import jwt_decode from "jwt-decode"
import PrivateNavbar from '../layouts/PrivateNavbar'
import { dateTimeConverter } from '../util/helperfunctions'

const BASE_URL = "http://localhost:8080/api/v1"
const WELLBEINGv1_JWT = "WELLBEINGV1_JWT"

export default function MealItemEdit() {
  const navigate = useNavigate()

  const {id} = useParams()

  const [errors, setErrors] = useState()

  {/* check if jwt else go to sign in */}
  const [jwt, setJwt] = useState()
  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem(WELLBEINGv1_JWT))
    if(jwt){
      let decodedJwt = jwt_decode(jwt)
      let currentDate = new Date()
      if (decodedJwt.exp * 1000 < currentDate.getTime()){
        localStorage.setItem(WELLBEINGv1_JWT, null)
        navigate("/signin")
      }else{
        setJwt(jwt)
      }
    }else{
      navigate("/signin")
    }
  }, [])

  const [mealObj, setMealObj] = useState()
  useEffect(() => {
    setErrors(null)
    if(jwt === null || jwt === undefined) return
    if(id === null || id === undefined) return
    fetch(BASE_URL+"/meals/"+id, {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "GET"
    }).then(res => {
      if(res.status === 200){
        return res.json()
      }
      return res.json().then(data => {
        throw data
      })
    }).then(data => {
      setMealObj(data)
    }).catch(err => {
      setErrors(err)
    })
  }, [id, jwt])

  const [mealsize, setMealsize] = useState("medium")

  const mealDateElement = useRef()
  const mealTimeElement = useRef()
  const mealDescElement = useRef()
  const mealNoteElement = useRef()

  useEffect(() => {
    if (mealObj === null || mealObj === undefined) return
    {/* init data */}

    mealDateElement.current.value = mealObj.date
    mealTimeElement.current.value = mealObj.time
    setMealsize(mealObj.size)
    mealDescElement.current.value = mealObj.meal
    if (mealObj.note) mealNoteElement.current.value = mealObj.note

  }, [mealObj])

  const handleSubmit = (e) => {
    setErrors(null)
    e.preventDefault()

    const mealDate = mealDateElement.current.value
    const mealTime = mealTimeElement.current.value
    const mealDesc = mealDescElement.current.value
    const mealNote = mealNoteElement.current.value

    fetch(BASE_URL+"/meals/"+id, {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "PUT",
      body: JSON.stringify({
        "date": mealDate,
        "time": mealTime,
        "size": mealsize,
        "meal": mealDesc,
        "note": mealNote
      })
    }).then(res => {
      if(res.status === 200){
        navigate("/meals")
      }
      return res.json().then(data => {
        throw data
      })
    }).catch(err => {
      setErrors(err)
    })


  }

  const handleDelete = () => {
    setErrors(null)

    fetch(BASE_URL+"/meals/"+id, {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "DELETE",
    }).then(res => {
      if(res.status === 200){
        navigate("/meals")
      }
      return res.json().then(data => {
        throw data
      })
    }).catch(err => {
      setErrors(err)
    })
  }

  return (
    <>
        <PrivateNavbar />

        <nav className='m-2'>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to="/meals">Meals</Link></li>
            <li class="breadcrumb-item active">Meal Item</li>
          </ol>
        </nav>

        <div className="card">
          <div className="card-header">
            <h3 style={{display:'inline-block'}}>Edit Meal Item</h3>
            <button className="btn btn-primary mb-3 btn-sm" onClick={handleDelete} style={{display:'inline-block',marginLeft:"10px",marginTop:"5px"}}>Delete</button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Date: </label>
                <input type="date" className="form-control" ref={mealDateElement} />
                <p className="form-text">*dd/mm/yyyy</p>
              </div>
              <div className="mb-3">
                <label className="form-label">Time: </label>
                <input type="time" className="form-control" ref={mealTimeElement} />
              </div>
              <div className="mb-3">
                <div className="btn-group">
                  <input type="radio" className="btn-check" name="mealsize" id="mealsize1" value="light" checked={mealsize === "light"} onChange={(e) => setMealsize(e.target.value)}/>
                  <label className="btn btn-outline-primary" for="mealsize1">light</label>

                  <input type="radio" className="btn-check" name="mealsize" id="mealsize2" value="medium" checked={mealsize === "medium"} onChange={(e) => setMealsize(e.target.value)}/>
                  <label className="btn btn-outline-primary" for="mealsize2">medium</label>

                  <input type="radio" className="btn-check" name="mealsize" id="mealsize3" value="heavy" checked={mealsize === "heavy"} onChange={(e) => setMealsize(e.target.value)}/>
                  <label className="btn btn-outline-primary" for="mealsize3">heavy</label>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Meal: </label>
                <input autoFocus type="text" className="form-control" ref={mealDescElement} />
              </div>
              <div className="mb-3">
                <label className="form-label">Note: </label>
                <input type="text" className="form-control" ref={mealNoteElement} />
                <p className="form-text">*optional</p>
              </div>

              <button type="submit" className="btn btn-primary mb-3">Submit</button>

              {(errors) && (
                <div className="alert alert-danger">
                  {errors['error(s)']?.map(e => {return <p>{e}</p>})}
                </div>
              )}

            </form>
          </div>
        </div>
    </>
    
  )
}
