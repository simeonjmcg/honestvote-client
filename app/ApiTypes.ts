// AppId is a generic string identifier used throughout the program
export type AppId = string;

// VoterId is an identifier for a Voter
export type VoterId = AppId;

// CandidateId is an identifier for a Candidate
export type CandidateId = AppId;

// ElectionId is an identifier for an Election
export type ElectionId = AppId;

// TicketEntryId is an identifier for a TicketEntry
export type TicketEntryId = AppId;

// ElectionPositionId is an identifier for an ElectionPosition
export type ElectionPositionId = AppId;

// VotePriority is the priority for a vote. This is only used in non FPTP systems
export type VotePriority = number;

// ElectionInfo is a brief description of a given election without including the whole structure
export interface ElectionInfo {
  id: ElectionId;
  displayName: string;
  term: string;
  type: ElectionType;
}

// Election is a given election
export interface Election extends ElectionInfo {
  ticketEntries: TicketEntry[];
  options?: ElectionOptions;
}

// ElectionOptions are options that apply to a given Election
export interface ElectionOptions {
  canHaveMultiTicket?: boolean;
  candidateCanRunForMultiple?: boolean;
  candidateCanVote?: boolean;
  candidateCanVoteForSelf?: boolean;
}

// The ElectionType is an enumeration of different possible election types
export enum ElectionType {
  FirstPastThePost,
  InstantRunoff,
  MultiRunoff,
}

// TicketEntry is an entry in an election.
// For instance, this would define an entry such as "President", or even
// "President and Vice-President", running on the same ticket.
export interface TicketEntry {
  id: TicketEntryId;
  displayName: string;
  allowedElectionPositions: ElectionPositionId[];
  tickets: Ticket[];
}


// Ticket is a specific ticket associated with a list of candidates
// running for this TicketEntry. For instance, you may have one ElectionPositionEntry
// for a President, and another ElectionPositionEntry for a Vice-President
export interface Ticket {
  electionPositionEntries: ElectionPositionEntry[];
  votes: Vote[];
}

// ElectionPositionEntry is a single candidate and the office that they are running for.
export interface ElectionPositionEntry {
  userId: CandidateId;
  electionPositionId: ElectionPositionId;
}

// ElectionPosition is a particular position
export interface ElectionPosition {
  id: ElectionPositionId;
  displayName: string;
}

// Vote is a vote that can go toward a particular candidate
export interface Vote {
  voterId: VoterId;
  votePriority: VotePriority; // used in rank based voting. for now always 1
}

// Voter is a user that is able to vote
export interface Voter {
  id: VoterId;
  permissions: VoterPermissions;
}

// VoterPermissions are the permissions granted to a given Voter user
export interface VoterPermissions {
  canCreateElection: boolean;
  canManageElection: ElectionId[];
  canVote: Array<ElectionId | TicketEntryId>;
}

// Candidate is a candidate user that is publicly identified, and is able to run in an election
export interface Candidate {
  id: CandidateId;
  displayName: string;
  permissions: CandidatePermissions;
}

// CandidatePermissions are the permissions granted to a given Candidate user
export interface CandidatePermissions {
  canRun: Array<ElectionId | TicketEntryId>;
}