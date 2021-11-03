import React from 'react';

import logSaga from './logSaga';

export default function* rootSaga() {
  console.log('ayyo fuck you')
  yield [
    logSaga()
  ];
}