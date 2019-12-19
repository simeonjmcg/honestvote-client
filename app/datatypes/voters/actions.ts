import { VoterActionTypes, Voter, VOTERS_REQUEST, VOTERS_SUCESS, VOTERS_FAILURE } from "./types";
import { store } from "../reduxStore";
import example from "./example-voters.json";

/** request the Voters from the backend */
export function requestVoters(): VoterActionTypes {
    try {
        setTimeout(() => store.dispatch(storeVoters(example.data as Voter[])));
    } catch (e) {
        setTimeout(() => store.dispatch(errorVoters()));
    }
    return { type: VOTERS_REQUEST };
}

/** store Voters in to the redux store */
export function storeVoters(candidates: Voter[]): VoterActionTypes {
    return { type: VOTERS_SUCESS,  payload: candidates };
}

/** fail storage of Voters in the redux store */
export function errorVoters(): VoterActionTypes {
    return { type: VOTERS_FAILURE };
}
