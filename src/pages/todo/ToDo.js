import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { compareByIdDesc } from '../../util/helperfunctions'
import PrivateNavbar from '../../layouts/PrivateNavbar'
import "./ToDo.css"
import { useSelector, useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PrivateSidebar from '../../layouts/PrivateSidebar'
import { config } from '../../constants/Constants'
import jwt_decode from "jwt-decode"
import { dayOfWeek, dayOfWeekShort, daysBetweenDates, dateFromDate } from '../../util/helperfunctions'
import PaginationComponent from '../../components/PaginationComponent'
import toast, { Toaster } from 'react-hot-toast'
import ToDoItem from '../../components/ToDoItem'

export default function ToDo() {
  const navigate = useNavigate()

  const addToDoElement = useRef()

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

  const [toDoList, setToDoList] = useState()
  useEffect(() => {
    setErrors(null)
    setLoading(true)
    if (jwt === null || jwt === undefined) {
      setLoading(false)
      return
    }

    fetch(config.BASE_URL + "/to-dos", {
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
      setToDoList(data)
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }, [jwt])

  const handleAddToDo = (e) => {
    if (e) {
      e.preventDefault()
    }

    const add = addToDoElement.current.value
    var addValue = add || ""

    fetch(config.BASE_URL + "/to-dos", {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "POST",
      body: JSON.stringify({
        "description": addValue,
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return res.json().then(data => {
        throw data
      })
    }).then(data => {
      toast.success("Added to-do...")
      const newObject = {
        id: data.id,
        userId: data.userId,
        description: data.description,
        isDone: data.isDone
      }
      setToDoList((prevItems) => [...prevItems, newObject]);
    }).catch(err => {
      console.log(err)
    })

    addToDoElement.current.value = ''
  }

  const setDeleteFunction = (id) => {
    fetch(config.BASE_URL + "/to-dos/" + id, {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "DELETE"
    }).then(res => {
      if (res.ok) {
        setToDoList(prevItems => prevItems.filter(i => i.id !== id))
        toast.success("Deleted to-do...")
        return
      }
      return res.json().then(data => {
        throw data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  const setToggleComplete = (id, isDone) => {

    fetch(config.BASE_URL + "/to-dos", {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "PUT",
      body: JSON.stringify({
        "id": id,
        "isDone": !isDone,
      })
    }).then(res => {
      if (res.ok) {
        //setItems(items.map(a => (a.id === 2 ? {...a, data: "c"} : a))
        setToDoList(toDoList.map(a => (a.id === id ? {...a, isDone: !isDone} : a)))
        toast.success("Updated to-do...")
        return
      }
      return res.json().then(data => {
        throw data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  const todos = (
    <>
      <div className="card">
        <div className="card-header" />
        <fieldset disabled={loading}>
          <form onSubmit={handleAddToDo}>
            <div className="input-group mb-3 card-box">
              <input type="text" ref={addToDoElement} className="form-control" placeholder="Add to-do..." />
              <button className="btn btn-primary" type="submit">Add</button>
            </div>
          </form>
        </fieldset>
      </div>

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

      {!toDoList ? null : (<>
        {toDoList.map((toDoObj, index) => {
          return <ToDoItem toDoItemObj={toDoObj} setDeleteFunction={(id) => setDeleteFunction(id)} setToggleComplete={(id, isDone) => setToggleComplete(id, isDone)} />
        })}
      </>)}
    </>
  )

  return (
    <>
      <PrivateNavbar active="todos" />
      <Container fluid>
        <Row>
          <Col lg="3" className="border d-none d-lg-block bg-light position-fixed p-0">
            <PrivateSidebar active="todos" />
          </Col>
          <Col className="col-lg-9 offset-lg-3 col-md-12 offset-md-0">
            {todos}
            <Toaster />
          </Col>
        </Row>
      </Container>
    </>
  )
}