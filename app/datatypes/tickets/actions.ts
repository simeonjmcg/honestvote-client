import { TicketActionTypes, Ticket, TICKETS_REQUEST, TICKETS_SUCESS, TICKETS_FAILURE } from "./types";
import { store } from "../reduxStore";
import example from "./example-tickets.json";

/** request the Tickets from the backend */
export function requestTickets(): TicketActionTypes {
    try {
        setTimeout(() => store.dispatch(storeTickets(example.data as Ticket[])));
    } catch (e) {
        setTimeout(() => store.dispatch(errorTickets()));
    }
    return { type: TICKETS_REQUEST };
}

/** store Tickets in to the redux store */
export function storeTickets(candidates: Ticket[]): TicketActionTypes {
    return { type: TICKETS_SUCESS,  payload: candidates };
}

/** fail storage of Tickets in the redux store */
export function errorTickets(): TicketActionTypes {
    return { type: TICKETS_FAILURE };
}
