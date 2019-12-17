import { CandidatesState, initialCandidatesState, CandidateActionTypes, CANDIDATES_SUCESS, CANDIDATES_REQUEST, CANDIDATES_FAILURE } from "./types";

/** reducer for Candidates */
export const candidatesReducer = (state: CandidatesState = initialCandidatesState, actions: CandidateActionTypes): CandidatesState => {
    switch(actions.type) {
        case CANDIDATES_REQUEST:
            return { ...state, apiState: "Fetching" };
        case CANDIDATES_SUCESS:
            return { ...state, apiState: "Success", candidates: actions.payload };
        case CANDIDATES_FAILURE:
            return { ...state, apiState: "Failed" };
    }
    return state;
}