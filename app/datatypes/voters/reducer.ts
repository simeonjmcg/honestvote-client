import {
    VotersState, initialVotersState, VoterActionTypes,
    VOTER_SUCCESS, VOTER_REQUEST, VOTER_FAILURE,
    VOTERS_SUCCESS, VOTERS_REQUEST, VOTERS_FAILURE,
} from "./types";
import { updateIdArray } from "~/utils";

/** reducer for Voters */
export function votersReducer(
        state: VotersState = initialVotersState,
        action: VoterActionTypes): VotersState {
    switch(action.type) {
        case VOTER_REQUEST:
        case VOTERS_REQUEST:
            return { ...state, apiState: "Fetching" };
        case VOTER_SUCCESS:
            return {
                ...state, apiState: "Success",
                voters: updateIdArray(state.voters, action.payload),
            };
        case VOTERS_SUCCESS:
            return { ...state, apiState: "Success", voters: action.payload };
        case VOTER_FAILURE:
        case VOTERS_FAILURE:
            return { ...state, apiState: "Failed" };
    }
    return state;
}