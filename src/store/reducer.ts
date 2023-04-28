import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IBaseCurrency, IExchangeList } from '../interfaces/currency.interface'

interface IInitState {
  baseCurrency: Partial<IBaseCurrency>
  quotesList: IExchangeList[]
  error: Error
  isLoading: boolean
}

const initialState: IInitState = {
  baseCurrency: {},
  quotesList: [],
  error: { message: '', name: '' },
  isLoading: false,
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    getBaseCurrency: (state, action: PayloadAction<IBaseCurrency>) => {
      const newState = { ...state }
      newState.baseCurrency = action.payload
      return newState
    },

    getExchangeRates: (state, action: PayloadAction<IExchangeList[]>) => {
      const newState = { ...state }
      newState.quotesList = action.payload
      return newState
    },

    error: (state, action: PayloadAction<Error>) => {
      const newState = { ...state }
      newState.error = action.payload
      return newState
    },

    loading: (state, action: PayloadAction<boolean>) => {
      const newState = { ...state }
      newState.isLoading = action.payload
      return newState
    },
  },
})

export const { getBaseCurrency, getExchangeRates, error, loading } =
  currencySlice.actions
export default currencySlice.reducer
