import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: ""
}

export const thoughtRecordsSlice = createSlice({
    name: 'thoughtRecord',
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

export const { update, reset, updateDates } = thoughtRecordsSlice.actions

export default thoughtRecordsSlice.reducer