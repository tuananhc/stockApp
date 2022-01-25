import React from 'react';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

async function logInApi(username, password) {
  try {
    var result = await axios.get('http://localhost:3000/users?username=' + username + '&password=' + password)
    console.log(result)
  } catch (error) {
    return undefined
  }
  return result
}

async function getIndicesData() {
  const indices = ["GSPC", "DJI", "IXIC", "NYA", "FTSE"]
  const result = []
  for (var symbol of indices) {
    var response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/%5E${symbol}?apikey=187da714693a7788f7a323b4930dbec0`)
      .then(function (response) {
        result.push(response.data[0])
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return result
}

async function getForexData() {
  const indices = ["EURUSD", "USDJPY", "GBPUSD", "USDCHF"]
  const result = []
  for (var symbol of indices) {
    var response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=187da714693a7788f7a323b4930dbec0`)
      .then(function (response) {
        result.push(response.data[0])
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return result
}

async function getCryptoData() {
  const indices = ["BTC", "ETH", "LTC", "ADA", "DOT", "BNB", "DOGE"]
  const result = []
  for (var symbol of indices) {
    var response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${symbol}USD?apikey=187da714693a7788f7a323b4930dbec0`)
      .then(function (response) {
        result.push(response.data[0])
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return result
}

function* logInFlow(action) {
  const response = yield call(logInApi, action.username, action.password)
  if (response !== undefined && response.data.length > 0) { 
    yield put({ type: "LOG_IN_SUCCESS", action })
    yield put({ type: "ADD_TO_WATCHLIST", stocks: response.data[0].watchlist })
    yield put({ type: "ADD_TO_AVAILABLE_FUNDS", amount: response.data[0].availableFunds })
    yield put({ type: "ADD_TO_PORTFOLIO", stocks: response.data[0].portfolio })
    yield put({ type: "ADD_TO_INITIAL_VALUE", amount: response.data[0].initialValue })
    const marketData = yield call(getIndicesData)
    const forexData = yield call(getForexData)
    const cryptoData = yield call(getCryptoData)
    yield put({ type: "UPDATE_MARKET_DATA", data: marketData })
    yield put({ type: "UPDATE_FOREX_DATA", data: forexData })
    yield put({ type: "UPDATE_CRYPTO_DATA", data: cryptoData })
  } else {
    Alert.alert("User does not exist") 
    yield put({ type: "LOG_IN_FAILED", action })
  }
}

export default function* logInListener() {
  yield takeLatest("LOG_IN_REQUEST", logInFlow)
}