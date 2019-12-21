import { UserActionTypes, USER_RETREIVE_PUBLIC, USER_RETREIVE_PRIVATE } from "./types";

/** retreive public key from the redux store */
export function retreivePublic(): UserActionTypes {
    return { type: USER_RETREIVE_PUBLIC };
}

/** retreive public key from the redux store */
export function retreivePrivate(pass: string): UserActionTypes {
    return {
        type: USER_RETREIVE_PRIVATE,
        payload: pass,
     };
}