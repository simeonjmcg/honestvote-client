import { VotersState, initialVotersState, VoterActionTypes, VOTERS_SUCESS, VOTERS_REQUEST, VOTERS_FAILURE } from "./types";

/** reducer for Voters */
export const votersReducer = (state: VotersState = initialVotersState, actions: VoterActionTypes): VotersState => {
    switch(actions.type) {
        case VOTERS_REQUEST:
            return { ...state, apiState: "Fetching" };
        case VOTERS_SUCESS:
            return { ...state, apiState: "Success", voters: actions.payload };
        case VOTERS_FAILURE:
            return { ...state, apiState: "Failed" };
    }
    return state;
}