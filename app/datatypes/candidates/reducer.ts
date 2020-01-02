import {
    CandidatesState, initialCandidatesState, CandidateActionTypes,
    CANDIDATE_SUCCESS, CANDIDATE_REQUEST, CANDIDATE_FAILURE,
    CANDIDATES_SUCCESS, CANDIDATES_REQUEST, CANDIDATES_FAILURE,
} from "./types";
import { updateIdArray } from "~/utils";

/** reducer for Candidates */
export function candidatesReducer(
        state: CandidatesState = initialCandidatesState,
        action: CandidateActionTypes): CandidatesState {
    switch(action.type) {
        case CANDIDATE_REQUEST:
        case CANDIDATES_REQUEST:
            return { ...state, apiState: "Fetching" };
        case CANDIDATE_SUCCESS:
            return {
                ...state, apiState: "Success",
                candidates: updateIdArray(state.candidates, action.payload),
            };
        case CANDIDATES_SUCCESS:
            return { ...state, apiState: "Success", candidates: action.payload };
        case CANDIDATES_FAILURE:
        case CANDIDATE_FAILURE:
            return { ...state, apiState: "Failed" };
    }
    return state;
}