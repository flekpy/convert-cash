import { IExchangeRates } from '../../interfaces/currency.interface'
import { getExchangeRates, loading } from '../../store/reducer'
import getCurrencyArray from '../getCurrencyArray'
import { api, apiUrls } from './http'
import { store } from '../../store'

export const getQuotesData = async (
  selectedCurrency: string
): Promise<void> => {
  store.dispatch(loading(true))
  const { data } = await api.get<IExchangeRates>(
    `${apiUrls.getQuotesData}&base_currency=${selectedCurrency}`
  )
  if (Object.keys(data).length) {
    const currencyList = getCurrencyArray(data)
    store.dispatch(getExchangeRates(currencyList))
  }
  store.dispatch(loading(false))
}
