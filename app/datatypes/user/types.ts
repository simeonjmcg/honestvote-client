import { ApiState } from "../types";
import { ElectionId } from "../elections";


/** state for user */
export interface UserState {
  publicKey: string | null;
  activePermissionRequest: ElectionId[];
  permissionRequestStatus: ApiState;
  ballotSubmissionStatus: ApiState;
  permissions: UserPermissions;
};

/** Initial redux state of the application */
export const initialUserState: UserState = {
  publicKey: null,
  activePermissionRequest: [],
  permissionRequestStatus: "Idle",
  ballotSubmissionStatus: "Idle",
  permissions: { canVote: [] },
};

export interface ElectionPermissionRequest {
  electionId: ElectionId;
  email: string; // may either be plain text, or encrypted with electionId's public key
}

/** UserPermissions are the permissions granted to a given user */
export interface UserPermissions {
  canVote: ElectionId[];
}
