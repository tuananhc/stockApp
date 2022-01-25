import { combineReducers } from 'redux';

import themeReducer from './ThemeReducers';
import loggedReducer from './LoggedReducer';
import signUpReducer from './signUpReducer';
import stockReducer from './SearchReducer';
import profileReducer from './profileReducer'
import newsReducer from './NewsReducer'
import marketDataReducer from './MarketDataReducer';

const combinedReducers = combineReducers({
    theme: themeReducer,
    loggedReducer,
    signUpReducer,
    stock: stockReducer,
    profile: profileReducer,
    news: newsReducer,
    marketData: marketDataReducer
})

export default combinedReducers