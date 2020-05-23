import {all} from "@redux-saga/core/effects";
import {appSaga} from "./app/sagas";
import {userSaga} from "./user/sagas";
import {electionsSaga} from "./elections/sagas";
import {votersSaga} from "./votes/sagas";
export function* rootSaga() {
    yield all([
        appSaga(),
        userSaga(),
        electionsSaga(),
        votersSaga(),
    ]);
}