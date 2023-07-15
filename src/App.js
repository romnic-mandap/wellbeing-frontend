import React from 'react'
import { Routes, Route } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Meals from "./pages/Meals"
import MealItemAdd from './pages/MealItemAdd'

export default function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<Home />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/meals/add" element={<MealItemAdd />} />
    </Routes>
  )
}
