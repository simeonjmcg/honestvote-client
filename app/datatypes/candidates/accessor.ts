import { State } from "../types";
import { CandidateId } from "./types";

export function getCandidates(state: State) {
    return state.candidates.candidates;
}

export function getCandidate(state: State, id: CandidateId) {
    return getCandidates(state).find(c => c.id === id);
}

export function getCandidatesApiStatus(state: State) {
    return state.candidates.apiState;
}

export function areCandidatesLoading(state: State) {
    return getCandidatesApiStatus(state) === "Fetching";
}