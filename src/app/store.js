import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import mealReducer from '../pages/meals/mealSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    meal: mealReducer
  },
})