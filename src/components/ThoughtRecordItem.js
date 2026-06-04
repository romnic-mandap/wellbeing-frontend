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

  const moodHashMap = new Map()
  moodHashMap.set("AFRAID", -1)
  moodHashMap.set("ANGRY", -3)
  moodHashMap.set("ANXIOUS", -1)
  moodHashMap.set("ASHAMED", -3)
  moodHashMap.set("CHEERFUL", 5)
  moodHashMap.set("CONTENT", 3)
  moodHashMap.set("DEPRESSED", -3)
  moodHashMap.set("DISAPPOINTED", -3)
  moodHashMap.set("DISGUSTED", -3)
  moodHashMap.set("GRATEFUL", 3)
  moodHashMap.set("EAGER", 1)
  moodHashMap.set("EMBARRASSED", -1)
  moodHashMap.set("ENRAGED", -5)
  moodHashMap.set("EXCITED", 5)
  moodHashMap.set("FRIGHTENED", -3)
  moodHashMap.set("FRUSTRATED", -3)
  moodHashMap.set("GRIEF", -5)
  moodHashMap.set("GUILTY", -3)
  moodHashMap.set("HAPPY", 3)
  moodHashMap.set("HUMILIATED", -5)
  moodHashMap.set("HURT", -1)
  moodHashMap.set("INSECURE", -1)
  moodHashMap.set("IRRITATED", -1)
  moodHashMap.set("LOVING", 5)
  moodHashMap.set("MAD", -3)
  moodHashMap.set("NERVOUS", -1)
  moodHashMap.set("PANIC", -5)
  moodHashMap.set("PROUD", 3)
  moodHashMap.set("SAD", -1)
  moodHashMap.set("SCARED", -3)

  const getColorClass = (mood) => {
    switch (true) {
      case moodHashMap.get(mood) > 0:
        return "badge rounded-pill bg-primary me-1"
      case moodHashMap.get(mood) < 0:
        return "badge rounded-pill bg-secondary me-1"
    }
  }

  return (<>
    <div className='card'>
      <div className='card-header'></div>
      <div className='card-body'>
        <p>{dayOfWeek(thoughtRecordObj.date)}, {thoughtRecordObj.date} @ {format24h(thoughtRecordObj.time)}</p>

        <p>situation: {thoughtRecordObj.situation}</p>

        {(thoughtRecordObj.moods) ? (<>
          <p>mood(s): </p>
          <div className="d-flex flex-row justify-content-start align-items-start flex-wrap mb-1">
            {thoughtRecordObj.moods?.map(m => {
              return <h5><span className={getColorClass(m.moodType)}>{m.moodType} - {m.level} </span></h5>
            })}
          </div>
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