import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';

const initialState = {
    search: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    startTime: "",
    endTime: "",
    selectedMeal: "",
    pageCurrent: 1,
    pagesCount: 1,
    pageSize: 32
}

const emptyState = {
    search: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    selectedMeal: "",
    pageCurrent: 1,
    pagesCount: 1,
    pageSize: 32
}

export const mealSlice = createSlice({
    name: 'meal',
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
        updatePage: (state, action) => {
            return {
                ...state,
                pageCurrent: action.payload.pageCurrent,
                pagesCount: action.payload.pagesCount
            }
        },
        reset: (state) => emptyState
    }
})

export const { update, reset, updateDates, updatePage } = mealSlice.actions

export default mealSlice.reducer