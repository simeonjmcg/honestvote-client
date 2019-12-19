import { takeEvery, put } from "@redux-saga/core/effects";
import { CANDIDATES_REQUEST } from "./types";
import example from "./example-candidates.json";
import { storeCandidates } from "./actions";

export function* candidatesSaga() {
    yield takeEvery(CANDIDATES_REQUEST, candidatesRequestSaga);
}

function* candidatesRequestSaga() {
    yield put(storeCandidates(example.data));
}