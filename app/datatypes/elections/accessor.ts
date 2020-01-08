import { State } from "../types";
import { ElectionId, Election, ElectionInfo } from "./types";
import { findId, mapIdList } from "~/utils";
import { Ticket, getTickets } from "../tickets";

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

export function getIsElectionStarted(election: Election | ElectionId, timestamp: number = Date.now()) {
    return (state: State) => {
        const e = typeof election === "object" ? election : getElection(election)(state);
        return e != undefined && isElectionStarted(e, timestamp)
    }
}

export function getIsElectionEnded(election: Election | ElectionId, timestamp: number = Date.now()) {
    return (state: State) => {
        const e = typeof election === "object" ? election : getElection(election)(state);
        return e != undefined && isElectionEnded(e, timestamp)
    }
}

export function getIsElectionActive(election: Election | ElectionId, timestamp: number = Date.now()) {
    return (state: State) => {
        const e = typeof election === "object" ? election : getElection(election)(state);
        return e != undefined && isElectionActive(e, timestamp)
    }
}

export function getElectionVotes(election: Election | ElectionId) {
    return (state: State) => {
        const e = typeof election === "object" ? election : getElection(election)(state);
        const tickets = getTickets(state);
        return e != undefined && mapElectionAndTicketsToVotes(e, tickets);
    }
}

// util functions
export function isElectionStarted(election: ElectionInfo, timestamp: number = Date.now()) {
    return election.startDate == undefined || election.startDate < timestamp;
}

export function isElectionEnded(election: ElectionInfo, timestamp: number = Date.now()) {
    return election.endDate < timestamp;
}

export function isElectionActive(e: ElectionInfo, timestamp: number = Date.now()) {
    return isElectionStarted(e, timestamp) && !isElectionEnded(e, timestamp);
}

export function mapElectionAndTicketsToVotes(election: Election, tickets: Ticket[]) {
    return election.ticketEntries
        .flatMap(entry => mapIdList(entry.tickets, tickets))
        .flatMap(t => t.votes);
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