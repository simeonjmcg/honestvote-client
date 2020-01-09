import { State } from "..";
import { ElectionId, Election } from "../elections";
import { getIsVoterRegistered, getVoter, getHasVoterVoted, getCanVoterVote } from "../voters";

export function getPublicKey(state: State) {
    return state.user.publicKey;
}

export function getActivePermissionRequests(state: State) {
    return state.user.activePermissionRequest;
}

export function getIsPermissionRequestActive(election: ElectionId | Election) {
    const id = typeof election !== "object" ? election : election.id;
    return (state: State) => getActivePermissionRequests(state).includes(id);
}

export function getUserVoter(state: State) {
    const pub = getPublicKey(state);
    if (pub == undefined) return undefined;

    return getVoter(pub)(state);
}

export function getIsUserRegistered(election: ElectionId | Election) {
    return (state: State) => {
        const id = getPublicKey(state);
        if (id == null) return false;
        return getIsVoterRegistered(id, election)(state);
    }
}

export function getHasUserVoted(election: ElectionId | Election) {
    return (state: State) => {
        const id = getPublicKey(state);
        if (id == null) return false;
        return getHasVoterVoted(id, election)(state);
    }
}

export function getCanUserVote(election: Election | ElectionId, timestamp: number = Date.now()) {
    return (state: State) => {
        const id = getPublicKey(state);
        if (id == null) return false;
        return getCanVoterVote(id, election, timestamp)(state);
    }
}
export function getPermissionRequestApiStatus(state: State) {
    return state.candidates.apiState;
}

export function arePermissionsBeingRequested(state: State) {
    return getPermissionRequestApiStatus(state) === "Fetching";
}

export function arePermissionsRequested(state: State) {
    const status = getPermissionRequestApiStatus(state);
    return status !== "Idle" &&
           status !== "Fetching";
}