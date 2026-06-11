import "./MoodsAnger.css"
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

export default function MoodsAnger() {
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

  const moodsAngerUI = (<>
    <nav className='m-2'>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/moods">Moods</Link></li>
        <li className="breadcrumb-item active">Anger</li>
      </ol>
    </nav>
    <p className="fs-3">Anger</p>
    <p>There is great individual variation in the types of events that elicit anger. One person may get angry while standing in line, and yet may listen calmly to criticisms of job performance. A different person may be perfectly content to stand in line, and yet may quickly attack anyone who points out work flaws. The types of events that provoke our anger are usually linked to our past, as well as to rules and beliefs that we hold.</p>
    <p>For example, if we have been abused frequently or severely in the past, we may have a tendency to be "on guard" against future abuse. Some people who have a long history of abuse or criticism are quick to see current events as abusive and may experience chronic anger, sometimes seemingly out of proportion to the events that provoke their anger.</p>
    <p>The pattern of quick and frequent anger goes along with a belief that it is possible to protect ourselves by confronting abuse. What about people who have been frequently abused, but who feel helpless to protect themselves? People who believe they are helpless often react to abuse not with anger, but with resignation and depression. If you feel helpless in the face of abuse, your challenge may be learning to experience anger when someone is hurting you, rather than learning to control it. Therefore, anger can be a problem either because it is too frequent, out of proportion to the event, and expressed in destructive ways, or because it is absent. It is normal to feel angry sometimes, and anger can be a healthy and adaptive response.</p>
    <p className="fs-5">Angry Thoughts</p>
    <p>Anger is linked to a perception of threat, damage, or hurt, and to a belief that important rules have been violated. We also become angry if we think we have been treated unfairly or prevented from obtaining something we expected to achieve.</p>
    <p>Imagine a man who loses his job. Does he feel angry? It depends. If the man loses his job and considers this a fair decision (perhaps because the company went bankrupt and all of its employees lost their jobs), he is unlikely to feel angry. However, if he thinks his job loss was unfair (perhaps others were not fired, or only men of a certain race or age lost their jobs), then he may feel very angry.</p>
    <p>Similarly, if a child steps on your foot while you are riding on a bus, you feel pain. Whether or not you feel angry depends on your interpretation of the intent and the reasonableness of the child's behavior. Your anger is likely to be quick if you think the injury was intentional. But if you think that the child stepped on your foot by accident when a swerve of the bus made the child lose balance, you may wince in pain, but you probably do no feel anger. The probability of anger in response to an injury is related to your judgements of reasonableness or intention. For example, on an overcrowded bus, you may overlook someone's stepping on your foot more easily than you do on a nearly empty bus.</p>
    <p>These rules of anger may seem quire straightforward until you consider that people vary greatly in what they consider fair and reasonable. Both people can believe that their own expectations were reasonable and the other's expectations were unrealistic.</p>
    <p>Anger is rarely so intense as when it is experienced with someone with whom we are in close contact, whether this person is a love partner or a work colleague. The link between anger and intimacy can be best understood by recognizing that each of us has multiple expectations for our friendships, love relationships, work partnerships, and so forth. We are less likely to have specific personal expectations for people we meet casually. We rarely feel intense anger toward a store clerk, because our expectations for this type of relationship are quite low. The closer our relationship with someone, the more likely it is that we have high expectations of this person. To complicate the picture, we may not tell people about our expectations, or even become aware of them ourselves, until they have been broken. Then we feel hurt, disappointed, and often angry.</p>
    <p className="fs-5">Anger Management Strategies</p>
    <p className="fs-5">1. Testing Angry Thoughts</p>
    <p>How we respond to angry thoughts depends on the role these thoughts play in our lives. If we rarely experience anger, and angry thoughts arise from a clear injustice, our response will be to find out how to use our anger to respond constructively to the situation. When we are frequently angry, especially if our anger creates problems for us and our relationships, then we want to learn to examine our angry thoughts and see if there might be another way of thinking about things.</p>
    <p>When we are angry, we tend to interpret or misinterpret other people's intentions in a personal and negative way. We may think that they are intentionally mistreating us or taking advantage of us, even when this is not the case. For example suppose you are standing a few feet from the counter in a store, waiting for a clerk to finish with another customer because you need help. As soon as the clerk finishes with that customer, someone else walks up to the counter and begins to talk to the clerk. If you think that this person saw you and deliberately stepped in front of you, you might feel angry. If, on the other hand, you thought that this was an  honest mistake and the person did not see you standing there, then you are less likely to feel angry. The difference between these two reactions is whether we personalize the other person's actions. Do we think they did this "to us", or was the other person unaware that we were standing there?</p>
    <p>When we get angry, we tend to personalize other people's actions. One of the advantages of Thought Records is that they help you think through these types of situations. You can learn to ask yourself questions that help you consider other people's intentions. Can you remember a time when you stepped in front of someone else who was waiting in line because you didn't see that person standing there? You did not intend to take advantage of the person. Instead, it was a simple mistake that everyone makes from time to time. Learning to interpret other people's actions less personally, to consider the intentions of other people in a kinder way, and to look at situations from different perspectives are helpful ways of responding to anger.</p>
    <p>If you find yourself labeling and judging someone in your life in a consistent way, this is often a sign that you have put this person in a box. When you become aware of this, there are several things you can do to reduce your anger and open up the box. When your hot buttons get pushed, instead of reacting in an angry way, you can try to be a nonjudgemental observer and get more information, so you can test your assumptions about other people's intentions.</p>
    <p>The advantage of gathering more information when we start to think negatively about others is that it often helps us understand other people's actions in new ways</p>
    <p>Other methods that may help you control your anger include anticipating and preparing for events that place you at high risk of experiencing anger, recognizing the early warning signs of anger, timeouts, assertion training, and couple or family therapy</p>
    <p className="fs-5">2. Using Imagery to Anticipate and Prepare for Events</p>
    <p>It can help to anticipate and prepare for situations in which you are likely to get angry. Calming down before entering these situations prepares you to handle events that might normally trigger anger. In addition to using imagery to calm yourself, you can use imagery to plan and prepare the types of responses you want to make.</p>
    <p>It is best to use imagery before entering a situation in which you are at high risk for losing your temper. You may find it helpful to imagine yourself saying what you want to say, in the manner in which you want to say it, and getting the response you hope to get. Just in case things don't turn out as well as you hope, it may be helpful to imagine how you can handle problems that might occur. Mentally rehearsing responses to challenging situations can help you feel more confident and less threatened if things go poorly. In turn, this confidence can help you respond in effective and adaptive ways, rather than simply erupting in anger when things don't work out. Imagery works, in part because it helps you think through possible problem areas and design your response in advance. Furthermore, it can be helpful to see yourself as effective and relaxed in a high-rish, stressful situation. Finally it is helpful to construct an ideal image of how you want to respond; the image can help guide your responses in the actual situation.</p>
    <p>If you can identify a situation that is going to be stressful and in which you are at high risk for experiencing anger, you have the opportunity to plan, write out, and rehearse exactly what you want to say ad how you want to say it. This script can help you develop a strategy targeted to what you want to achieve and enter the situation with a greater degree of confidence.</p>
    <p className="fs-5">3. Recognizing Early Warning Signs of Anger</p>
    <p>In addition to the anticipation of situations in which you are likely to be angry, it can be helpful to recognize the signs that you are becoming angry or that your anger is getting out of control. For many people, early warning signs of anger that might get out of control include shakiness, muscle tensions, clenched jaw, chest pressure, yelling, clenched fist, and saying things that are not true. Some anger is OK - but when you recognize that you are beginning to move into a destructive zone of anger, take a moment to remind yourself of your options. You can choose to be angry, or to use timeouts or assertion as described below to calm down.</p>
    <p className="fs-5">4. Timeouts</p>
    <p>Timeouts can be an effective way to control anger. Taking a timeout involves removing yourself from the situation you are in when the early warning signs indicate that your anger might get out of control. Taking a timeout helps you reclaim control over yourself and over the situation. You can remind yourself what is important to you and what you are trying to accomplish</p>
    <p>The effective use of timeouts involves recognizing the earliest signs that your anger is interfering with how you want to handle the situation or is becoming destructive. You can use timeouts as athletes do: to regroup, strategize, relax, or simply rest. Your timeout may be as short as 5 minutes or as long as 24 hours. The timeout is not used to avoid a situation, but rather to enable you to approach the situation from a new angle and with a fresh start. At times, merely getting out of the situation will help you to view it differently. During the timeout, you may find it helpful to practice the relaxation exercises. You may find that you get the most out of a timeout when you use it to test some of your angry thoughts. Some people try to reenter the situation with a new strategy in mind, to minimize the possibility of an angry blowup. As described earlier, you can use imagery to practice what you plan to say and do before you go back into the situation.</p>
    <p className="fs-5">5. Assertion</p>
    <p>Learning to be assertive can reduce difficulties with anger. Assertion is often described as the middle road between being aggressive and passively allowing someone to take advantage of use. When we are aggressive, we attack the other person. When we are overly passive, we allow others to attack us. Assertion describes a middle road in which we stand up for ourselves without attacking the other person.</p>
    <p>Assertion also means expressing wants and needs in a straightforward way. For example, suppose you are coming home from work, and your children all start asking for your attention at once. If you are tired and try to satisfy all their needs (passive), you may start feeling overwhelmed and eventually blow up in anger at them (aggressive). It is often better to be assertive and say something like this: "I'm really tired and need a few minutes to myself before I can play with you". This gives you time to regroup, remember how much you love your children, and prepare yourself for spending time with them and/or setting limits as necessary. In this way, assertion can reduce the frequency of being treated unfairly or being taken advantage of, and therefore can prevent situations that give rise to anger. It also gives you a greater sense of control in your life.</p>
    <p>Four Strategies to Help You Plan and Practice Assertive Responses:</p>
    <ol>
      <li>Use "I" statements</li>
      <li>Acknowledge any truth in someone's complaints about you, and at the same time stand up for your own rights.</li>
      <li>Make clear and simple statements of your wants and needs, rather than expecting other people to read your mind or anticipate what you want.</li>
      <li>Focus on the process of assertion rather than the result</li>
    </ol>
    <p>Thoughts and Assumptions That Interfere with Being Assertive:</p>
    <ul>
      <li>"If you really like/love me, then you will know what I need"</li>
      <li>"People won't like me if I say no"</li>
      <li>"Why bother? I'm not going to get what I want anyhow"</li>
      <li>"It's not worth the argument it is going to create"</li>
      <li>"I can live with this the way it is"</li>
      <li>"If someone is not speaking nicely to me. I don't need to respond nicely"</li>
    </ul>
    <p>These assumptions can be harmful to relationships. People who care deeply about us often do not know what we want or need. The assumption that people should know without our saying anything leads to frequent hurt and anger. Making clear and simple statements about your wants and needs is a good relationship skill and often reduces the hurt and irritation that can lead to anger.</p>
    <p className="fs-5">6. Forgiving Others</p>
    <p>When someone has deeply or repeatedly hurt us, anger can last a long time. Ongoing anger can eat away at our spirit and prevent us from experiencing happiness and joy. In this case, finding a way to let go of anger may be worthwhile. Forgiving others who have hurt us can help us let go of anger and hurt. If the person who hurt us is sorry and apologizes, forgiveness is a bit easier. However, if the person is not sorry for what has been done or said, then forgiveness is often more difficult. It is helpful to keep in mind that forgiveness is about relieving ourselves of the burden of anger. It does not mean overlooking the actions of the other person; it means looking at those actions in a different way. For example, we might accept that the person who hurt us is troubled or has his or her own issues to work out.</p>
    <p>Sometimes we may decide not to forgive someone, such as when someone continues abusing us or those we care about. In this case the only way to let go of anger may be to accept that the other person is abusive, be clear in our own minds that we are not to blame, and figure out ways to protect ourselves from future abuse. Sometimes this includes putting distance between ourselves and the abusive person.</p>
    <p>If you decide to forgive someone, here are two approaches that can help. remember that you can engage in the process of forgiveness for your own sake, and not for the benefit of the other person. In fact, you do not even need to communicate your forgiveness to the other person.</p>
    <ol>
      <li>Directly tell other people how they have hurt you, in order to help them understand why you are angry.</li>
      <li>Write a forgiveness letter describing the hurt or damage that was done to you.</li>
    </ol>
    <p>Writing a Forgiveness Letter</p>
    <ol>
      <li>This is what you did to me:</li>
      <li>This is the impact it has had in my life:</li>
      <li>This is how it continues to affect me:</li>
      <li>This is how I imagine my life will be better if I'm able to forgive you</li>
      <li>(Forgiveness often begins with a compassionate understanding of persons who have hurt you. Write about any life experiences the other person or persons had that might have contributed to the ways they hurt or mistreated you) This is how I can understand what you have done:</li>
      <li>(Everyone hurts someone else sometimes. When you hurt someone else, how would you want that person to think about you?)This is how I would want to be viewed if I hurt someone:</li>
      <li>(Forgiveness does not mean that you approve of, forget or deny what was done and the pain you have experienced. Instead forgiveness means finding a way to let go of your anger and understand the events from a different perspective) This is how I can forgive what you have done: </li>
      <li>These are the qualities I have that will allow me to move forward:</li>
    </ol>
    <p className="fs-5">Couple or Family Therapy</p>
    <p>For some people, anger mostly occurs with family members. If the anger management strategies described above do not help you handle your anger in your closest relationships, couple or family therapy can help. Your perceptions, attitudes, beliefs, and thoughts about your partner, your children, or other family members can fuel your anger. Therapy can teach you how to communicate better, increase positive interactions in your relationships, and to develop negotiation skills. It can also help you learn strategies for identifying and altering expectations and rules. These skills can reduce anger and improve the quality of your relationships</p>
  </>)

  return (<>
    <PrivateNavbar active="moods" />
    <Container fluid>
      <Row>
        <Col lg="3" className="border d-none d-lg-block bg-light position-fixed p-0">
          <PrivateSidebar active="moods" />
        </Col>
        <Col className="col-lg-9 offset-lg-3 col-md-12 offset-md-0">
          {moodsAngerUI}
          <Toaster />
        </Col>
      </Row>
    </Container>
  </>)
}