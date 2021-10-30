import React from 'react';
import { all, call } from 'redux-saga/effects';

import { authSagas } from './auth/authSagas';

export default function* rootSaga() {
  yield all([call(authSagas)]);
}