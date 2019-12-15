import { State } from "../types";
import { ElectionId } from "./types";

export function getElections(state: State) {
    return state.elections;
}

export function getElection(state: State, id: ElectionId) {
    return getElections(state).find(e => e.id === id);
}