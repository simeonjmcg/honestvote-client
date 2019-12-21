import {
    AppActionTypes, AppState, initialAppState,
    CandidateActionTypes, CandidatesState, initialCandidatesState,
    ElectionActionTypes, ElectionsState, initialElectionsState,
    ElectionPositionActionTypes, ElectionPositionsState, initialElectionPositionsState,
    TicketActionTypes, TicketsState, initialTicketsState,
    VoterActionTypes, VotersState, initialVotersState,
} from './';

/** Full redux state of the application */
export interface State {
    app: AppState;
    candidates: CandidatesState;
    elections: ElectionsState;
    positions: ElectionPositionsState;
    tickets: TicketsState;
    voters: VotersState;
}

/** API states */
export type ApiState  = "Idle"     // Data has not been loaded yet
                      | "Fetching" // Data is being fetched
                      | "Failed"   // Data fetch failed
                      | "Success"; // Data fetch succeeded

/** Initial redux state of the application */
export const initialState: State = {
    app: initialAppState,
    candidates: initialCandidatesState,
    elections: initialElectionsState,
    positions: initialElectionPositionsState,
    tickets: initialTicketsState,
    voters: initialVotersState,
};

/** URL to the backend */
export const API_URL = "http://portainer.honestvote.io:7001";

/** AppId is a generic string identifier used throughout the program */
export type AppId = string;

export type ActionTypes = AppActionTypes
                        | CandidateActionTypes
                        | ElectionActionTypes
                        | ElectionPositionActionTypes
                        | TicketActionTypes
                        | VoterActionTypes;