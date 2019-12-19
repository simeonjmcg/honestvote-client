import { takeEvery, put } from "@redux-saga/core/effects";
import { ELECTIONS_REQUEST, ELECTION_REQUEST, ElectionRequestAction } from "./types";
import example from "./example-elections.json";
import { storeElections, storeElection, errorElection } from "./actions";
import { findId } from "../../utils";

export function* electionsSaga() {
    yield takeEvery(ELECTIONS_REQUEST, electionsRequestSaga);
    yield takeEvery(ELECTION_REQUEST, electionRequestSaga);
}

function* electionsRequestSaga() {
    yield put(storeElections(example.data));
}

function* electionRequestSaga(action: ElectionRequestAction) {
    const election = findId(example.data, action.payload);
    if (election === undefined) {
        yield put(errorElection());
        return;
    }
    yield put(storeElection(election));
}