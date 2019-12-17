import { State } from "../types";
import { ElectionPositionId } from "./types";

export function getElectionPositions(state: State) {
    return state.positions.positions;
}

export function getElectionPosition(state: State, id: ElectionPositionId) {
    return getElectionPositions(state).find(p => p.id === id);
}

export function getPositionsApiStatus(state: State) {
    return state.positions.apiState;
}

export function arePositionsLoading(state: State) {
    return getPositionsApiStatus(state) === "Fetching";
}