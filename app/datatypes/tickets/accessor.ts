import { AppState } from "../types";
import { TicketId } from "./types";

export function getTickets(state: AppState) {
    return state.tickets;
}

export function getTicket(state: AppState, id: TicketId) {
    return getTickets(state).find(p => p.id === id);
}