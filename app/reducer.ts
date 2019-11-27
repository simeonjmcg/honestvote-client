import { AppState, initialAppState, ActionTypes, CANDIDATES_SUCESS, ELECTION_SUCESS } from "./types";

export const reducer = (state: AppState = initialAppState, actions: ActionTypes) => {
    switch(actions.type) {
        case CANDIDATES_SUCESS:
            return { ...state, candidates: actions.payload };
        case ELECTION_SUCESS:
            return { ...state, elections: actions.payload };
    }
    return state;
}