import {ApiState} from "../types";

/** state for App */
export interface AppState {
  title: string;
  promptingPass: boolean;
  createPass: boolean;
  passPromptMessage: string;
  closestNodeRequestStatus: ApiState;
  endpoint: string | null;
}

/** Initial redux state of the application */
export const initialAppState: AppState = {
    title: "Elections",
    promptingPass: false,
    createPass: false,
    passPromptMessage: "",
    closestNodeRequestStatus: "Idle",
    endpoint: null,
};
