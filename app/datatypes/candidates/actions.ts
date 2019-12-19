import { CandidateActionTypes, Candidate, CANDIDATES_REQUEST, CANDIDATES_SUCESS, CANDIDATES_FAILURE } from "./types";

/** request the Candidates from the backend */
export function requestCandidates(): CandidateActionTypes {
    return { type: CANDIDATES_REQUEST };
}

/** store Candidates in to the redux store */
export function storeCandidates(candidates: Candidate[]): CandidateActionTypes {
    return { type: CANDIDATES_SUCESS,  payload: candidates };
}

/** fail storage of Candidates in the redux store */
export function errorCandidates(): CandidateActionTypes {
    return { type: CANDIDATES_FAILURE };
}
