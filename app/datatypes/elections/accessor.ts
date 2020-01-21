import { State } from "../types";
import { ElectionId, Election, ElectionInfo } from "./types";
import { findId } from "~/utils";

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