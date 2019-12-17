import { State, ApiState } from "../types";
import { ElectionId } from "./types";

export function getElections(state: State) {
    return state.elections.elections;
}

export function getElection(state: State, id: ElectionId) {
    return getElections(state).find(e => e.id === id);
}

export function getElectionsApiStatus(state: State) {
    return state.elections.apiState;
}

export function areElectionsLoading(state: State) {
    return getElectionsApiStatus(state) === ApiState.Fetching;
}