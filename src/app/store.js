import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from '../services/pokemon'

import counterReducer from '../features/counter/counterSlice'
import mealReducer from '../pages/meals/mealSlice'
import afterMealNoteReducer from '../pages/aftermealnotes/afterMealNotesSlice'
import thoughtRecordReducer from '../pages/thoughtrecords/thoughtRecordsSlice'
import foodItemReducer from '../pages/fooditems/foodItemsSlice'
import foodTableItemReducer from '../pages/foodtableitems/foodTableItemsSlice'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    counter: counterReducer,
    meal: mealReducer,
    afterMealNote: afterMealNoteReducer,
    thoughtRecord: thoughtRecordReducer,
    foodItem: foodItemReducer,
    foodTableItem: foodTableItemReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)