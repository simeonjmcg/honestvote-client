import axios, {AxiosResponse} from "axios";
import {takeEvery, put, take, call, select} from "@redux-saga/core/effects";
import { 
    USER_RETREIVE_PUBLIC, USER_RETREIVE_PRIVATE,
    USER_REQUEST_PERMISSIONS, UserRequestPermissionsAction,
    USER_SUBMIT_BALLOT, UserSubmitBallotAction,
    storePublic, getPublicKey,
    returnPrivate, returnPrivateFailed,
    permissionRequestSuccessful, permissionRequestFailure,
    permissionRetreivalSuccessful, permissionRetreivalFailure,
    calculateRegistrationSignature,
} from ".";
import {promptPass, APP_RETURN_PASS, getEndpoint, AppReturnPassAction} from "../app";
import {areKeysGenerated, saveNewKeyPair, loadPrivateKey, loadPublicKey, getEncodedPublic} from "~/encryption";
import {ECKeyPair} from "elliptic";
import {Vote, calculateVoteSignature} from "../votes";
import {
    ballotSubmissionFailure, ballotSubmissionSuccessful, retreivePrivate,
    USER_RETURN_PRIVATE, UserReturnPrivateAction, USER_RETREIVE_PERMISSIONS, USER_STORE_PUBLIC,
} from "./actions";
import {getElection, Election, ElectionId} from "../elections";
import {ElectionPermissionRequest} from "./types";

export function* userSaga() {
    yield takeEvery(USER_RETREIVE_PUBLIC, userRetreivePublicSaga);
    yield takeEvery(USER_RETREIVE_PRIVATE, userRetreivePrivateSaga);
    yield takeEvery(USER_REQUEST_PERMISSIONS, permissionsRequestSaga);
    yield takeEvery(USER_RETREIVE_PERMISSIONS, userRetreivePermissionsSaga);
    yield takeEvery(USER_SUBMIT_BALLOT, ballotSubmissionSaga);
}

function* userRetreivePublicSaga() {
    const publicKey: string | null = yield call(loadPublicKey);
    if (publicKey !== null) {
        yield put(storePublic(publicKey));
    } else {
        // No key exists, prompt for pass and generate.
        yield put(promptPass("Please enter a new passcode to use when voting", true));
        const {payload: pass}: AppReturnPassAction = yield take(APP_RETURN_PASS);
        const keyPair: ECKeyPair = yield call(saveNewKeyPair, pass);
        const publicKey = getEncodedPublic(keyPair);
        yield put(storePublic(publicKey));
    }
}

function* userRetreivePrivateSaga() {
    const generated: boolean = yield call(areKeysGenerated);
    if (generated) {
        // Key exists, test for empty
        const emptyPassPriv: string | null = yield call(loadPrivateKey, "");
        if (emptyPassPriv !== null) {
            yield put(returnPrivate(emptyPassPriv));
        } else {
            // Pass not empty, prompt user for password.
            yield put(promptPass("Please enter your passcode"));
            const {payload: pass}: AppReturnPassAction = yield take(APP_RETURN_PASS);
            const privateKey: string | null = yield call(loadPrivateKey, pass);
            if (privateKey !== null) {
                yield put(returnPrivate(privateKey));
            } else {
                // either invalid data was stored in localStorage, or pass was incorrect.
                yield put(returnPrivateFailed());
            }
        }
    } else {
        // No key exists, prompt for pass and generate.
        yield put(promptPass("Please enter a new passcode to use when voting", true));
        const {payload: pass}: AppReturnPassAction = yield take(APP_RETURN_PASS);
        const keyPair: ECKeyPair = yield call(saveNewKeyPair, pass);
        const privateKey: string | null = yield call(loadPrivateKey, pass, true);
        const publicKey = getEncodedPublic(keyPair);
        yield put(storePublic(publicKey));
        if (privateKey !== null) {
            yield put(returnPrivate(privateKey));
        } else {
            // never should happen, here for completeness.
            yield put(returnPrivateFailed());
        }
    }
}

export function* userRetreivePermissionsSaga() {
    if (!(yield select(getPublicKey))) {
        yield take(USER_STORE_PUBLIC);
    }
    const publicKey: string | null = yield select(getPublicKey);
    const endpoint: string | null = yield select(getEndpoint);
    const response: AxiosResponse<{status: string, data: ElectionId[] }> = yield call(axios.get, `https://${endpoint}/userpermissions/${publicKey}`);
    if (response.status >= 400 || response.data.status !== "OK") {
        yield put(permissionRetreivalFailure());
    }
    yield put(permissionRetreivalSuccessful(response.data.data));
}
export function* permissionsRequestSaga(action: UserRequestPermissionsAction) {
    const {electionId, emailAddress, firstName, lastName, dateOfBirth} = action.payload;
    const publicKey: string | null = yield select(getPublicKey);
    const endpoint: string | null = yield select(getEndpoint);

    const election: Election = yield select(getElection(electionId));
    // if no endpoint saved, error
    if (publicKey == null || endpoint == null) {
        yield put(permissionRequestFailure());
        return;
    }
    yield put(retreivePrivate());
    const returnPrivate: UserReturnPrivateAction = yield take(USER_RETURN_PRIVATE);
    const response: AxiosResponse<{status: string}> = yield call(axios.post, `https://${endpoint}/election/${electionId}/register`, {
        // TODO: remap electionName to electionId
        publicKey, emailAddress, firstName, lastName, dateOfBirth,
        electionName: electionId, electionAdmin: election.sender,
        senderSig: calculateRegistrationSignature(action.payload as ElectionPermissionRequest, returnPrivate.payload),
    });
    if (response.status >= 400 || response.data.status !== "OK") {
        yield put(permissionRequestFailure());
    }
    yield put(permissionRequestSuccessful());
}
export function* ballotSubmissionSaga(action: UserSubmitBallotAction) {
    const publicKey: string | null = yield select(getPublicKey);
    const endpoint: string | null = yield select(getEndpoint);
    // if no endpoint saved, error
    if (publicKey == null || endpoint == null) {
        yield put(permissionRequestFailure());
        return;
    }
    const vote: Vote = {
        sender: publicKey,
        electionId: action.payload.electionId,
        signature: "",
        receivers: action.payload.receivers,
    };
    yield put(retreivePrivate());
    const returnPrivate: UserReturnPrivateAction = yield take(USER_RETURN_PRIVATE);
    vote.signature = calculateVoteSignature(vote, returnPrivate.payload);
    const response: AxiosResponse<{status: string}> = yield call(axios.post, `https://${endpoint}/election/${action.payload.electionId}/vote`, vote);
    if (response.status >= 400 || response.data.status !== "OK") {
        yield put(ballotSubmissionFailure());
        return;
    }
    yield put(ballotSubmissionSuccessful());
}
