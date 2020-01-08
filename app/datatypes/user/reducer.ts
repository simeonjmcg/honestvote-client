import {
    UserActionTypes, UserState, initialUserState,    USER_STORE_PUBLIC,
    USER_REQUEST_PERMISSIONS, USER_SUCCESS_PERMISSIONS, USER_FAILURE_PERMISSIONS, USER_RESET_IDLE_PERMISSIONS,
} from "./types";

/** reducer for user */
export function userReducer(
        state: UserState = initialUserState,
        action: UserActionTypes): UserState {
    switch(action.type) {
        case USER_STORE_PUBLIC:
            return {...state, publicKey: action.payload };
        
        case USER_RESET_IDLE_PERMISSIONS:
            return { ...state, apiStatus: "Idle" };
        case USER_REQUEST_PERMISSIONS:
            return { ...state, apiStatus: "Fetching" };
        case USER_SUCCESS_PERMISSIONS:
            return { ...state, apiStatus: "Success" };
        case USER_FAILURE_PERMISSIONS:
            return { ...state, apiStatus: "Failed" };
    }
    return state;
}