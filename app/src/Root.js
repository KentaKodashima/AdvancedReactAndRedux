import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
import async from './middlewares/async'
import reducers from 'reducers'

// ES destructuring allows us to assign default values to props
export default ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(async)
    // applyMiddleware(thunk)
  )

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}