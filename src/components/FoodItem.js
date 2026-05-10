import React from 'react'
import Table from 'react-bootstrap/Table';

/*
{
        "id": 11,
        "foodName": "Ampalaya",
        "servingSize": 100.0,
        "kcal": 20.0,
        "carbs": 5.0,
        "fat": 0.0,
        "protein": 1.0,
        "fiber": 2.4,
        "sodium": 0.0,
        "foodType": "VEGETABLE",
        "note": null
    }
*/
export default function FoodItem({foodItemObj}){
    return (<>
        <Table striped bordered hover size="sm">
        <tbody>
          <tr>
            <td className='col-9 fw-bold' colSpan={3}>{foodItemObj.foodName}</td>
            <td className='col-3' colSpan={1}><button className="btn btn-primary w-100 p-0" type="button">Add</button></td>
          </tr>
          <tr>
            <td className='col-3'>Kcal:</td>
            <td className='col-3 text-end'>{foodItemObj.kcal} kcal</td>
            <td className='col-3'>Carbs:</td>
            <td className='col-3 text-end'>{foodItemObj.carbs} g</td>
          </tr>
          <tr>
            <td className='col-3'>Fat:</td>
            <td className='col-3 text-end'>{foodItemObj.fat} g</td>
            <td className='col-3'>Protein:</td>
            <td className='col-3 text-end'>{foodItemObj.protein} g</td>
          </tr>
          <tr>
            <td className='col-3'>Fiber:</td>
            <td className='col-3 text-end'>{foodItemObj.fiber} f</td>
            <td className='col-3'>Sodium:</td>
            <td className='col-3 text-end'>{foodItemObj.sodium} mg</td>
          </tr>
          <tr>
            <td className='col-3'>Serving Size:</td>
            <td className='col-3 text-end'>{foodItemObj.servingSize} g</td>
            <td className='col-3'>Type:</td>
            <td className='col-3 text-end'>{foodItemObj.foodType}</td>
          </tr>
          <tr>
            <td className='col-3' colSpan={1}>Note:</td>
            <td className='col-6' colSpan={2}>{foodItemObj.note}</td>
            <td className='col-3 text-end' colSpan={1}>Id: {foodItemObj.id}</td>
          </tr>
        

        </tbody>

      </Table>
    </>)
}