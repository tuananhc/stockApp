import React from 'react';
import { combineReducers } from 'redux';

import themeReducer from './ThemeReducers';

const combinedReducers = combineReducers({
    theme: themeReducer
})

export default combinedReducers