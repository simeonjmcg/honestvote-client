// import axios, { AxiosResponse } from 'axios';
import { takeEvery, put, take, select, /* call */ } from '@redux-saga/core/effects';
import {
    APP_REQUEST_CLOSEST_NODE, APP_SUCCESS_CLOSEST_NODE, AppSuccessClosestNodeAction,
    //REGISTRATION_ENDPOINT,
} from './actions';
import { closestNodeRequestSuccessful } from './actions';
import { WebsocketTypes } from '../types';
import { store } from '../reduxStore';
import { USER_STORE_PUBLIC, getPublicKey } from '../user';

export function* appSaga() {
    yield takeEvery(APP_REQUEST_CLOSEST_NODE, closestNodeRequestSaga);
    yield takeEvery(APP_SUCCESS_CLOSEST_NODE, closestNodeSuccessfulSaga);
}

export function* closestNodeRequestSaga() {
    /*
    const response: AxiosResponse<{data: string}> = yield call(axios.get, `${REGISTRATION_ENDPOINT}/endpoint`);
    yield put(saveClosestNode(response.data.data));
    */
    yield put(closestNodeRequestSuccessful("registry.honestvote.io"));
}
export let websocket: WebSocket;
export function* closestNodeSuccessfulSaga(action: AppSuccessClosestNodeAction) {
    if (websocket !== undefined) {
        websocket.close();
    }
    if (!(yield select(getPublicKey))) {
        yield take(USER_STORE_PUBLIC);
    }
    const publicKey: string | null = yield select(getPublicKey);
    websocket = new WebSocket(`wss://${action.payload}/websocket/${publicKey}`);
    websocket.addEventListener("open", () => {
        console.log("Websocket connection established: ", websocket);
    });
    websocket.addEventListener("close", () => {
        console.log("Websocket connection closed: ", websocket);
    });
    websocket.addEventListener("message", (event: MessageEvent) => {
        console.log("Websocket got a thing: ", websocket, event);
        const data = JSON.parse(event.data) as WebsocketTypes;
        if (typeof data !== "object" || data == null)
            return;
        // specifically whitelisting redux actions from websocket
        switch (data.type) {
            case "VOTE_ADD":
                store.dispatch({ type: data.type, payload: data.payload });
                return;
            case "USER_CONFIRM_PERMISSION":
                store.dispatch({ type: data.type, payload: data.payload });
                return;
        }
    });

}
