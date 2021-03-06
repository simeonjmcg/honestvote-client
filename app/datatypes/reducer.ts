import {combineReducers} from "redux";
import {app} from "./app/reducer";
import {admin} from "./admin/reducer";
import {user} from "./user/reducer";
import {elections} from "./elections/reducer";
import {votes} from "./votes/reducer";

export const reducer = combineReducers({
    app,
    admin,
    user,
    elections,
    votes,
});