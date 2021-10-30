import { takeLatest } from 'redux-saga/effects'  

function* signupFlow (action) {}

function* signupWatcher () {  
    // takeLatest() takes the LATEST call of that action and runs it
    // if we we're to use takeEvery, it would take every single
    // one of the actions and kick off a new task to handle it
    // CONCURRENTLY!!!
    yield takeLatest('SIGN_UP_REQUEST', signupFlow)
  }
  
  export default signupWatcher  