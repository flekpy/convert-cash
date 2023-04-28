const {
  VITE_API_KEY_GEO,
  VITE_API_URL_GEO,
  VITE_API_URL_FREE,
  VITE_API_KEY_FREE,
  VITE_API_KEY_EXCHANGE,
  VITE_API_URL_EXCHANGE,
} = import.meta.env

export const apiUrls = {
  getListCurrency: `${VITE_API_URL_FREE}/currencies?apikey=${VITE_API_KEY_FREE}`,
  getBaseCurrency: `${VITE_API_URL_GEO}/?api_key=${VITE_API_KEY_GEO}`,
  getQuotesData: `${VITE_API_URL_FREE}/latest?apikey=${VITE_API_KEY_FREE}`,
  getConvertCurrency: `${VITE_API_URL_EXCHANGE}/convert/?api_key=${VITE_API_KEY_EXCHANGE}`,
}

export async function http<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, config).then(async (response) => {
    if (response.ok) {
      const data = await response.json()
      return data as TResponse
    }
    const errorMessage = await response.text()
    return Promise.reject(new Error(errorMessage))
  })
}

export const api = {
  get: <TResponse>(url: string) => http<TResponse>(url),
}
