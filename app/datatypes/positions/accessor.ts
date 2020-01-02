import { State } from "../types";
import { ElectionPositionId } from "./types";
import { findId } from "~/utils";

export function getElectionPositions(state: State) {
    return state.positions.positions;
}

export function getElectionPosition(id: ElectionPositionId) {
    return (state: State) => findId(getElectionPositions(state), id);
}

export function getPositionsApiStatus(state: State) {
    return state.positions.apiState;
}

export function arePositionsLoading(state: State) {
    return getPositionsApiStatus(state) === "Fetching";
}

export function arePositionsLoaded(state: State) {
    const status = getPositionsApiStatus(state);
    return status !== "Idle" &&
           status !== "Fetching";
}