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

export const VOTERS_REQUEST = 'VOTERS_REQUEST';
export const VOTERS_SUCESS = 'VOTERS_SUCESS';
export const VOTERS_FAILURE = 'VOTERS_FAILURE';

interface VotersRequestAction {
    type: typeof VOTERS_REQUEST;
}
interface VotersSucessAction {
    type: typeof VOTERS_SUCESS;
    payload: Voter[];
}
interface VotersFailureAction {
    type: typeof VOTERS_FAILURE;
}

export type VoterActionTypes = VotersRequestAction
                             | VotersSucessAction
                             | VotersFailureAction;