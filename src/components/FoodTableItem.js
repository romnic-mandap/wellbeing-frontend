import React from 'react'
import Table from 'react-bootstrap/Table';

/*
{
  "id": 34,
  "userId": 20,
  "foodName": "Marby Whole Wheat Bread",
  "servingSize": 56.0,
  "kcal": 156.0,
  "carbs": 28.0,
  "fat": 2.0,
  "protein": 6.0,
  "fiber": 4.0,
  "sodium": 170.0,
  "foodType": "GRAIN",
  "note": "2 slices",
  "createdAt": "2026-04-22T16:44:14.343894"
}
*/
export default function FoodTableItem({foodTableItemObj, setDeleteFunction}){
  const handleDeleteClick = (id) => {
    setDeleteFunction(id)
  }

    return (<>
        <Table striped bordered hover size="sm">
        <tbody>
          <tr>
            <td className='col-9 fw-bold' colSpan={3}>{foodTableItemObj.foodName}</td>
            <td className='col-3' colSpan={1}><button className="btn btn-primary w-100 p-0" type="button" onClick={()=>handleDeleteClick(foodTableItemObj.id)}>Delete</button></td>
          </tr>
          <tr>
            <td className='col-3'>Kcal:</td>
            <td className='col-3 text-end'>{foodTableItemObj.kcal} kcal</td>
            <td className='col-3'>Carbs:</td>
            <td className='col-3 text-end'>{foodTableItemObj.carbs} g</td>
          </tr>
          <tr>
            <td className='col-3'>Fat:</td>
            <td className='col-3 text-end'>{foodTableItemObj.fat} g</td>
            <td className='col-3'>Protein:</td>
            <td className='col-3 text-end'>{foodTableItemObj.protein} g</td>
          </tr>
          <tr>
            <td className='col-3'>Fiber:</td>
            <td className='col-3 text-end'>{foodTableItemObj.fiber} f</td>
            <td className='col-3'>Sodium:</td>
            <td className='col-3 text-end'>{foodTableItemObj.sodium} mg</td>
          </tr>
          <tr>
            <td className='col-3'>Serving Size:</td>
            <td className='col-3 text-end'>{foodTableItemObj.servingSize} g</td>
            <td className='col-3'>Type:</td>
            <td className='col-3 text-end'>{foodTableItemObj.foodType}</td>
          </tr>
          <tr>
            <td className='col-3' colSpan={1}>Note:</td>
            <td className='col-6' colSpan={2}>{foodTableItemObj.note}</td>
            <td className='col-3 text-end' colSpan={1}>Id: {foodTableItemObj.id}</td>
          </tr>
        

        </tbody>

      </Table>
    </>)
}