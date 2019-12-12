import { TicketsState, initialTicketsState, TicketActionTypes, TICKETS_SUCESS } from "./types";

/** reducer for Tickets */
export const ticketsReducer = (state: TicketsState = initialTicketsState, actions: TicketActionTypes): TicketsState => {
    switch(actions.type) {
        case TICKETS_SUCESS:
            return actions.payload;
    }
    return state;
}