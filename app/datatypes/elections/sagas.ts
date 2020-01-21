import { takeEvery, put } from "@redux-saga/core/effects";
import {
    ELECTION_REQUEST, ElectionRequestAction,
    ELECTIONS_REQUEST,
    storeElection, errorElection,
    storeElections, 
} from "./";
import { findId } from "../../utils";
import example_elections from "./example-elections.json";
import example_election from "./example-election1.json";

export function* electionsSaga() {
    yield takeEvery(ELECTION_REQUEST, electionRequestSaga);
    yield takeEvery(ELECTIONS_REQUEST, electionsRequestSaga);
}

function* electionRequestSaga(action: ElectionRequestAction) {
    const election = findId([example_election.data], action.payload);
    if (election === undefined) {
        yield put(errorElection());
        return;
    }
    yield put(storeElection(election));
}

function* electionsRequestSaga() {
    yield put(storeElections(example_elections.data));
}