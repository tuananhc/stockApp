import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import combinedReducers from './reducers/CombineReducer'
import Navigations from './navigations/navigations'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combinedReducers,
  composeWithDevTools()
)

export default function EntryPoint() {

  return (
    <Provider store={store}>
      <Navigations/>
    </Provider>
  )
}