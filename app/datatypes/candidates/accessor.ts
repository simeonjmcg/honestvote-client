import { AppState } from "../types";
import { CandidateId } from "./types";

export function getCandidates(state: AppState) {
    return state.candidates;
}

export function getCandidate(state: AppState, id: CandidateId) {
    return getCandidates(state).find(c => c.id === id);
}