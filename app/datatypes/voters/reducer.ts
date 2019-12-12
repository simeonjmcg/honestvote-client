import { VotersState, initialVotersState, VoterActionTypes, VOTERS_SUCESS } from "./types";

/** reducer for Voters */
export const votersReducer = (state: VotersState = initialVotersState, actions: VoterActionTypes): VotersState => {
    switch(actions.type) {
        case VOTERS_SUCESS:
            return actions.payload;
    }
    return state;
}