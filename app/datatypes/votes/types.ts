import { AppId, ApiState } from "../types";
import { ElectionId, ElectionPositionId } from "../elections/types";

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
  receivers: VoteReceiver[];
  signature: string;
}

/** Vote receiver is a particular grouping of position ID and candidate name */
export interface VoteReceiver {
  candidateName: string;
  positionId: ElectionPositionId;
}