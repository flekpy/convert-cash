import { Route, Switch } from 'react-router-dom'

import { Converter, Main } from './page-components'
import Layout from './layout/Layout'

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/">
        <Layout>
          <Main />
        </Layout>
      </Route>
      <Route exact path="/converter">
        <Layout>
          <Converter />
        </Layout>
      </Route>
    </Switch>
  )
}

export default App
