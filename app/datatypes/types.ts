import {
    AppActionTypes, AppState, initialAppState,
    UserActionTypes, UserState, initialUserState,
    CandidateActionTypes, CandidatesState, initialCandidatesState,
    ElectionActionTypes, ElectionsState, initialElectionsState,
    ElectionPositionActionTypes, ElectionPositionsState, initialElectionPositionsState,
    TicketActionTypes, TicketsState, initialTicketsState,
    VoterActionTypes, VotersState, initialVotersState,
} from './';

/** Full redux state of the application */
export interface State {
    app: AppState;
    user: UserState;
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
    user: initialUserState,
    candidates: initialCandidatesState,
    elections: initialElectionsState,
    positions: initialElectionPositionsState,
    tickets: initialTicketsState,
    voters: initialVotersState,
};

/** Keys for persistant local storage */
export const enum StorageKeys {
  PassCheck            = '@pass_check', // nonce encrypted by passcode, salt and iv, used to verify correct passcode
  PassSalt             = '@pass_salt',
  PublicKey            = '@public_key', // plaintext public key
  InitializationVector = '@initialization_vector',
  PrivateKeyEncrypted  = '@private_key_encrypted',
}

/** AppId is a generic string identifier used throughout the program */
export type AppId = string;

export type ActionTypes = AppActionTypes
                        | UserActionTypes
                        | CandidateActionTypes
                        | ElectionActionTypes
                        | ElectionPositionActionTypes
                        | TicketActionTypes
                        | VoterActionTypes;