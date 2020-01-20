import { takeEvery, put } from "@redux-saga/core/effects";
import {
    VOTES_REQUEST,
    storeVotes,
} from ".";
import example from "./example-votes.json";
import { VotesRequestAction } from "./types";

export function* votersSaga() {
    yield takeEvery(VOTES_REQUEST, votersRequestSaga);
}

function* votersRequestSaga(action: VotesRequestAction) {
    yield put(storeVotes(action.payload.electionId, example.data));
}