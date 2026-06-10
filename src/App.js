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
import ToDo from './pages/todo/ToDo'
import FoodItemAdd from './pages/FoodItemAdd'
import Admin from './pages/admin/Admin'
import Profile from './pages/profile/Profile'
import Moods from './pages/moods/Moods'
import MoodsAnger from './pages/moods_anger/MoodsAnger'
import MoodsDepression from './pages/moods_depression/MoodsDepression'
import MoodsAnxiety from './pages/moods_anxiety/MoodsAnxiety'
import MoodsGuilt from './pages/moods_guilt/MoodsGuilt'
import MoodsShame from './pages/moods_shame/MoodsShame'
import MoodsDepressionInventory from './pages/moods_depression_inventory/MoodsDepressionInventory'
import MoodsAnxietyInventory from './pages/moods_anxiety_inventory/MoodsAnxietyInventory'

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
      <Route path="/mood-map" element={<ThoughtMap />} />

      <Route path="/moods" element={<Moods />} />
      <Route path="/moods/anger" element={<MoodsAnger />} />
      <Route path="/moods/depression" element={<MoodsDepression />} />
      <Route path="/moods/anxiety" element={<MoodsAnxiety />} />
      <Route path="/moods/guilt" element={<MoodsGuilt />} />
      <Route path="/moods/shame" element={<MoodsShame />} />
      <Route path="/moods/depression-inventory" element={<MoodsDepressionInventory />} />
      <Route path="/moods/anxiety-inventory" element={<MoodsAnxietyInventory />} />

      <Route path="/food-items" element={<FoodItems />} />
      <Route path="/food-items/add" element={<FoodItemAdd />} />

      <Route path="/food-table-items" element={<FoodTableItems />} />

      <Route path="/to-dos" element={<ToDo />} />

      <Route path="/admin" element={<Admin />} />

      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}
