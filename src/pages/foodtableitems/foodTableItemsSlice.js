import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pageCurrent: 1,
    pagesCount: 1
}
const emptyState = {
    pageCurrent: 1,
    pagesCount: 1
}
export const foodTableItemsSlice = createSlice({
    name: 'foodTableItem',
    initialState,
    reducers: {
        update: (state, action) => {{}
            return action.payload
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

export const { update, reset, updatePage } = foodTableItemsSlice.actions

export default foodTableItemsSlice.reducer