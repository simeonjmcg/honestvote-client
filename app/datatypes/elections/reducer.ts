import { ElectionsState, initialElectionsState, ElectionActionTypes, ELECTIONS_SUCESS, ELECTION_SUCESS } from "./types";

/** reducer for Elections */
export const electionsReducer = (state: ElectionsState = initialElectionsState, actions: ElectionActionTypes): ElectionsState => {
    switch(actions.type) {
        case ELECTIONS_SUCESS:
            return actions.payload;
        case ELECTION_SUCESS:
            const election = actions.payload;
            return state.map(e => e.id === election.id ? election : e);
    }
    return state;
}