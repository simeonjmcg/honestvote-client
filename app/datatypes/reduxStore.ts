import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./reducer";
import { initialState } from "./types";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewareEnhancer = applyMiddleware(sagaMiddleware);
const reduxDevtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
const enhancers = reduxDevtools ? compose(
    middlewareEnhancer,
    reduxDevtools(),
) : middlewareEnhancer;
export const store = createStore(
        reducer, initialState,
        enhancers);
sagaMiddleware.run(rootSaga);