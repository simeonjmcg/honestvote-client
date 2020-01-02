import { State } from "../types";
import { ElectionId } from "../elections";

export function getTitle(state: State) {
    return state.app.title;
}

export function getPromptMessage(state: State) {
    return state.app.passPromptMessage;
}

export function isPromptingPass(state: State) {
    return state.app.promptingPass;
}

export function isPromptingNewPass(state: State) {
    return isPromptingPass(state)
        && state.app.createPass;
}

export function getPermissionsRequested(state: State) {
    return state.app.activePermissionRequest;
}

export function arePermissionsRequested(id: ElectionId) {
    return (state: State) => getPermissionsRequested(state).includes(id);
}

export function getEndpoint(state: State) {
    return state.app.endpoint;
}