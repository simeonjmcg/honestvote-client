import { ApiState } from "../types";
import { ElectionId,  CandidateId } from "../elections";

/** state for user */
export interface UserState {
  publicKey: string | null;
  activePermissionRequest: ElectionId[];
  permissionRequestStatus: ApiState;
  ballotSubmissionStatus: ApiState;
  permissions: UserPermissions;
};

/** Initial redux state of the application */
export const initialUserState: UserState = {
  publicKey: null,
  activePermissionRequest: [],
  permissionRequestStatus: "Idle",
  ballotSubmissionStatus: "Idle",
  permissions: { canVote: [] },
};

export interface ElectionPermissionRequest {
  electionId: ElectionId;
  emailAddress: string; // may either be plain text, or encrypted with electionId's public key
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  electionName: string;
  electionAdmin: string;
}

/** UserPermissions are the permissions granted to a given user */
export interface UserPermissions {
  canVote: ElectionId[];
}

export const USER_RETREIVE_PUBLIC = 'USER_RETREIVE_PUBLIC';
export const USER_STORE_PUBLIC = 'USER_STORE_PUBLIC';

export const USER_RETREIVE_PRIVATE = 'USER_RETREIVE_PRIVATE';
export const USER_RETURN_PRIVATE = 'USER_RETURN_PRIVATE';
export const USER_RETURN_PRIVATE_FAILED = 'USER_RETURN_PRIVATE_FAILED';

export const USER_REQUEST_PERMISSIONS = 'USER_REQUEST_PERMISSIONS';
export const USER_SUCCESS_PERMISSIONS = 'USER_SUCCESS_PERMISSIONS';
export const USER_FAILURE_PERMISSIONS = 'USER_FAILURE_PERMISSIONS';

export const USER_RESET_REQUEST_PERMISSIONS = 'USER_RESET_REQUEST_PERMISSIONS';

export const USER_CONFIRM_PERMISSIONS = 'USER_CONFIRM_PERMISSIONS';

export const USER_SUBMIT_BALLOT  = 'USER_SUBMIT_BALLOT';
export const USER_SUCCESS_BALLOT = 'USER_SUCCESS_BALLOT';
export const USER_FAILURE_BALLOT = 'USER_FAILURE_BALLOT';

export interface UserRetreivePublicAction {
    type: typeof USER_RETREIVE_PUBLIC;
}

export interface UserStorePublicAction {
    type: typeof USER_STORE_PUBLIC;
    payload: string;
}

export interface UserRetreivePrivateAction {
    type: typeof USER_RETREIVE_PRIVATE;
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
  payload: { electionId: string, emailAddress: string, firstName: string, lastName: string, dateOfBirth: string };
}

export interface UserSuccessPermissionsAction {
  type: typeof USER_SUCCESS_PERMISSIONS;
}

export interface UserFailurePermissionsAction {
  type: typeof USER_FAILURE_PERMISSIONS;
}

export interface UserResetRequestPermissionsAction {
  type: typeof USER_RESET_REQUEST_PERMISSIONS;
  payload: ElectionId;
}

export interface UserConfirmPermissionsAction {
  type: typeof USER_CONFIRM_PERMISSIONS;
  payload: UserPermissions;
}

export interface UserSubmitBallotAction {
  type: typeof USER_SUBMIT_BALLOT;
  payload: {electionId: ElectionId, receivers: {[key: string]: CandidateId} };
}

export interface UserSuccessBallotAction {
  type: typeof USER_SUCCESS_BALLOT;
}

export interface UserFailureBallotAction {
  type: typeof USER_FAILURE_BALLOT;
}

export type UserActionTypes = UserRetreivePublicAction
                            | UserStorePublicAction
                            | UserRetreivePrivateAction
                            | UserReturnPrivateAction
                            | UserReturnPrivateFailedAction
                            | UserRequestPermissionsAction
                            | UserSuccessPermissionsAction
                            | UserFailurePermissionsAction
                            | UserResetRequestPermissionsAction
                            | UserConfirmPermissionsAction
                            | UserSubmitBallotAction
                            | UserSuccessBallotAction
                            | UserFailureBallotAction;