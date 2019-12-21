import { State } from "..";

export function getPublicKey(state: State) {
    return state.user.publicKey;
}