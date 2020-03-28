import { State } from "..";
import { ElectionId, Election, getElection, isElectionActive, getVotes } from "../elections";
import { ElectionPermissionRequest } from "./types";
import { ec } from "~/encryption";
import { sequence, string } from "~/der-encoding";
import hash from "hash.js";

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

export function getIsUserRegistered(election: ElectionId | Election) {
    return (state: State) => {
        const id = getPublicKey(state);
        if (id == null) return false;
        const electionId = typeof election === "object" ? election.id : election;
        return state.user.permissions.canVote.includes(electionId);
    }
}

export function getHasUserVoted(election: ElectionId | Election) {
    return (state: State) => {
        const id = getPublicKey(state);
        if (id == null) return false;
        const eid = typeof election === "object" ? election.id : election;
        const votes = getVotes(eid)(state);
        return votes.some(v => v.sender == id);
    }
}

export function getCanUserVote(election: Election | ElectionId, timestamp: number = Date.now()) {
    return (state: State) => {
        const id = getPublicKey(state);
        const e = typeof election === "object" ? election : getElection(election)(state);
        if (id == null || e == null) return false;
        return isElectionActive(e, timestamp) &&
            getIsUserRegistered(e.id)(state) &&
            !getHasUserVoted(election)(state);
    }
}
export function getPermissionRequestApiStatus(state: State) {
    return state.user.permissionRequestStatus;
}

export function arePermissionsBeingRequested(state: State) {
    return getPermissionRequestApiStatus(state) === "Fetching";
}

export function arePermissionsRequested(state: State) {
    const status = getPermissionRequestApiStatus(state);
    return status !== "Idle" &&
           status !== "Fetching";
}

// utils
export function calculateRegistrationSignature(request: ElectionPermissionRequest, privateKey: string) {
    const keyPair = ec.keyFromPrivate(privateKey, "hex");
    const sig = sequence([
            // string(request.emailAddress),
            string(request.firstName),
            string(request.lastName),
            string(request.dateOfBirth),
            string(request.electionId),
    ]);
    const h = hash.sha256().update(sig.toBytes()).digest();

    return keyPair.sign(h).toDER("hex");
}