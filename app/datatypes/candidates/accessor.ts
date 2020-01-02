import { State } from "../types";
import { CandidateId } from "./types";
import { findId } from "~/utils";

export function getCandidates(state: State) {
    return state.candidates.candidates;
}

export function getCandidate(id: CandidateId) {
    return (state: State) => findId(getCandidates(state), id);
}

export function getCandidatesApiStatus(state: State) {
    return state.candidates.apiState;
}

export function areCandidatesLoading(state: State) {
    return getCandidatesApiStatus(state) === "Fetching";
}

export function areCandidatesLoaded(state: State) {
    const status = getCandidatesApiStatus(state);
    return status !== "Idle" &&
           status !== "Fetching";
}