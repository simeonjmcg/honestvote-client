import { State } from "../types";
import { CandidateId } from "./types";

export function getCandidates(state: State) {
    return state.candidates;
}

export function getCandidate(state: State, id: CandidateId) {
    return getCandidates(state).find(c => c.id === id);
}