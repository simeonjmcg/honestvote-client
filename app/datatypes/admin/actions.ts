export const ADMIN_RETREIVE_PUBLIC = "ADMIN_RETREIVE_PUBLIC";
export const ADMIN_STORE_PUBLIC = "ADMIN_STORE_PUBLIC";

export const ADMIN_RETREIVE_PRIVATE = "ADMIN_RETREIVE_PRIVATE";
export const ADMIN_SAVE_PRIVATE = "ADMIN_SAVE_PRIVATE";
export const ADMIN_RETURN_PRIVATE = "ADMIN_RETURN_PRIVATE";
export const ADMIN_RETURN_PRIVATE_FAILED = "ADMIN_RETURN_PRIVATE_FAILED";

export interface AdminRetreivePublicAction {
    type: typeof ADMIN_RETREIVE_PUBLIC;
}

export interface AdminStorePublicAction {
    type: typeof ADMIN_STORE_PUBLIC;
    payload: string | null;
}

export interface AdminSavePrivateAction {
    type: typeof ADMIN_SAVE_PRIVATE;
    payload: string;
}

export interface AdminRetreivePrivateAction {
    type: typeof ADMIN_RETREIVE_PRIVATE;
}

export interface AdminReturnPrivateAction {
    type: typeof ADMIN_RETURN_PRIVATE;
    payload: string;
}

export interface AdminReturnPrivateFailedAction {
    type: typeof ADMIN_RETURN_PRIVATE_FAILED;
}

export type AdminActionTypes = AdminRetreivePublicAction
                            | AdminStorePublicAction
                            | AdminSavePrivateAction
                            | AdminRetreivePrivateAction
                            | AdminReturnPrivateAction
                            | AdminReturnPrivateFailedAction;

/** retreive public key from the redux store */
export function retreiveAdminPublicKey(): AdminActionTypes {
    return {type: ADMIN_RETREIVE_PUBLIC};
}

/** store public key in the redux store */
export function storeAdminPublic(publicKey: string | null): AdminActionTypes {
    return {
        type: ADMIN_STORE_PUBLIC,
        payload: publicKey,
    };
}

/** store public key in the redux store */
export function storeAdminPrivate(privateKey: string): AdminActionTypes {
    return {
        type: ADMIN_SAVE_PRIVATE,
        payload: privateKey,
    };
}

/** retreive private key from the redux store */
export function retreiveAdminPrivate(): AdminActionTypes {
    return {
        type: ADMIN_RETREIVE_PRIVATE,
    };
}

/** return with private key from the storage API */
export function returnAdminPrivate(privateKey: string): AdminActionTypes {
    return {
        type: ADMIN_RETURN_PRIVATE,
        payload: privateKey,
    };
}

/** return with private key failed */
export function returnAdminPrivateFailed(): AdminActionTypes {
    return {
        type: ADMIN_RETURN_PRIVATE_FAILED,
    };
}
