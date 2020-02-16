import { State } from "../types";
import { ElectionId, Election, ElectionInfo, Candidate, ElectionPositionId } from "./types";
import { findId, sumMapValues, mapKey } from "~/utils";
import { Vote } from "../votes";
import { ec } from "~/encryption";
import { sequence, string } from "~/der-encoding";

// selectors
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

export function isElectionsFetchFailed(state: State) {
    const status = getElectionsApiStatus(state);
    return status === "Failed";
}

export function areElectionsLoaded(state: State) {
    const status = getElectionsApiStatus(state);
    return status !== "Idle" &&
           status !== "Fetching";
}

export function getIsElectionStarted(election: Election | ElectionId, timestamp: number | string = Date.now()) {
    return (state: State) => {
        const e = typeof election === "object" ? election : getElection(election)(state);
        return e != undefined && isElectionStarted(e, timestamp)
    }
}

export function getIsElectionEnded(election: Election | ElectionId, timestamp: number | string = Date.now()) {
    return (state: State) => {
        const e = typeof election === "object" ? election : getElection(election)(state);
        return e != undefined && isElectionEnded(e, timestamp)
    }
}

export function getIsElectionActive(election: Election | ElectionId, timestamp: number | string = Date.now()) {
    return (state: State) => {
        const e = typeof election === "object" ? election : getElection(election)(state);
        return e != undefined && isElectionActive(e, timestamp)
    }
}

// util functions
export function isElectionStarted(election: ElectionInfo, timestamp: number | string = Date.now()) {
    return election.startDate == undefined || new Date(election.startDate) < new Date(timestamp);
}

export function isElectionEnded(election: ElectionInfo, timestamp: number | string = Date.now()) {
    return new Date(election.endDate) < new Date(timestamp);
}

export function isElectionActive(e: ElectionInfo, timestamp: number | string = Date.now()) {
    return isElectionStarted(e, timestamp) && !isElectionEnded(e, timestamp);
}

export function openedStateString(election: ElectionInfo): string {
    const n = Date.now();
    if (isElectionEnded(election, n))
        return "Closed";
    const endDate = new Date(election.endDate);
    const endStr = `${endDate.getMonth()+1}/${endDate.getDate()}`;
    if (election.startDate != undefined && !isElectionStarted(election, n)) {
        const startDate = new Date(election.startDate);
        const startStr = `${startDate.getMonth()+1}/${startDate.getDate()}`;
        return `${startStr} - ${endStr}`;
    }
    return `Closes ${endStr}`;
}

export function countVotesByPositionId(votes: Vote[], positionId: ElectionPositionId) {
    return votes.filter(vote => vote.receivers.some(pair => pair.key === positionId)).length;
}

export function voteCountByCandidate(votes: Vote[]) {
    return sumMapValues(votes.map(vote => mapKey(vote.receivers, pair => ({ key: pair.id, value: 1 }))));
}

export function sortCandidatesByVoteCount(candidates: Candidate[], voteCount: { [key: string ]: number}) {
    return candidates.sort((c1, c2) => (voteCount[c2.id] ?? 0) - (voteCount[c1.id] ?? 0));
}

// utils
export function calculateElectionSignature(election: Election, privateKey: string) {
    const keyPair = ec.keyFromPrivate(privateKey, "hex");
    const el = sequence([
        string(election.electionName),
        string(election.institutionName),
        string(election.description),
        string(election.startDate),
        string(election.endDate),
        string(election.emailDomain),
        sequence(election.positions.map(p => sequence([
            string(p.id),
            string(p.positionName),
            sequence(p.candidates.map(c => sequence([
                string(c.id),
                string(c.name),
            ]))),
        ]))),
    ]);
    return keyPair.sign(el.toBytes()).toDER("hex");
}