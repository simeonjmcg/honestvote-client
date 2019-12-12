import { AppState } from "../types";
import { VoterId } from "./types";

export function getVoters(state: AppState) {
    return state.voters;
}

export function getVoter(state: AppState, id: VoterId) {
    return getVoters(state).find(p => p.id === id);
}