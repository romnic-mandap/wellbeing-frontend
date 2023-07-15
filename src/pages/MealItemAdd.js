import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import PrivateNavbar from '../layouts/PrivateNavbar'

export default function AddMealItem() {

  const mealDateElement = useRef()
  const mealTimeElement = useRef()
  const mealSizeElement = useRef()
  const mealDescElement = useRef()
  const mealNoteElement = useRef()

  useEffect(() => {
    {/* add current date and itme to inputs */}
    let cd = new Date()
    let currentTime = cd.getTime()

    {/* create util function that takes in date and returns date and time */}

    console.log(currentTime)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const mealDate = mealDateElement.current.value
    const mealTime = mealTimeElement.current.value
    const mealDesc = mealDescElement.current.value
    const mealNote = mealNoteElement.current.value

    console.log(mealDate)
    console.log(mealTime)
    console.log(mealDesc)
    console.log(mealNote)
    mealTimeElement.current.value = "abv sadas"
  }

  return (
    <>
        <PrivateNavbar />
        <div className="card">
          <div className="card-header">
            <h3>Add Meal Item</h3>
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
                  <input type="radio" className="btn-check" name="btnradio" id="btnradio1" />
                  <label className="btn btn-outline-primary" for="btnradio1">light</label>

                  <input type="radio" className="btn-check" name="btnradio" id="btnradio2" />
                  <label className="btn btn-outline-primary" for="btnradio2">medium</label>

                  <input type="radio" className="btn-check" name="btnradio" id="btnradio3" />
                  <label className="btn btn-outline-primary" for="btnradio3">heavy</label>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Meal: </label>
                <input type="text" className="form-control" ref={mealDescElement} />
              </div>
              <div className="mb-3">
                <label className="form-label">Note: </label>
                <input type="text" className="form-control" ref={mealNoteElement} />
                <p className="form-text">*optional</p>
              </div>

              <button type="submit" className="btn btn-primary mb-3">Submit</button>

            </form>
          </div>
        </div>
    </>
    
  )
}
