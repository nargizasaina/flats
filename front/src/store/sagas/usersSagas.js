import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {
    loginFailure,
    loginRequest,
    loginSuccess,
    logoutRequest,
    logoutSuccess,
    registerFailure,
    registerRequest,
    registerSuccess
} from "../actions/usersActions";
import {addNotification} from "../actions/notifierActions";
import {historyPush} from "../actions/historyActions";

export function* registerUserSaga({payload: userData}) {
    try {
        const response = yield axiosApi.post('/users', userData);

        yield put(registerSuccess(response.data));
        yield put(addNotification({message: 'Register successful!', variant: 'success'}));
        yield put(historyPush('/'));
    } catch (e) {
        yield put(registerFailure(e.response.data));
    }
}

export function* loginUserSaga({payload: userData}) {
    try {
        const response = yield axiosApi.post('/users/sessions', userData);

        yield put(loginSuccess(response.data));
        yield put(addNotification({message: 'Login successful!', variant: 'success'}));
        yield put(historyPush('/'));
    } catch (e) {
        yield put(loginFailure(e.response.data));
    }
}

export function* logoutUserSaga() {
    try {
        yield axiosApi.delete('/users/sessions');
        yield put(logoutSuccess());
        yield put(addNotification({message: 'Logout successful!', variant: 'success'}));
        yield put(historyPush('/'));
    } catch (e) {
        console.log(e);
    }
}

const userSagas = [
    takeEvery(registerRequest, registerUserSaga),
    takeEvery(loginRequest, loginUserSaga),
    takeEvery(logoutRequest, logoutUserSaga)
];

export default userSagas;