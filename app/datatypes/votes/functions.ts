import { State } from "../types";
import { ElectionId } from "../elections/types";
import { Vote } from "./types";
import { ec } from "~/encryption";
import hash from 'hash.js';

import { sequence, string } from "~/der-encoding";

// selectors
export function getVotes(electionId: ElectionId) {
    return (state: State) => state.votes.votes[electionId] ?? [];
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
    const v = sequence([
        /* electionId: */ string(vote.electionId),
        /* receivers: */ sequence(vote.receivers.map(r =>
            sequence([
                /* id: */ string(r.id),
                /* key: */ string(r.key),
            ])),
        ),
    ]);

    const h = hash.sha256().update(v.toBytes()).digest();

    const keyPair = ec.keyFromPrivate(privateKey, "hex");
    return keyPair.sign(h).toDER("hex");
}