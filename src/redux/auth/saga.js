import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { auth } from "../../helpers/Firebase";
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  UPDATE_USER_REQUEST,
} from "../actions";

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  updateProfileSuccess,
  updateProfileError,
} from "./actions";

import { adminRoot, currentUser } from "../../constants/defaultValues";
import { setCurrentUser } from "../../helpers/Utils";
import { userLoginService, updateProfileService } from "./services";

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

// const loginWithEmailPasswordAsync = async (email, password) =>
//   await auth
//     .signInWithEmailAndPassword(email, password)
//     .then((user) => user)
//     .catch((error) => error);

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(userLoginService, { email, password });
    if (loginUser.status === 200) {
      const item = { uid: loginUser.data._id, ...loginUser.data };
      if (item.role === "admin") {
        setCurrentUser(item);
        yield put(loginUserSuccess(item));
        history.push(adminRoot);
      } else {
        alert("Your not have access");
        history.push("/");
        yield put(loginUserError(loginUser.message));
      }
    } else {
      yield put(loginUserError(loginUser.message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) =>
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => error);

function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    if (!registerUser.message) {
      const item = { uid: registerUser.user.uid, ...currentUser };
      setCurrentUser(item);
      yield put(registerUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  // await auth
  //   .signOut()
  //   .then((user) => user)
  //   .catch((error) => error);
  history.push("/");
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();

  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  return await auth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess("success"));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess("success"));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

function* updateProfileSaga({ payload }) {
  const { data, callBack } = payload;

  try {
    const response = yield call(updateProfileService, { data });
    if (response.status === 200) {
      const item = { uid: response.data._id, ...response.data };
      setCurrentUser(item);
      callBack(response);
      yield put(updateProfileSuccess(item));
    } else {
      yield put(updateProfileError(response.message));
    }
  } catch (error) {
    yield put(updateProfileError(error));
  }
}

export function* watchUpdateProfile() {
  yield takeEvery(UPDATE_USER_REQUEST, updateProfileSaga);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchUpdateProfile),
  ]);
}
