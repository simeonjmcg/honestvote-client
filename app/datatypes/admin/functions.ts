import {State} from "..";

export function getAdminPublicKey(state: State) {
    return state.admin.publicKey;
}