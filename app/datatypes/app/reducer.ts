import {
    AppState, initialAppState, AppActionTypes,
    APP_SET_TITLE,
    APP_PROMPT_PASS, APP_RETURN_PASS, APP_CANCEL_PASS,
    APP_REQUEST_CLOSEST_NODE, APP_SUCCESS_CLOSEST_NODE, APP_FAILURE_CLOSEST_NODE,
} from "./types";

/** reducer for App */
export function app(
        state: AppState = initialAppState,
        action: AppActionTypes): AppState {
    switch(action.type) {
        case APP_SET_TITLE:
            return { ...state, title: action.payload };
        case APP_PROMPT_PASS:
            return {
                ...state,
                promptingPass: true,
                createPass: action.payload.createPass,
                passPromptMessage: action.payload.message,
            };
        case APP_RETURN_PASS:
            return { ...state, promptingPass: false, createPass: false };
        case APP_CANCEL_PASS:
            return { ...state, promptingPass: false };
        case APP_REQUEST_CLOSEST_NODE:
            return { ...state, closestNodeRequestStatus: "Fetching" };
        case APP_SUCCESS_CLOSEST_NODE:
            return { ...state, endpoint: action.payload, closestNodeRequestStatus: "Success" };
        case APP_FAILURE_CLOSEST_NODE:
            return { ...state, closestNodeRequestStatus: "Failed" };
    }
    return state;
}