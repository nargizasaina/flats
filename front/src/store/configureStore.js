import createSagaMiddleware from "redux-saga";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import {configureStore} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import rootSagas from "./rootSagas";
import {initialState} from "./slices/usersSlice";
import rootReducer from "./rootReducer";

const persistedState = loadFromLocalStorage();
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    devTools: true,
    preloadedState: persistedState
});

sagaMiddleware.run(rootSagas);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            ...initialState,
            user: store.getState().users.user,
        }
    })
});

axiosApi.interceptors.request.use(config => {
    try{
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {}
    return config;
});

axiosApi.interceptors.response.use(res => res, e => {
    if (!e.response.data) {
        e.response = {data: {global: 'No internet'}};
    }

    throw e;
});

export default store;