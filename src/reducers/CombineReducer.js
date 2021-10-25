import { combineReducers } from 'redux';

import themeReducer from './ThemeReducers';
import loggedReducer from './LoggedReducer';

const combinedReducers = combineReducers({
    theme: themeReducer,
    isLoggedIn: loggedReducer
})

export default combinedReducers