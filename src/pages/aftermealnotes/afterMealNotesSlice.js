import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';

const initialState = {
    search: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    startTime: "",
    endTime: ""
}

const emptyState = {
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
        reset: (state) => emptyState
    }
})

export const { update, reset, updateDates } = afterMealNotesSlice.actions

export default afterMealNotesSlice.reducer