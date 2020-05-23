import {
    USER_SUBMIT_BALLOT, USER_SUCCESS_BALLOT, USER_FAILURE_BALLOT,
    UserActionTypes, UserState, initialUserState, USER_STORE_PUBLIC,
    USER_REQUEST_PERMISSIONS, USER_SUCCESS_REQUEST_PERMISSIONS, USER_FAILURE_REQUEST_PERMISSIONS, USER_RESET_REQUEST_PERMISSIONS, USER_CONFIRM_PERMISSION,
} from ".";
import {USER_RETREIVE_PERMISSIONS, USER_SUCCESS_RETREIVAL_PERMISSIONS, USER_FAILURE_RETREIVAL_PERMISSIONS} from "./actions";

/** reducer for user */
export function user(
    state: UserState = initialUserState,
    action: UserActionTypes): UserState {
    switch (action.type) {
    case USER_STORE_PUBLIC:
        return {...state, publicKey: action.payload};
        
    case USER_RESET_REQUEST_PERMISSIONS:
        return {
            ...state, permissionRequestStatus: "Idle",
            activePermissionRequest: state.activePermissionRequest.filter(i => i !== action.payload),
        };
    case USER_REQUEST_PERMISSIONS:
        const id = action.payload.electionId;
        return {
            ...state, permissionRequestStatus: "Fetching",
            activePermissionRequest: state.activePermissionRequest.includes(id) ?
                state.activePermissionRequest : [...state.activePermissionRequest, id],
        };
    case USER_SUCCESS_REQUEST_PERMISSIONS:
        return {...state, permissionRequestStatus: "Success"};
    case USER_FAILURE_REQUEST_PERMISSIONS:
        return {...state, permissionRequestStatus: "Failed"};
    case USER_RETREIVE_PERMISSIONS:
        return {...state, permissionRetreivalStatus: "Fetching"};
    case USER_SUCCESS_RETREIVAL_PERMISSIONS:
        return {...state,
            permissionRetreivalStatus: "Success",
            permissions: {
                canVote: action.payload,
            },
        };
    case USER_FAILURE_RETREIVAL_PERMISSIONS:
        return {...state, permissionRetreivalStatus: "Failed"};
    case USER_CONFIRM_PERMISSION:
        return {...state,
            permissions: {...state.permissions,
                canVote: [...state.permissions.canVote.filter(v => v !== action.payload), action.payload],
            },
            activePermissionRequest: state.activePermissionRequest.filter(v => v !== action.payload),
        };
    case USER_SUBMIT_BALLOT:
        return {...state, ballotSubmissionStatus: "Fetching"};
    case USER_SUCCESS_BALLOT:
        return {...state, ballotSubmissionStatus: "Success"};
    case USER_FAILURE_BALLOT:
        return {...state, ballotSubmissionStatus: "Failed"};
    }
    return state;
}