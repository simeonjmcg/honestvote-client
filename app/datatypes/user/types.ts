/** state for user */
export interface UserState {
  publicKey: string;
  privateKey: string | undefined;
};

/** Initial redux state of the application */
export const initialUserState: UserState = {
  publicKey: "",
  privateKey: undefined,
};

export const USER_RETREIVE_PUBLIC = 'USER_RETREIVE_PUBLIC';
export const USER_RETREIVE_PRIVATE = 'USER_RETREIVE_PRIVATE';

interface UserRetreivePublicAction {
    type: typeof USER_RETREIVE_PUBLIC;
}

interface UserRetreivePrivateAction {
    type: typeof USER_RETREIVE_PRIVATE;
    payload: string;
}

export type UserActionTypes = UserRetreivePublicAction
                            | UserRetreivePrivateAction;