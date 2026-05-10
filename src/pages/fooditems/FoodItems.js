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
import "./FoodItems.css"
import FoodItem from '../../components/FoodItem'
import { update, reset, updatePage } from './foodItemsSlice'
import { useSelector, useDispatch } from 'react-redux'
import PaginationComponent from '../../components/PaginationComponent'

export default function FoodItems(){
  const navigate = useNavigate()
  
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

  const foPageCurrent = useSelector((state) => state.foodItem.pageCurrent)
  const foPagesCount = useSelector((state) => state.foodItem.pagesCount)
  const dispatch = useDispatch()

  const [foodItemObjList, setFoodItemObjList] = useState()
  useEffect(() => {
    setErrors(null)
    setLoading(true)
    setFoodItemObjList(null)
     if (jwt === null || jwt === undefined) {
      setLoading(false)
      return
    }
    fetch(config.BASE_V2_URL + "/food-items", {
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
      setFoodItemObjList(data.content)
      dispatch(updatePage({pageCurrent: data.pageable.pageNumber + 1, pagesCount: data.totalPages}))
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })

  }, [jwt])

  const setPageFunction = (page) => {
    if (foPageCurrent != page) {
      getDifferentPage(page)
    }
  }

    const getDifferentPage = (page) => {
      setErrors(null)
      setLoading(true)
      setFoodItemObjList(null)

      fetch(config.BASE_V2_URL + "/food-items?" + new URLSearchParams({
            p: page - 1,
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
            setFoodItemObjList(data.content)
            dispatch(updatePage({ pageCurrent: data.pageable.pageNumber + 1, pagesCount: data.totalPages }))
            setLoading(false)
          }).catch(err => {
            setErrors(err)
            setLoading(false)
          })
    }

    

    const foodItems = (<>
      <div className="pt-3"></div>

     <PaginationComponent
              pagenum={foPageCurrent}
              pagetotal={foPagesCount}
              setpagefunction={(p) => setPageFunction(p)}
            />


       {(loading) && (
        <div class="d-flex justify-content-center col-12 flex-grow-1">
          <div className="spinner-grow text-secondary">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

      )}

      {(errors) && (
        <div className="alert alert-danger">
          {errors['error(s)']?.map(e => { return <p>{e}</p> })}
        </div>
      )}

      {!foodItemObjList ? null : (<>
        {foodItemObjList.map((fio, index) => {
          return <FoodItem foodItemObj={fio} />
        })}
      
      </>)}
      
      <PaginationComponent
              pagenum={foPageCurrent}
              pagetotal={foPagesCount}
              setpagefunction={(p) => setPageFunction(p)}
            />

      
    </>)

    return (
    <>
      <PrivateNavbar active="fooditems" />
      <Container fluid>
        <Row>
          <Col lg="3" className="border d-none d-lg-block bg-light position-fixed p-0">
            <PrivateSidebar active="fooditems" />
          </Col>
          <Col className="col-lg-9 offset-lg-3 col-md-12 offset-md-0">
            {foodItems}
          </Col>
        </Row>
      </Container>
    </>
  )
}