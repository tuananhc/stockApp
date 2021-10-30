import React from 'react';
import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

function getAPI(username, password) {
  const response = await axios.post(`http://localhost:3000/users?username=${username}&password=${password}`);
  return { token: response.data.accessToken };
};

export function* logInWithCredentials({ payload: { email, password } }) {
  try {
    const user = yield logIn(email, password);
    yield put(logInSuccess(user));
  } catch (error) {
    yield put(logInFailure(error));
  }
}