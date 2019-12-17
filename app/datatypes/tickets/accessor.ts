import { State } from "../types";
import { TicketId } from "./types";
import { findId } from "../../utils";

export function getTickets(state: State) {
    return state.tickets.tickets;
}

export function getTicket(state: State, id: TicketId) {
    return findId(getTickets(state), id);
}

export function getTicketsApiStatus(state: State) {
    return state.tickets.apiState;
}

export function areTicketsLoading(state: State) {
    return getTicketsApiStatus(state) === "Fetching";
}