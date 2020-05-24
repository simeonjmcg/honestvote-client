import {
    AdminActionTypes, AdminState, initialAdminState, ADMIN_STORE_PUBLIC,
} from ".";

export function admin(
    state: AdminState = initialAdminState,
    action: AdminActionTypes): AdminState {
    switch (action.type) {
    case ADMIN_STORE_PUBLIC:
        return {...state, publicKey: action.payload};
    }
    return state;
}