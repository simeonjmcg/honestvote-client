import { combineReducers } from "redux";
import { appReducer as app } from './app/reducer';
import { userReducer as user } from './user/reducer';
import { candidatesReducer as candidates } from './candidates/reducer';
import { electionsReducer as elections } from './elections/reducer';
import { electionPositionsReducer as positions } from './positions/reducer';
import { ticketsReducer as tickets } from './tickets/reducer';
import { votersReducer as voters } from './voters/reducer';

export const reducer = combineReducers({
    app,
    user,
    candidates,
    elections,
    positions,
    tickets,
    voters,
});