import {
    AppActionTypes, AppState, initialAppState,
    UserActionTypes, UserState, initialUserState,
    ElectionActionTypes, ElectionsState, initialElectionsState,
} from "./";
import { VotesState, initialVotesState, VotesActionTypes, VoteAddAction } from "./votes";
import { UserConfirmPermissionAction } from "./user";

/** Full redux state of the application */
export interface State {
    app: AppState;
    user: UserState;
    votes: VotesState;
    elections: ElectionsState;
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
    votes: initialVotesState,
    elections: initialElectionsState,
};

/** Keys for persistant local storage */
export const enum StorageKeys {
  PassCheck            = "@pass_check", // nonce encrypted by passcode, salt and iv, used to verify correct passcode
  PassSalt             = "@pass_salt",
  PublicKey            = "@public_key", // plaintext public key
  InitializationVector = "@initialization_vector",
  PrivateKeyEncrypted  = "@private_key_encrypted",
}

/** AppId is a generic string identifier used throughout the program */
export type AppId = string;

/** registration endpoint */
// export const REGISTRATION_ENDPOINT = "http://127.0.0.1:8080";
/** Websocket endpoint */
export const WS_ENDPOINT = "ws://localhost:8080/ws";

export type WebsocketTypes = VoteAddAction | UserConfirmPermissionAction;
export type ActionTypes = AppActionTypes
                        | UserActionTypes
                        | VotesActionTypes
                        | ElectionActionTypes;