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

  const moodsUI = (<>
    <p className="fs-3">Moods</p>

    <div className="row">
      <div className="d-flex flex-wrap">
        <div className="flex-grow-1 col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 class="card-title">Depression</h5>
              <p class="card-text">To track the symptoms of depression you are experiencing, rate each item listed in the inventory. Fill this out periodically, to assess how your depression is changing and which skills are most worthwhile.</p>
              <p class="card-text">A general pattern of decreasing scores overtime is a sign that the changes you are making are contributing to your improvement.</p>
            </div>
            <div className="card-footer">
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary" onClick={handleDepressionInventory}>Take inventory</button>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-grow-1 col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 class="card-title">Anxiety</h5>
              <p class="card-text">To specify what symptoms you experience when you are anxious, rate the symptoms listed in the inventory. Take the eventory once a week while you are learning methods to manage your anxiety, so you can determine which skills are most effective and to track your progress.</p>
            </div>
            <div className="card-footer">
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary" onClick={handleAnxietyInventory}>Take inventory</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr />
    <p className="fs-5">Depression</p>
    <p>Depression does not just describe a mood; it also involves changes in thinking, behavior, and physical functioning. When we are depressed, we tend to have negative thoughts about ourselves, our experiences, and the future.</p>
    <p>There are many effective treatments for depression, including CBT, improving your relationships, and medication.</p>
    <p>CBT for depression helps us learn new ways of thinking and behaving in order to improve our moods in a lasting way.</p>
    <p>When we are depressed, we have negative thoughts about ourselves (self-criticism), our experiences (general negativity), and our future (hopelessmess).</p>
    <p>Cognitive Therapy</p>
    <p>When we are depressed, we tend to notice and remember the negative aspects of our experiences more readily that we do with the positive or neutral aspects. We also are more likely to interpret events in our lives with a negative bias when we are depressed.</p>
    <p>Behavioral Activation</p>
    <p>If you track your activities and feelings of depression, you may discover that when you are depressed, you are less active. For this reasion, an important part of recovering from depression is to increase the number of activities that you do each day. We get the biggest mood boost from activities that bring us pleasure and a sense of accomplishment, that lead to approaching rather than avoiding life's challenges, and that are connected to what we value most.</p>
    <p>Activity Scheduling</p>
    <ul>
      <li>Pleasurable activities:</li>
      <li>Activities that accomplish something:</li>
      <li>What can I do to begin to approach things I have been avoiding:</li>
      <li>Activities that fit my values:</li>
    </ul>
    <p>Some activities could fit in a variety of categories. For example, walking or exercising may be pleasurable for one person, may be an accomplishment for another. The important thing is to do activities ine ach of the four areas throughout the week.</p>
    <p>Questions about Activity Scheduling:</p>
    <p>What if I don't feel like doing the activities I scheduled?</p>
    <p>If you don't feel like doing an activity, see if you can do it partially, even for a few minutes. Often we don't feel motivated to do things until we actually get started.</p>
    <p>If you have skipped one or more activities on your schedule, try not to get discouraged or criticize yourself. Just pick up where you are and do the enxt activity on your schedule. The goal of the Activity Schedule is to increase the number and types of activities you do.</p>
    <p>What if I don't enjoy the activities as much as I used to?</p>
    <p>If you decide to try activity scheduling as a first step in reducing your depression, do not expect to find activities as enjoyable or as satisfying as you did before you became depressed. If you compared an activity to sitting at home doing nothing, you might think "It is good I did this and enjoyed myself a little bit. It was better than sitting at home and feeling sad."</p>
    <p>What if I don't enjoy the activities at all?</p>
    <p>Notice what is going through your mind while you do activities. If you are doing something that you thought would be enjoyable, and yet you are thinking about negative things at every step, you are not likely to enjoy yourself. When you find yourself dwelling on negative things while you do activities, gently encourage yourself to focus on the activity itself and look for something to feel good about (pleasure, accomplishment, overcoming avoidance, acting on your values). Don't get discouraged if you keep returning to negative thoughts, because that is common in depression.</p>
    <p>Try capturing very tiny positive experiences. A helpful strategy for any people who want to experience more enjoyment is to practice "capturing enjoyment". This involves not only doing activities, but actively looking for pleasure while you do them. Get into a mindset of savoring small parts of your experiences. When we deliberately make a choice to look for positives in our day, we have cracked a window open to allow positive experiences in. At the same time, when we are actively looking for positives, our minds are less focused on negatives.</p>
    
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

    <hr />
    <p className="fs-5">Anger</p>
    <p>Anger is characterized by muscle tension, increased heart rate, increased blood pressure, and defensiveness or attack.</p>
    <p>When we are angry, our thoughts focus on our perceptions that other people are hurting us, threatening us, breaking the rules, or being unfair.</p>
    <p>Anger can range from mild irritation to rage. How angry we feel is influenced by our interpretation of the meaning of events, our expectations for other people, and whether or not we thought the other person's behavior was intentional or not.</p>
    <p>Methods that are effective in controlling anger include testing angry thoughts, using imagery to anticipate and prepare for events in which you are at high rish of anger, recognizing the early warning signs of anger, timeouts, assertion, forgiveness, and couple or family therapy</p>
    <p>How we respond to angry thoughts depends on the role these thoughts play in our lives. If we rarely experience anger, and angry thoughts arise from a clear injustice, our response will be to find out how to use our anger to respond constructively to the situation. When we are frequently angry, especially if our anger creates problems for us and our relationships, then we want to learn to examine our angry thoughts and see if there might be another way of thinking about things.</p>
    <p>When we are angry, we tend to interpret or misinterpret other people's intentions in a personal and negative way. We may think that they are intentionally mistreating us or taking advantage of us, even when this is not the case. For example suppose you are standing a few feet from the counter in a store, waiting for a clerk to finish with another customer because you need help. As soon as the clerk finishes with that customer, someone else walks up to the counter and begins to talk to the clerk. If you think that this person saw you and deliberately stepped in front of you, you might feel angry. If, on the other hand, you thought that this was an  honest mistake and the person did not see you standing there, then you are less likely to feel angry. The difference between these two reactions is whether we personalize the other person's actions. Do we think they did this "to us", or was the other person unaware that we were standing there?</p>
    <p>When we get angry, we tend to personalize other people's actions. One of the advantages of Thought Records is that they help you think through these types of situations. You can learn to ask yourself questions that help you consider other people's intentions. Can you remember a time when you stepped in front of someone else who was waiting in line because you didn't see that person standing there? You did not intend to take advantage of the person. Instead, it was a simple mistake that everyone makes from time to time. Learning to interpret other people's actions less personally, to consider the intentions of other people in a kinder way, and to look at situations from different perspectives are helpful ways of responding to anger.</p>
    <p>If you find yourself labeling and judging someone in your life in a consistent way, this is often a sign that you have put this person in a box. When you become aware of this, there are several things you can do to reduce your anger and open up the box. When your hot buttons get pushed, instead of reacting in an angry way, you can try to be a nonjudgemental observer and get more information, so you can test your assumptions about other people's intentions.</p>
    <p>The advantage of gathering more information when we start to think negatively about others is that it often helps us understand other people's actions in new ways</p>
    <p>Writing a Forgiveness Letter:</p>
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

    <hr />
    <p className="fs-5">Guilt & Shame</p>
    <p>We feel guilty when we believe that we have done something wrong or not lived up to the standards we have set for ourselves.</p>
    <p>Guilt is often accompanied by thoughts containing the words "should" or "ought".</p>
    <p>Shame involves the perception that we have done something wrong, that we have to keep it a secret, and that what we have done means something terrible about us.</p>
    <p>Guilt and shame can be lessened or eliminated by assessing the seriousness of your actions, weighing personal responsibility, making reparations for any harm you caused, breaking the silence surrounding shame, and self-forgiveness.</p>
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
          {moodsUI}
          <Toaster />
        </Col>
      </Row>
    </Container>
  </>)
}