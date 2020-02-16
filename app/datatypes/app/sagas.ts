// import axios, { AxiosResponse } from 'axios';
import { takeEvery, put, take, /* call */ } from '@redux-saga/core/effects';
import {
    APP_REQUEST_CLOSEST_NODE, APP_SUCCESS_CLOSEST_NODE, AppSuccessClosestNodeAction,
    //REGISTRATION_ENDPOINT,
} from './actions';
import { closestNodeRequestSuccessful } from './actions';
import { WebsocketTypes } from '../types';
import { store } from '../reduxStore';
import { retreivePublicKey, USER_STORE_PUBLIC, UserStorePublicAction } from '../user';

export function* appSaga() {
    yield takeEvery(APP_REQUEST_CLOSEST_NODE, closestNodeRequestSaga);
    yield takeEvery(APP_SUCCESS_CLOSEST_NODE, closestNodeSuccessfulSaga);
}

export function* closestNodeRequestSaga() {
    /*
    const response: AxiosResponse<{data: string}> = yield call(axios.get, `${REGISTRATION_ENDPOINT}/endpoint`);
    yield put(saveClosestNode(response.data.data));
    */
    yield put(closestNodeRequestSuccessful("portainer.honestvote.io:7003"));
}
export let websocket: WebSocket;
export function* closestNodeSuccessfulSaga(action: AppSuccessClosestNodeAction) {
    if (websocket !== undefined) {
        websocket.close();
    }
    yield put(retreivePublicKey());
    const a: UserStorePublicAction = yield take(USER_STORE_PUBLIC);
    const publicKey = a.payload;
    websocket = new WebSocket(`ws://${action.payload}/websocket/${publicKey}`);
    websocket.addEventListener("message", ({ data: d }: MessageEvent) => {
        const data = d as WebsocketTypes;
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