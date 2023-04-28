import { configureStore } from '@reduxjs/toolkit'
import currencyReducer from './reducer'

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch