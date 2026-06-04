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

    fetch(config.BASE_URL + "/thought-records", {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "POST",
      body: JSON.stringify(payload)
    }).then(res => {
      if (res.status === 201) {
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
      { moodType: mt, level: Math.max(Math.min(mlvl, 100), 1) }
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
              <p className="form-text">Who where you with? What were you doing? When was it? Where were you? </p>
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
          <input type="number" min="1" max="100" className="input-group-text" ref={moodLevelElement} defaultValue={50} />
          <button className="btn btn-primary" type="button" onClick={handleAddMoodItem}>Add</button>
        </div>
        <p className="form-text m-2">What did you feel? Rate each mood 1-100. Choose up to 6 moods. </p>



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
          <input type="number" min="1" max="100" className="input-group-text" ref={thoughtLevelElement} defaultValue={50}/>
          <button className="btn btn-primary" type="button" onClick={handleAddThoughtItem}>Add</button>
        </div>
        <p className="form-text m-2">What was going through your mind just before you started to feel this way? Any other thoughts? Images?. Add up to 12 thoughts. </p>
        <p className="form-text m-2">What was going through my mind just before I started to feel this way? (General)</p>
        <p className="form-text m-2">What images or memories do I have in this situation? (General)</p>
        <p className="form-text m-2">What does this mean about me? My life? My future? (Depression)</p>
        <p className="form-text m-2">What am I afraid might happen? (Anxiety)</p>
        <p className="form-text m-2">Whatis the worst that could happen? (Anxiety)</p>
        <p className="form-text m-2">What does this mean about how the other person(s) feel(s)/think(s) about me? (Anger, Shame)</p>
        <p className="form-text m-2">What does this mean about the other person(s) or people in general? (Anger)</p>
        <p className="form-text m-2">Did I break rules, hurt others, or not do something I should have done? What do I think about myself that I did this or believe I did this? (Guilt, Shame)</p>

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

      <div className="alert alert-primary" role="alert">
        <h4 className="alert-heading">About Thought Record</h4>
        <p>Thought records help develop a set of skills that can improve your moods and relationships and lead to positive changes in your life.</p>
        <p>As is true whenever you develop a new skill, you will need to practice using the thought record until it becomes a reliable tool to help you feel better.</p>
        <hr></hr>
        <h5 className="alert-heading">Situations</h5>
        <p>It is also important to distinguish moods and thoughts from behaviors and from situational factors (aspects of the environment). Behaviors and situational factors can often be identified by answering the following questions:</p>
        <ol>
          <li>Who was I with?</li>
          <li>What was I doing?</li>
          <li>When did it happen?</li>
          <li>Where was I?</li>
        </ol>
        <p>It is helpful to learn to tell the differences among thoughts, moods, behaviors, physical reactions and situational factors. By doing this, you can begin to figure out which parts of your experience can be changed to help you make your life better.</p>
        <p>Limit the situation description to a specific time frame, from as short as a few seconds up to 30 minutes. By narrowing the situation down to a specific instance in time when your mood is especially strong, you can focus on the most important thoughts that will help you understand your moods.</p>
        <hr></hr>
        <h5 className="alert-heading">Moods</h5>
        <p>If you have trouble identifying your moods, pay attention to your body. tight shoulders can be a sign that you are afraid or irritated; heaviness throughout your body may mean that you feel depressed or disappointed. Identifying your physical reactions can provide clues to what moods you are feeling.</p>
        <p>Another strategy is to identify a recent situation in which you had a strong emotional reaction and mark the moods in the list on the previous page that you felt.</p>
        <p>Moods can be identified in one word. You will use one word to describe each mood if you are feeling multiple moods in a situation. For example you might be "sad, scared and embarrassed" in one situation.</p>
        <p>Strong moods signal that something important is happening in your life and identifying specific moods helps you set goals and track progress</p>
        <hr></hr>
        <h5 className="alert-heading">Mood Level</h5>
        <p>It is important to rate the intensity of the moods you experience. Rating the intensity of each mood allows you to observe how your moods fluctuate. Rating your moods also helps alert you to which situations or thoughts are associated with changes in moods. Finally you can use changes in emotional intensity to evaluate the effectiveness of strategies you are learning.</p>
        <ul>
          <li>1 - almost none</li>
          <li>25 - mild</li>
          <li>50 - medium</li>
          <li>75 - strong</li>
          <li>100 - most ever</li>
        </ul>
        <p>Rating your moods allows you to evaluate their strength, track your progress, and evaluate the effectiveness of strategies you are learning.</p>
        <hr></hr>
        <h5 className="alert-heading">Thoughts</h5>
        <p>Thoughts are the words or images, including memories, that go through your mind. Only the thoughts that were actually present in that situation should be recorded.</p>
        <p>Thoughts can either be verbal or visual. If they are images or memories, describe them in words or draw a picture that shows what went through your mind. The thoughts section describes thoughts, beliefs, images, memories, and meanings attached to the situations.</p>
        <p>Automatic thoughts are thoughts that come into our minds spontaneously throughout the day. Whenever we have strong moods, there are also automatic thoughts present that provide clues to understanding our emotional reactions.</p>
        <p>To identify automatic thoughts, notice what goes through your mind when you have a strong mood. Specific type of thoughts are linked to each mood.</p>
        <p>Hot thoughts are automatic thoughts that carry the strongest emotional charge. These are usually the most valuable thoughts to test on a thought record.</p>
        <p>Thoughts can provide the necessary clues to understand your emotional reaction to a situation. An important step in understanding our moods is learning to identify the thoughts that accompany them.</p>
        <p>One of the purposes of CBT is to bring automatic thoughts into awareness. Awareness is the first step toward change and better problem solving. Since we are constantly thinking and imagining, we have automatic thoughts all the time. We daydream about friends or the weekend, or worry about getting errands done. These are all automatic thoughts. When we want to feel better, the automatic thoughts that are the most important are the ones that help use understand our strong moods.</p>







          
      </div>

    </>
  )
}