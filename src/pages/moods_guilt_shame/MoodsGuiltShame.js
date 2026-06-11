import "./MoodsGuiltShame.css"
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

export default function MoodsGuiltShame() {
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

  const moodsGuiltShameUI = (<>
    <nav className='m-2'>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/moods">Moods</Link></li>
        <li className="breadcrumb-item active">Guilt & Shame</li>
      </ol>
    </nav>
    <p className="fs-3">Guilt & Shame</p>
    <p>Guilt and shame are closely connected emotions. We tend to feel guilty when we believe we have violated rules that are important to us, or when we have not lived up to standards that we have set for ourselves. We feel guilty when we judge that we have done something wrong. If we think we "should" have behaved differently or that we "ought" to have done better, we are likely to feel guilty.</p>
    <p>Shame also involves the sense that we have done something wrong. However, when we feel ashamed, we assume that what we have done wrong means that we are "flawed", "no good", "inadequate", "rotten", "awful", or "bad". Shame is usually connected to a highly negative view of ourselves. Secretiveness often surrounds shame. We may think, "If others knew this secret, they would be disgusted with me or think less of me". For this reason, the source of shame is rarely revealed and remains hidden and destructive. Shame often accompanies a family secret involving other family members - a secret such as alcoholism, sexual abuse, abortion, bankruptcy, or other behavior considered dishonorable in the community.</p>
    <p className="fs-5">Overcoming Guilt and Shame</p>
    <p>Overcoming guilt and shame does not necessarily mean letting yourself off the hook if you believe you have done something wrong. It does mean taking an appropriate amount of responsibility and coming to terms with whatever led you to feel this way.</p>
    <p>There are five aspects to overcoming guilt and shame: <b>assessing the seriousness of your actions</b>, <b>weighing personal responsibility</b>, <b>making reparations for any harm you have caused</b>, <b>breaking the silence surrounding shame</b>, and <b>self-forgiveness</b>. Often only one or two of these exercises are necessary to help in overcoming guilt. Overcoming shame may require working on all five aspects.</p>
    <p className="fs-5">1. Assessing the Seriousness of Your Actions</p>
    <p>Many people would judge the seriousness of events differently. Your evaluation of the seriousness of an action or thought depends on your own rules and values. Many people say that they would feel guiltier about lying to their mothers than about not answering the phone. Some people may feel equally guilty in all examples.</p>
    <p>Frequent guilt and shame mean either that you are living your life in a way that violates your principles (e.g. having an affair when you believe in monogamous marriage), or that you are judging too many small actions as serious. To evaluate the seriousness of your actions leading to guilt and shame, you can answer the questions in the following. These questions encourage you to look at the situation from different perspectives. This will be particularly helpful if you tend to feel guilt or shame in many situations, even when others with similar values do not feel that way. Perspective-shifting questions can help you evalate the seriousness of your actions. Ask yourself "How important will this seem in five years?" Having an affair will almost certainly still seem like a big violation of monogamous relationship in five years. Arriving home late for dinner three nights in a row will not seem important in five years, even if it is a distressing event for you or your partner now. Therefore, lasting guilt about an affair would make more sense than lasting guilt about arriving home late for dinner.</p>
    <p>Questions to Evaluate the Seriousness of My Actions:</p>
    <ul>
      <li>Do other people consider this experience to be as serious as I do? Why?</li>
      <li>Do some people consider it less serious? Why?</li>
      <li>How serious would I consider the experience if my best friend did this instead of me?</li>
      <li>How important will this experience seem in one month? One year? Five years?</li>
      <li>How serious would I consider the experience if someone did it to me?</li>
      <li>Did I know ahead of time the meaning or consequences of my actions (or thoughts)? Based on what I knew at the time, do my current judgements apply?</li>
      <li>Did any damage occur? If so, can it be corrected? If so, how long will this take?</li>
      <li>Was there an even worse action I considered and avoided (e.g. I considered lying but instead avoided answering the phone)?</li>
    </ul>
    <p className="fs-5">2. Weighing Personal Responsibility</p>
    <p>Once you have assessed the seriousness of your actions, it is helpful to weigh how much of your perceived wrongdoing is your personal responsibility. A good way to weigh personal responsibility is to construct a "responsibility pie". To do this, list all the people and aspects of a situation that contributed to an event about which you feel guilty or ashamed. Include yourself on the list. Then draw a circle to represent a pie, and assign slices of the responsibility for the event in sizes that reflect relative responsibility. Draw your own slice last, so that you do not prematurely assign too much responsibility to yourself.</p>
    <p>Responsibility pies can help you evaluate the level of responsibility of each of the contributors to a situation. A responsibility pie is not designed to always reduce guilt. Sometimes it is healthy to feel guilty about what we have done. In these instances, we can take steps to make amends for harm we have done to others. We can also come up with a plan to help ourselves respond in ways that are closer to our values. People who often feel guilty over small things find that responsibility pies help them recognize that they are not 100% responsible for the undesirable things that happen. People who feel guilt or shame when they have caused harm to others can use a responsibility pie to evaluate their role in any damage that was done before making reparations.</p>
    <p>Using a Responsibility Pie for Guilt or Shame</p>
    <p>Think of a negative event or situation in your life for which you feel guilt or shame. List this event or situation in item 1. In item 2, list all the people and circumstances that could have contributed to the outcome. Place yourself at the bottom of the list, so you can rate your portion of the responsibility last. Divide the pie in item 3 into slices, labeling the slices with the names of the people or circumstances on your list. Assign bigger pieces to people or circumstances that you think have greater responsibility. When you are finished, use the questions in item 4 to consider how much responsibility is yours.</p>
    <ol>
      <li>Negative event or situation leading to guilt or shame:</li>
      <li>People and circumstances that could have contributed to this outcome:</li>
      <li>Responsibility Pie: &#9675;</li>
      <li>Are you 100% responsible? How does this responsibility pie affect your feelings of guilt and shame? Is there some action you can take to make amends for the part you are responsible for?</li>
    </ol>
    <p className="fs-5">3. Making reparations</p>
    <p>If you have injured another person, it is important to make amends for your actions. Trying to repair the damage you have done can be an important component in healing yourself and the relationship. Making amends involves recognizing what you did, being courageous enough to face the person you have hurt, asking forgiveness, and determining what you can do to repair the hurt you caused.</p>
    <p>Making Reparations for Hurting Someone:</p>
    <ul>
      <li>This is who I hurt:</li>
      <li>This is what I did that was harmful:</li>
      <li>This is why it was wrong (my values that I violated):</li>
      <li>This is what I can do to make amends:</li>
      <li>This is what I can say to the person I hurt:
        <ul>
          <li>I realize when I (describe the action or behavior here):</li>
          <li>this hurt you. This was wrong because:</li>
          <li>I'm sorry I did this. I want to do:</li>
          <li>to let you know how truly sorry I am, and I hope you can forgive me in time.</li>
        </ul>
      </li>
    </ul>
    <p>Notice how it focuses on your making amends, not on the other person's forgiving you. You can ask someone to forgive you "in time", but this is no guarantee that the person will do so, especially if you have hurt this person very deeply or many times. However, making amends can help you feel better, especially when you are truly sorry, make some change in your behavior to try to be a better person, and make an effort to make amends to the person you hurt. Your attempts to be a better person brings you closer to acting within your values, and this can help you feel better about yourself.</p>
    <p className="fs-5">4. Breaking the Silence Surrounding Shame</p>
    <p>When secretiveness surrounds shame, it may be important to talk to a trusted person about what occurred. The need to keep silent is often based on the expectation that revealing your secret will result in condemnation, criticism, or rejection. It is not unusual for people who have carried a secret for a lifetime to be surprised at the acceptance they receive when they reveal their secret. Acceptance runs counter to the anticipated rejection and forces a reassessment of the meaning of your secret.</p>
    <p>Although you may not trust anyone fully, it is important to reveal your secret to the people you trust the most. You may tell people how anxious it makes you feel to reveal your secret and how difficult it is for you to do. Be sure to talk to someone at a time and place when you will have adequate time to say something you need to say, and to talk about the feedback you get.</p>
    <p className="fs-5">5. Self-Forgiveness</p>
    <p>Being a good person doesn't mean that you will never do bad things. Part of being human is making mistakes. If, after careful evaluation, you conclude that you have done something wrong, then self-forgiveness may help alleviate your guilt or shame.</p>
    <p>No one is perfect. All of us, at one point or another, have violated our own principles or standards. We feel guilty and ashamed if we believe that what we did means that we are bad. But violations do not necessarily mean that we are bad. Our actions may have been linked to a particular situation or to a specific time in our lives.</p>
    <p>Self-forgiveness can lead to a change in interpretation of the meaning of the violation or mistake we made. Our understanding may change from "I made this mistake because I'm an awful person", to "I made this mistake during an awful time in my life, when I didn't care if I behave this way".</p>
    <p>Just as in the forgiveness letter you wrote to someone else, self-forgiveness does not mean that you approve, forget, or deny whatever pain you have caused others. Instead, self-forgiveness involves recognizing your own imperfections and mistakes and accepting your shortcomings. It can also help you if you see that your life has not been one mistake or harmful action after another. Self-forgiveness includes recognizing your good and bad qualities, your strengths as well as weaknesses.</p>
    <p>Some people have great difficulty forgiving themselves; they may have harsh and critical internal voices. If you are able to forgive others for their faults, but you have a hard time forgiving yourself, you can benefit from practicing self-forgiveness. This involves learning to view yourself with the same kindness or compassion with which you view others.</p>
    <p>Forgiving Myself:</p>
    <ol>
      <li>This is what I need to forgive myself for:</li>
      <li>This is the impact of what I did has had on me and others in my life:</li>
      <li>This is how it continues to affect me and others:</li>
      <li>This is how I imagine my life will be better if I'm able to forgive myself:</li>
      <li>Forgiveness often begins with understanding. What life experiences have I had that might have contributed to what I did?</li>
      <li>How would I think about someone else who did this?</li>
      <li>What positive aspects of myself and my life do I tend to ignore when I'm feeling guilt or shame?</li>
      <li>Forgiveness does not mean that you condone, forget, or deny what was done and the pain you have experienced. Instead, forgiveness means finding a way to let go you your guilt and shame, and understand your actions from a different perspective. Write with a kind, compassionate voice about how I can forgive myself for what I have done:</li>
      <li>These are the qualities that I have that will allow me to move forward:</li>
    </ol>
  </>)

  return (<>
    <PrivateNavbar active="moods" />
    <Container fluid>
      <Row>
        <Col lg="3" className="border d-none d-lg-block bg-light position-fixed p-0">
          <PrivateSidebar active="moods" />
        </Col>
        <Col className="col-lg-9 offset-lg-3 col-md-12 offset-md-0">
          {moodsGuiltShameUI}
          <Toaster />
        </Col>
      </Row>
    </Container>
  </>)
}