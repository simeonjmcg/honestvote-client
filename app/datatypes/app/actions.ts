import {
    APP_SET_TITLE,
    APP_PROMPT_PASS, APP_RETURN_PASS, APP_CANCEL_PASS,
    APP_REQUEST_CLOSEST_NODE, APP_SUCCESS_CLOSEST_NODE, APP_FAILURE_CLOSEST_NODE,
    AppActionTypes,
} from "./types";

/** store title in to the redux store */
export function setTitle(title: string): AppActionTypes {
    return { type: APP_SET_TITLE,  payload: title };
}

/** Prompt user to enter a pass */
export function promptPass(message: string, createPass: boolean = false): AppActionTypes {
    return { type: APP_PROMPT_PASS, payload: { createPass, message} };
}

/** Return from a password entry */
export function returnPass(pass: string): AppActionTypes {
    return { type: APP_RETURN_PASS, payload: pass };
}

/** Cancel password entry */
export function cancelPass(): AppActionTypes {
    return { type: APP_CANCEL_PASS };
}

/** Request closest full node to connect to */
export function requestClosestNode(): AppActionTypes {
    return { type: APP_REQUEST_CLOSEST_NODE };
}

/** Save closest full node to redux */
export function closestNodeRequestSuccessful(endpoint: string): AppActionTypes {
    return { type: APP_SUCCESS_CLOSEST_NODE, payload: endpoint };
}

/** Request permissions for election */
export function ClosestNodeRequestFailure(): AppActionTypes {
    return { type: APP_FAILURE_CLOSEST_NODE };
}