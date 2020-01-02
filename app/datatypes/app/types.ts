import { ElectionId } from "../elections";
import { ApiState } from "../types";

/** state for App */
export interface AppState {
  title: string;
  promptingPass: boolean;
  createPass: boolean;
  passPromptMessage: string;
  activePermissionRequest: ElectionId[];
  closestNodeRequestStatus: ApiState;
  endpoint: string | null;
};

/** Initial redux state of the application */
export const initialAppState: AppState = {
  title: "Elections",
  promptingPass: false,
  createPass: false,
  passPromptMessage: "",
  activePermissionRequest: [],
  closestNodeRequestStatus: "Idle",
  endpoint: null,
};

export const REGISTRATION_ENDPOINT = "127.0.0.1:8080";

export const APP_SET_TITLE = 'APP_SET_TITLE';
export const APP_PROMPT_PASS = 'APP_PROMPT_PASS';
export const APP_CANCEL_PASS = 'APP_CANCEL_PASS';
export const APP_RETURN_PASS = 'APP_RETURN_PASS';
export const APP_REQUEST_CLOSEST_NODE = 'APP_REQUEST_CLOSEST_NODE';
export const APP_SUCCESS_CLOSEST_NODE = 'APP_SUCCESS_CLOSEST_NODE';
export const APP_FAILURE_CLOSEST_NODE = 'APP_FAILURE_CLOSEST_NODE';

export interface AppSetTitleAction {
  type: typeof APP_SET_TITLE;
  payload: string;
}

export interface AppPromptPassAction {
  type: typeof APP_PROMPT_PASS;
  payload: { createPass: boolean, message: string };
}

export interface AppReturnPassAction {
  type: typeof APP_RETURN_PASS;
  payload: string;
}

export interface AppCancelPassAction {
  type: typeof APP_CANCEL_PASS;
}

export interface AppRequestClosestNodeAction {
  type: typeof APP_REQUEST_CLOSEST_NODE;
}

export interface AppSuccessClosestNodeAction {
  type: typeof APP_SUCCESS_CLOSEST_NODE;
  payload: string;
}

export interface AppFailureClosestNodeAction {
  type: typeof APP_FAILURE_CLOSEST_NODE;
}

export type AppActionTypes = AppSetTitleAction
                           | AppPromptPassAction
                           | AppCancelPassAction
                           | AppReturnPassAction
                           | AppRequestClosestNodeAction
                           | AppSuccessClosestNodeAction
                           | AppFailureClosestNodeAction;