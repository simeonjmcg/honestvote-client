import { AppState } from "./types";

export function getCandidates(state: AppState) {
    return state.candidates;
}

export function getElections(state: AppState) {
    return state.elections;
}