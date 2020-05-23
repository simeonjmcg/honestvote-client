import {State} from "../types";

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

export function getEndpoint(state: State) {
    return state.app.endpoint;
}