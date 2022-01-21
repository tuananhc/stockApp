import React from 'react';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

const HOUR = 3600
const DAY = 86400
const WEEK = 604800
const MONTH = 2629743
const YEAR = 31556926

async function getStockData(symbol, resolution, from, to) {
  console.log(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=c5nup6iad3icte5l57r0`)
  const response = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=c5nup6iad3icte5l57r0`)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return 
    })
  console.log(response)

  return response
};

async function findStock(name) {
  const response = await axios.get(`https://finnhub.io/api/v1/search?q=${name}&token=c5nup6iad3icte5l57r0`)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error
    })
  return response
}

function* searchFlow(action) {
  const response = yield call(findStock, action.search)
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

async function getQuotingPrice(symbol) {
  const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=c5nup6iad3icte5l57r0`)
    .then (function (response) {
      console.log(response)
      return response
    })
    .catch (function (error) {
      console.log(error)
    }) 
  return response
}

function* getStockDataFlow(action) {
  const response = yield call(getStockData, action.symbol, action.resolution, action.from, action.to)
  console.log(action, response)
  if (response !== undefined && response.data !== undefined && response.data.s !== 'no_data') {
    var quote = yield call(getQuotingPrice, action.symbol)
    yield put({
      type: 'STOCK_DATA_FOUND',
      data: response.data,
      quote: (quote !== undefined && quote.data !== undefined) ? quote.data : null
    })
  } else {
    yield put({
      type: 'STOCK_DATA_NOT_FOUND'
    })
  }
}

export default function* searchListener() {
  yield takeLatest("GET_STOCK_DATA_REQUEST", getStockDataFlow)
  yield takeLatest("SEARCH_REQUEST", searchFlow)
}