import { takeEvery, put } from "@redux-saga/core/effects";
import { TICKETS_REQUEST } from "./types";
import example from "./example-tickets.json";
import { storeTickets } from "./actions";

export function* ticketsSaga() {
    yield takeEvery(TICKETS_REQUEST, ticketsRequestSaga);
}

function* ticketsRequestSaga() {
    yield put(storeTickets(example.data));
}