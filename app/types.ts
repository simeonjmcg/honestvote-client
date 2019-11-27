export interface AppState {
    candidates: Candidate[];
    elections: Election[];
}
export const initialAppState: AppState = {
    candidates: [],
    elections: [],
};

export const API_URL = "http://portainer.honestvote.io:7001";

export interface Candidate {
    name: string;
    publicKey: string;
    election: string;
}

export interface Election {
    name: string;
    registeredVoters: number;
}

export const CANDIDATES_REQUEST = 'CANDIDATES_REQUEST';
export const CANDIDATES_SUCESS = 'CANDIDATES_SUCESS';
export const CANDIDATES_FAILURE = 'CANDIDATES_FAILURE';

export const ELECTION_REQUEST = 'ELECTION_REQUEST';
export const ELECTION_SUCESS = 'ELECTION_SUCESS';
export const ELECTION_FAILURE = 'ELECTION_FAILURE';

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

interface ElectionRequestAction {
    type: typeof ELECTION_REQUEST;
}
interface ElectionSucessAction {
    type: typeof ELECTION_SUCESS;
    payload: Election[];
}
interface ElectionFailureAction {
    type: typeof ELECTION_FAILURE;
}

export type ActionTypes = CandidatesRequestAction
                        | CandidatesSucessAction
                        | CandidatesFailureAction
                        | ElectionRequestAction
                        | ElectionSucessAction
                        | ElectionFailureAction;