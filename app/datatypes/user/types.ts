import { ApiState } from "../types";
import { ElectionId } from "../elections";
import { VoterId } from "../voters";

/** state for user */
export interface UserState {
  publicKey: string | null;
  apiStatus: ApiState;
};

/** Initial redux state of the application */
export const initialUserState: UserState = {
  publicKey: null,
  apiStatus: "Idle",
};

export interface ElectionPermissionRequest {
  voterId: VoterId;
  electionId: ElectionId;
  email: string; // may either be plain text, or encrypted with electionId's public key
}

export const USER_RETREIVE_PUBLIC = 'USER_RETREIVE_PUBLIC';
export const USER_STORE_PUBLIC = 'USER_STORE_PUBLIC';

export const USER_RETREIVE_PRIVATE = 'USER_RETREIVE_PRIVATE';
export const USER_RETURN_PRIVATE = 'USER_RETURN_PRIVATE';
export const USER_RETURN_PRIVATE_FAILED = 'USER_RETURN_PRIVATE_FAILED';

export const USER_REQUEST_PERMISSIONS = 'USER_REQUEST_PERMISSIONS';
export const USER_SUCCESS_PERMISSIONS = 'USER_SUCCESS_PERMISSIONS';
export const USER_FAILURE_PERMISSIONS = 'USER_FAILURE_PERMISSIONS';

export interface UserRetreivePublicAction {
    type: typeof USER_RETREIVE_PUBLIC;
}

export interface UserStorePublicAction {
    type: typeof USER_STORE_PUBLIC;
    payload: string;
}

export interface UserRetreivePrivateAction {
    type: typeof USER_RETREIVE_PRIVATE;
    payload: string;
}

export interface UserReturnPrivateAction {
    type: typeof USER_RETURN_PRIVATE;
    payload: string;
}

export interface UserReturnPrivateFailedAction {
    type: typeof USER_RETURN_PRIVATE_FAILED;
}

export interface UserRequestPermissionsAction {
  type: typeof USER_REQUEST_PERMISSIONS;
  payload: ElectionPermissionRequest;
}

export interface UserSuccessPermissionsAction {
  type: typeof USER_SUCCESS_PERMISSIONS;
}

export interface UserFailurePermissionsAction {
  type: typeof USER_FAILURE_PERMISSIONS;
}

export type UserActionTypes = UserRetreivePublicAction
                            | UserStorePublicAction
                            | UserRetreivePrivateAction
                            | UserReturnPrivateAction
                            | UserReturnPrivateFailedAction
                            | UserRequestPermissionsAction
                            | UserSuccessPermissionsAction
                            | UserFailurePermissionsAction;