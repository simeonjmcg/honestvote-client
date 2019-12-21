import { UserActionTypes, USER_RETREIVE_PUBLIC, UserState, initialUserState } from "./types";

/** reducer for user */
export const userReducer = (state: UserState = initialUserState, actions: UserActionTypes) => {
    switch(actions.type) {
        case USER_RETREIVE_PUBLIC:
            return {...state };
    }
    return state;
}