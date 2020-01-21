import {
    ElectionsState, initialElectionsState, ElectionActionTypes,
    ELECTION_REQUEST, ELECTION_SUCCESS, ELECTION_FAILURE,
    ELECTIONS_REQUEST, ELECTIONS_SUCCESS, ELECTIONS_FAILURE,
} from "./types";
import { updateIdArray } from "../../utils";

/** reducer for Elections */
export function elections(
        state: ElectionsState = initialElectionsState,
        action: ElectionActionTypes): ElectionsState {
    switch(action.type) {
        case ELECTION_REQUEST:
        case ELECTIONS_REQUEST:
            return { ...state, apiState: "Fetching" };
        case ELECTION_SUCCESS:
            return {
                 ...state, apiState: "Success",
                elections: updateIdArray(state.elections, action.payload),
            };
        case ELECTIONS_SUCCESS:
            return { ...state, apiState: "Success", elections: action.payload };
        case ELECTION_FAILURE:
        case ELECTIONS_FAILURE:
            return { ...state, apiState: "Failed" };
    }
    return state;
}