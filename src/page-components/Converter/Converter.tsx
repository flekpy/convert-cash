import { useState, ChangeEvent, useEffect } from 'react'

import { ICurrencyList } from '../../interfaces/currency.interface'
import { Button, InputNumber, Select } from '../../components'
import ExchangeIcon from '../../layout/Header/ExchangeIcon'
import { useDebounce, useFetch } from '../../hooks'
import { api, apiUrls } from '../../lib/api/http'
import styles from './Converter.module.scss'

interface IResponseConvert {
  base: string
  target: string
  date: string
  base_amount: number
  converted_amount: number
  exchange_rate: number
}

export function Converter(): JSX.Element {
  const [toValue, setToValue] = useState<string>('')
  const [fromValue, setFromValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { data } = useFetch<ICurrencyList>(apiUrls.getListCurrency)
  const [fromCurrency, setFromCurrency] = useState<string | undefined>(
    undefined
  )
  const [toCurrency, setToCurrency] = useState<string | undefined>(undefined)

  useEffect(() => {
    const dataArray = Object.values(data?.data ?? {})
    if (dataArray.length) {
      setFromCurrency(dataArray[0].code)
      setToCurrency(dataArray[1].code)
    }
  }, [data?.data])

  const debouncedValue = useDebounce<string>(fromValue, 1000)
  const url = `${apiUrls.getConvertCurrency}&base=${fromCurrency}&target=${toCurrency}`
  useEffect(() => {
    if (debouncedValue) {
      setLoading(true)
      api
        .get<IResponseConvert>(`${url}&base_amount=${debouncedValue}`)
        .then(({ converted_amount }) => {
          if (converted_amount) {
            setToValue(String(converted_amount))
          }
        })
        .finally(() => setLoading(false))
    }
  }, [debouncedValue, url])

  const handleClick = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <div className={styles.converter}>
      <div className={styles.inputWrapper}>
        <span className={styles.span}>У меня есть</span>
        <div className={styles.converterDivFlex}>
          <InputNumber
            value={fromValue}
            className={styles.input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFromValue(e.target.value)
            }
          />
          <Select
            value={fromCurrency}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFromCurrency(e.target.value)
            }
            sizeStyle="small"
            isLoading={loading}
          >
            {Object.values(data?.data ?? {}).map(({ symbol, code }) => (
              <option value={code} key={symbol + code}>
                {code}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <Button className={styles.btn} onClick={handleClick}>
        <ExchangeIcon />
      </Button>

      <div className={styles.inputWrapper}>
        <span className={styles.span}>Хочу приобрести</span>
        <div className={styles.converterDivFlex}>
          <InputNumber
            disabled
            value={toValue}
            className={styles.input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setToValue(e.target.value)
            }
          />

          <Select
            value={toCurrency}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setToCurrency(e.target.value)
            }
            sizeStyle="small"
            isLoading={loading}
          >
            {Object.values(data?.data ?? {}).map(({ symbol, code }) => (
              <option
                disabled={code === fromCurrency}
                value={code}
                key={symbol + code}
              >
                {code}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  )
}
