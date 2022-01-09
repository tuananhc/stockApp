import { combineReducers } from 'redux';

import themeReducer from './ThemeReducers';
import loggedReducer from './LoggedReducer';
import signUpReducer from './signUpReducer';
import searchReducer from './SearchReducer';

const combinedReducers = combineReducers({
    theme: themeReducer,
    loggedReducer,
    signUpReducer,
    stock: searchReducer
})

export default combinedReducers