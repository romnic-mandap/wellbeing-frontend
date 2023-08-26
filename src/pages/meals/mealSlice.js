import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    selectedMeal: ""
}

export const mealSlice = createSlice({
    name: 'meal',
    initialState,
    reducers: {
        update: (state, action) => {{}
            return action.payload
        },
        reset: (state) => initialState
    }
})

export const { update, reset } = mealSlice.actions

export default mealSlice.reducer