import {
    VotesActionTypes, Vote,
    VOTES_REQUEST, VOTES_SUCCESS, VOTES_FAILURE,
} from "./types";
import { ElectionId } from "../elections/types";

/** request the Votes from the backend */
export function requestVotes(electionId: ElectionId): VotesActionTypes {
    return { type: VOTES_REQUEST, payload: { electionId } };
}

/** store Votes in to the redux store */
export function storeVotes(electionId: ElectionId, votes: Vote[]): VotesActionTypes {
    return { type: VOTES_SUCCESS,  payload: { electionId, votes } };
}

/** fail storage of Votes in the redux store */
export function errorVotes(electionId: ElectionId): VotesActionTypes {
    return { type: VOTES_FAILURE, payload: { electionId } };
}
