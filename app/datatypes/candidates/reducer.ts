import { CandidatesState, initialCandidatesState, CandidateActionTypes, CANDIDATES_SUCESS, CANDIDATES_REQUEST, CANDIDATES_FAILURE } from "./types";
import { ApiState } from "../types";

/** reducer for Candidates */
export const candidatesReducer = (state: CandidatesState = initialCandidatesState, actions: CandidateActionTypes): CandidatesState => {
    switch(actions.type) {
        case CANDIDATES_REQUEST:
            return { ...state, apiState: ApiState.Fetching };
        case CANDIDATES_SUCESS:
            return { ...state, apiState: ApiState.Success, candidates: actions.payload };
        case CANDIDATES_FAILURE:
            return { ...state, apiState: ApiState.Failed };
    }
    return state;
}