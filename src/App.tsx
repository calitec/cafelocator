import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from './lib/routes'
import Core from './components/common/Core'
import { Global } from '@emotion/react'
import { helmets } from './components/common/Helmet'
import { reset } from './lib/styles/GlobalReset'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      {helmets}
      <Global styles={reset} />
      <Switch>
        {routes.map(({ path, page, exact }, i) => (
          <Route exact={exact} path={path} component={page} key={i} />
        ))}
      </Switch>
      <div id="portal" />
      <Core />
    </>
  )
}

export default App
