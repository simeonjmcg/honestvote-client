import {
    TicketsState, initialTicketsState, TicketActionTypes,
    TICKET_SUCCESS, TICKET_REQUEST, TICKET_FAILURE,
    TICKETS_SUCCESS, TICKETS_REQUEST, TICKETS_FAILURE,
} from "./types";
import { updateIdArray } from "~/utils";

/** reducer for Tickets */
export function ticketsReducer(
        state: TicketsState = initialTicketsState,
        actions: TicketActionTypes): TicketsState {
    switch(actions.type) {
        case TICKET_REQUEST:
        case TICKETS_REQUEST:
            return { ...state, apiState: "Fetching" };
        case TICKET_SUCCESS:
            return {
                ...state, apiState: "Success",
                tickets: updateIdArray(state.tickets, actions.payload),
            };
        case TICKETS_SUCCESS:
            return { ...state, apiState: "Success", tickets: actions.payload };
        case TICKET_FAILURE:
        case TICKETS_FAILURE:
            return { ...state, apiState: "Failed" };
    }
    return state;
}