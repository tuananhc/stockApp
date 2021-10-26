import { combineReducers } from 'redux';

import themeReducer from './ThemeReducers';
import loggedReducer from './LoggedReducer';

const combinedReducers = combineReducers({
    theme: themeReducer,
    loggedReducer
})

export default combinedReducers