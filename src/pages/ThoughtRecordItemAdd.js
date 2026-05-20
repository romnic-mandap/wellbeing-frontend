import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
export default function ThoughtRecordItemAdd() {
  const navigate = useNavigate()

  const [moodItems, setMoodItems] = useState([]);
  const [thoughtItems, setThoughtITems] = useState([]);

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

  const selectedMoodElement = useRef()
  const moodLevelElement = useRef()
  const thoughtElement = useRef()
  const thoughtLevelElement = useRef()

  useEffect(() => {
    {/* add current date and itme to inputs */ }
    const [nowDate, nowTime] = dateTimeConverter(new Date())

    dateElement.current.value = nowDate
    timeElement.current.value = nowTime
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(null)

    var d = dateElement.current.value
    var t = timeElement.current.value
    var s = situationElement.current.value

    var payload = {
      date: d,
      time: t,
      situation: s,
      moods: moodItems,
      thoughts: thoughtItems
    }

    fetch(config.BASE_URL+"/thought-records", {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "POST",
      body: JSON.stringify(payload)
    }).then(res => {
      if(res.status === 201){
        navigate("/thought-records")
        return
      }
      return res.json().then(data => {
        throw data
      })
    }).catch(err => {
      setErrors(err)
    })
  }

  const handleAddMoodItem = (e) => {
    e.preventDefault()

    var mt = selectedMoodElement.current.value
    var mlvl = moodLevelElement.current.value
    setMoodItems(prevMoodItems => ([
      ...prevMoodItems,
      { moodType: mt, level: Math.max(Math.min(mlvl, 100), 1)}
    ]))
    moodLevelElement.current.value = 50
  }
  const handleRemoveMoodItem = (mood) => {
    setMoodItems(moodItems.filter(mi =>
      mi.moodType != mood
    ))
  }

  const handleAddThoughtItem = (e) => {
    e.preventDefault()

    var t = thoughtElement.current.value
    var tlvl = thoughtLevelElement.current.value

    if (t) {
      setThoughtITems(prevThoughtItems => ([
        ...prevThoughtItems,
        { thought: t, level: Math.max(1, Math.min(tlvl, 100)) }
      ]))
      thoughtElement.current.value = ""
      thoughtLevelElement.current.value = 50
    }
    
  }
  const handleRemoveThoughtItem = (thought) => {
    setThoughtITems(thoughtItems.filter(ti => ti.thought != thought))
  }

  return (
    <>
      <PrivateNavbar active="thoughtrecords" />
      <nav className='m-2'>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/thought-records">Thought Records</Link></li>
          <li className="breadcrumb-item active">Thought Record Item</li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-header">
          <h3>Add Thought Record Item</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Date: </label>
              <input type="date" className="form-control" ref={dateElement} />
              <p className="form-text">*dd/mm/yyyy</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Time: </label>
              <input type="time" className="form-control" ref={timeElement} />
            </div>
            <div className="mb-3">
              <label className="form-label">Situation: </label>
              <input autoFocus type="text" className="form-control" ref={situationElement} />
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

      <div className="card">
        <div className="card-header">
          <h5 style={{ display: 'inline-block' }}>Mood(s)</h5>
        </div>

        <div className="input-group mb-3 card-box">
          <select className="form-select" ref={selectedMoodElement}>
            <option>AFRAID</option>
            <option>ANGRY</option>
            <option>ANXIOUS</option>
            <option>ASHAMED</option>
            <option>CHEERFUL</option>
            <option selected>CONTENT</option>
            <option>DEPRESSED</option>
            <option>DISAPPOINTED</option>
            <option>DISGUSTED</option>
            <option>GRATEFUL</option>
            <option>EAGER</option>
            <option>EMBARRASSED</option>
            <option>ENRAGED</option>
            <option>EXCITED</option>
            <option>FRIGHTENED</option>
            <option>FRUSTRATED</option>
            <option>GRIEF</option>
            <option>GUILTY</option>
            <option>HAPPY</option>
            <option>HUMILIATED</option>
            <option>HURT</option>
            <option>INSECURE</option>
            <option>IRRITATED</option>
            <option>LOVING</option>
            <option>MAD</option>
            <option>NERVOUS</option>
            <option>PANIC</option>
            <option>PROUD</option>
            <option>SAD</option>
            <option>SCARED</option>
          </select>
          <input type="number" min="1" max="100" className="form-control" ref={moodLevelElement} />
          <button className="btn btn-primary" type="button" onClick={handleAddMoodItem}>Add</button>
        </div>

        {(moodItems) ? (<>
          <ul className="list-group list-group-flush">
            {moodItems?.map(mi => {
              return <li className="list-group-item">
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={mi.moodType + " - " + mi.level} disabled />
                  <button className="btn btn-primary btn-sm" type="button" onClick={() => { handleRemoveMoodItem(mi.moodType) }}>Delete...</button>
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

        <div className="input-group mb-3 card-box">
          <input type="text" className="form-control flex-grow-1" placeholder="add thought... " ref={thoughtElement} />
          <input type="number" min="1" max="100" className="form-control" ref={thoughtLevelElement} />
          <button className="btn btn-primary" type="button" onClick={handleAddThoughtItem}>Add</button>
        </div>

        {(thoughtItems) ? (<>
          <ul className="list-group list-group-flush">
            {thoughtItems?.map(ti => {
              return <li className="list-group-item">
                <div className="input-group mb-3">
                  <input type="text" className="form-control flex-grow-1" value={ti.thought + " - " + ti.level} disabled />
                  <button className="btn btn-primary btn-sm" type="button" onClick={() => { handleRemoveThoughtItem(ti.thought) }}>Delete...</button>
                </div>
              </li>
            })}
          </ul>
        </>) : null}

      </div>

    </>
  )
}