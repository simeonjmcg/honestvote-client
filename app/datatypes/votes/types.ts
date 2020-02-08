import { AppId, ApiState } from "../types";
import { CandidateId, ElectionId, ElectionPositionId } from "../elections/types";

/** state for Voters */
export interface VotesState {
  votes: {[electionId: string]: Vote[]};
  apiState: ApiState;
}

/** Initial redux state of the application */
export const initialVotesState: VotesState = {
  votes: {},
  apiState: "Idle",
};

/** VoterId is an identifier for a Voter */
export type VoterId = AppId;

/** Vote is a vote that can go toward a particular candidate */
export interface Vote {
  sender: VoterId;
  electionId: ElectionId;
  receivers: { key: ElectionPositionId, id: CandidateId }[];
  signature: string;
}


export const VOTES_REQUEST = 'VOTES_REQUEST';
export const VOTES_SUCCESS = 'VOTES_SUCCESS';
export const VOTES_FAILURE = 'VOTES_FAILURE';

export const VOTE_SUCCESS = 'VOTE_SUCCESS';

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
export interface VoteSuccessAction {
    type: typeof VOTE_SUCCESS;
    payload: { electionId: ElectionId, vote: Vote };
}

export type VotesActionTypes = VotesRequestAction
                             | VotesSuccessAction
                             | VotesFailureAction
                             | VoteSuccessAction;