import React from 'react'
import { useNavigate, Link } from "react-router-dom"
import "./PrivateNavbar.css"

const WELLBEINGv1_JWT = "WELLBEINGV1_JWT"

export default function PrivateNavbar() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem(WELLBEINGv1_JWT, null)
    navigate("/signin")
  }

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand">
          <Link to="/" id="navheadertext">Wellbeing</Link> 
        </a>

        <form className="d-flex" onSubmit={handleSubmit}>
          <button className="btn btn-primary" type="submit">Sign out</button>
        </form>

      </div>
    </nav>
  )
}
