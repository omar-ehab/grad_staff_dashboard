import { all, takeEvery, put, fork, select} from 'redux-saga/effects';
import jwtConfig from '@iso/config/jwt.config';
import actions from './actions';
import { getToken } from '@iso/lib/helpers/utility';
import SuperFetch from '../../library/helpers/superFetch';


export function* getStudentRequest() {

  yield takeEvery('GET_STUDENT_REQUEST', function*(action) {
    try {
      const res = yield fetch(`${jwtConfig.fetchUrl}students/${action.payload.student_id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('staff_id_token') || undefined,
        }
      });

      const data = yield res.json();
      if(data.success === true){
        yield put({
          type: actions.GET_STUDENT_SUCCESS,
          payload: { student: data.student }
        });
      } else {
        yield put({
          type: actions.GET_STUDENT_ERROR,
          payload: {message: data.error}
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.GET_STUDENT_ERROR,
        payload: {message: "Please Connect to Internet"}
      });
    }
  });
}

export function* getStudentWalletRequest() {

  yield takeEvery('GET_STUDENT_WALLET_REQUEST', function*(action) {
    try {
      const res = yield fetch(`${jwtConfig.fetchUrl}wallets/${action.payload.student_id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('staff_id_token') || undefined,
        }
      });

      const data = yield res.json();
      if(data.success === true){
        yield put({
          type: actions.GET_STUDENT_WALLET_SUCCESS,
          payload: { wallet: data.wallet }
        });
      } else {
        yield put({
          type: actions.GET_STUDENT_WALLET_ERROR,
          payload: {message: data.error}
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.GET_STUDENT_WALLET_ERROR,
        payload: {message: "Please Connect to Internet"}
      });
    }
  });
}

export function* getStudentTransactionsRequest() {

  yield takeEvery('GET_STUDENT_TRANSACTIONS_REQUEST', function*(action) {
    try {
      const res = yield fetch(`${jwtConfig.fetchUrl}wallets/students/${action.payload.student_id}/Transaction`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('staff_id_token') || undefined,
        }
      });

      const data = yield res.json();
      if(data.success === true){
        yield put({
          type: actions.GET_STUDENT_TRANSACTIONS_SUCCESS,
          payload: { transactions: data.transactions }
        });
      } else {
        yield put({
          type: actions.GET_STUDENT_TRANSACTIONS_ERROR,
          payload: {message: data.error}
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.GET_STUDENT_TRANSACTIONS_ERROR,
        payload: {message: "Please Connect to Internet"}
      });
    }
  });
}

export function* rechargeStudentBalanceRequest() {

  yield takeEvery('RECHARGE_STUDENT_WALLET_REQUEST', function*(action) {
    try {
      
      const staff_id = yield getToken().get("staffId");
      const student_id = action.payload.student_id
      const url = `wallets/${student_id}/deposit`;
      const { student } = yield select();
      const payload = {
        amount: student.recharge_amount,
        other_id: staff_id
      }
      const res = yield SuperFetch.put(url, payload);

      if(res.success === true){
        yield put({
          type: actions.RECHARGE_STUDENT_WALLET_SUCCESS,
          payload: { transaction: res.transaction }
        });
        yield put({
          type: actions.CLOSE_MODAL,
        });
      } else {
        yield put({
          type: actions.RECHARGE_STUDENT_WALLET_ERROR,
          payload: {message: res.error}
        });
      }
    } catch(err) {
      yield put({
        type: actions.RECHARGE_STUDENT_WALLET_ERROR,
        payload: {message: "Please Connect to Internet"}
      });
    }
  });
}


export default function* rootSaga() {
  yield all([
    fork(getStudentRequest),
    fork(getStudentWalletRequest),
    fork(getStudentTransactionsRequest),
    fork(rechargeStudentBalanceRequest),
  ]);
}
