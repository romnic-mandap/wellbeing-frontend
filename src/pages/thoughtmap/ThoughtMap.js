import "./ThoughtMap.css"
import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import PrivateNavbar from '../../layouts/PrivateNavbar'
import PrivateSidebar from '../../layouts/PrivateSidebar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { config } from '../../constants/Constants'
import jwt_decode from "jwt-decode"
import { useSelector, useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { yearMonth, yearMonthDay, incrementYearMonth, decrementYearMonth, yearMonthPlusDay } from '../../util/helperfunctions'
import { update, reset, updateDates, updatePage } from './thoughtMapSlice'
import PaginationComponent from '../../components/PaginationComponent'
import ThoughtMapThoughtRecordItem from '../../components/ThoughtMapThoughtRecordItem'

export default function ThoughtMap() {
  const navigate = useNavigate()

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
  const getMoodBadgeColorClass = (mood) => {
    switch (true) {
      case moodHashMap.get(mood) > 0:
        return "badge rounded-pill bg-primary me-1"
      case moodHashMap.get(mood) < 0:
        return "badge rounded-pill bg-secondary me-1"
    }
  }



  const [errors, setErrors] = useState()
  const [loading, setLoading] = useState(false)
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

  const [selectedYearMonth, setSelectedYearMonth] = useState()  // yyyy-mm
  useEffect(() => {
    setSelectedYearMonth(yearMonth())
  }, [])
  const incrementSelectedYearMonth = () => {
    console.log(incrementYearMonth(selectedYearMonth))
    setSelectedYearMonth(incrementYearMonth(selectedYearMonth))
  }
  const decrementSelectedYearMonth = () => {
    console.log(decrementYearMonth(selectedYearMonth))
    setSelectedYearMonth(decrementYearMonth(selectedYearMonth))
  }

  const [monthMoodsList, setMonthMoodsList] = useState()
  useEffect(() => {
    if (selectedYearMonth === null) {
      return
    }
    setErrors(null)
    setLoading(true)
    if (jwt === null || jwt === undefined) {
      setLoading(false)
      return
    }

    fetch(config.BASE_URL + "/thought-records/month-moods?" + new URLSearchParams({
      d: selectedYearMonth
    }), {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "Get"
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      }
      return res.json().then(data => {
        throw data
      })
    }).then(data => {
      setMonthMoodsList(data)
      console.log(data)
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }, [selectedYearMonth])

  const [moodScoreList, setMoodScoreList] = useState()
  useEffect(() => {
    if (selectedYearMonth === null) {
      return
    }
    setErrors(null)
    setLoading(true)
    setThoughtRecordObjList(null)
    setMoodScoreList(null)
    if (jwt === null || jwt === undefined) {
      setLoading(false)
      return
    }

    fetch(config.BASE_URL + "/thought-records/month-mood-scores-list?" + new URLSearchParams({
      d: selectedYearMonth
    }), {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "Get"
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      }
      return res.json().then(data => {
        throw data
      })
    }).then(data => {
      setMoodScoreList(data)
      console.log(data)
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }, [selectedYearMonth])

  const getColorClass = (score) => {
    switch (true) {
      case score == -9000:
        return "card m-0"
      case score == 0:
        return "card border-secondary m-0"
      case (score < 1.0 && score > -1.0):
        return "card border-primary m-0 bg-light"
      case (score <= -7.5):
        return "card border-primary m-0 bg-danger"
      case (score <= -1.0):
        return "card border-primary m-0 bg-secondary"
      case (score >= 7.5):
        return "card border-primary m-0 bg-primary"
      case (score >= 1.0):
        return "card border-primary m-0 bg-info"
    }
  }

  const getMonthDayScore = (ms) => {
    switch (true) {
      case ms == -9000:
        return ""
      default:
        return Math.round(ms)
    }

  }


  const foPageCurrent = useSelector((state) => state.thoughtMap.pageCurrent)
  const foPagesCount = useSelector((state) => state.thoughtMap.pagesCount)
  const dispatch = useDispatch()
  const [thoughtRecordObjList, setThoughtRecordObjList] = useState()

  const handleMonthMoodOnClick = (mood) => {
    setErrors(null)
    setLoading(true)
    if (jwt === null || jwt === undefined) {
      setLoading(false)
      return
    }

    fetch(config.BASE_URL + "/thought-records/month-moods-list?" + new URLSearchParams({
      d: selectedYearMonth,
      m: mood
    }), {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "GET"
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      }
      return res.json().then(data => {
        throw data
      })
    }).then(data => {
      setThoughtRecordObjList(data)
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }

  const handleOnClick = (ms, index) => {
    var skips = 0
    for (let i = 0; i < 42; i++)
      if (moodScoreList[i] == -9000)
        skips++
      else
        break

    if (ms === -9000) return
    var day = index - skips + 1

    setErrors(null)
    setLoading(true)
    if (jwt === null || jwt === undefined) {
      setLoading(false)
      return
    }

    var startDateValue = yearMonthPlusDay(selectedYearMonth, day)
    var endDateValue = yearMonthPlusDay(selectedYearMonth, day)

    fetch(config.BASE_V2_URL + "/thought-records?" + new URLSearchParams({
      sd: startDateValue,
      ed: endDateValue,
      s: 24
    }), {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "GET"
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      }
      return res.json().then(data => {
        throw data
      })
    }).then(data => {
      setThoughtRecordObjList(data.content)
      dispatch(updatePage({ pageCurrent: data.pageable.pageNumber + 1, pagesCount: data.totalPages }))
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }

  const thoughtMap = (<>


    <div className="d-flex flex-wrap">
      <div className="flex-grow-1 col-md-6">
        <div className="pt-3">
          <p className="fs-3">Mood Map</p>
        </div>

        <div className="card">
          <div className="card-box">
            <div className="input-group mb-2">
              <button className="btn btn-primary" type="button" onClick={() => decrementSelectedYearMonth()}>Prev</button>
              <span className="flex-grow-1 d-flex align-items-center justify-content-center">{selectedYearMonth}</span>
              <button className="btn btn-primary" type="button" onClick={() => incrementSelectedYearMonth()}>Next</button>
            </div>
          </div>
        </div>

        <Table className="text-end" bordered size="sm">
          <tbody>
            <tr>
              <td className="col-1 text-center">S</td>
              <td className="col-1 text-center">M</td>
              <td className="col-1 text-center">T</td>
              <td className="col-1 text-center">W</td>
              <td className="col-1 text-center">T</td>
              <td className="col-1 text-center">F</td>
              <td className="col-1 text-center">S</td>
            </tr>
            <tr>
              {(moodScoreList) && <>
                {
                  moodScoreList.slice(0, 7).map((ms, index) => {
                    return <td className="col-1" onClick={() => handleOnClick(ms, index)}><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
                  })
                }
              </>}
            </tr>
            <tr>
              {(moodScoreList) && <>
                {
                  moodScoreList.slice(7, 14).map((ms, index) => {
                    return <td className="col-1" onClick={() => handleOnClick(ms, 7 + index)}><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
                  })
                }
              </>}
            </tr>
            <tr>
              {(moodScoreList) && <>
                {
                  moodScoreList.slice(14, 21).map((ms, index) => {
                    return <td className="col-1" onClick={() => handleOnClick(ms, 14 + index)}><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
                  })
                }
              </>}
            </tr>
            <tr>
              {(moodScoreList) && <>
                {
                  moodScoreList.slice(21, 28).map((ms, index) => {
                    return <td className="col-1" onClick={() => handleOnClick(ms, 21 + index)}><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
                  })
                }
              </>}
            </tr>
            <tr>
              {(moodScoreList) && <>
                {
                  moodScoreList.slice(28, 35).map((ms, index) => {
                    return <td className="col-1" onClick={() => handleOnClick(ms, 28 + index)}><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
                  })
                }
              </>}
            </tr>
            <tr>
              {(moodScoreList) && <>
                {
                  moodScoreList.slice(35, 42).map((ms, index) => {
                    return <td className="col-1" onClick={() => handleOnClick(ms, 35 + index)}><div className={getColorClass(ms)} style={{ height: 48 + 'px' }}><div className="card-body"></div></div></td>
                  })
                }
              </>}
            </tr>

          </tbody>
        </Table>

        {(monthMoodsList) && (<div className="card"><div className="card-box">
          <p>Mood(s): </p>
          <div className="d-flex flex-row justify-content-start align-items-start flex-wrap mb-1">
            {monthMoodsList?.map((m, index) => {
              return <h6><span className={getMoodBadgeColorClass(m)} onClick={() => handleMonthMoodOnClick(m)}>{m}</span></h6>
            })}
          </div>
        </div></div>)}

        {(loading) && (
          <div className="d-flex justify-content-center col-12 flex-grow-1">
            <div className="spinner-grow text-secondary">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>

        )}

        {(errors) && (
          <div className="alert alert-danger">
            {errors['error(s)']?.map(e => { return <p>{e}</p> })}
          </div>
        )}
      </div>
      <div className="flex-grow-1 col-md-6">
        <div className="overflow-y-auto vh-100">
          {!thoughtRecordObjList ? null : (
            <>
              {
                thoughtRecordObjList.map((tro, index) => {
                  if (index > 0 && tro.date !== thoughtRecordObjList[index - 1].date) {
                    return <ThoughtMapThoughtRecordItem thoughtRecordObj={tro} />
                  } else {
                    return <ThoughtMapThoughtRecordItem thoughtRecordObj={tro} />
                  }

                }
                )
              }
            </>
          )
          }
          <div className="alert alert-primary m-3" role="alert">
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
        </div>
      </div>
    </div>
  </>)

  return (
    <>
      <PrivateNavbar active="moodmap" />
      <Container fluid>
        <Row>
          <Col lg="3" className="border d-none d-lg-block bg-light position-fixed p-0">
            <PrivateSidebar active="moodmap" />
          </Col>
          <Col className="col-lg-9 offset-lg-3 col-md-12 offset-md-0">
            {thoughtMap}
            <Toaster />
          </Col>
        </Row>
      </Container>
    </>
  )
}