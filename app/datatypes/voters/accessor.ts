import { State } from "../types";
import { VoterId } from "./types";
import { findId } from "~/utils";

export function getVoters(state: State) {
    return state.voters.voters;
}

export function getVoter(id: VoterId) {
    return (state: State) => findId(getVoters(state), id);
}

export function getVotersApiStatus(state: State) {
    return state.voters.apiState;
}

export function areVotersLoading(state: State) {
    return getVotersApiStatus(state) === "Fetching";
}

export function areVotersLoaded(state: State) {
    const status = getVotersApiStatus(state);
    return status !== "Idle" &&
           status !== "Fetching";
}