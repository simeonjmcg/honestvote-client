import {
    UserActionTypes,
    USER_RETREIVE_PUBLIC, USER_STORE_PUBLIC,
    USER_RETREIVE_PRIVATE, USER_RETURN_PRIVATE, USER_RETURN_PRIVATE_FAILED,
    USER_REQUEST_PERMISSIONS, USER_SUCCESS_PERMISSIONS, USER_FAILURE_PERMISSIONS, USER_CONFIRM_PERMISSIONS, USER_SUBMIT_BALLOT,
    USER_RESET_IDLE_PERMISSIONS,
} from "./types";
import { ElectionId } from "../elections";
import { TicketId } from "../tickets";

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
export function retreivePrivate(pass: string): UserActionTypes {
    return {
        type: USER_RETREIVE_PRIVATE,
        payload: pass,
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

export function resetIdleElectionPermissions(): UserActionTypes {
    return { type: USER_RESET_IDLE_PERMISSIONS };
}


/** Request permissions for election */
export function requestElectionPermissions(electionId: ElectionId, email: string): UserActionTypes {
    return { type: USER_REQUEST_PERMISSIONS, payload: {electionId, email} };
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
export function permissionRequestConfirmed(id: ElectionId): UserActionTypes {
    return { type: USER_CONFIRM_PERMISSIONS, payload: id };
}

/** Submit ballot for election */
export function submitBallot(tickets: TicketId[]): UserActionTypes {
    return { type: USER_SUBMIT_BALLOT, payload: { tickets } };
}

/** Ballot submission for election successful */
export function ballotSubmissionSuccessful(): UserActionTypes {
    return { type: USER_SUCCESS_PERMISSIONS };
}

/** Ballot for election failed */
export function ballotSubmissionFailure(): UserActionTypes {
    return { type: USER_FAILURE_PERMISSIONS };
}