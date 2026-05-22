import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';

const initialState = {
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    pageCurrent: 1,
    pagesCount: 1
}

const emptyState = {
    startDate: "",
    endDate: "",
    pageCurrent: 1,
    pagesCount: 1
}

export const thoughtMapSlice = createSlice({
    name: 'thoughtMap',
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

export const { update, reset, updateDates, updatePage } = thoughtMapSlice.actions

export default thoughtMapSlice.reducer