import React from 'react'
import { dayOfWeek } from '../util/helperfunctions'
import { Link } from 'react-router-dom'

export default function MealItem({ mealObj }) {
  {/*
    add edit delete...
  {
    "user": 11,
    "size": "light",
    "id": 50,
    "meal": "sa",
    "date": "2023-07-15",
    "time": "13:27:00",
    "note": "a",
    "afterMealNotes": []
  }
  */}

  return (
    <>
    <div className="card">
      <div className="card-header">
      
      </div>
      <div className="card-body">
      <p>{dayOfWeek(mealObj.date)}, {mealObj.date} @ {mealObj.time}</p>
        <p>meal: {mealObj.meal}</p>
        {(mealObj.note) && (
          <p>note: {mealObj.note}</p>
        )}
        <p>size: {mealObj.size}</p>
        <Link to={"/meals/" + mealObj.id + "/edit"}>Edit</Link>
      </div>
      <div className="card-footer">
        
      </div>
    </div>
    </>
  )
}
