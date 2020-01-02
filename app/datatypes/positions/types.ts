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

export const ELECTION_POSITION_REQUEST = 'ELECTION_POSITION_REQUEST';
export const ELECTION_POSITION_SUCCESS =  'ELECTION_POSITION_SUCCESS';
export const ELECTION_POSITION_FAILURE = 'ELECTION_POSITION_FAILURE';

export const ELECTION_POSITIONS_REQUEST = 'ELECTION_POSITIONS_REQUEST';
export const ELECTION_POSITIONS_SUCCESS =  'ELECTION_POSITIONS_SUCCESS';
export const ELECTION_POSITIONS_FAILURE = 'ELECTION_POSITIONS_FAILURE';

export interface ElectionPositionRequestAction {
    type: typeof ELECTION_POSITION_REQUEST;
    payload: ElectionPositionId;
}
export interface ElectionPositionSuccessAction {
    type: typeof ELECTION_POSITION_SUCCESS;
    payload: ElectionPosition;
}
export interface ElectionPositionFailureAction {
    type: typeof ELECTION_POSITION_FAILURE;
}

export interface ElectionPositionsRequestAction {
    type: typeof ELECTION_POSITIONS_REQUEST;
}
export interface ElectionPositionsSuccessAction {
    type: typeof ELECTION_POSITIONS_SUCCESS;
    payload: ElectionPosition[];
}
export interface ElectionPositionsFailureAction {
    type: typeof ELECTION_POSITIONS_FAILURE;
}

export type ElectionPositionActionTypes = ElectionPositionRequestAction
                                        | ElectionPositionSuccessAction
                                        | ElectionPositionFailureAction
                                        | ElectionPositionsRequestAction
                                        | ElectionPositionsSuccessAction
                                        | ElectionPositionsFailureAction;