import { AppState } from "../types";
import { ElectionId } from "./types";

export function getElections(state: AppState) {
    return state.elections;
}

export function getElection(state: AppState, id: ElectionId) {
    return getElections(state).find(e => e.id === id);
}