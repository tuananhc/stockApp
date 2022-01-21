import React from 'react';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILED } from '../actions/constants'
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

function* logInFlow(action) {
  console.log("the action: ", action)
  const response = yield call(logInApi, action.username, action.password)
  console.log(response)
  if (response !== undefined && response.data.length > 0) { 
    yield put({ type: "LOG_IN_SUCCESS", action })
    yield put({ type: "ADD_TO_WATCHLIST", stocks: response.data[0].watchlist })
    yield put({ type: "ADD_TO_AVAILABLE_FUNDS", amount: response.data[0].availableFunds })
    yield put({ type: "ADD_TO_PORTFOLIO", stocks: response.data[0].portfolio })
    yield put({ type: "ADD_TO_INITIAL_VALUE", amount: response.data[0].initialValue })
  } else {
    Alert.alert("User does not exist") 
    yield put({ type: "LOG_IN_FAILED", action })
  }
}

export default function* logInListener() {
  yield takeLatest("LOG_IN_REQUEST", logInFlow)
}