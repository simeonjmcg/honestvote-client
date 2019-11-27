import { combineReducers, createStore } from "redux";
import { reducer } from "./reducer";
export const initializeStore = () => {
    const AppReducers = combineReducers({
        reducer,
    });

    const rootReducer = (state: any, action: any) => {
        return AppReducers(state, action);
    }

    let store = createStore(rootReducer);

    return store;
}