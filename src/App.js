import React from 'react'
import { Routes, Route } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Meals from "./pages/meals/Meals"
import MealItemAdd from './pages/MealItemAdd'
import MealItemEdit from './pages/MealItemEdit'
import AfterMealNotes from './pages/aftermealnotes/AfterMealNotes'
import ThoughtRecords from './pages/thoughtrecords/ThoughtRecords'
import ThoughtMap from './pages/thoughtmap/ThoughtMap'
import ThoughtRecordItemAdd from './pages/ThoughtRecordItemAdd'
import ThoughtRecordItemEdit from './pages/ThoughtRecordItemEdit'
import FoodItems from './pages/fooditems/FoodItems'
import FoodTableItems from './pages/foodtableitems/FoodTableItems'

export default function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<Home />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/meals/add" element={<MealItemAdd />} />
      <Route path="/meals/:id/edit" element={<MealItemEdit />}/>

      <Route path="/after-meal-notes" element={<AfterMealNotes />} />

      <Route path="/thought-records" element={<ThoughtRecords />} />
      <Route path="/thought-records/add" element={<ThoughtRecordItemAdd />} />
      <Route path="/thought-records/:id/edit" element={<ThoughtRecordItemEdit />} />
      <Route path="/thought-map" element={<ThoughtMap />} />

      <Route path="/food-items" element={<FoodItems />} />

      <Route path="/food-table-items" element={<FoodTableItems />} />
    </Routes>
  )
}
