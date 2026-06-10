import React from 'react'
import { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import PublicNavbar from '../layouts/PublicNavbar'
import { config } from '../constants/Constants'

export default function Signin() {
  const navigate = useNavigate()

  const [errors, setErrors] = useState()

  const usernameElement = useRef()
  const passwordElement = useRef()

  const handleSubmit = (e) => {
    setErrors(null)
    e.preventDefault()
    const username = usernameElement.current.value
    const password = passwordElement.current.value

    fetch(config.BASE_URL + "/auth/signin", {
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return res.json().then(data => {
        throw data
      })
    }).then(data => {
      localStorage.setItem(config.WELLBEINGv1_JWT, JSON.stringify(data.token))
      navigate("/")
    }).catch(err => {
      setErrors(err)
    })
  }

  return (
    <>
      <PublicNavbar />
      <div className='d-flex flex-wrap'>
        <div className='flex-grow-1 col-md-6'>
          <div className='card'>
            <div className='card-header'>
              <h3>Sign in</h3>
            </div>
            <div className='card-body'>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username: </label>
                  <input type="input" className="form-control" ref={usernameElement} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password: </label>
                  <input type="password" className="form-control" ref={passwordElement} />
                </div>

                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>

                <button type="submit" className="btn btn-primary mb-3">Submit</button>

                {(errors) && (
                  <div className="alert alert-danger">
                    {errors['error(s)']?.map(e => { return <p>{e}</p> })}
                  </div>
                )}


              </form>


            </div>
          </div>
        </div>
        <div className='col-md-6'>

        </div>
      </div>
    </>

  )
}
