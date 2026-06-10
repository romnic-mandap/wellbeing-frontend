import React from 'react'
import { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import PublicNavbar from '../layouts/PublicNavbar'
import { config } from '../constants/Constants'


export default function Signup() {
  const navigate = useNavigate()

  const [errors, setErrors] = useState()

  const usernameElement = useRef()
  const passwordElement = useRef()
  const confirmPasswordElement = useRef()

  const handleSubmit = (e) => {
    setErrors(null)
    e.preventDefault()

    const username = usernameElement.current.value
    const password = passwordElement.current.value
    const confirmPassword = confirmPasswordElement.current.value

    fetch(config.BASE_URL + "/auth/signup", {
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "password": password,
        "passwordConfirmation": confirmPassword
      })
    }
    ).then(res => {
      if (res.status === 201) {
        navigate("/signin")
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
      <PublicNavbar />
      <div className='d-flex flex-wrap'>
        <div className='flex-grow-1 col-md-6'>
          <div className="card">
            <div className="card-header">
              <h3>Sign up</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username: </label>
                  <input type="input" className="form-control" ref={usernameElement} />
                  <p className="form-text">must be between 6 and 64 characters, alphanumeric only</p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password: </label>
                  <input type="password" className="form-control" ref={passwordElement} />
                  <p className="form-text">must be between 6 and 128 characters</p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password: </label>
                  <input type="password" className="form-control" ref={confirmPasswordElement} />
                </div>

                <p>Have an account? <Link to="/signin">Sign in</Link></p>

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
