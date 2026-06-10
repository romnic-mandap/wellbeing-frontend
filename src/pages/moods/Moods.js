import "./Moods.css"
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

export default function Moods() {
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

  const handleDepressionInventory = () => {
    navigate("/moods/depression-inventory")
  }
  const handleAnxietyInventory = () => {
    navigate("/moods/anxiety-inventory")
  }
  const handleDepression = () => {
    navigate("/moods/depression")
  }
  const handleAnxiety = () => {
    navigate("/moods/anxiety")
  }
  const handleAnger = () => {
    navigate("/moods/anger")
  }
  const handleGuilt = () => {
    navigate("/moods/guilt")
  }
  const handleShame = () => {
    navigate("/moods/shame")
  }

  const moodsUI = (<>
    <p className="fs-3">Moods</p>

    <div className="d-flex flex-wrap">
      <div className="flex-grow-1 col-md-6">
        <div className="card">
          <div className="card-body">
            <h5 class="card-title">Depression</h5>
            <p class="card-text">To track the symptoms of depression you are experiencing, rate each item listed in the inventory. Fill this out periodically, to assess how your depression is changing and which skills are most worthwhile.</p>
            <p class="card-text">A general pattern of decreasing scores overtime is a sign that the changes you are making are contributing to your improvement.</p>
            <button class="btn btn-primary" onClick={handleDepressionInventory}>Take inventory</button>
          </div>
        </div>
      </div>
      <div className="flex-grow-1 col-md-6">
        <div className="card">
          <div className="card-body">
            <h5 class="card-title">Anxiety</h5>
            <p class="card-text">To specify what symptoms you experience when you are anxious, rate the symptoms listed in the inventory. Take the eventory once a week while you are learning methods to manage your anxiety, so you can determine which skills are most effective and to track your progress.</p>
            <button class="btn btn-primary" onClick={handleAnxietyInventory}>Take inventory</button>
          </div>
        </div>
      </div>
    </div>

    <hr />
    <p className="fs-5">Depression</p>
    <p>Depression does not just describe a mood; it also involves changes in thinking, behavior, and physical functioning. When we are depressed, we tend to have negative thoughts about ourselves, our experiences, and the future.</p>
    <p>There are many effective treatments for depression, including CBT, improving your relationships, and medication.</p>
    <p>CBT for depression helps us learn new ways of thinking and behaving in order to improve our moods in a lasting way.</p>
    <div className="d-flex justify-content-end">
      <button class="btn btn-primary" onClick={handleDepression}>Learn More...</button>
    </div>

    <hr />
    <p className="fs-5">Anxiety</p>
    <p>Common types of anxiety include phobias, social anxiety, panic disorder, posttraumatic stress disorder, health worries, and generalized anxiety disorder.</p>
    <p>Anxiety symptoms include a wide range of physical reactions; moods that range from nervousness to panic; avoidance of situations or feelings; and worries about danger, as well as thoughts about not being able to cope.</p>
    <p>Common behaviors when we are anxious are avoidance and safety behaviors. These types of behaviors reduce our anxiety in the short term, but make our anxiety worse over time.</p>
    <p>Anxious thoughts include overestimations of danger, along with underestimations of our ability to cope with the threats we anticipate</p>
    <p>Thoughts that accompany anxiety often begin with "What if...?" and contain the theme that "Something terrible is going to happen, and I won't be able to cope.</p>
    <p>Our anxious thoughts often occur as images. It is important to identify these images so we can respond to them in helpful ways.</p>
    <p>Different types of anxiety are characterized by different thoughts, depending on the type of dangers anticipated.</p>
    <p>One of the best ways to overcome anxiety is to face our fears through exposure to what scares us. A fear ladder is often used to help use face our fears one step at a time at a pace we can tolerate.</p>
    <p>Many skills can help us manage anxiety as we face our fears, including mindfulness and acceptance, breathing, progressive muscle relaxation, imagery, and changing our anxious thoughts.</p>
    <p>Medication can be helpful to some people in the short term, but it does not lead to enduring improvement in anxiety for most people</p>
    <p>Changing our thoughts is an important way to achieve enduring improvement from anxiety</p>
    <div className="d-flex justify-content-end">
      <button class="btn btn-primary" onClick={handleAnxiety}>Learn More...</button>
    </div>

    <hr />
    <p className="fs-5">Anger</p>
    <p>Anger is characterized by muscle tension, increased heart rate, increased blood pressure, and defensiveness or attack.</p>
    <p>When we are angry, our thoughts focus on our perceptions that other people are hurting us, threatening us, breaking the rules, or being unfair.</p>
    <p>Anger can range from mild irritation to rage. How angry we feel is influenced by our interpretation of the meaning of events, our expectations for other people, and whether or not we thought the other person's behavior was intentional or not.</p>
    <p>Methods that are effective in controlling anger include testing angry thoughts, using imagery to anticipate and prepare for events in which you are at high rish of anger, recognizing the early warning signs of anger, timeouts, assertion, forgiveness, and couple or family therapy</p>
    <div className="d-flex justify-content-end">
      <button class="btn btn-primary" onClick={handleAnger}>Learn More...</button>
    </div>

    <hr />
    <p className="fs-5">Guilt</p>
    <p>We feel guilty when we believe that we have done something wrong or not lived up to the standards we have set for ourselves.</p>
    <p>Guilt is often accompanied by thoughts containing the words "should" or "ought".</p>
    <div className="d-flex justify-content-end">
      <button class="btn btn-primary" onClick={handleGuilt}>Learn More...</button>
    </div>

    <hr />
    <p className="fs-5">Shame</p>
    <p>Shame involves the perception that we have done something wrong, that we have to keep it a secret, and that what we have done means something terrible about us.</p>
    <p>Guilt and shame can be lessened or eliminated by assessing the seriousness of your actions, weighing personal responsibility, making reparations for any harm you caused, breaking the silence surrounding shame, and self-forgiveness.</p>
    <div className="d-flex justify-content-end">
      <button class="btn btn-primary" onClick={handleShame}>Learn More...</button>
    </div>

  </>)

  return (<>
    <PrivateNavbar active="moods" />
    <Container fluid>
      <Row>
        <Col lg="3" className="border d-none d-lg-block bg-light position-fixed p-0">
          <PrivateSidebar active="moods" />
        </Col>
        <Col className="col-lg-9 offset-lg-3 col-md-12 offset-md-0">
          {moodsUI}
          <Toaster />
        </Col>
      </Row>
    </Container>
  </>)
}