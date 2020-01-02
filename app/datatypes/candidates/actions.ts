import {
    CandidateActionTypes, Candidate, CandidateId,
    CANDIDATE_REQUEST, CANDIDATE_SUCCESS, CANDIDATE_FAILURE,
    CANDIDATES_REQUEST, CANDIDATES_SUCCESS, CANDIDATES_FAILURE,
} from "./types";

/** request specific Candidate from the backend */
export function requestCandidate(candidateId: CandidateId): CandidateActionTypes {
    return { type: CANDIDATE_REQUEST, payload: candidateId };
}

/** store Candidate in to the redux store */
export function storeCandidate(candidate: Candidate): CandidateActionTypes {
    return { type: CANDIDATE_SUCCESS,  payload: candidate };
}

/** fail storage of Candidate in the redux store */
export function errorCandidate(): CandidateActionTypes {
    return { type: CANDIDATE_FAILURE };
}

/** request the Candidates from the backend */
export function requestCandidates(): CandidateActionTypes {
    return { type: CANDIDATES_REQUEST };
}

/** store Candidates in to the redux store */
export function storeCandidates(candidates: Candidate[]): CandidateActionTypes {
    return { type: CANDIDATES_SUCCESS,  payload: candidates };
}

/** fail storage of Candidates in the redux store */
export function errorCandidates(): CandidateActionTypes {
    return { type: CANDIDATES_FAILURE };
}
