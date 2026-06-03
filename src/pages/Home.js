import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import jwt_decode from "jwt-decode"
import PrivateNavbar from '../layouts/PrivateNavbar'
import { config } from '../constants/Constants'
import Counter from '../features/counter/Counter'

export default function Home() {
  const navigate = useNavigate()

  {/* check if jwt else go to sign in */}
  const [jwt, setJwt] = useState()
  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem(config.WELLBEINGv1_JWT))
    if(jwt){
      let decodedJwt = jwt_decode(jwt)
      let currentDate = new Date()
      if (decodedJwt.exp * 1000 < currentDate.getTime()){
        localStorage.setItem(config.WELLBEINGv1_JWT, null)
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
      {navigate("/mood-map")}
      <PrivateNavbar />
      <div>Home {jwt}</div>
      <Link to="/mood-map">Mood map</Link>
    </>
    
  )
}
