import {call, takeEvery, put, select, take} from "@redux-saga/core/effects";
import {
    ELECTION_REQUEST, ELECTIONS_REQUEST, ELECTION_SAVE,
    ElectionRequestAction,
    Election, ElectionInfo,
    storeElections, storeElection, errorElection,
    calculateElectionSignature,
    saveElectionSuccessful, saveElectionFailure, ElectionSaveAction, errorElections,
} from "./";
import {
    getEndpoint,
    getAdminPublicKey, retreiveAdminPrivate, UserReturnPrivateAction, ADMIN_RETURN_PRIVATE,
} from "../";
import axios, {AxiosResponse} from "axios";

export function* electionsSaga() {
    yield takeEvery(ELECTION_REQUEST, electionRequestSaga);
    yield takeEvery(ELECTIONS_REQUEST, electionsRequestSaga);

    yield takeEvery(ELECTION_SAVE, electionSaveSaga);
}

function* electionRequestSaga(action: ElectionRequestAction) {
    const endpoint: string = yield select(getEndpoint);
    const response: AxiosResponse<{status: string, data: Election}> = yield call(axios.get, `https://${endpoint}/election/${action.payload}`);
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
    const response: AxiosResponse<{status: string, data: ElectionInfo[]}> = yield call(axios.get, `https://${endpoint}/elections`);
    const elections = response.data.data;
    if (response.status >= 400 || response.data.status !== "OK") {
        yield put(errorElections());
        return;
    }
    yield put(storeElections(elections));
}

function* electionSaveSaga(action: ElectionSaveAction) {
    const endpoint: string = yield select(getEndpoint);
    const adminPublicKey: string = yield select(getAdminPublicKey);
    const election = action.payload;

    yield put(retreiveAdminPrivate());
    const returnAdminPrivate: UserReturnPrivateAction = yield take(ADMIN_RETURN_PRIVATE);
    election.sender = adminPublicKey;
    election.signature = calculateElectionSignature(action.payload, returnAdminPrivate.payload);
    const response: AxiosResponse<{status: string}> = yield call(axios.post, `https://${endpoint}/election`, election);
    if (response.status >= 400 || response.data.status !== "OK") {
        yield put(saveElectionFailure());
        return;
    }
    yield put(saveElectionSuccessful());
}
