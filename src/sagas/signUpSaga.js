import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects'  
import axios from 'axios';

async function signUpApi(username, password) {
  try {
    console.log(axios.post('http://localhost:3000/users'))
    return await axios.post('http://localhost:3000/users', {
      username: username,
      password: password,
      watchList: [],
      ownedList: []
    })
  } catch (error) {
    throw error
  }
};

function* signUpFlow(action) {
  try {
    const response = yield call(signUpApi, action.username, action.password)
    yield put({ type: "SIGN_UP_SUCCESS", action })
  } catch (error) {
    yield put({ type: "SIGN_UP_FAILED", action })
  }
}

export default function* signUpListener() {
  yield takeLatest("SIGN_UP_REQUEST", signUpFlow)
}