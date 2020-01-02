import { State } from "../types";
import { ElectionId } from "./types";
import { findId } from "~/utils";

export function getElections(state: State) {
    return state.elections.elections;
}

export function getElection(id: ElectionId) {
    return (state: State) => findId(getElections(state), id);
}

export function getElectionsApiStatus(state: State) {
    return state.elections.apiState;
}

export function areElectionsLoading(state: State) {
    return getElectionsApiStatus(state) === "Fetching";
}

export function areElectionsLoaded(state: State) {
    const status = getElectionsApiStatus(state);
    return status !== "Idle" &&
           status !== "Fetching";
}