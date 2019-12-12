import { ElectionActionTypes, Election, ELECTIONS_REQUEST, ELECTIONS_SUCESS, ELECTIONS_FAILURE } from "./types";
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
