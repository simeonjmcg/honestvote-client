import { takeEvery, put } from "@redux-saga/core/effects";
import {
    CANDIDATE_REQUEST, CandidateRequestAction,
    CANDIDATES_REQUEST,
    storeCandidate, errorCandidate,
    storeCandidates,
} from "./";
import { findId } from "~/utils";
import example from "./example-candidates.json";

export function* candidatesSaga() {
    yield takeEvery(CANDIDATE_REQUEST, candidateRequestSaga);
    yield takeEvery(CANDIDATES_REQUEST, candidatesRequestSaga);
}

function* candidateRequestSaga(action: CandidateRequestAction) {
    const candidate = findId(example.data, action.payload);
    if (candidate === undefined) {
        yield put(errorCandidate());
        return;
    }
    yield put(storeCandidate(candidate));
}

function* candidatesRequestSaga() {
    yield put(storeCandidates(example.data));
}