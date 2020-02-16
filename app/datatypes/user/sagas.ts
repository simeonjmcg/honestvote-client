import axios, { AxiosResponse } from 'axios';
import { takeEvery, put, take, call, select } from '@redux-saga/core/effects';
import { 
    USER_RETREIVE_PUBLIC, USER_RETREIVE_PRIVATE,
    USER_REQUEST_PERMISSIONS, UserRequestPermissionsAction,
    USER_SUBMIT_BALLOT, UserSubmitBallotAction,
    storePublic,
    returnPrivate, returnPrivateFailed,
    permissionRequestSuccessful, permissionRequestFailure,
} from '.';
import { promptPass, APP_RETURN_PASS, getEndpoint, AppReturnPassAction } from '../app';
import { areKeysGenerated, generateNewUserKeys, loadPrivateKey, loadPublicKey } from '~/encryption';
import { ECKeyPair } from 'elliptic';
import { getPublicKey, calculateRegistrationSignature } from './functions';
import { Vote, calculateVoteSignature } from '../votes';
import {
    ballotSubmissionFailure, ballotSubmissionSuccessful, retreivePrivate,
    USER_RETURN_PRIVATE, UserReturnPrivateAction,
} from './actions';
import { getElection, Election } from '../elections';
import { ElectionPermissionRequest } from './types';

export function* userSaga() {
    yield takeEvery(USER_RETREIVE_PUBLIC, userRetreivePublicSaga);
    yield takeEvery(USER_RETREIVE_PRIVATE, userRetreivePrivateSaga);
    yield takeEvery(USER_REQUEST_PERMISSIONS, permissionsRequestSaga);
    yield takeEvery(USER_SUBMIT_BALLOT, ballotSubmissionSaga);
}

function* userRetreivePublicSaga() {
    const publicKey: string | null = yield call(loadPublicKey);
    if (publicKey !== null) {
        yield put(storePublic(publicKey));
    } else {
        // No key exists, prompt for pass and generate.
        yield put(promptPass("Please enter a new passcode to use when voting", true));
        const { payload: pass }: AppReturnPassAction = yield take(APP_RETURN_PASS);
        const keyPair: ECKeyPair = yield call(generateNewUserKeys, pass);
        const publicKey = keyPair.getPublic('hex');
        yield put(storePublic(publicKey));
    }
}

function* userRetreivePrivateSaga() {
    const generated: boolean = yield call(areKeysGenerated);
    if (generated) {
        // Key exists, prompt user for password.
        yield put(promptPass("Please enter your passcode"));
        const { payload: pass }: AppReturnPassAction = yield take(APP_RETURN_PASS);
        const privateKey: string | null = yield call(loadPrivateKey, pass);
        if (privateKey !== null) {
            yield put(returnPrivate(privateKey));
        } else {
            // either invalid data was stored in localStorage, or pass was incorrect.
            yield put(returnPrivateFailed());
        }
    } else {
        // No key exists, prompt for pass and generate.
        yield put(promptPass("Please enter a new passcode to use when voting", true));
        const { payload: pass }: AppReturnPassAction = yield take(APP_RETURN_PASS);
        const { getPrivate }: ECKeyPair = yield call(generateNewUserKeys, pass);
        const privateKey = getPrivate('hex');
        yield put(returnPrivate(privateKey));
    }
}

export function* permissionsRequestSaga(action: UserRequestPermissionsAction) {
    const { electionId, emailAddress, firstName, lastName, dateOfBirth } = action.payload;
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
    const response: AxiosResponse<{status: string}> = yield call(axios.post, `${endpoint}/election/${electionId}/register`, {
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
    const response: AxiosResponse<{status: string}> = yield call(axios.post, `${endpoint}/election/${action.payload.electionId}/vote`, vote);
    if (response.status >= 400 || response.data.status !== "OK") {
        yield put(ballotSubmissionFailure());
        return;
    }
    yield put(ballotSubmissionSuccessful());
}