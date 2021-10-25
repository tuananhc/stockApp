import { createStore } from 'redux'

import combinedReducers from './reducers/CombineReducer'

const store = createStore(combinedReducers)