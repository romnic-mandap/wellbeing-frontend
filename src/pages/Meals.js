import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import PrivateNavbar from '../layouts/PrivateNavbar'
import jwt_decode from "jwt-decode"
import MealItem from '../components/MealItem'

const WELLBEINGv1_JWT = "WELLBEINGV1_JWT"

export default function Meals() {
  const navigate = useNavigate()

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

  return (
  <>
    <PrivateNavbar />
    <div>meals</div>
    <Link to="/meals/add">Add Meal Item</Link>
    <MealItem />
  </>
  )
}
