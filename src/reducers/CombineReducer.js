import { combineReducers } from 'redux';

import themeReducer from './ThemeReducers';
import loggedReducer from './LoggedReducer';
import signUpReducer from './signUpReducer';
import searchReducer from './SearchReducer';
import profileReducer from './profileReducer'
import newsReducer from './NewsReducer'

const combinedReducers = combineReducers({
    theme: themeReducer,
    loggedReducer,
    signUpReducer,
    stock: searchReducer,
    profile: profileReducer,
    news: newsReducer
})

export default combinedReducers