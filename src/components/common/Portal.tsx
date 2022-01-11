import * as React from 'react'
import ReactDOM from 'react-dom'

const Portal: React.FunctionComponent = ({ children }) => {
  const container = document.getElementById('portal')
  return ReactDOM.createPortal(children, container)
}

export default Portal
