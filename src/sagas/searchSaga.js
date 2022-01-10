import React from 'react';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

async function searchStock(stockName) {
  try {
    var result = await axios.get(`https://finnhub.io/api/v1/crypto/candle?symbol=${stockName}&resolution=W&from=1610226834&to=1641783760&token=c5nup6iad3icte5l57r0`)
  } catch (error) {
    return undefined
  }
  console.log(result)
  return result
};

function* searchFlow(action) {
  console.log('searching')
  const response = yield call(searchStock, action.search)
  console.log(response)
  if (response !== undefined && response.data.length > 0 && response.data.s == 'ok') { 
    console.log(response.data)
    yield put({ 
      type: "FOUND", 
      response: response.data.symbol, 
      description: response.data.description 
    })
  }
}

export default function* searchListener() {
  //yield takeLatest("SEARCH", searchFlow)
}