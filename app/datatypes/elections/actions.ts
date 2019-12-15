import { ElectionActionTypes, Election, ELECTIONS_REQUEST, ELECTIONS_SUCESS, ELECTIONS_FAILURE, ELECTION_FAILURE, ELECTION_SUCESS, ElectionId } from "./types";
import { store } from "../reduxStore";
import example from "./example-elections.json";

/** request the Elections from the backend */
export function requestElections(): ElectionActionTypes {
    try {
        store.dispatch(storeElections(example.data as Election[]));
    } catch (e) {
        store.dispatch(errorElections());
    }
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
    try {
        const election = (example.data as Election[]).find(e => e.id === id);

        if (election) {
            store.dispatch(storeElection(election));
        } else {
            store.dispatch(errorElection());
        }
    } catch (e) {
        store.dispatch(errorElection());
    }
    return { type: ELECTIONS_REQUEST };
}

/** store single Election in to the redux store */
export function storeElection(candidate: Election): ElectionActionTypes {
    return { type: ELECTION_SUCESS,  payload: candidate };
}

/** fail storage of Elections in the redux store */
export function errorElection(): ElectionActionTypes {
    return { type: ELECTION_FAILURE };
}
