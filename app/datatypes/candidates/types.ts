import { AppId, ApiState } from "../types";
import { ElectionId } from "../elections/types";

/** state for Candidates */
export interface CandidatesState {
  candidates: Candidate[];
  apiState: ApiState;
}

/** Initial redux state of the application */
export const initialCandidatesState: CandidatesState = {
  candidates: [],
  apiState: ApiState.Idle,
};

/** CandidateId is an identifier for a Candidate */
export type CandidateId = AppId;


/** Candidate is a candidate user that is publicly identified, and is able to run in an election */
export interface Candidate {
  id: CandidateId;
  fullName: string;
  permissions: CandidatePermissions;
}

/** CandidatePermissions are the permissions granted to a given Candidate user */
export interface CandidatePermissions {
  canRun: ElectionId[];
}

export const CANDIDATES_REQUEST = 'CANDIDATES_REQUEST';
export const CANDIDATES_SUCESS = 'CANDIDATES_SUCESS';
export const CANDIDATES_FAILURE = 'CANDIDATES_FAILURE';

interface CandidatesRequestAction {
    type: typeof CANDIDATES_REQUEST;
}
interface CandidatesSucessAction {
    type: typeof CANDIDATES_SUCESS;
    payload: Candidate[];
}
interface CandidatesFailureAction {
    type: typeof CANDIDATES_FAILURE;
}

export type CandidateActionTypes = CandidatesRequestAction
                                 | CandidatesSucessAction
                                 | CandidatesFailureAction;