import {
    VoterActionTypes, Voter, VoterId,
    VOTER_REQUEST, VOTER_SUCCESS, VOTER_FAILURE,
    VOTERS_REQUEST, VOTERS_SUCCESS, VOTERS_FAILURE,
} from "./types";

/** request the Voters from the backend */
export function requestVoters(): VoterActionTypes {
    return { type: VOTERS_REQUEST };
}

/** store Voters in to the redux store */
export function storeVoters(voters: Voter[]): VoterActionTypes {
    return { type: VOTERS_SUCCESS,  payload: voters };
}

/** fail storage of Voters in the redux store */
export function errorVoters(): VoterActionTypes {
    return { type: VOTERS_FAILURE };
}

/** request a specific Voter from the backend */
export function requestVoter(voterId: VoterId): VoterActionTypes {
    return { type: VOTER_REQUEST, payload: voterId };
}

/** store Voter in to the redux store */
export function storeVoter(voter: Voter): VoterActionTypes {
    return { type: VOTER_SUCCESS,  payload: voter };
}

/** fail storage of Voter in the redux store */
export function errorVoter(): VoterActionTypes {
    return { type: VOTER_FAILURE };
}
