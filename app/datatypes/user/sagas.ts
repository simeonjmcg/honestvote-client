import axios from 'axios';
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
import { getPublicKey } from './functions';
import { Vote, calculateVoteSignature } from '../votes';
import {
    ballotSubmissionFailure, ballotSubmissionSuccessful, retreivePrivate,
    USER_RETURN_PRIVATE, UserReturnPrivateAction,
} from './actions';

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
    const publicKey: string | null = yield select(getPublicKey);
    const endpoint: string | null = yield select(getEndpoint);
    // if no endpoint saved, error
    if (publicKey == null ||endpoint == null) {
        yield put(permissionRequestFailure());
        return;
    }
    try {
        yield call(axios.post, `${endpoint}/userpermissions/${publicKey}`, action.payload);
    } catch(e) {
        // yield put(permissionRequestFailure());
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
    try {
        const vote: Vote = {
            sender: publicKey,
            electionId: action.payload.electionId,
            signature: "",
            receivers: action.payload.receivers,
        };
        yield put(retreivePrivate());
        const returnPrivate: UserReturnPrivateAction = yield take(USER_RETURN_PRIVATE);
        vote.signature = calculateVoteSignature(vote, returnPrivate.payload);
        yield call(axios.post, `${endpoint}/election/${action.payload.electionId}/vote`, vote);
        yield put(ballotSubmissionSuccessful());
    } catch(e) {
        yield put(ballotSubmissionFailure());
    }
}