import { AppState } from "../types";
import { ElectionPositionId } from "./types";

export function getElectionPositions(state: AppState) {
    return state.positions;
}

export function getElectionPosition(state: AppState, id: ElectionPositionId) {
    return getElectionPositions(state).find(p => p.id === id);
}