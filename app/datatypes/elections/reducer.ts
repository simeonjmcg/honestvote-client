import { ElectionsState, initialElectionsState, ElectionActionTypes, ELECTIONS_SUCESS, ELECTION_SUCESS, ELECTIONS_REQUEST, ELECTION_REQUEST, ELECTION_FAILURE, ELECTIONS_FAILURE } from "./types";
import { withoutId } from "../../utils";

/** reducer for Elections */
export const electionsReducer = (state: ElectionsState = initialElectionsState, actions: ElectionActionTypes): ElectionsState => {
    switch(actions.type) {
        case ELECTIONS_REQUEST:
        case ELECTION_REQUEST:
            return { ...state, apiState: "Fetching" };
        case ELECTIONS_SUCESS:
            return { ...state, apiState: "Success", elections: actions.payload };
        case ELECTION_SUCESS:
            const election = actions.payload;
            return {
                 ...state,
                apiState: "Success",
                elections: [...withoutId(state.elections, election.id), election]
            };
        case ELECTIONS_FAILURE:
        case ELECTION_FAILURE:
            return { ...state, apiState: "Failed" };
    }
    return state;
}