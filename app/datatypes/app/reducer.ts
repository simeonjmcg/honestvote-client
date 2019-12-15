import { AppActionTypes, APP_SET_TITLE, AppState, initialAppState } from "./types";

/** reducer for App */
export const appReducer = (state: AppState = initialAppState, actions: AppActionTypes) => {
    switch(actions.type) {
        case APP_SET_TITLE:
            return {...state, title: actions.payload};
    }
    return state;
}