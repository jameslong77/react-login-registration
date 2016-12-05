import * as api from '../connectivity/api';
import {call, put} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import jwtDecode from 'jwt-decode';
import * as types from '../constants/actionTypes';

export function *doLogin(action) {

  try {

    const {username, password} = action.payload;

    const responseBody = yield call(api.login, username, password);

    if (typeof responseBody.token === "undefined") {
      throw new Error('Unable to find JWT in response body');
    }

    console.log('auth saga', responseBody);

    yield put({
      type: types.LOGIN__SUCCEEDED,
      payload: {
        idToken: responseBody.token
      }
    });

  } catch (e) {

    console.log('doLogin e', e);

    yield put({
      type: types.LOGIN__FAILED,
      payload: {
        message: e.message,
        statusCode: e.statusCode
      }
    });

  }
}


export function *watchLogin() {
  yield takeLatest(types.LOGIN__REQUESTED, doLogin);
}







export function *doLoginSucceeded(action) {

  const {idToken} = action.payload;

  const {id, username} = yield call(jwtDecode, idToken);

  yield put({
    type: types.LOGIN__COMPLETED,
    payload: {
      id,
      username
    }
  });

}


export function *watchLoginSucceeded() {
  yield takeLatest(types.LOGIN__SUCCEEDED, doLoginSucceeded);
}





export function *doLoginFailed(action) {


}


export function *watchLoginFailed() {
  yield takeLatest(types.LOGIN__FAILED, doLoginFailed);
}
