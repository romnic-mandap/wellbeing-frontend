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
import "./FoodTableItems.css"
import FoodTableItem from '../../components/FoodTableItem'
import FoodTableStats from '../../components/FoodTableStats'
import { update, reset, updatePage } from './foodTableItemsSlice'
import { useSelector, useDispatch } from 'react-redux'
import PaginationComponent from '../../components/PaginationComponent'
import toast, { Toaster } from 'react-hot-toast'

export default function FoodTableItems() {
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

  const foPageCurrent = useSelector((state) => state.foodTableItem.pageCurrent)
  const foPagesCount = useSelector((state) => state.foodTableItem.pagesCount)
  const dispatch = useDispatch()

  const [foodTableItemObjList, setFoodTableItemObjList] = useState()
  const [foodTableStatsObj, setFoodTableStatsObj] = useState()
  useEffect(() => {
    setErrors(null)
    setLoading(true)
    setFoodTableItemObjList(null)
    setFoodTableStatsObj(null)
    if (jwt === null || jwt === undefined) {
      setLoading(false)
      return
    }

    fetch(config.BASE_V2_URL + "/food-table-items", {
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
      setFoodTableItemObjList(data.content)
      dispatch(updatePage({ pageCurrent: data.pageable.pageNumber + 1, pagesCount: data.totalPages }))
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })

    fetch(config.BASE_URL + "/food-table-items/stats", {
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
      setFoodTableStatsObj(data)
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

  const setDeleteFunction = (id) => {
    fetch(config.BASE_URL + "/food-table-items/" + id, {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "DELETE"
    }).then(res => {
      if (res.ok) {
        setFoodTableItemObjList(prevItems => prevItems.filter(i => i.id !== id))
        toast.success("Deleted food table item...")
        return fetch(config.BASE_URL + "/food-table-items/stats", {
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
          setFoodTableStatsObj(data)
        }).catch(err => {
          setErrors(err)
        })
      }
      return res.json().then(data => {
        throw data
      })
    }).catch(err => {
      console.log(err)
    })

  }

  const setDeleteAllFunction = () => {
    fetch(config.BASE_URL + "/food-table-items", {
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + jwt
      },
      method: "DELETE"
    }).then(res => {
      if (res.ok) {
        setFoodTableItemObjList(null)
        toast.success("Deleted food table items...")
        return
      }
      return res.json().then(data => {
        throw data
      })
    }).catch(err => {
      console.log(err)
    })

    setFoodTableStatsObj({
      "totalKcal": null,
      "totalCarbs": null,
      "totalFat": null,
      "totalProtein": null,
      "totalFiber": null,
      "totalSodium": null
    })
  }

  const getDifferentPage = (page) => {
    setErrors(null)
    setLoading(true)
    setFoodTableItemObjList(null)
    setFoodTableStatsObj(null)

    fetch(config.BASE_V2_URL + "/food-table-items?" + new URLSearchParams({
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
      setFoodTableItemObjList(data.content)
      dispatch(updatePage({ pageCurrent: data.pageable.pageNumber + 1, pagesCount: data.totalPages }))
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })

    fetch(config.BASE_URL + "/food-table-items/stats", {
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
      setFoodTableStatsObj(data)
      setLoading(false)
    }).catch(err => {
      setErrors(err)
      setLoading(false)
    })
  }

  const foodTableItems = (<>
    <div className="pt-3"></div>

    {!foodTableStatsObj ? null : (<>
      <FoodTableStats foodTableStatsObj={foodTableStatsObj} setDeleteAllFunction={() => setDeleteAllFunction()} />
    </>)}

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

    {!foodTableItemObjList ? null : (<>
      {foodTableItemObjList.map((ftio, index) => {
        return <FoodTableItem foodTableItemObj={ftio} setDeleteFunction={(id) => setDeleteFunction(id)} />
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
      <PrivateNavbar active="foodtableitems" />
      <Container fluid>
        <Row>
          <Col lg="3" className="border d-none d-lg-block bg-light position-fixed p-0">
            <PrivateSidebar active="foodtableitems" />
          </Col>
          <Col className="col-lg-9 offset-lg-3 col-md-12 offset-md-0">
            {foodTableItems}
            <Toaster />
          </Col>
        </Row>
      </Container>
    </>
  )

}