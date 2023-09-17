import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import PrivateNavbar from '../layouts/PrivateNavbar'
import "../util/helperfunctions"
import jwt_decode from "jwt-decode"
import { dateTimeConverter, format24h } from '../util/helperfunctions'
import { config } from '../constants/Constants'



/*
{
  "date": "2023-09-17",
  "time": "12:00:00",
  "situation": "situation description",
  "moods": [
    {
      "moodType": "AFRAID",
      "level": 100
    }
  ],
  "thoughts": [
    {
      "thought": "thought description",
      "level": 100
    }
  ]
}
*/
export default function ThoughtRecordItemEdit() {
  const navigate = useNavigate()

  const {id} = useParams()

  const [moodItems, setMoodItems] = useState([])
  const [thoughtItems, setThoughtItems] = useState([])

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
        setJwt(jwt)
      }
    } else {
      navigate("/signin")
    }
  }, [])

  const [errors, setErrors] = useState()
  const dateElement = useRef()
  const timeElement = useRef()
  const situationElement = useRef()

  const [thoughtRecordObj, setThoughtRecordObj] = useState()
  useEffect(() => {
    setErrors(null)
    if(jwt === null || jwt === undefined) return
    if(id === null || id === undefined) return
    fetch(config.BASE_URL+"/thought-records/"+id, {
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
      setThoughtRecordObj(data)
    }).catch(err => {
      setErrors(err)
    })
  }, [id, jwt])

  useEffect(() => {
    if (thoughtRecordObj) {
      dateElement.current.value = thoughtRecordObj.date
      timeElement.current.value = thoughtRecordObj.time
      situationElement.current.value = thoughtRecordObj.situation
      setMoodItems(thoughtRecordObj.moods)
      setThoughtItems(thoughtRecordObj.thoughts)
    }
  }, [thoughtRecordObj])

  const handleDelete = (e) => {
    e.preventDefault()

    fetch(config.BASE_URL+"/thought-records/"+id, {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "DELETE",
    }).then(res => {
      if(res.status === 200){
        navigate("/thought-records")
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
      <PrivateNavbar active="thoughtrecords" />
      <nav className='m-2'>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/thought-records">Thought Records</Link></li>
          <li class="breadcrumb-item active">Thought Record Item</li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-header">
          <h3 style={{ display: 'inline-block' }}>Add Thought Record Item</h3>
          <button className="btn btn-primary mb-3 btn-sm" onClick={handleDelete} style={{ display: 'inline-block', marginLeft: "10px", marginTop: "5px" }}>Delete</button>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label">Date: </label>
              <input type="date" className="form-control" ref={dateElement} disabled/>
              <p className="form-text">*dd/mm/yyyy</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Time: </label>
              <input type="time" className="form-control" ref={timeElement} disabled/>
            </div>
            <div className="mb-3">
              <label className="form-label">Situation: </label>
              <input autoFocus type="text" className="form-control" ref={situationElement} disabled/>
            </div>

            <button type="submit" className="btn btn-primary mb-3" disabled>Submit</button>

            {(errors) && (
              <div className="alert alert-danger">
                {errors['error(s)']?.map(e => { return <p>{e}</p> })}
              </div>
            )}

          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 style={{ display: 'inline-block' }}>Mood(s)</h5>
        </div>

        {(moodItems) ? (<>
          <ul className="list-group list-group-flush">
            {moodItems?.map(mi => {
              return <li className="list-group-item">
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={mi.moodType + " - " + mi.level} disabled />
                  <button className="btn btn-primary btn-sm" type="button" disabled>Delete...</button>
                </div>
              </li>
            })}
          </ul>
        </>) : null}

      </div>

      <div className="card">
        <div className="card-header">
          <h5 style={{ display: 'inline-block' }}>Thought(s)</h5>
        </div>

        
        {(thoughtItems) ? (<>
          <ul className="list-group list-group-flush">
            {thoughtItems?.map(ti => {
              return <li className="list-group-item">
                <div className="input-group mb-3">
                  <input type="text" className="form-control flex-grow-1" value={ti.thought + " - " + ti.level} disabled />
                  <button className="btn btn-primary btn-sm" type="button" disabled>Delete...</button>
                </div>
              </li>
            })}
          </ul>
        </>) : null}

      </div>

    </>
  )
}