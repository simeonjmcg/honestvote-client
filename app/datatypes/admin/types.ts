/** state for user */
export interface AdminState {
  publicKey: string | null;
}

/** Initial redux state of the application */
export const initialAdminState: AdminState = {
    publicKey: null,
};