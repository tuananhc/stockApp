import { all } from '@redux-saga/core/effects';
import React from 'react';

import logSaga from './logSaga';
import signUpSaga from './signUpSaga'

export default function* rootSaga() {
  yield all ([
    logSaga(),
    signUpSaga()
  ]);
}