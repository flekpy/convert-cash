import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { error, getBaseCurrency, loading } from './store/reducer'
import { IBaseCurrency } from './interfaces/currency.interface'
import { api, apiUrls } from './lib/api/http'
import { store } from './store'
import App from './App'
import './index.scss'

store.dispatch(loading(true))
api
  .get<IBaseCurrency>(apiUrls.getBaseCurrency)
  .then((response) => {
    if (typeof response === 'object' && 'currency' in response) {
      store.dispatch(getBaseCurrency(response))
    } else {
      store.dispatch(error(response))
    }
  })
  .finally(() => store.dispatch(loading(false)))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
