import { State } from "../types";
import { ElectionId } from "../elections/types";

export function getVotes(electionId: ElectionId) {
    return (state: State) => state.votes.votes[electionId];
}

export function getVotesApiStatus(state: State) {
    return state.votes.apiState;
}

export function getAreVotesLoading(state: State) {
    return getVotesApiStatus(state) === "Fetching";
}

export function getAreVotersLoaded(state: State) {
    const status = getVotesApiStatus(state);
    return status !== "Idle" &&
           status !== "Fetching";
}
