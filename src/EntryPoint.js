import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import combinedReducers from './reducers/CombineReducer'
import Navigations from './navigations/navigations'

const store = createStore(combinedReducers)

export default function EntryPoint() {

  return (
    <Provider store={store}>
      <Navigations/>
    </Provider>
  )
}