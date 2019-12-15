import { State } from "../types";
import { ElectionPositionId } from "./types";

export function getElectionPositions(state: State) {
    return state.positions;
}

export function getElectionPosition(state: State, id: ElectionPositionId) {
    return getElectionPositions(state).find(p => p.id === id);
}