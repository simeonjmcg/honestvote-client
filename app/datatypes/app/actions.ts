import { AppActionTypes, APP_SET_TITLE } from "./types";

/** store title in to the redux store */
export function setTitle(title: string): AppActionTypes {
    return { type: APP_SET_TITLE,  payload: title };
}