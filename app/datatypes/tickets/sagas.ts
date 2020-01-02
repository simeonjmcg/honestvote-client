import { takeEvery, put } from "@redux-saga/core/effects";
import {
    TICKET_REQUEST, TicketRequestAction,
    TICKETS_REQUEST,
    storeTicket, errorTicket,
    storeTickets,
} from "./";
import { findId } from "~/utils";
import example from "./example-tickets.json";

export function* ticketsSaga() {
    yield takeEvery(TICKET_REQUEST, ticketRequestSaga);
    yield takeEvery(TICKETS_REQUEST, ticketsRequestSaga);
}

function* ticketRequestSaga(action: TicketRequestAction) {
    const ticket = findId(example.data, action.payload);
    if (ticket === undefined) {
        yield put(errorTicket());
        return;
    }
    yield put(storeTicket(ticket));
}

function* ticketsRequestSaga() {
    yield put(storeTickets(example.data));
}