import { combineReducers } from "redux";
import { candidatesReducer as candidates } from "./candidates/reducer";
import { electionsReducer as elections } from "./elections/reducer";
import { electionPositionsReducer as positions } from "./positions/reducer";
import { ticketsReducer as tickets } from "./tickets/reducer";
import { votersReducer as voters } from "./voters/reducer";

export const reducer = combineReducers({
    candidates,
    elections,
    positions,
    tickets,
    voters,
});