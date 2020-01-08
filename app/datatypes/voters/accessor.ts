import { State } from "../types";
import { VoterId, Voter } from "./types";
import { findId } from "~/utils";
import { ElectionId, Election, isElectionActive, getElection, mapElectionAndTicketsToVotes } from "../elections";
import { Ticket, getTickets } from "../tickets";

export function getVoters(state: State) {
    return state.voters.voters;
}

export function getVoter(id: VoterId) {
    return (state: State) => findId(getVoters(state), id);
}

export function getVotersApiStatus(state: State) {
    return state.voters.apiState;
}

export function getAreVotersLoading(state: State) {
    return getVotersApiStatus(state) === "Fetching";
}

export function getAreVotersLoaded(state: State) {
    const status = getVotersApiStatus(state);
    return status !== "Idle" &&
           status !== "Fetching";
}

export function getIsVoterRegistered(voter: VoterId | Voter, election: ElectionId | Election) {
    return (state: State) => {
        const v = typeof voter === "object" ? voter : getVoter(voter)(state);
        const e = typeof election === "object" ? election : getElection(election)(state);
        if (v == undefined ||e == undefined) return false;
        return isVoterRegistered(v, e);
    }
}

export function getHasVoterVoted(voter: VoterId | Voter, election: Election | ElectionId) {
    return (state: State) => {
        const e = typeof election === "object" ? election : getElection(election)(state);
        if (e == undefined) return false;
        const vid = typeof voter === "object" ? voter.id : voter;
        const tickets = getTickets(state);
        return hasVoterVoted(vid, e, tickets);
    }
}

export function getCanVoterVote(voter: VoterId | Voter, election: ElectionId | Election, timestamp: number = Date.now()) {
    return (state: State) => {
        const v = typeof voter === "object" ? voter : getVoter(voter)(state);
        const e = typeof election === "object" ? election : getElection(election)(state);
        if (v == undefined ||e == undefined) return false;
        const tickets = getTickets(state);
        return canVoterVote(v, e, tickets, timestamp);
    }
}

// util functions
export function isVoterRegistered(voter: Voter, election: ElectionId | Election) {
    const electionId = typeof election === "object" ? election.id : election;
    return voter.permissions.canVote.includes(electionId);
}

export function hasVoterVoted(voterId: VoterId, election: Election, tickets: Ticket[]) {
    const votes = mapElectionAndTicketsToVotes(election, tickets);
    return votes.some(v => v.voterId == voterId);
}

export function canVoterVote(voter: Voter, election: Election, tickets: Ticket[], timestamp: number = Date.now()) {
    return isElectionActive(election, timestamp) &&
           isVoterRegistered(voter, election.id) &&
           !hasVoterVoted(voter.id, election, tickets) ;
}