import axios, { AxiosResponse } from "axios";
import { takeEvery, put, select, call } from "@redux-saga/core/effects";
import {
    VOTES_REQUEST,
    storeVotes,
} from ".";
import { VotesRequestAction } from ".";
import { Vote } from "./types";
import { getEndpoint } from "../app";
import { errorVotes } from "./actions";

export function* votersSaga() {
    yield takeEvery(VOTES_REQUEST, votersRequestSaga);
}

function* votersRequestSaga(action: VotesRequestAction) {
    const endpoint: string = yield select(getEndpoint);
    const response: AxiosResponse<{status: string, data: Vote[]}> = yield call(axios.get, `https://${endpoint}/election/${action.payload.electionId}/votes`);
    const votes = response.data.data || [];
    if (response.data.status !== "OK") {
        yield put(errorVotes(action.payload.electionId));
        return;
    }
    yield put(storeVotes(action.payload.electionId, votes));
}
