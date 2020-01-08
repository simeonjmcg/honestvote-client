import { State } from "..";

export function getPublicKey(state: State) {
    return state.user.publicKey;
}

export function getPermissionRequestApiStatus(state: State) {
    return state.candidates.apiState;
}

export function arePermissionsBeingRequested(state: State) {
    return getPermissionRequestApiStatus(state) === "Fetching";
}

export function arePermissionsRequested(state: State) {
    const status = getPermissionRequestApiStatus(state);
    return status !== "Idle" &&
           status !== "Fetching";
}