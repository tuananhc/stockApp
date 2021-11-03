import React from 'react';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILED } from '../actions/constants'
import { Alert } from 'react-native';

async function logInApi(username, password) {
  try {
    var result = await axios.get('http://localhost:3000/users?username=' + username + '&password=' + password)
  } catch (error) {
    return undefined
  }
  return result
};

function* logInFlow(action) {
  const response = yield call(logInApi, action.username, action.password)
  if (response.data.length > 0) {
    yield put({ type: "LOG_IN_SUCCESS", action })
  } else {
    Alert.alert("User does not exist") 
    yield put({ type: "LOG_IN_FAILED", action })
  }
}

export default function* logInListener() {
  console.log('alo im here')
  yield takeLatest("LOG_IN_REQUEST", logInFlow)
}