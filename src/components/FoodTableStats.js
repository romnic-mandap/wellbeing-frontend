import React from 'react'
import Table from 'react-bootstrap/Table';

/*
{
    "totalKcal": 1361.0,
    "totalCarbs": 299.0,
    "totalFat": 3.9999999999999996,
    "totalProtein": 29.700000000000006,
    "totalFiber": 12.199999999999998,
    "totalSodium": 180.0
}
*/
export default function FoodTableStats({foodTableStatsObj}){
    return (<>
        <Table striped bordered hover size="sm">
        <tbody>
          <tr>
            <td className='col-9 fw-bold' colSpan={3}>Food Stats</td>
            <td className='col-3' colSpan={1}><button className="btn btn-primary w-100 p-0" type="button">Delete All</button></td>
          </tr>
          <tr>
            <td className='col-3'>Kcal:</td>
            <td className='col-3 text-end'>{foodTableStatsObj.totalKcal.toFixed(1)} kcal</td>
            <td className='col-3'>Carbs:</td>
            <td className='col-3 text-end'>{foodTableStatsObj.totalCarbs.toFixed(1)} g</td>
          </tr>
          <tr>
            <td className='col-3'>Fat:</td>
            <td className='col-3 text-end'>{foodTableStatsObj.totalFat.toFixed(1)} g</td>
            <td className='col-3'>Protein:</td>
            <td className='col-3 text-end'>{foodTableStatsObj.totalProtein.toFixed(1)} g</td>
          </tr>
          <tr>
            <td className='col-3'>Fiber:</td>
            <td className='col-3 text-end'>{foodTableStatsObj.totalFiber.toFixed(1)} f</td>
            <td className='col-3'>Sodium:</td>
            <td className='col-3 text-end'>{foodTableStatsObj.totalSodium.toFixed(1)} mg</td>
          </tr>

        </tbody>

      </Table>
      </>)



}