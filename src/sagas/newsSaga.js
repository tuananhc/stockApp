import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

async function newsApi(category) {
  const response = axios.get(`https://finnhub.io/api/v1/news?category=${category}&token=c5nup6iad3icte5l57r0`)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return
    })
  return response
};

function* getNewsFlow(action) {
  const response = yield call(newsApi, action.category)
  if (response !== undefined && response.data.length > 0) { 
    yield put({ type: "GET_NEWS_SUCCESS", data: response.data })
  } else {
    yield put({ type: "GET_NEWS_FAILED" })
  }
}

export default function* newsListener() {
  yield takeLatest("REQUEST_NEWS", getNewsFlow)
}