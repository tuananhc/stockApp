import { combineReducers } from 'redux';

import themeReducer from './ThemeReducers';
import loggedReducer from './LoggedReducer';
import signUpReducer from './signUpReducer';

const combinedReducers = combineReducers({
    theme: themeReducer,
    loggedReducer,
    signUpReducer
})

export default combinedReducers