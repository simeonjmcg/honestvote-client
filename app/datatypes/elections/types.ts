import { AppId, ApiState } from "../types";

/** state for Elections */
export interface ElectionsState {
  elections: Array<Election | ElectionInfo>;
  apiState: ApiState;
}

/** Initial redux state of the application */
export const initialElectionsState: ElectionsState = {
  elections: [],
  apiState: "Idle",
};

/** ElectionId is an identifier for an Election */
export type ElectionId = AppId;

/** ElectionInfo is a brief description of a given election without including the whole structure */
export interface ElectionInfo {
  id: ElectionId;
  electionName: string;
  institutionName: string;
  description: string;
  startDate: string;
  endDate: string;
  sender: string;
  signature: string;
}

/** Election is a given election */
export interface Election extends ElectionInfo {
  emailDomain: string;
  allowedCandidates: string[];
  positions: ElectionPosition[];
}

/** ElectionPositionId is an identifier for an ElectionPosition */
export type ElectionPositionId = AppId;

/** ElectionPosition is a particular position */
export interface ElectionPosition {
  id: ElectionPositionId;
  displayName: string;
  candidates: Candidate[];
}

/** CandidateId is an identifier for a Candidate */
export type CandidateId = AppId;


/** Candidate is a candidate user that is publicly identified, and is able to run in an election */
export interface Candidate {
  key: CandidateId;
  name: string;
}
