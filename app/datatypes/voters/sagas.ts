import { takeEvery, put } from "@redux-saga/core/effects";
import { VOTERS_REQUEST } from "./types";
import example from "./example-voters.json";
import { storeVoters } from "./actions";

export function* votersSaga() {
    yield takeEvery(VOTERS_REQUEST, votersRequestSaga);
}

function* votersRequestSaga() {
    yield put(storeVoters(example.data));
}