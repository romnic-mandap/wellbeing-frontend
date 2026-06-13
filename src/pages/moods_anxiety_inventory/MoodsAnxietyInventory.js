import "./MoodsAnxietyInventory.css"
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
import toast, { Toaster } from 'react-hot-toast'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function MoodsAnxietyInventory() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [jwt, setJwt] = useState()
  const [errors, setErrors] = useState()
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

  const [q1, setQ1] = useState("0")
  const [q2, setQ2] = useState("0")
  const [q3, setQ3] = useState("0")
  const [q4, setQ4] = useState("0")
  const [q5, setQ5] = useState("0")
  const [q6, setQ6] = useState("0")
  const [q7, setQ7] = useState("0")
  const [q8, setQ8] = useState("0")
  const [q9, setQ9] = useState("0")
  const [q10, setQ10] = useState("0")
  const [q11, setQ11] = useState("0")
  const [q12, setQ12] = useState("0")
  const [q13, setQ13] = useState("0")
  const [q14, setQ14] = useState("0")
  const [q15, setQ15] = useState("0")
  const [q16, setQ16] = useState("0")
  const [q17, setQ17] = useState("0")
  const [q18, setQ18] = useState("0")
  const [q19, setQ19] = useState("0")
  const [q20, setQ20] = useState("0")
  const [q21, setQ21] = useState("0")
  const [q22, setQ22] = useState("0")
  const [q23, setQ23] = useState("0")
  const [q24, setQ24] = useState("0")
  const [score, setScore] = useState(0)

  const calculateScore = () => {
    let score = 0
    score += parseInt(q1)
    score += parseInt(q2)
    score += parseInt(q3)
    score += parseInt(q4)
    score += parseInt(q5)
    score += parseInt(q6)
    score += parseInt(q7)
    score += parseInt(q8)
    score += parseInt(q9)
    score += parseInt(q10)
    score += parseInt(q11)
    score += parseInt(q12)
    score += parseInt(q13)
    score += parseInt(q14)
    score += parseInt(q15)
    score += parseInt(q16)
    score += parseInt(q17)
    score += parseInt(q18)
    score += parseInt(q19)
    score += parseInt(q20)
    score += parseInt(q21)
    score += parseInt(q22)
    score += parseInt(q23)
    score += parseInt(q24)
    return score
  }

  const handleSubmit = () => {
    setScore(calculateScore())
    handleShow()
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const moodsAnxietyInventoryUI = (<>
    <nav className='m-2'>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/moods">Moods</Link></li>
        <li className="breadcrumb-item active">Anxiety Inventory</li>
      </ol>
    </nav>
    <p className="fs-3">Anxiety Inventory</p>
    <p>Choose one for each item that best describes how much you have experienced each symptom over the last week.</p>

    <div>
      <hr />
      <p>1. Feeling nervous</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q1" id="q1a" value="0" checked={q1 === "0"} onChange={(e) => setQ1(e.target.value)} />
          <label className="btn btn-outline-primary" for="q1a">None</label>

          <input type="radio" className="btn-check" name="q1" id="q1b" value="1" checked={q1 === "1"} onChange={(e) => setQ1(e.target.value)} />
          <label className="btn btn-outline-primary" for="q1b">Sometimes</label>

          <input type="radio" className="btn-check" name="q1" id="q1c" value="2" checked={q1 === "2"} onChange={(e) => setQ1(e.target.value)} />
          <label className="btn btn-outline-primary" for="q1c">Frequently</label>

          <input type="radio" className="btn-check" name="q1" id="q1d" value="3" checked={q1 === "3"} onChange={(e) => setQ1(e.target.value)} />
          <label className="btn btn-outline-primary" for="q1d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>2. Worrying</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q2" id="q2a" value="0" checked={q2 === "0"} onChange={(e) => setQ2(e.target.value)} />
          <label className="btn btn-outline-primary" for="q2a">None</label>

          <input type="radio" className="btn-check" name="q2" id="q2b" value="1" checked={q2 === "1"} onChange={(e) => setQ2(e.target.value)} />
          <label className="btn btn-outline-primary" for="q2b">Sometimes</label>

          <input type="radio" className="btn-check" name="q2" id="q2c" value="2" checked={q2 === "2"} onChange={(e) => setQ2(e.target.value)} />
          <label className="btn btn-outline-primary" for="q2c">Frequently</label>

          <input type="radio" className="btn-check" name="q2" id="q2d" value="3" checked={q2 === "3"} onChange={(e) => setQ2(e.target.value)} />
          <label className="btn btn-outline-primary" for="q2d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>3. Trembling, twitching, feeling shaky</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q3" id="q3a" value="0" checked={q3 === "0"} onChange={(e) => setQ3(e.target.value)} />
          <label className="btn btn-outline-primary" for="q3a">None</label>

          <input type="radio" className="btn-check" name="q3" id="q3b" value="1" checked={q3 === "1"} onChange={(e) => setQ3(e.target.value)} />
          <label className="btn btn-outline-primary" for="q3b">Sometimes</label>

          <input type="radio" className="btn-check" name="q3" id="q3c" value="2" checked={q3 === "2"} onChange={(e) => setQ3(e.target.value)} />
          <label className="btn btn-outline-primary" for="q3c">Frequently</label>

          <input type="radio" className="btn-check" name="q3" id="q3d" value="3" checked={q3 === "3"} onChange={(e) => setQ3(e.target.value)} />
          <label className="btn btn-outline-primary" for="q3d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>4. Muscle tension, muscle aches, muscle soreness</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q4" id="q4a" value="0" checked={q4 === "0"} onChange={(e) => setQ4(e.target.value)} />
          <label className="btn btn-outline-primary" for="q4a">None</label>

          <input type="radio" className="btn-check" name="q4" id="q4b" value="1" checked={q4 === "1"} onChange={(e) => setQ4(e.target.value)} />
          <label className="btn btn-outline-primary" for="q4b">Sometimes</label>

          <input type="radio" className="btn-check" name="q4" id="q4c" value="2" checked={q4 === "2"} onChange={(e) => setQ4(e.target.value)} />
          <label className="btn btn-outline-primary" for="q4c">Frequently</label>

          <input type="radio" className="btn-check" name="q4" id="q4d" value="3" checked={q4 === "3"} onChange={(e) => setQ4(e.target.value)} />
          <label className="btn btn-outline-primary" for="q4d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>5. Restlessness</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q5" id="q5a" value="0" checked={q5 === "0"} onChange={(e) => setQ5(e.target.value)} />
          <label className="btn btn-outline-primary" for="q5a">None</label>

          <input type="radio" className="btn-check" name="q5" id="q5b" value="1" checked={q5 === "1"} onChange={(e) => setQ5(e.target.value)} />
          <label className="btn btn-outline-primary" for="q5b">Sometimes</label>

          <input type="radio" className="btn-check" name="q5" id="q5c" value="2" checked={q5 === "2"} onChange={(e) => setQ5(e.target.value)} />
          <label className="btn btn-outline-primary" for="q5c">Frequently</label>

          <input type="radio" className="btn-check" name="q5" id="q5d" value="3" checked={q5 === "3"} onChange={(e) => setQ5(e.target.value)} />
          <label className="btn btn-outline-primary" for="q5d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>6. Tiring easily</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q6" id="q6a" value="0" checked={q6 === "0"} onChange={(e) => setQ6(e.target.value)} />
          <label className="btn btn-outline-primary" for="q6a">None</label>

          <input type="radio" className="btn-check" name="q6" id="q6b" value="1" checked={q6 === "1"} onChange={(e) => setQ6(e.target.value)} />
          <label className="btn btn-outline-primary" for="q6b">Sometimes</label>

          <input type="radio" className="btn-check" name="q6" id="q6c" value="2" checked={q6 === "2"} onChange={(e) => setQ6(e.target.value)} />
          <label className="btn btn-outline-primary" for="q6c">Frequently</label>

          <input type="radio" className="btn-check" name="q6" id="q6d" value="3" checked={q6 === "3"} onChange={(e) => setQ6(e.target.value)} />
          <label className="btn btn-outline-primary" for="q6d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>7. Shortness of breath</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q7" id="q7a" value="0" checked={q7 === "0"} onChange={(e) => setQ7(e.target.value)} />
          <label className="btn btn-outline-primary" for="q7a">None</label>

          <input type="radio" className="btn-check" name="q7" id="q7b" value="1" checked={q7 === "1"} onChange={(e) => setQ7(e.target.value)} />
          <label className="btn btn-outline-primary" for="q7b">Sometimes</label>

          <input type="radio" className="btn-check" name="q7" id="q7c" value="2" checked={q7 === "2"} onChange={(e) => setQ7(e.target.value)} />
          <label className="btn btn-outline-primary" for="q7c">Frequently</label>

          <input type="radio" className="btn-check" name="q7" id="q7d" value="3" checked={q7 === "3"} onChange={(e) => setQ7(e.target.value)} />
          <label className="btn btn-outline-primary" for="q7d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>8. Rapid heartbeat</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q8" id="q8a" value="0" checked={q8 === "0"} onChange={(e) => setQ8(e.target.value)} />
          <label className="btn btn-outline-primary" for="q8a">None</label>

          <input type="radio" className="btn-check" name="q8" id="q8b" value="1" checked={q8 === "1"} onChange={(e) => setQ8(e.target.value)} />
          <label className="btn btn-outline-primary" for="q8b">Sometimes</label>

          <input type="radio" className="btn-check" name="q8" id="q8c" value="2" checked={q8 === "2"} onChange={(e) => setQ8(e.target.value)} />
          <label className="btn btn-outline-primary" for="q8c">Frequently</label>

          <input type="radio" className="btn-check" name="q8" id="q8d" value="3" checked={q8 === "3"} onChange={(e) => setQ8(e.target.value)} />
          <label className="btn btn-outline-primary" for="q8d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>9. Sweating not due to the heat</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q9" id="q9a" value="0" checked={q9 === "0"} onChange={(e) => setQ9(e.target.value)} />
          <label className="btn btn-outline-primary" for="q9a">None</label>

          <input type="radio" className="btn-check" name="q9" id="q9b" value="1" checked={q9 === "1"} onChange={(e) => setQ9(e.target.value)} />
          <label className="btn btn-outline-primary" for="q9b">Sometimes</label>

          <input type="radio" className="btn-check" name="q9" id="q9c" value="2" checked={q9 === "2"} onChange={(e) => setQ9(e.target.value)} />
          <label className="btn btn-outline-primary" for="q9c">Frequently</label>

          <input type="radio" className="btn-check" name="q9" id="q9d" value="3" checked={q9 === "3"} onChange={(e) => setQ9(e.target.value)} />
          <label className="btn btn-outline-primary" for="q9d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>10. Dry mouth</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q10" id="q10a" value="0" checked={q10 === "0"} onChange={(e) => setQ10(e.target.value)} />
          <label className="btn btn-outline-primary" for="q10a">None</label>

          <input type="radio" className="btn-check" name="q10" id="q10b" value="1" checked={q10 === "1"} onChange={(e) => setQ10(e.target.value)} />
          <label className="btn btn-outline-primary" for="q10b">Sometimes</label>

          <input type="radio" className="btn-check" name="q10" id="q10c" value="2" checked={q10 === "2"} onChange={(e) => setQ10(e.target.value)} />
          <label className="btn btn-outline-primary" for="q10c">Frequently</label>

          <input type="radio" className="btn-check" name="q10" id="q10d" value="3" checked={q10 === "3"} onChange={(e) => setQ10(e.target.value)} />
          <label className="btn btn-outline-primary" for="q10d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>11. Dizziness or light-headedness</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q11" id="q11a" value="0" checked={q11 === "0"} onChange={(e) => setQ11(e.target.value)} />
          <label className="btn btn-outline-primary" for="q11a">None</label>

          <input type="radio" className="btn-check" name="q11" id="q11b" value="1" checked={q11 === "1"} onChange={(e) => setQ11(e.target.value)} />
          <label className="btn btn-outline-primary" for="q11b">Sometimes</label>

          <input type="radio" className="btn-check" name="q11" id="q11c" value="2" checked={q11 === "2"} onChange={(e) => setQ11(e.target.value)} />
          <label className="btn btn-outline-primary" for="q11c">Frequently</label>

          <input type="radio" className="btn-check" name="q11" id="q11d" value="3" checked={q11 === "3"} onChange={(e) => setQ11(e.target.value)} />
          <label className="btn btn-outline-primary" for="q11d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>12. Nausea, diarrhea, or stomach problems</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q12" id="q12a" value="0" checked={q12 === "0"} onChange={(e) => setQ12(e.target.value)} />
          <label className="btn btn-outline-primary" for="q12a">None</label>

          <input type="radio" className="btn-check" name="q12" id="q12b" value="1" checked={q12 === "1"} onChange={(e) => setQ12(e.target.value)} />
          <label className="btn btn-outline-primary" for="q12b">Sometimes</label>

          <input type="radio" className="btn-check" name="q12" id="q12c" value="2" checked={q12 === "2"} onChange={(e) => setQ12(e.target.value)} />
          <label className="btn btn-outline-primary" for="q12c">Frequently</label>

          <input type="radio" className="btn-check" name="q12" id="q12d" value="3" checked={q12 === "3"} onChange={(e) => setQ12(e.target.value)} />
          <label className="btn btn-outline-primary" for="q12d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>13. Increase in urge to urinate</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q13" id="q13a" value="0" checked={q13 === "0"} onChange={(e) => setQ13(e.target.value)} />
          <label className="btn btn-outline-primary" for="q13a">None</label>

          <input type="radio" className="btn-check" name="q13" id="q13b" value="1" checked={q13 === "1"} onChange={(e) => setQ13(e.target.value)} />
          <label className="btn btn-outline-primary" for="q13b">Sometimes</label>

          <input type="radio" className="btn-check" name="q13" id="q13c" value="2" checked={q13 === "2"} onChange={(e) => setQ13(e.target.value)} />
          <label className="btn btn-outline-primary" for="q13c">Frequently</label>

          <input type="radio" className="btn-check" name="q13" id="q13d" value="3" checked={q13 === "3"} onChange={(e) => setQ13(e.target.value)} />
          <label className="btn btn-outline-primary" for="q13d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>14. Flushes (hot flashes) or chills</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q14" id="q14a" value="0" checked={q14 === "0"} onChange={(e) => setQ14(e.target.value)} />
          <label className="btn btn-outline-primary" for="q14a">None</label>

          <input type="radio" className="btn-check" name="q14" id="q14b" value="1" checked={q14 === "1"} onChange={(e) => setQ14(e.target.value)} />
          <label className="btn btn-outline-primary" for="q14b">Sometimes</label>

          <input type="radio" className="btn-check" name="q14" id="q14c" value="2" checked={q14 === "2"} onChange={(e) => setQ14(e.target.value)} />
          <label className="btn btn-outline-primary" for="q14c">Frequently</label>

          <input type="radio" className="btn-check" name="q14" id="q14d" value="3" checked={q14 === "3"} onChange={(e) => setQ14(e.target.value)} />
          <label className="btn btn-outline-primary" for="q14d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>15. Trouble swallowing or feeling of lump in throat</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q15" id="q15a" value="0" checked={q15 === "0"} onChange={(e) => setQ15(e.target.value)} />
          <label className="btn btn-outline-primary" for="q15a">None</label>

          <input type="radio" className="btn-check" name="q15" id="q15b" value="1" checked={q15 === "1"} onChange={(e) => setQ15(e.target.value)} />
          <label className="btn btn-outline-primary" for="q15b">Sometimes</label>

          <input type="radio" className="btn-check" name="q15" id="q15c" value="2" checked={q15 === "2"} onChange={(e) => setQ15(e.target.value)} />
          <label className="btn btn-outline-primary" for="q15c">Frequently</label>

          <input type="radio" className="btn-check" name="q15" id="q15d" value="3" checked={q15 === "3"} onChange={(e) => setQ15(e.target.value)} />
          <label className="btn btn-outline-primary" for="q15d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>16. Feeling keyed up or on edge</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q16" id="q16a" value="0" checked={q16 === "0"} onChange={(e) => setQ16(e.target.value)} />
          <label className="btn btn-outline-primary" for="q16a">None</label>

          <input type="radio" className="btn-check" name="q16" id="q16b" value="1" checked={q16 === "1"} onChange={(e) => setQ16(e.target.value)} />
          <label className="btn btn-outline-primary" for="q16b">Sometimes</label>

          <input type="radio" className="btn-check" name="q16" id="q16c" value="2" checked={q16 === "2"} onChange={(e) => setQ16(e.target.value)} />
          <label className="btn btn-outline-primary" for="q16c">Frequently</label>

          <input type="radio" className="btn-check" name="q16" id="q16d" value="3" checked={q16 === "3"} onChange={(e) => setQ16(e.target.value)} />
          <label className="btn btn-outline-primary" for="q16d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>17. Being quick to startle</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q17" id="q17a" value="0" checked={q17 === "0"} onChange={(e) => setQ17(e.target.value)} />
          <label className="btn btn-outline-primary" for="q17a">None</label>

          <input type="radio" className="btn-check" name="q17" id="q17b" value="1" checked={q17 === "1"} onChange={(e) => setQ17(e.target.value)} />
          <label className="btn btn-outline-primary" for="q17b">Sometimes</label>

          <input type="radio" className="btn-check" name="q17" id="q17c" value="2" checked={q17 === "2"} onChange={(e) => setQ17(e.target.value)} />
          <label className="btn btn-outline-primary" for="q17c">Frequently</label>

          <input type="radio" className="btn-check" name="q17" id="q17d" value="3" checked={q17 === "3"} onChange={(e) => setQ17(e.target.value)} />
          <label className="btn btn-outline-primary" for="q17d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>18. Difficulty concentrating</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q18" id="q18a" value="0" checked={q18 === "0"} onChange={(e) => setQ18(e.target.value)} />
          <label className="btn btn-outline-primary" for="q18a">None</label>

          <input type="radio" className="btn-check" name="q18" id="q18b" value="1" checked={q18 === "1"} onChange={(e) => setQ18(e.target.value)} />
          <label className="btn btn-outline-primary" for="q18b">Sometimes</label>

          <input type="radio" className="btn-check" name="q18" id="q18c" value="2" checked={q18 === "2"} onChange={(e) => setQ18(e.target.value)} />
          <label className="btn btn-outline-primary" for="q18c">Frequently</label>

          <input type="radio" className="btn-check" name="q18" id="q18d" value="3" checked={q18 === "3"} onChange={(e) => setQ18(e.target.value)} />
          <label className="btn btn-outline-primary" for="q18d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>19. Trouble falling or staying asleep</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q19" id="q19a" value="0" checked={q19 === "0"} onChange={(e) => setQ19(e.target.value)} />
          <label className="btn btn-outline-primary" for="q19a">None</label>

          <input type="radio" className="btn-check" name="q19" id="q19b" value="1" checked={q19 === "1"} onChange={(e) => setQ19(e.target.value)} />
          <label className="btn btn-outline-primary" for="q19b">Sometimes</label>

          <input type="radio" className="btn-check" name="q19" id="q19c" value="2" checked={q19 === "2"} onChange={(e) => setQ19(e.target.value)} />
          <label className="btn btn-outline-primary" for="q19c">Frequently</label>

          <input type="radio" className="btn-check" name="q19" id="q19d" value="3" checked={q19 === "3"} onChange={(e) => setQ19(e.target.value)} />
          <label className="btn btn-outline-primary" for="q19d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>20. Irritability</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q20" id="q20a" value="0" checked={q20 === "0"} onChange={(e) => setQ20(e.target.value)} />
          <label className="btn btn-outline-primary" for="q20a">None</label>

          <input type="radio" className="btn-check" name="q20" id="q20b" value="1" checked={q20 === "1"} onChange={(e) => setQ20(e.target.value)} />
          <label className="btn btn-outline-primary" for="q20b">Sometimes</label>

          <input type="radio" className="btn-check" name="q20" id="q20c" value="2" checked={q20 === "2"} onChange={(e) => setQ20(e.target.value)} />
          <label className="btn btn-outline-primary" for="q20c">Frequently</label>

          <input type="radio" className="btn-check" name="q20" id="q20d" value="3" checked={q20 === "3"} onChange={(e) => setQ20(e.target.value)} />
          <label className="btn btn-outline-primary" for="q20d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>21. Avoiding places where i might be anxious</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q21" id="q21a" value="0" checked={q21 === "0"} onChange={(e) => setQ21(e.target.value)} />
          <label className="btn btn-outline-primary" for="q21a">None</label>

          <input type="radio" className="btn-check" name="q21" id="q21b" value="1" checked={q21 === "1"} onChange={(e) => setQ21(e.target.value)} />
          <label className="btn btn-outline-primary" for="q21b">Sometimes</label>

          <input type="radio" className="btn-check" name="q21" id="q21c" value="2" checked={q21 === "2"} onChange={(e) => setQ21(e.target.value)} />
          <label className="btn btn-outline-primary" for="q21c">Frequently</label>

          <input type="radio" className="btn-check" name="q21" id="q21d" value="3" checked={q21 === "3"} onChange={(e) => setQ21(e.target.value)} />
          <label className="btn btn-outline-primary" for="q21d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>22. Thoughts of danger</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q22" id="q22a" value="0" checked={q22 === "0"} onChange={(e) => setQ22(e.target.value)} />
          <label className="btn btn-outline-primary" for="q22a">None</label>

          <input type="radio" className="btn-check" name="q22" id="q22b" value="1" checked={q22 === "1"} onChange={(e) => setQ22(e.target.value)} />
          <label className="btn btn-outline-primary" for="q22b">Sometimes</label>

          <input type="radio" className="btn-check" name="q22" id="q22c" value="2" checked={q22 === "2"} onChange={(e) => setQ22(e.target.value)} />
          <label className="btn btn-outline-primary" for="q22c">Frequently</label>

          <input type="radio" className="btn-check" name="q22" id="q22d" value="3" checked={q22 === "3"} onChange={(e) => setQ22(e.target.value)} />
          <label className="btn btn-outline-primary" for="q22d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>23. Seeing myself as unable to cope</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q23" id="q23a" value="0" checked={q23 === "0"} onChange={(e) => setQ23(e.target.value)} />
          <label className="btn btn-outline-primary" for="q23a">None</label>

          <input type="radio" className="btn-check" name="q23" id="q23b" value="1" checked={q23 === "1"} onChange={(e) => setQ23(e.target.value)} />
          <label className="btn btn-outline-primary" for="q23b">Sometimes</label>

          <input type="radio" className="btn-check" name="q23" id="q23c" value="2" checked={q23 === "2"} onChange={(e) => setQ23(e.target.value)} />
          <label className="btn btn-outline-primary" for="q23c">Frequently</label>

          <input type="radio" className="btn-check" name="q23" id="q23d" value="3" checked={q23 === "3"} onChange={(e) => setQ23(e.target.value)} />
          <label className="btn btn-outline-primary" for="q23d">Mostly</label>
        </div>
      </div>
    </div>

    <div>
      <hr />
      <p>24. Thoughts that something terrible will happen</p>
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <input type="radio" className="btn-check" name="q24" id="q24a" value="0" checked={q24 === "0"} onChange={(e) => setQ24(e.target.value)} />
          <label className="btn btn-outline-primary" for="q24a">None</label>

          <input type="radio" className="btn-check" name="q24" id="q24b" value="1" checked={q24 === "1"} onChange={(e) => setQ24(e.target.value)} />
          <label className="btn btn-outline-primary" for="q24b">Sometimes</label>

          <input type="radio" className="btn-check" name="q24" id="q24c" value="2" checked={q24 === "2"} onChange={(e) => setQ24(e.target.value)} />
          <label className="btn btn-outline-primary" for="q24c">Frequently</label>

          <input type="radio" className="btn-check" name="q24" id="q24d" value="3" checked={q24 === "3"} onChange={(e) => setQ24(e.target.value)} />
          <label className="btn btn-outline-primary" for="q24d">Mostly</label>
        </div>
      </div>
    </div>

    <button className="btn btn-primary m-3" onClick={handleSubmit}>Submit</button>

    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Anxiety Inventory</Modal.Title>
      </Modal.Header>
      <Modal.Body>You scored {score}/72. {parseFloat(score/72*100).toFixed(1)+"%"}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>)

  return (<>
    <PrivateNavbar active="moods" />
    <Container fluid>
      <Row>
        <Col lg="3" className="border d-none d-lg-block bg-light position-fixed p-0">
          <PrivateSidebar active="moods" />
        </Col>
        <Col className="col-lg-9 offset-lg-3 col-md-12 offset-md-0">
          {moodsAnxietyInventoryUI}
          <Toaster />
        </Col>
      </Row>
    </Container>
  </>)
}