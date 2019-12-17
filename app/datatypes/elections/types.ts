import { AppId, ApiState } from "../types";
import { ElectionPositionId } from "../positions/types";
import { TicketId } from "../tickets/types";

/** state for Elections */
export interface ElectionsState {
  elections: Election[];
  apiState: ApiState;
}

/** Initial redux state of the application */
export const initialElectionsState: ElectionsState = {
  elections: [],
  apiState: "Idle",
};

/** ElectionId is an identifier for an Election */
export type ElectionId = AppId;

/** TicketEntryId is an identifier for a TicketEntry */
export type TicketEntryId = AppId;

/** ElectionInfo is a brief description of a given election without including the whole structure */
export interface ElectionInfo {
  id: ElectionId;
  displayName: string;
  term: string;
  type: ElectionType;
}

/** Election is a given election */
export interface Election extends ElectionInfo {
  ticketEntries: TicketEntry[];
  options?: ElectionOptions;
}

/** ElectionOptions are options that apply to a given Election */
export interface ElectionOptions {
  canHaveMultiTicket?: boolean;
  candidateCanRunForMultiple?: boolean;
}

/** The ElectionType is an enumeration of different possible election types */
export enum ElectionType {
  FirstPastThePost,
  InstantRunoff,
  MultiRunoff,
}

/** 
 * TicketEntry is an entry in an election.
 * For instance, this would define an entry such as "President", or even
 * "President and Vice-President", running on the same ticket.
 */
export interface TicketEntry {
  id: TicketEntryId;
  displayName?: string;
  allowedElectionPositions: ElectionPositionId[];
  tickets: TicketId[];
}

export const ELECTIONS_REQUEST = 'ELECTIONS_REQUEST';
export const ELECTIONS_SUCESS = 'ELECTIONS_SUCESS';
export const ELECTIONS_FAILURE = 'ELECTIONS_FAILURE';

export const ELECTION_REQUEST = 'ELECTION_REQUEST';
export const ELECTION_SUCESS = 'ELECTION_SUCESS';
export const ELECTION_FAILURE = 'ELECTION_FAILURE';

interface ElectionsRequestAction {
    type: typeof ELECTIONS_REQUEST;
}
interface ElectionsSucessAction {
    type: typeof ELECTIONS_SUCESS;
    payload: Election[];
}
interface ElectionsFailureAction {
    type: typeof ELECTIONS_FAILURE;
}

interface ElectionRequestAction {
    type: typeof ELECTION_REQUEST;
}
interface ElectionSucessAction {
    type: typeof ELECTION_SUCESS;
    payload: Election;
}
interface ElectionFailureAction {
    type: typeof ELECTION_FAILURE;
}

export type ElectionActionTypes = ElectionsRequestAction
                                 | ElectionsSucessAction
                                 | ElectionsFailureAction
                                 | ElectionRequestAction
                                 | ElectionSucessAction
                                 | ElectionFailureAction;