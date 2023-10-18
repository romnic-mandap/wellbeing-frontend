import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';

const initialState = {
    search: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    startTime: "",
    endTime: "",
    pageCurrent: 1,
    pagesCount: 1
}

const emptyState = {
    search: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    pageCurrent: 1,
    pagesCount: 1
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

export const { update, reset, updateDates, updatePage } = afterMealNotesSlice.actions

export default afterMealNotesSlice.reducer