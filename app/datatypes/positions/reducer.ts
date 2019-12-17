import { ElectionPositionsState, initialElectionPositionsState, ElectionPositionActionTypes, ELECTION_POSITIONS_SUCESS, ELECTION_POSITIONS_REQUEST, ELECTION_POSITIONS_FAILURE } from "./types";

/** reducer for ElectionPositions */
export const electionPositionsReducer = (state: ElectionPositionsState = initialElectionPositionsState, actions: ElectionPositionActionTypes): ElectionPositionsState => {
    switch(actions.type) {
        case ELECTION_POSITIONS_REQUEST:
            return { ...state, apiState: "Fetching" };
        case ELECTION_POSITIONS_SUCESS:
            return { ...state, apiState: "Success", positions: actions.payload };
        case ELECTION_POSITIONS_FAILURE:
            return { ...state, apiState: "Failed" };
    }
    return state;
}