import { ElectionActionTypes, Election, ELECTIONS_REQUEST, ELECTIONS_SUCESS, ELECTIONS_FAILURE, ELECTION_FAILURE, ELECTION_SUCESS, ElectionId, ELECTION_REQUEST } from "./types";

/** request the Elections from the backend */
export function requestElections(): ElectionActionTypes {
    return { type: ELECTIONS_REQUEST };
}

/** store Elections in to the redux store */
export function storeElections(candidates: Election[]): ElectionActionTypes {
    return { type: ELECTIONS_SUCESS,  payload: candidates };
}

/** fail storage of Elections in the redux store */
export function errorElections(): ElectionActionTypes {
    return { type: ELECTIONS_FAILURE };
}


/** request the Elections from the backend */
export function requestElection(id: ElectionId): ElectionActionTypes {
    return { type: ELECTION_REQUEST, payload: id };
}

/** store single Election in to the redux store */
export function storeElection(election: Election): ElectionActionTypes {
    return { type: ELECTION_SUCESS,  payload: election };
}

/** fail storage of Elections in the redux store */
export function errorElection(): ElectionActionTypes {
    return { type: ELECTION_FAILURE };
}
