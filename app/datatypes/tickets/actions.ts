import {
    TicketActionTypes, Ticket, TicketId,
    TICKET_REQUEST, TICKET_SUCCESS, TICKET_FAILURE,
    TICKETS_REQUEST, TICKETS_SUCCESS, TICKETS_FAILURE,
} from "./types";

/** request specific Ticket from the backend */
export function requestTicket(ticketId: TicketId): TicketActionTypes {
    return { type: TICKET_REQUEST, payload: ticketId };
}

/** store Ticket in to the redux store */
export function storeTicket(ticket: Ticket): TicketActionTypes {
    return { type: TICKET_SUCCESS,  payload: ticket };
}

/** fail storage of Ticket in the redux store */
export function errorTicket(): TicketActionTypes {
    return { type: TICKET_FAILURE };
}

/** request the Tickets from the backend */
export function requestTickets(): TicketActionTypes {
    return { type: TICKETS_REQUEST };
}

/** store Tickets in to the redux store */
export function storeTickets(tickets: Ticket[]): TicketActionTypes {
    return { type: TICKETS_SUCCESS,  payload: tickets };
}

/** fail storage of Tickets in the redux store */
export function errorTickets(): TicketActionTypes {
    return { type: TICKETS_FAILURE };
}
