import { TicketsState, initialTicketsState, TicketActionTypes, TICKETS_SUCESS, TICKETS_REQUEST, TICKETS_FAILURE } from "./types";
import { ApiState } from "../types";

/** reducer for Tickets */
export const ticketsReducer = (state: TicketsState = initialTicketsState, actions: TicketActionTypes): TicketsState => {
    switch(actions.type) {
        case TICKETS_REQUEST:
            return { ...state, apiState: ApiState.Fetching };
        case TICKETS_SUCESS:
            return { ...state, apiState: ApiState.Success, tickets: actions.payload };
        case TICKETS_FAILURE:
            return { ...state, apiState: ApiState.Failed };
    }
    return state;
}