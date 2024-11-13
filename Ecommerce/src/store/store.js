import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
// import todosReducer from '../features/todos/todosSlice'
// import filtersReducer from '../features/filters/filtersSlice'

export const atticaStore = configureStore({
  reducer: {
    cart:cartSlice.reducer,
  },
})