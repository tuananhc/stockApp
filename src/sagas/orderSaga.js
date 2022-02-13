import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

async function logInApi(amount, price) {
  console.log(amount, price)
  try {
    var result = await axios.patch('http://localhost:3000/users?username=tuananhc&password=1', { availableFunds: amount * price })
  } catch (error) {
    return undefined
  }
  console.log(result)
  return result
}

function* buyingStockFlow(action) {
  yield call(logInApi, action.amount, action.price)
}

function* sellingStockFlow(action) {
  const response = yield call(logInApi, action.amount, actions.price)
}

export default function* orderListener() {
  yield takeLatest("BUY_STOCK", buyingStockFlow)
  yield takeLatest("SELL_STOCK", sellingStockFlow)
}