import * as React from 'react'
import Core from './components/common/Core'
import { Global } from '@emotion/react'
import { helmets } from './components/common/Helmet'
import { reset } from './lib/styles/GlobalReset'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home'

function App() {
  return (
    <>
      {helmets}
      <Global styles={reset} />
      <Home />
      <div id="portal" />
      <Core />
    </>
  )
}

export default App
