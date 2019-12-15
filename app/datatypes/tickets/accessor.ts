import { State } from "../types";
import { TicketId } from "./types";
import { findId } from "../../utils";

export function getTickets(state: State) {
    return state.tickets;
}

export function getTicket(state: State, id: TicketId) {
    return findId(getTickets(state), id);
}