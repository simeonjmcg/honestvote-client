import {
    USER_SUBMIT_BALLOT, USER_SUCCESS_BALLOT, USER_FAILURE_BALLOT,
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
            return { ...state, permissionRequestStatus: "Idle" };
        case USER_REQUEST_PERMISSIONS:
            const id = action.payload.electionId;
            return {
                ...state, permissionRequestStatus: "Fetching",
                activePermissionRequest: state.activePermissionRequest.includes(id) ?
                    state.activePermissionRequest : [...state.activePermissionRequest, id],
            };
        case USER_SUCCESS_PERMISSIONS:
            return { ...state, permissionRequestStatus: "Success" };
        case USER_FAILURE_PERMISSIONS:
            return { ...state, permissionRequestStatus: "Failed" };
        case USER_SUBMIT_BALLOT:
            return { ...state, ballotSubmissionStatus: "Fetching" };
        case USER_SUCCESS_BALLOT:
            return { ...state, ballotSubmissionStatus: "Success" };
        case USER_FAILURE_BALLOT:
            return { ...state, ballotSubmissionStatus: "Failed" };
    }
    return state;
}