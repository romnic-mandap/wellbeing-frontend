import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import PrivateNavbar from '../layouts/PrivateNavbar'
import jwt_decode from "jwt-decode"
import MealItem from '../components/MealItem'

const BASE_URL = "http://3.0.48.60/api/v1"
const WELLBEINGv1_JWT = "WELLBEINGV1_JWT"

export default function Meals() {
  const navigate = useNavigate()

  const [errors, setErrors] = useState()

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

  const [mealObjList, setMealObjList] = useState()
  useEffect(() => {
    setErrors(null)
    if(jwt === null || jwt === undefined) return
    fetch(BASE_URL+"/meals", {
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
      setMealObjList(data)
    }).catch(err => {
      setErrors(err)
    })
  }, [jwt])

  return (
  <>
    <PrivateNavbar />
    <div>meals</div>
    <Link to="/meals/add">Add Meal Item</Link>
    {(errors) && (
            <div className="alert alert-danger">
              {errors['error(s)']?.map(e => {return <p>{e}</p>})}
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
