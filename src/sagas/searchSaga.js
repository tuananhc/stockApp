import React from 'react';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { useSelector } from 'react-redux';

async function getStockData(symbol) {
  const response = await axios.get(`https://finnhub.io/api/v1/crypto/candle?symbol=${symbol}&resolution=W&from=1610226834&to=1641783760&token=c5nup6iad3icte5l57r0`)
    .then(function (response) {
      console.log(response.data)
      return response
    })
    .catch(function (error) {
      console.log(error)
    })
  return response
};

async function findStock(name) {
  const response = await axios.get(`https://finnhub.io/api/v1/search?q=${name}&token=c5nup6iad3icte5l57r0`)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error);
      return error
    })
  return response
}

function* searchFlow(action) {
  const response = yield call(findStock, action.search)
  console.log(response)
  if (response !== undefined && response.data !== undefined) { 
    yield put({ 
      type: "SEARCH_FOUND", 
      search: action.search,
      data: response.data,
      description: response.data.result[0].description,
      symbol: response.data.result[0].symbol,
    })
  } else {
    yield put ({type: "SEARCH_NOT_FOUND"})
  }
}

function* getStockDataFlow(action) {
  console.log('a stock was chosen', action)
  const response = yield call(getStockData, action.symbol)
  if (response !== undefined && response.data !== undefined) {
    console.log('founded')
    yield put({
      type: 'STOCK_DATA_FOUND',
      data: response.data
    })
  } else {
    console.log('what')
  }
}

export default function* searchListener() {
  yield takeLatest("GET_STOCK_DATA_REQUEST", getStockDataFlow)
  yield takeLatest("SEARCH_REQUEST", searchFlow)
}