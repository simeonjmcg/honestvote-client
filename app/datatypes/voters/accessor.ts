import { State } from "../types";
import { VoterId } from "./types";

export function getVoters(state: State) {
    return state.voters;
}

export function getVoter(state: State, id: VoterId) {
    return getVoters(state).find(p => p.id === id);
}