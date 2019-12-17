import { AppId, ApiState } from "../types";

/** state for ElectionPositions */
export interface ElectionPositionsState {
    positions: ElectionPosition[];
    apiState: ApiState;
}

/** Initial redux state of the application */
export const initialElectionPositionsState: ElectionPositionsState = {
    positions: [],
    apiState: "Idle",
};

/** ElectionPositionId is an identifier for an ElectionPosition */
export type ElectionPositionId = AppId;


/** ElectionPosition is a particular position */
export interface ElectionPosition {
  id: ElectionPositionId;
  displayName: string;
}

export const ELECTION_POSITIONS_REQUEST = 'ELECTION_POSITIONS_REQUEST';
export const ELECTION_POSITIONS_SUCESS = 'ELECTION_POSITIONS_SUCESS';
export const ELECTION_POSITIONS_FAILURE = 'ELECTION_POSITIONS_FAILURE';

interface ElectionPositionsRequestAction {
    type: typeof ELECTION_POSITIONS_REQUEST;
}
interface ElectionPositionsSucessAction {
    type: typeof ELECTION_POSITIONS_SUCESS;
    payload: ElectionPosition[];
}
interface ElectionPositionsFailureAction {
    type: typeof ELECTION_POSITIONS_FAILURE;
}

export type ElectionPositionActionTypes = ElectionPositionsRequestAction
                                        | ElectionPositionsSucessAction
                                        | ElectionPositionsFailureAction;