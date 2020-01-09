// import axios, { AxiosResponse } from 'axios';
import { takeEvery, put, /* call */ } from '@redux-saga/core/effects';
import {
    APP_REQUEST_CLOSEST_NODE,
    //REGISTRATION_ENDPOINT,
} from './types';
import { closestNodeRequestSuccessful } from './actions';

export function* appSaga() {
    yield takeEvery(APP_REQUEST_CLOSEST_NODE, closestNodeRequestSaga);
}

export function* closestNodeRequestSaga() {
    /*
    const response: AxiosResponse<{data: string}> = yield call(axios.get, `${REGISTRATION_ENDPOINT}/find-node`);
    yield put(saveClosestNode(response.data.data));
    */
    yield put(closestNodeRequestSuccessful("http://portainer.honestvote.io:7001"));
}