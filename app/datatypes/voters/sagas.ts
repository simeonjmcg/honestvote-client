import { takeEvery, put } from "@redux-saga/core/effects";
import {
    VOTER_REQUEST, VoterRequestAction,
    VOTERS_REQUEST,
    storeVoter, errorVoter,
    storeVoters,
} from "./";
import { findId } from "~/utils";
import example from "./example-voters.json";

export function* votersSaga() {
    yield takeEvery(VOTER_REQUEST, voterRequestSaga);
    yield takeEvery(VOTERS_REQUEST, votersRequestSaga);
}

function* voterRequestSaga(action: VoterRequestAction) {
    const voter = findId(example.data, action.payload);
    if (voter === undefined) {
        yield put(errorVoter());
        return;
    }
    yield put(storeVoter(voter));
}

function* votersRequestSaga() {
    yield put(storeVoters(example.data));
}