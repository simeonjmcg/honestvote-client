import {
    UserActionTypes,
    ElectionPermissionRequest,
    USER_RETREIVE_PUBLIC, USER_STORE_PUBLIC,
    USER_RETREIVE_PRIVATE, USER_RETURN_PRIVATE, USER_RETURN_PRIVATE_FAILED,
    USER_REQUEST_PERMISSIONS, USER_SUCCESS_PERMISSIONS, USER_FAILURE_PERMISSIONS,
} from "./types";

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

/** Request permissions for election */
export function requestElectionPermissions(permissions: ElectionPermissionRequest): UserActionTypes {
    return { type: USER_REQUEST_PERMISSIONS, payload: permissions };
}

/** Request permissions for election */
export function permissionRequestSuccessful(): UserActionTypes {
    return { type: USER_SUCCESS_PERMISSIONS };
}

/** Request of permissions for election failed */
export function permissionRequestFailure(): UserActionTypes {
    return { type: USER_FAILURE_PERMISSIONS };
}