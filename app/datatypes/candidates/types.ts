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
  apiState: "Idle",
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

export const CANDIDATE_REQUEST = 'CANDIDATE_REQUEST';
export const CANDIDATE_SUCCESS =  'CANDIDATE_SUCCESS';
export const CANDIDATE_FAILURE = 'CANDIDATE_FAILURE';

export const CANDIDATES_REQUEST = 'CANDIDATES_REQUEST';
export const CANDIDATES_SUCCESS =  'CANDIDATES_SUCCESS';
export const CANDIDATES_FAILURE = 'CANDIDATES_FAILURE';

export interface CandidateRequestAction {
    type: typeof CANDIDATE_REQUEST;
    payload: CandidateId;
}
export interface CandidateSuccessAction {
    type: typeof CANDIDATE_SUCCESS;
    payload: Candidate;
}
export interface CandidateFailureAction {
    type: typeof CANDIDATE_FAILURE;
}

export interface CandidatesRequestAction {
    type: typeof CANDIDATES_REQUEST;
}
export interface CandidatesSuccessAction {
    type: typeof CANDIDATES_SUCCESS;
    payload: Candidate[];
}
export interface CandidatesFailureAction {
    type: typeof CANDIDATES_FAILURE;
}

export type CandidateActionTypes = CandidateRequestAction
                                 | CandidateSuccessAction
                                 | CandidateFailureAction
                                 | CandidatesRequestAction
                                 | CandidatesSuccessAction
                                 | CandidatesFailureAction;