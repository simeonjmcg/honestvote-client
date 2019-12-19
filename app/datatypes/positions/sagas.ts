import { takeEvery, put } from "@redux-saga/core/effects";
import { ELECTION_POSITIONS_REQUEST } from "./types";
import example from "./example-positions.json";
import { storeElectionPositions } from "./actions";

export function* positionsSaga() {
    yield takeEvery(ELECTION_POSITIONS_REQUEST, positionsRequestSaga);
}

function* positionsRequestSaga() {
    yield put(storeElectionPositions(example.data));
}