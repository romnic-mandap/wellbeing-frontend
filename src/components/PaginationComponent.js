import React, { useState, useEffect, useRef } from "react"
import classNames from "classnames";
import { Link } from 'react-router-dom'

export default function PaginationComponent({pagenum, pagetotal, setpagefunction}){
  //const [pagenum, setPagenum] = useState((pageNumber ?? 1))
  //const [pagetotal, setPagettotal] = useState((totalPages ?? 1)) 

  //useEffect()
 
  /*
  const handlePagenum = (e) => {
    var num = Math.max(Math.min(pagetotal, e.target.value), 1)
    setPagenum(num)
  }
  const handlePagetotal = (e) => {
    setPagettotal(e.target.value)
  }
  */

  const handlePageClick = (page) => {
    // starts with 1!!!
    setpagefunction(page)
  }
 
  /*
  const pageInputForm = (
    <div className="card mb-3">
      <div className="card-header"></div>
      <div className="card-body">
        <div className="input-group mb-3">
          <input className="form-control" onChange={handlePagenum} />
          <input className="form-control" onChange={handlePagetotal} />
        </div>
      </div>
    </div>
  )
  */

  const paginationUi3 = () => {
    var pageitems = []
    // pagenum starts from 1
    if (!(pagenum && pagetotal)) return
    // modes: less start end mid
    // default
    var mode = "mid"
    var pStart = (parseInt(pagenum) - 3), pEnd = (parseInt(pagenum) + 2)
    if ((pagetotal) <= 8){
      mode = "less"
      pStart = 0; pEnd = pagetotal
    } 
    else if (pagenum < 6){
      mode = "start"
      pStart = 0; pEnd = 6
    }
    else if (pagenum > (parseInt(pagetotal) - 5)){
      mode = "end"
      pStart = (parseInt(pagetotal) - 6); pEnd = pagetotal
    } 
 
    for(let i=pStart; i<pEnd; i++){
      pageitems.push(
        <li className="page-item"><button className={classNames("page-link", {"active": (pagenum == i+1)})} onClick={()=>handlePageClick(i+1)}>{i+1}</button></li>
      )
    }

    // console.log(pagenum+' '+pagetotal)
 
    return (<ul className="pagination pagination-sm justify-content-center">
        <li className={classNames("page-item", {"disabled": ((pagenum <= 1))})}><button className="page-link" onClick={()=>handlePageClick(parseInt(pagenum) - 1)}><span>&laquo;</span></button></li>
        {(mode == "mid" || mode == "end") ? (<>
          <li className="page-item"><button className="page-link" onClick={()=>handlePageClick(1)}>1</button></li>
          <li className="page-item"><a className="page-link disabled" href="#">...</a></li>
        </>) : null}
        {pageitems}
        {(mode == "mid" || mode == "start") ? (<>
          <li className="page-item"><a className="page-link disabled" href="#">...</a></li>
          <li className="page-item"><button className="page-link" onClick={()=>handlePageClick(pagetotal)}>{pagetotal}</button></li>
        </>) : null}
        <li className={classNames("page-item", {"disabled": ((pagenum >= pagetotal))})}><button className="page-link" onClick={()=>handlePageClick(parseInt(pagenum) + 1)}><span>&raquo;</span></button></li>
      </ul>)
  }

  return (<>
    <div>
      {paginationUi3()}
    </div>
  </>)
}