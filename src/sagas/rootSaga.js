import { all } from '@redux-saga/core/effects';
import React from 'react';

import logSaga from './logSaga';
import signUpSaga from './signUpSaga'
import searchSaga from './searchSaga'
import newsSaga from './newsSaga'

export default function* rootSaga() {
  yield all ([
    logSaga(),
    signUpSaga(),
    searchSaga(),
    newsSaga()
  ]);
}