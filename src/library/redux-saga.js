import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
// import logger from 'redux-logger';
import { all, fork } from "redux-saga/effects";

// import UserAuthReducer from "../User/pages/Auth/reducers";
// import UserAuthSaga from "../User/pages/Auth/sagas";

const forkAll = (...sagas) => all(sagas.map((saga) => fork(saga)));

const rootSaga = function* saga() {
  yield forkAll();
  // UserAuthSaga,
};

const rootReducer = {
  //user
  // userAuth: UserAuthReducer,
};

const redux = combineReducers(rootReducer);
const saga = createSagaMiddleware();
const middleware = [saga];

const store = configureStore({
  reducer: redux,
  devTools: true,
  middleware,
});

saga.run(rootSaga);
export default store;
