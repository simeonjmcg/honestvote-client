import { ElectionId, CandidateId, ElectionPositionId } from "../elections";

export const USER_RETREIVE_PUBLIC = 'USER_RETREIVE_PUBLIC';
export const USER_STORE_PUBLIC = 'USER_STORE_PUBLIC';

export const USER_RETREIVE_PRIVATE = 'USER_RETREIVE_PRIVATE';
export const USER_RETURN_PRIVATE = 'USER_RETURN_PRIVATE';
export const USER_RETURN_PRIVATE_FAILED = 'USER_RETURN_PRIVATE_FAILED';

export const USER_REQUEST_PERMISSIONS = 'USER_REQUEST_PERMISSIONS';
export const USER_SUCCESS_PERMISSIONS = 'USER_SUCCESS_PERMISSIONS';
export const USER_FAILURE_PERMISSIONS = 'USER_FAILURE_PERMISSIONS';

export const USER_RESET_REQUEST_PERMISSIONS = 'USER_RESET_REQUEST_PERMISSIONS';

export const USER_CONFIRM_PERMISSION = 'USER_CONFIRM_PERMISSION';

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

export interface UserConfirmPermissionAction {
  type: typeof USER_CONFIRM_PERMISSION;
  payload: ElectionId;
}

export interface UserSubmitBallotAction {
  type: typeof USER_SUBMIT_BALLOT;
  payload: {electionId: ElectionId, receivers: {key: ElectionPositionId, id: CandidateId}[] };
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
                            | UserConfirmPermissionAction
                            | UserSubmitBallotAction
                            | UserSuccessBallotAction
                            | UserFailureBallotAction;

/** retreive public key from the redux store */
export function retreivePublicKey(): UserActionTypes {
    return { type: USER_RETREIVE_PUBLIC };
}

/** store public key in the redux store */
export function storePublic(publicKey: string): UserActionTypes {
    return {
        type: USER_STORE_PUBLIC,
        payload: publicKey,
    };
}

/** retreive private key from the redux store */
export function retreivePrivate(): UserActionTypes {
    return {
        type: USER_RETREIVE_PRIVATE,
     };
}

/** return with private key from the storage API */
export function returnPrivate(privateKey: string): UserActionTypes {
    return {
        type: USER_RETURN_PRIVATE,
        payload: privateKey,
     };
}

/** return with private key failed */
export function returnPrivateFailed(): UserActionTypes {
    return {
        type: USER_RETURN_PRIVATE_FAILED,
     };
}

export function resetRequestElectionPermissions(electionId: ElectionId): UserActionTypes {
    return { type: USER_RESET_REQUEST_PERMISSIONS, payload: electionId };
}


/** Request permissions for election */
export function requestElectionPermissions(electionId: ElectionId, emailAddress: string, firstName: string, lastName: string, dateOfBirth: string): UserActionTypes {
    return { type: USER_REQUEST_PERMISSIONS, payload: { electionId, emailAddress, firstName, lastName, dateOfBirth } };
}

/** Request permissions for election */
export function permissionRequestSuccessful(): UserActionTypes {
    return { type: USER_SUCCESS_PERMISSIONS };
}

/** Request of permissions for election failed */
export function permissionRequestFailure(): UserActionTypes {
    return { type: USER_FAILURE_PERMISSIONS };
}

/** Request of permissions for election has been confirmed */
export function permissionRequestConfirmed(electionId: ElectionId): UserActionTypes {
    return { type: USER_CONFIRM_PERMISSION, payload: electionId };
}

/** Submit ballot for election */
export function submitBallot(electionId: ElectionId, receivers: { key: ElectionPositionId, id: CandidateId }[]): UserActionTypes {
    return { type: USER_SUBMIT_BALLOT, payload: { receivers, electionId } };
}

/** Ballot submission for election successful */
export function ballotSubmissionSuccessful(): UserActionTypes {
    return { type: USER_SUCCESS_PERMISSIONS };
}

/** Ballot for election failed */
export function ballotSubmissionFailure(): UserActionTypes {
    return { type: USER_FAILURE_PERMISSIONS };
}