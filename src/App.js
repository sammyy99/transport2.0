import React from 'react'
import LoginPage from './Components/LoginPage'
import { Provider } from 'react-redux'
import appstore from './Redux/appstore'

const App = () => {
  return (
    <Provider store={appstore}>
    <div>
      <LoginPage/>
    </div>
    </Provider>
  )
}

export default App
