import {fork} from 'redux-saga/effects';
import * as authSaga from './auth.saga';
import * as profileSage from './profile.saga';

export default function *rootSaga() {
  yield [
    fork(authSaga.watchLogin),
    fork(authSaga.watchLoginSucceeded),
    fork(authSaga.watchLoginFailed),

    fork(authSaga.watchLogoutRequested),

    fork(profileSage.watchRequestProfile),
  ];
}
