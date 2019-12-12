import { ElectionPositionActionTypes, ElectionPosition, ELECTION_POSITIONS_REQUEST, ELECTION_POSITIONS_SUCESS, ELECTION_POSITIONS_FAILURE } from "./types";
import { store } from "../reduxStore";
import example from "./example-positions.json";

/** request the ElectionPositions from the backend */
export function requestElectionPositions(): ElectionPositionActionTypes {
    try {
        store.dispatch(storeElectionPositions(example.data as ElectionPosition[]));
    } catch (e) {
        store.dispatch(errorElectionPositions());
    }
    return { type: ELECTION_POSITIONS_REQUEST };
}

/** store ElectionPositions in to the redux store */
export function storeElectionPositions(candidates: ElectionPosition[]): ElectionPositionActionTypes {
    return { type: ELECTION_POSITIONS_SUCESS,  payload: candidates };
}

/** fail storage of ElectionPositions in the redux store */
export function errorElectionPositions(): ElectionPositionActionTypes {
    return { type: ELECTION_POSITIONS_FAILURE };
}
