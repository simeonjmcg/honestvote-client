import {createStore, applyMiddleware, compose, StoreEnhancer} from "redux";
import {reducer} from "./reducer";
import {initialState} from "./types";
import createSagaMiddleware from "redux-saga";
import {rootSaga} from "./sagas";

interface WindowReduxDevTools extends Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer;
}

const sagaMiddleware = createSagaMiddleware();
const middlewareEnhancer = applyMiddleware(sagaMiddleware);
const reduxDevtools = (window as unknown as WindowReduxDevTools).__REDUX_DEVTOOLS_EXTENSION__;
const enhancers = reduxDevtools ? compose(
    middlewareEnhancer,
    reduxDevtools(),
) : middlewareEnhancer;
export const store = createStore(
    reducer, initialState,
    enhancers);
sagaMiddleware.run(rootSaga);