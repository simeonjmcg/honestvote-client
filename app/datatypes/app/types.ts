/** state for App */
export interface AppState {
  title: string;
};

/** Initial redux state of the application */
export const initialAppState: AppState = {
  title: "Elections",
};

export const APP_SET_TITLE = 'APP_SET_TITLE';

interface AppSetTitleAction {
    type: typeof APP_SET_TITLE;
    payload: string;
}

export type AppActionTypes = AppSetTitleAction;