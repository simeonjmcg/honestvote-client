import { call, takeEvery, put, select, take } from "@redux-saga/core/effects";
import {
    ELECTION_REQUEST, ElectionRequestAction,
    ELECTIONS_REQUEST,
    ELECTION_SAVE,
    storeElection, errorElection,
    storeElections, 
} from "./";
import { getEndpoint } from "../app";
import axios, { AxiosResponse } from 'axios';
import { saveElectionSuccessful, saveElectionFailure, ElectionSaveAction, errorElections } from "./actions";
import { getPublicKey, retreivePrivate, UserReturnPrivateAction, USER_RETURN_PRIVATE } from "../user";
import { calculateElectionSignature } from "./functions";
import { Election, ElectionInfo } from "./types";

export function* electionsSaga() {
    yield takeEvery(ELECTION_REQUEST, electionRequestSaga);
    yield takeEvery(ELECTIONS_REQUEST, electionsRequestSaga);

    yield takeEvery(ELECTION_SAVE, electionSaveSaga);
}

function* electionRequestSaga(action: ElectionRequestAction) {
    const endpoint: string = yield select(getEndpoint);
    const response: AxiosResponse<{status: string, data: Election}> = yield call(axios.get, `${endpoint}/election/${action.payload}`);
    const election = response.data.data;
    election.id = election.signature;
    if (response.status >= 400 || response.data.status !== "OK") {
        yield put(errorElection());
        return;
    }
    yield put(storeElection(election));
}

function* electionsRequestSaga() {
    const endpoint: string = yield select(getEndpoint);
    const response: AxiosResponse<{status: string, data: ElectionInfo[]}> = yield call(axios.get, `${endpoint}/elections`);
    const elections = response.data.data;
    if (response.status >= 400 || response.data.status !== "OK") {
        yield put(errorElections());
        return;
    }
    yield put(storeElections(elections));
}

function* electionSaveSaga(action: ElectionSaveAction) {
    const endpoint: string = yield select(getEndpoint);
    const publicKey: string = yield select(getPublicKey);
    const election = action.payload;

    yield put(retreivePrivate());
    const returnPrivate: UserReturnPrivateAction = yield take(USER_RETURN_PRIVATE);
    election.sender = publicKey;
    election.signature = calculateElectionSignature(action.payload, returnPrivate.payload);
    const response: AxiosResponse<{status: string}> = yield call(axios.post, `${endpoint}/election`, election);
    if (response.status >= 400 || response.data.status !== "OK") {
        yield put(saveElectionFailure());
        return;
    }
    yield put(saveElectionSuccessful());
}