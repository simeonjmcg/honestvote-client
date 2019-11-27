import { store } from './reduxStore';
import { 
    ActionTypes,
    Candidate,
    Election,
    CANDIDATES_REQUEST,
    CANDIDATES_SUCESS,
    CANDIDATES_FAILURE,
    ELECTION_REQUEST,
    ELECTION_SUCESS,
    ELECTION_FAILURE, 
    API_URL} from "./types";

export function requestCandidates(): ActionTypes {
    fetch(API_URL + "/getCandidates")
        .then((res) => res.json())
        .then((res) => store.dispatch(storeCandidates(res)))
        .catch((_) => store.dispatch(errorCandidates()));
    return { type: CANDIDATES_REQUEST };
}
export function storeCandidates(candidates: Candidate[]): ActionTypes {
    return { type: CANDIDATES_SUCESS,  payload: candidates };
}
export function errorCandidates(): ActionTypes {
    return { type: CANDIDATES_FAILURE };
}

export function requestElections(): ActionTypes {
    fetch(API_URL + "/getElections")
        .then((res) => res.json())
        .then((res) => store.dispatch(storeElections(res)))
        .catch((_) => store.dispatch(errorElections()));
    return { type: ELECTION_REQUEST };
}
export function storeElections(elections: Election[]): ActionTypes {
    return { type: ELECTION_SUCESS,  payload: elections };
}
export function errorElections(): ActionTypes {
    return { type: ELECTION_FAILURE };
}