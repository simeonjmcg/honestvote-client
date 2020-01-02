import {
    ElectionPositionActionTypes, ElectionPosition,
    ELECTION_POSITION_REQUEST, ELECTION_POSITION_SUCCESS, ELECTION_POSITION_FAILURE,
    ELECTION_POSITIONS_REQUEST, ELECTION_POSITIONS_SUCCESS, ELECTION_POSITIONS_FAILURE, ElectionPositionId,
} from "./types";

/** request a specific ElectionPosition from the backend */
export function requestElectionPosition(electionPositionId: ElectionPositionId): ElectionPositionActionTypes {
    return { type: ELECTION_POSITION_REQUEST, payload: electionPositionId };
}

/** store ElectionPosition in to the redux store */
export function storeElectionPosition(electionPosition: ElectionPosition): ElectionPositionActionTypes {
    return { type: ELECTION_POSITION_SUCCESS,  payload: electionPosition };
}

/** fail storage of ElectionPosition in the redux store */
export function errorElectionPosition(): ElectionPositionActionTypes {
    return { type: ELECTION_POSITION_FAILURE };
}

/** request the ElectionPositions from the backend */
export function requestElectionPositions(): ElectionPositionActionTypes {
    return { type: ELECTION_POSITIONS_REQUEST };
}

/** store ElectionPositions in to the redux store */
export function storeElectionPositions(electionPositions: ElectionPosition[]): ElectionPositionActionTypes {
    return { type: ELECTION_POSITIONS_SUCCESS,  payload: electionPositions };
}

/** fail storage of ElectionPositions in the redux store */
export function errorElectionPositions(): ElectionPositionActionTypes {
    return { type: ELECTION_POSITIONS_FAILURE };
}
