import {
    VotesState, initialVotesState, VotesActionTypes,
    VOTES_SUCCESS, VOTES_REQUEST, VOTES_FAILURE,
    VOTE_ADD,
} from ".";

/** reducer for Votes */
export function votes(
        state: VotesState = initialVotesState,
        action: VotesActionTypes): VotesState {
    switch(action.type) {
        case VOTES_REQUEST:
            return { ...state, apiState: "Fetching" };
        case VOTES_SUCCESS:
            return { ...state, apiState: "Success",
                votes: {...state.votes, 
                    [action.payload.electionId]: action.payload.votes
                },
            };
        case VOTE_ADD:
            return { ...state, apiState: "Success",
                votes: {...state.votes, 
                    [action.payload.electionId]: [...state.votes[action.payload.electionId], action.payload ],
                },
            };
        case VOTES_FAILURE:
            return { ...state, apiState: "Failed" };
    }
    return state;
}