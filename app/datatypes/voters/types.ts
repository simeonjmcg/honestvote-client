import { AppId, ApiState } from "../types";
import { ElectionId } from "../elections/types";

/** state for Voters */
export interface VotersState {
  voters: Voter[];
  apiState: ApiState;
}

/** Initial redux state of the application */
export const initialVotersState: VotersState = {
  voters: [],
  apiState: "Idle",
};

/** VoterId is an identifier for a Voter */
export type VoterId = AppId;

/** Voter is a user that is able to vote */
export interface Voter {
  id: VoterId;
  permissions: VoterPermissions;
}

/** VoterPermissions are the permissions granted to a given Voter user */
export interface VoterPermissions {
  canVote: ElectionId[];
}

export const VOTER_REQUEST = 'VOTER_REQUEST';
export const VOTER_SUCCESS = 'VOTER_SUCCESS';
export const VOTER_FAILURE = 'VOTER_FAILURE';

export const VOTERS_REQUEST = 'VOTERS_REQUEST';
export const VOTERS_SUCCESS = 'VOTERS_SUCCESS';
export const VOTERS_FAILURE = 'VOTERS_FAILURE';

export interface VoterRequestAction {
    type: typeof VOTER_REQUEST;
    payload: VoterId;
}
export interface VoterSuccessAction {
    type: typeof VOTER_SUCCESS;
    payload: Voter;
}
export interface VoterFailureAction {
    type: typeof VOTER_FAILURE;
}

export interface VotersRequestAction {
    type: typeof VOTERS_REQUEST;
}
export interface VotersSuccessAction {
    type: typeof VOTERS_SUCCESS;
    payload: Voter[];
}
export interface VotersFailureAction {
    type: typeof VOTERS_FAILURE;
}

export type VoterActionTypes = VoterRequestAction
                             | VoterSuccessAction
                             | VoterFailureAction
                             | VotersRequestAction
                             | VotersSuccessAction
                             | VotersFailureAction;