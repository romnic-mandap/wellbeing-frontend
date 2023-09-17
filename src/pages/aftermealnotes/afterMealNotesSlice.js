import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: ""
}

export const afterMealNotesSlice = createSlice({
    name: 'afterMealNote',
    initialState,
    reducers: {
        update: (state, action) => {{}
            return action.payload
        },
        updateDates: (state, action) => {
            return {
                ...state,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate
            }
        },
        reset: (state) => initialState
    }
})

export const { update, reset, updateDates } = afterMealNotesSlice.actions

export default afterMealNotesSlice.reducer