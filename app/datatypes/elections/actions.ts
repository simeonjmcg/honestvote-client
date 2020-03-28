import { Election, ElectionId,ElectionInfo } from "./types";

export const ELECTIONS_REQUEST = 'ELECTIONS_REQUEST';
export const ELECTIONS_SUCCESS = 'ELECTIONS_SUCCESS';
export const ELECTIONS_FAILURE = 'ELECTIONS_FAILURE';

export const ELECTION_REQUEST = 'ELECTION_REQUEST';
export const ELECTION_SUCCESS = 'ELECTION_SUCCESS';
export const ELECTION_FAILURE = 'ELECTION_FAILURE';

export const ELECTION_SAVE = 'ELECTION_SAVE';
export const ELECTION_SAVE_SUCCESS = 'ELECTION_SAVE_SUCCESS';
export const ELECTION_SAVE_FAILURE = 'ELECTION_SAVE_FAILURE';

export interface ElectionsRequestAction {
    type: typeof ELECTIONS_REQUEST;
}
export interface ElectionsSuccessAction {
    type: typeof ELECTIONS_SUCCESS;
    payload: ElectionInfo[];
}
export interface ElectionsFailureAction {
    type: typeof ELECTIONS_FAILURE;
}

export interface ElectionRequestAction {
    type: typeof ELECTION_REQUEST;
    payload: ElectionId;
}
export interface ElectionSuccessAction {
    type: typeof ELECTION_SUCCESS;
    payload: Election;
}
export interface ElectionFailureAction {
    type: typeof ELECTION_FAILURE;
}

export interface ElectionSaveAction {
    type: typeof ELECTION_SAVE;
    payload: Election;
}
export interface ElectionSaveSuccessAction {
    type: typeof ELECTION_SAVE_SUCCESS;
}
export interface ElectionSaveFailureAction {
    type: typeof ELECTION_SAVE_FAILURE;
}

export type ElectionActionTypes = ElectionsRequestAction
                                 | ElectionsSuccessAction
                                 | ElectionsFailureAction
                                 | ElectionRequestAction
                                 | ElectionSuccessAction
                                 | ElectionFailureAction
                                 | ElectionSaveAction
                                 | ElectionSaveSuccessAction
                                 | ElectionSaveFailureAction;

/** request the Elections from the backend */
export function requestElections(): ElectionActionTypes {
    return { type: ELECTIONS_REQUEST };
}

/** store Elections in to the redux store */
export function storeElections(elections: ElectionInfo[]): ElectionActionTypes {
    return { type: ELECTIONS_SUCCESS,  payload: elections };
}

/** fail storage of Elections in the redux store */
export function errorElections(): ElectionActionTypes {
    return { type: ELECTIONS_FAILURE };
}


/** request the Elections from the backend */
export function requestElection(id: ElectionId): ElectionActionTypes {
    return { type: ELECTION_REQUEST, payload: id };
}

/** store single Election in to the redux store */
export function storeElection(election: Election): ElectionActionTypes {
    return { type: ELECTION_SUCCESS,  payload: election };
}

/** fail storage of Elections in the redux store */
export function errorElection(): ElectionActionTypes {
    return { type: ELECTION_FAILURE };
}


/** save the Election to the backend */
export function saveElection(election: Election): ElectionActionTypes {
    return { type: ELECTION_SAVE, payload: election };
}

/** single Election saved */
export function saveElectionSuccessful(): ElectionActionTypes {
    return { type: ELECTION_SAVE_SUCCESS };
}

/** fail save of Elections in the redux store */
export function saveElectionFailure(): ElectionActionTypes {
    return { type: ELECTION_SAVE_FAILURE };
}
