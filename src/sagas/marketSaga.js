import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

async function getHistoricalData(symbol) {
  if (symbol.length !== 6) {
    symbol = "%5E" + symbol.slice(1)
  }
  const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=187da714693a7788f7a323b4930dbec0`)
    .then (function (response) {
      return response
    })
    .catch (function (error) {
      console.log(error)
    }) 
  return response
}

function* getHistoricalDataFlow(action) {
  const response = yield call(getHistoricalData, action.symbol)
  if (response !== undefined && response.data !== undefined && response.data.s !== 'no_data') {
    yield put({
      type: 'HISTORICAL_DATA_FOUND',
      data: response.data.historical,
    })
  } else {
    yield put({
      type: 'HISTORICAL_DATA_NOT_FOUND'
    })
  }
}

export default function* marketListener() {
  yield takeLatest("GET_HISTORICAL_DATA", getHistoricalDataFlow)
}