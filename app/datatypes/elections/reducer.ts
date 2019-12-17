import { ElectionsState, initialElectionsState, ElectionActionTypes, ELECTIONS_SUCESS, ELECTION_SUCESS, ELECTIONS_REQUEST, ELECTION_REQUEST, ELECTION_FAILURE, ELECTIONS_FAILURE } from "./types";
import { ApiState } from "../types";

/** reducer for Elections */
export const electionsReducer = (state: ElectionsState = initialElectionsState, actions: ElectionActionTypes): ElectionsState => {
    switch(actions.type) {
        case ELECTIONS_REQUEST:
        case ELECTION_REQUEST:
            return { ...state, apiState: ApiState.Fetching };
        case ELECTIONS_SUCESS:
            return { ...state, apiState: ApiState.Success, elections: actions.payload };
        case ELECTION_SUCESS:
            const election = actions.payload;
            return {
                 ...state,
                apiState: ApiState.Success,
                elections: state.elections.map(e => e.id === election.id ? election : e),
            };
        case ELECTIONS_FAILURE:
        case ELECTION_FAILURE:
            return { ...state, apiState: ApiState.Failed };
    }
    return state;
}