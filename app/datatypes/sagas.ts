import { all } from "@redux-saga/core/effects";
import { appSaga } from "./app/sagas";
import { candidatesSaga } from "./candidates/sagas";
import { electionsSaga } from "./elections/sagas";
import { positionsSaga } from "./positions/sagas";
import { ticketsSaga } from "./tickets/sagas";
import { votersSaga } from "./voters/sagas";
export function* rootSaga() {
    yield all([
        appSaga(),
        candidatesSaga(),
        electionsSaga(),
        positionsSaga(),
        ticketsSaga(),
        votersSaga(),
    ]);
}