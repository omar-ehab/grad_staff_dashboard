import { all, takeEvery, put, fork} from 'redux-saga/effects';
import jwtConfig from '@iso/config/jwt.config';
import actions from './actions';
// import SuperFetch from '../../library/helpers/superFetch';


export function* getAllStudentsRequest() {

  yield takeEvery('GET_ALL_STUDENTS_REQUEST', function*() {
    try {
      const res = yield fetch(`${jwtConfig.fetchUrl}students`, {
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
          type: actions.GET_ALL_STUDENTS_SUCCESS,
          payload: { students: data.students }
        });
      } else {
        yield put({
          type: actions.GET_ALL_STUDENTS_ERROR,
          payload: {message: data.error}
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.GET_ALL_STUDENTS_ERROR,
        payload: {message: "Please Connect to Internet"}
      });
    }
  });
}


export default function* rootSaga() {
  yield all([
    fork(getAllStudentsRequest)
  ]);
}
