import {
    ElectionPositionsState, initialElectionPositionsState, ElectionPositionActionTypes,
    ELECTION_POSITION_SUCCESS, ELECTION_POSITION_REQUEST, ELECTION_POSITION_FAILURE,
    ELECTION_POSITIONS_SUCCESS, ELECTION_POSITIONS_REQUEST, ELECTION_POSITIONS_FAILURE,
} from "./types";
import { updateIdArray } from "~/utils";

/** reducer for ElectionPositions */
export function electionPositionsReducer(
        state: ElectionPositionsState = initialElectionPositionsState,
        action: ElectionPositionActionTypes): ElectionPositionsState {
    switch(action.type) {
        case ELECTION_POSITION_REQUEST:
        case ELECTION_POSITIONS_REQUEST:
            return { ...state, apiState: "Fetching" };
        case ELECTION_POSITION_SUCCESS:
            return {
                ...state, apiState: "Success",
                positions: updateIdArray(state.positions, action.payload),
            };
        case ELECTION_POSITIONS_SUCCESS:
            return { ...state, apiState: "Success", positions: action.payload };
        case ELECTION_POSITION_FAILURE:
        case ELECTION_POSITIONS_FAILURE:
            return { ...state, apiState: "Failed" };
    }
    return state;
}