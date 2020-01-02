import { takeEvery, put } from "@redux-saga/core/effects";
import {
    ELECTION_POSITION_REQUEST, ElectionPositionRequestAction,
    ELECTION_POSITIONS_REQUEST,
    storeElectionPosition, errorElectionPosition,
    storeElectionPositions,
} from "./";
import { findId } from "~/utils";
import example from "./example-positions.json";

export function* positionsSaga() {
    yield takeEvery(ELECTION_POSITION_REQUEST, positionRequestSaga);
    yield takeEvery(ELECTION_POSITIONS_REQUEST, positionsRequestSaga);
}

function* positionRequestSaga(action: ElectionPositionRequestAction) {
    const electionPosition = findId(example.data, action.payload);
    if (electionPosition === undefined) {
        yield put(errorElectionPosition());
        return;
    }
    yield put(storeElectionPosition(electionPosition));
}

function* positionsRequestSaga() {
    yield put(storeElectionPositions(example.data));
}