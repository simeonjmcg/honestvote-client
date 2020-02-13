import { State } from "../types";
import { ElectionId } from "../elections/types";
import { Vote } from "./types";
import { ec } from "~/encryption";

// selectors
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
// utils
export function calculateVoteSignature(vote: Vote, privateKey: string) {
    const keyPair = ec.keyFromPrivate(privateKey, "hex");
    const str = vote.electionId + vote.receivers.map((value) => value.id + value.key).join("");
    return keyPair.sign(str).toDER("hex");
}