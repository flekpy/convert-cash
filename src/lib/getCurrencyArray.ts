import { IExchangeList } from '../interfaces/currency.interface'

const getCurrencyArray = (currencyObj: {
  [key: string]: number
}): IExchangeList[] =>
  Object.keys(currencyObj).map((nameCurrency) => ({
    nameCurrency,
    value: currencyObj[nameCurrency],
  }))

export default getCurrencyArray
