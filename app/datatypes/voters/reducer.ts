import { VotersState, initialVotersState, VoterActionTypes, VOTERS_SUCESS, VOTERS_REQUEST, VOTERS_FAILURE } from "./types";
import { ApiState } from "../types";

/** reducer for Voters */
export const votersReducer = (state: VotersState = initialVotersState, actions: VoterActionTypes): VotersState => {
    switch(actions.type) {
        case VOTERS_REQUEST:
            return { ...state, apiState: ApiState.Fetching };
        case VOTERS_SUCESS:
            return { ...state, apiState: ApiState.Success, voters: actions.payload };
        case VOTERS_FAILURE:
            return { ...state, apiState: ApiState.Failed };
    }
    return state;
}