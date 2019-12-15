import { combineReducers } from 'redux';
import {
    appReducer as app,
    candidatesReducer as candidates,
    electionsReducer as elections,
    electionPositionsReducer as positions,
    ticketsReducer as tickets,
    votersReducer as voters,
} from './';
export const reducer = combineReducers({
    app,
    candidates,
    elections,
    positions,
    tickets,
    voters,
});