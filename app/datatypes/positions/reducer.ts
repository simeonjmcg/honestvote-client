import { ElectionPositionsState, initialElectionPositionsState, ElectionPositionActionTypes, ELECTION_POSITIONS_SUCESS } from "./types";

/** reducer for ElectionPositions */
export const electionPositionsReducer = (state: ElectionPositionsState = initialElectionPositionsState, actions: ElectionPositionActionTypes): ElectionPositionsState => {
    switch(actions.type) {
        case ELECTION_POSITIONS_SUCESS:
            return actions.payload;
    }
    return state;
}