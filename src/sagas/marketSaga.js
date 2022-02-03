import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

async function getHistoricalData(symbol, resolution) {
  if (symbol.length !== 6) {
    symbol = "%5E" + symbol.slice(1)
  }
  var path
  if (resolution === "D") {
    path = "historical-price-full"
  } else if (resolution === '60') {
    path = "historical-chart/1hour"
  } else if (resolution === '30') {
    path = "historical-chart/30min"
  } else if (resolution === '15') {
    path = "historical-chart/15min"
  } else if (resolution === '5') {
    path = "historical-chart/5min"
  } else if (resolution === '1') {
    path = "historical-chart/1min"
  }
  const response = await axios.get(`https://financialmodelingprep.com/api/v3/${path}/${symbol}?apikey=187da714693a7788f7a323b4930dbec0`)
    .then (function (response) {
      console.log(response)
      return response
    })
    .catch (function (error) {
      console.log(error)
    }) 
  return response
}

async function getQuotingPrice(symbol) {
  const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=187da714693a7788f7a323b4930dbec0`)
    .then(function (response) {
      console.log(response.data[0])
      return response.data[0]
    })
    .catch(function (error) {
      return error
    })
  return response
}

function* getHistoricalDataFlow(action) {
  const historicalData = yield call(getHistoricalData, action.symbol, action.resolution)
  if (historicalData !== undefined) {
    yield put({
      type: 'HISTORICAL_DATA_FOUND',
      data: (action.resolution === "D") ? historicalData.data.historical.reverse() : historicalData.data.reverse()
    })
  } else {
    yield put({
      type: 'HISTORICAL_DATA_NOT_FOUND'
    })
  }
}

function* getQuotingPriceFlow(action) {
  const response = getQuotingPrice(action.symbol)
  if (response !== undefined) {
    yield put({
      type: 'QUOTING_PRICE_FOUND',
      data: price
    })
  }
}

export default function* marketListener() {
  yield takeLatest("GET_HISTORICAL_DATA", getHistoricalDataFlow)
  yield takeLatest("GET_QUOTING_PRICE", getQuotingPriceFlow)
}