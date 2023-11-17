import {all} from 'redux-saga/effects';
import userSagas from "./sagas/usersSagas";
import historySagas from "./sagas/historySagas";
import notifierSagas from "./sagas/notifierSagas";
import history from "../history";

export default function* rootSagas(){
    yield all([
        ...userSagas,
        ...historySagas(history),
        ...notifierSagas
    ])
}