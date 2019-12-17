import { AppId, ApiState } from "../types";
import { CandidateId } from "../candidates/types";
import { ElectionPositionId } from "../positions/types";
import { VoterId } from "../voters/types";

/** state for Tickets */
export interface TicketsState {
  tickets: Ticket[];
  apiState: ApiState;
}

/** Initial redux state of the application */
export const initialTicketsState: TicketsState = {
  tickets: [],
  apiState: "Idle",
};

/** TicketId is an identifier for a Ticket */
export type TicketId = AppId;

/** VotePriority is the priority for a vote. This is only used in non FPTP systems */
export type VotePriority = number;

/**
 * Ticket is a specific ticket associated with a list of candidates
 * running for this TicketEntry. For instance, you may have one ElectionPositionEntry
 * for a President, and another ElectionPositionEntry for a Vice-President
*/
export interface Ticket {
  id: TicketId;
  electionPositionEntries: ElectionPositionEntry[];
  votes: Vote[];
}

/** ElectionPositionEntry is a single candidate and the office that they are running for. */
export interface ElectionPositionEntry {
  candidateId: CandidateId;
  electionPositionId: ElectionPositionId;
}

/** Vote is a vote that can go toward a particular candidate */
export interface Vote {
  voterId: VoterId;
  ticketId: TicketId;
  votePriority: VotePriority; // used in rank based voting. for now always 1
}

export const TICKETS_REQUEST = 'TICKETS_REQUEST';
export const TICKETS_SUCESS = 'TICKETS_SUCESS';
export const TICKETS_FAILURE = 'TICKETS_FAILURE';

interface TicketsRequestAction {
    type: typeof TICKETS_REQUEST;
}
interface TicketsSucessAction {
    type: typeof TICKETS_SUCESS;
    payload: Ticket[];
}
interface TicketsFailureAction {
    type: typeof TICKETS_FAILURE;
}

export type TicketActionTypes = TicketsRequestAction
                              | TicketsSucessAction
                              | TicketsFailureAction;