import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  ADD_NEW_OFFICER_REQUEST,
  DELETE_OFFICER_REQUEST,
  UPDATE_OFFICER_REQUEST,
} from '../actions';
import {
  addOfficerFailure,
  addOfficerSuccess,
  deleteSuccess,
  deleteFailure,
  updateOfficerFailure,
  updateOfficerSuccess,
} from './actions';
import {
  addOfficerService,
  deleteOfficerService,
  updateOfficerService,
} from './services';

function* addOfficeSagaSaga({ payload }) {
  const {
    name,
    email,
    password,
    avatarUrl,
    contact,
    memberId,
    // fraksi,
    // unit,
    // party,
    callBack,
  } = payload;
  try {
    const response = yield call(
      addOfficerService,
      name,
      email,
      password,
      avatarUrl,
      contact,
      memberId,
      // fraksi,
      // unit,
      // party,
      callBack,
    );

    if (callBack) {
      callBack(response);
    }
    yield put(addOfficerSuccess(response));
  } catch (error) {
    if (callBack) {
      callBack(error);
    }
    yield put(addOfficerFailure(error));
  }
}

export function* watchAddOfficerSaga() {
  yield takeEvery(ADD_NEW_OFFICER_REQUEST, addOfficeSagaSaga);
}

function* deleteOfficerSaga({ payload }) {
  const { _id, callBack } = payload;
  try {
    const response = yield call(deleteOfficerService, _id);

    if (callBack) {
      callBack(response);
    }
    yield put(deleteSuccess(response));
  } catch (error) {
    yield put(deleteFailure(error));
  }
}

export function* watchDeleteSaga() {
  yield takeEvery(DELETE_OFFICER_REQUEST, deleteOfficerSaga);
}

function* updateSaga({ payload }) {
  const {
    _id,
    name,
    email,
    avatarUrl,
    contact,
    memberId,
    // party,
    // fraksi,
    // unit,
    callBack,
  } = payload;
  try {
    const response = yield call(
      updateOfficerService,
      _id,
      name,
      email,
      avatarUrl,
      contact,
      memberId,
      // party,
      // fraksi,
      // unit,
    );

    if (callBack) {
      callBack(response);
    }
    yield put(updateOfficerSuccess(response));
  } catch (error) {
    if (callBack) {
      callBack(error);
    }
    yield put(updateOfficerFailure(error));
  }
}

export function* watchUpdateSaga() {
  yield takeEvery(UPDATE_OFFICER_REQUEST, updateSaga);
}

export default function* rootSaga() {
  yield all([fork(watchAddOfficerSaga)]);
  yield all([fork(watchDeleteSaga)]);
  yield all([fork(watchUpdateSaga)]);
}
