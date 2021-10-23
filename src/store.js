import { createStore } from 'redux'

import combinedReducers from './reducers/CombineReducer'
import themeReducer from './reducers/ThemeReducers'

const store = createStore(themeReducer)