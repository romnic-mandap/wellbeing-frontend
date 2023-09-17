import React from 'react'
import { dayOfWeek, dayOfWeekShort } from '../util/helperfunctions'
import { Link } from 'react-router-dom'
import { format24h, format24hHour } from '../util/helperfunctions'


/*
{
  "id": 30,
  "userId": 16,
  "date": "2023-09-17",
  "time": "12:00:00",
  "situation": "situation description",
  "moods": [
    {
      "moodType": "AFRAID",
      "id": 44,
      "level": 100
    }
  ],
  "thoughts": [
    {
      "id": 46,
      "thought": "thought description",
      "level": 100
    }
  ]
}
*/
export default function ThoughtRecordItem({ thoughtRecordObj }) {


  return (<>
    <div className='card'>
      <div className='card-header'></div>
      <div className='card-body'>
        <p>{dayOfWeek(thoughtRecordObj.date)}, {thoughtRecordObj.date} @ {format24h(thoughtRecordObj.time)}</p>
          
        <p>situation: {thoughtRecordObj.situation}</p>

        {(thoughtRecordObj.moods) ? (<>
          <p>mood(s): </p>
          <ul className="list-group list-group-flush">
            {thoughtRecordObj.moods?.map(m => {
              return <li className="list-group-item">{m.moodType} - {m.level} </li>
            })}
          </ul>
        </>) : null}

        {(thoughtRecordObj.thoughts) ? (<>
          <p>thought(s): </p>
          <ul className="list-group list-group-flush">
            {thoughtRecordObj.thoughts?.map(t => {
              return <li className="list-group-item">{t.thought} - {t.level} </li>
            })}
          </ul>
        </>) : null}

        <Link to={"/thought-records/" + thoughtRecordObj.id + "/edit"}>Edit</Link>
      </div>
      <div className='card-footer'></div>
    </div>
  </>)
}