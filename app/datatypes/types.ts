import { CandidateActionTypes, CandidatesState, initialCandidatesState } from "./candidates/types";
import { ElectionActionTypes, ElectionsState, initialElectionsState } from "./elections/types";
import { ElectionPositionActionTypes, ElectionPositionsState, initialElectionPositionsState } from "./positions/types";
import { TicketActionTypes, TicketsState, initialTicketsState } from "./tickets/types";
import { VoterActionTypes, VotersState, initialVotersState } from "./voters/types";

/** Full redux state of the application */
export interface AppState {
    candidates: CandidatesState;
    elections: ElectionsState;
    positions: ElectionPositionsState;
    tickets: TicketsState;
    voters: VotersState;
}

/** Initial redux state of the application */
export const initialAppState: AppState = {
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

export type ActionTypes = CandidateActionTypes
                        | ElectionActionTypes
                        | ElectionPositionActionTypes
                        | TicketActionTypes
                        | VoterActionTypes;