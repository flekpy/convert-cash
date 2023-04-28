import { useReducer, useRef, useEffect } from 'react'

import { http } from '../lib/api/http'

interface IApiResponse<T> {
  data?: T
  error?: Error
  isLoading: boolean
}

type TCache<T> = { [url: string]: T }

type TAction<T> =
  | { type: 'loading' }
  | { type: 'fethcer'; payload: T }
  | { type: 'error'; payload: Error }

export function useFetch<T = unknown>(
  url: string,
  config?: RequestInit
): IApiResponse<T> {
  const cache = useRef<TCache<T>>({})

  const cancelRequest = useRef<boolean>(false)

  const initialState: IApiResponse<T> = {
    data: undefined,
    error: undefined,
    isLoading: false,
  }

  const fetchReducer = (
    state: IApiResponse<T>,
    action: TAction<T>
  ): IApiResponse<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState }
      case 'fethcer':
        return { ...initialState, data: action.payload }
      case 'error':
        return { ...initialState, error: action.payload }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    if (!url) return

    cancelRequest.current = false

    const fetchData = async () => {
      dispatch({ type: 'loading' })

      if (cache.current[url]) {
        dispatch({ type: 'fethcer', payload: cache.current[url] })
        return
      }

      try {
        const response = await http<T | string>(url, config)
        if (typeof response === 'string') {
          throw new Error(response)
        }
        cache.current[url] = response

        if (cancelRequest.current) return
        dispatch({ type: 'fethcer', payload: response })
      } catch (error) {
        if (cancelRequest.current) return

        dispatch({ type: 'error', payload: error as Error })
      }
    }

    void fetchData()

    return () => {
      cancelRequest.current = true
    }
  }, [url, config])

  return state
}
