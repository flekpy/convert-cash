import { useEffect, useState, ChangeEvent } from 'react'
import { useSelector } from 'react-redux'

import { Button, Htag, LoadingSpinner, Select } from '../../components'
import { ICurrencyList } from '../../interfaces/currency.interface'
import { getQuotesData } from '../../lib/api/getQuotesData'
import { useInterval, useFetch } from '../../hooks'
import { apiUrls } from '../../lib/api/http'
import { getDate } from '../../lib/getDate'
import { RootState } from '../../store'
import styles from './Main.module.scss'

const USD = 'USD'
function SelectWrapper() {
  const { data } = useFetch<ICurrencyList>(apiUrls.getListCurrency)
  const { baseCurrency, isLoading, error } = useSelector(
    (state: RootState) => state.currency
  )
  const [selectedCurrency, setSelectedCurrency] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    const baseCurr = baseCurrency?.currency?.currency_code
    if (!error.message && baseCurr) {
      setSelectedCurrency(baseCurr)
    } else if (!!error.message && baseCurr === undefined) {
      setSelectedCurrency(USD)
    }
  }, [
    baseCurrency?.currency?.currency_code,
    error.message,
    setSelectedCurrency,
  ])

  useEffect(() => {
    if (selectedCurrency !== undefined) {
      getQuotesData(selectedCurrency)
    }
  }, [selectedCurrency])

  useInterval(
    () => {
      if (selectedCurrency !== undefined) {
        getQuotesData(selectedCurrency)
      }
    },
    selectedCurrency ? 60000 : null
  )

  const handleClick = () => {
    if (selectedCurrency !== undefined) {
      getQuotesData(selectedCurrency)
    }
  }
  return (
    <div className={styles.mainDivWrapper}>
      <Htag tag="h2">Курс валюты на {getDate()}</Htag>
      <div className={styles.mainSelectWrapper}>
        <Select
          sizeStyle="middle"
          isLoading={isLoading}
          value={selectedCurrency}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSelectedCurrency(e.target.value)
          }
          disabled={isLoading && selectedCurrency === undefined}
        >
          {Object.values(data?.data ?? {}).map(({ symbol, code }) => (
            <option value={code} key={symbol}>
              {code}
            </option>
          ))}
        </Select>
        <Button
          type="button"
          onClick={handleClick}
          disabled={selectedCurrency === undefined}
        >
          <LoadingSpinner spinStart={false} />
        </Button>
      </div>
    </div>
  )
}

export default SelectWrapper
