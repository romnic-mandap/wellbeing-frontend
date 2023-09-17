import React from 'react'
import { dayOfWeek, dayOfWeekShort } from '../util/helperfunctions'
import { Link } from 'react-router-dom'
import { format24h, format24hHour } from '../util/helperfunctions'

/*
{
    "id": 67,
    "date": "2023-08-04",
    "time": "23:37:00",
    "note": "5",
    "mealItem": {
      "user": 16,
      "size": "light",
      "id": 61,
      "meal": "mdsada",
      "date": "2023-08-04",
      "time": "12:01:00",
      "note": "adsdasdasd"
    }
*/
export default function AfterMealNoteItem({ afterMealNoteObj }) {

  return (<>
    <div className='card'>
      <div className='card-header'></div>
      <div className='card-body'>
        <p>{dayOfWeek(afterMealNoteObj.date)}, {afterMealNoteObj.date} @ {format24h(afterMealNoteObj.time)}</p>
        <p className='alert alert-info'>note: {afterMealNoteObj.note}</p>

        <ul className="list-group list-group-flush">
          <li className='list-group-item'>{dayOfWeek(afterMealNoteObj.mealItem.date)}, {afterMealNoteObj.mealItem.date} @ {format24h(afterMealNoteObj.mealItem.time)}</li>
          <li className='list-group-item'>meal: {afterMealNoteObj.mealItem.meal}</li>
          {(afterMealNoteObj.mealItem.note) && (
            <li className='list-group-item'>note: {afterMealNoteObj.mealItem.note}</li>
          )}
          <li className='list-group-item'>size: {afterMealNoteObj.mealItem.size}</li>
        </ul>
      </div>
      <div className='card-footer'></div>
    </div>
  </>)
}