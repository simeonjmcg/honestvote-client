import { CandidatesState, initialCandidatesState, CandidateActionTypes, CANDIDATES_SUCESS } from "./types";

/** reducer for Candidates */
export const candidatesReducer = (state: CandidatesState = initialCandidatesState, actions: CandidateActionTypes) => {
    switch(actions.type) {
        case CANDIDATES_SUCESS:
            return actions.payload;
    }
    return state;
}