import React from 'react'

/*
{
    "id": 4,
    "userId": 20,
    "description": "hello do this then do that",
    "isDone": false
}
*/
export default function ToDoItem({ toDoItemObj, setDeleteFunction, setToggleComplete }) {
  const handleDeleteClick = (id) => {
    setDeleteFunction(id)
  }
  const handleToggleComplete = (id, isDone) => {
    setToggleComplete(id, isDone)
  }
  return (<>
    <div className="card">
      <div className="card-header" />
      <div className="card-body">
        <div className="d-flex justify-content-start">
          <p className={(toDoItemObj.isDone ? "text-decoration-line-through fw-light" : "")}> {toDoItemObj.description}</p>
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" type="button" onClick={() => handleToggleComplete(toDoItemObj.id,toDoItemObj.isDone)}>{(toDoItemObj.isDone) ? "Uncomplete" : "Complete" }</button>
          <button className="btn btn-primary" type="button" onClick={() => handleDeleteClick(toDoItemObj.id)}>Delete</button>
        </div>
      </div>
    </div>
  </>)
}