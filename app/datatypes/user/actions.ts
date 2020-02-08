import {
    UserActionTypes,
    USER_RETREIVE_PUBLIC, USER_STORE_PUBLIC,
    USER_RETREIVE_PRIVATE, USER_RETURN_PRIVATE, USER_RETURN_PRIVATE_FAILED,
    USER_REQUEST_PERMISSIONS, USER_SUCCESS_PERMISSIONS, USER_FAILURE_PERMISSIONS, USER_CONFIRM_PERMISSIONS, USER_SUBMIT_BALLOT,
    USER_RESET_REQUEST_PERMISSIONS,
    UserPermissions,
} from "./types";
import { ElectionId, CandidateId } from "../elections";

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
export function permissionRequestConfirmed(userPermissions: UserPermissions): UserActionTypes {
    return { type: USER_CONFIRM_PERMISSIONS, payload: userPermissions };
}

/** Submit ballot for election */
export function submitBallot(electionId: ElectionId, receivers: {[key: string]: CandidateId}): UserActionTypes {
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