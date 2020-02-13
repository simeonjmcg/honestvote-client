import {
    Vote,
} from "./types";
import { ElectionId } from "../elections/types";

export const VOTES_REQUEST = 'VOTES_REQUEST';
export const VOTES_SUCCESS = 'VOTES_SUCCESS';
export const VOTES_FAILURE = 'VOTES_FAILURE';

export const VOTE_ADD = 'VOTE_ADD';

export interface VotesRequestAction {
    type: typeof VOTES_REQUEST;
    payload: { electionId: ElectionId };
}
export interface VotesSuccessAction {
    type: typeof VOTES_SUCCESS;
    payload: { electionId: ElectionId, votes: Vote[] };
}
export interface VotesFailureAction {
    type: typeof VOTES_FAILURE;
    payload: { electionId: ElectionId };
}
export interface VoteAddAction {
    type: typeof VOTE_ADD;
    payload: { electionId: ElectionId, vote: Vote };
}

export type VotesActionTypes = VotesRequestAction
                             | VotesSuccessAction
                             | VotesFailureAction
                             | VoteAddAction;

/** request the Votes from the backend */
export function requestVotes(electionId: ElectionId): VotesActionTypes {
    return { type: VOTES_REQUEST, payload: { electionId } };
}

/** store Votes in to the redux store */
export function storeVotes(electionId: ElectionId, votes: Vote[]): VotesActionTypes {
    return { type: VOTES_SUCCESS,  payload: { electionId, votes } };
}

/** store Votes in to the redux store */
export function addVote(electionId: ElectionId, vote: Vote): VotesActionTypes {
    return { type: VOTE_ADD,  payload: { electionId, vote } };
}

/** fail storage of Votes in the redux store */
export function errorVotes(electionId: ElectionId): VotesActionTypes {
    return { type: VOTES_FAILURE, payload: { electionId } };
}
