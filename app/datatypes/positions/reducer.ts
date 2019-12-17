import { ElectionPositionsState, initialElectionPositionsState, ElectionPositionActionTypes, ELECTION_POSITIONS_SUCESS, ELECTION_POSITIONS_REQUEST, ELECTION_POSITIONS_FAILURE } from "./types";
import { ApiState } from "../types";

/** reducer for ElectionPositions */
export const electionPositionsReducer = (state: ElectionPositionsState = initialElectionPositionsState, actions: ElectionPositionActionTypes): ElectionPositionsState => {
    switch(actions.type) {
        case ELECTION_POSITIONS_REQUEST:
            return { ...state, apiState: ApiState.Fetching };
        case ELECTION_POSITIONS_SUCESS:
            return { ...state, apiState: ApiState.Success, positions: actions.payload };
        case ELECTION_POSITIONS_FAILURE:
            return { ...state, apiState: ApiState.Failed };
    }
    return state;
}