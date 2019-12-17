import { State, ApiState } from "../types";
import { VoterId } from "./types";

export function getVoters(state: State) {
    return state.voters.voters;
}

export function getVoter(state: State, id: VoterId) {
    return getVoters(state).find(p => p.id === id);
}

export function getVotersApiStatus(state: State) {
    return state.voters.apiState;
}

export function areVotersLoading(state: State) {
    return getVotersApiStatus(state) === ApiState.Fetching;
}