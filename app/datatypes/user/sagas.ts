import axios from 'axios';
import { takeEvery, put, take, call, select } from '@redux-saga/core/effects';
import { 
    USER_RETREIVE_PUBLIC, USER_RETREIVE_PRIVATE,
    USER_REQUEST_PERMISSIONS, UserRequestPermissionsAction,
    storePublic,
    returnPrivate, returnPrivateFailed,
    permissionRequestSuccessful, permissionRequestFailure,
} from './';
import { promptPass, APP_RETURN_PASS, getEndpoint, AppReturnPassAction } from '../app';
import { areKeysGenerated, generateNewUserKeys, getPrivateKey, getPublicKey } from '~/encryption';
import { ECKeyPair } from 'elliptic';

export function* userSaga() {
    yield takeEvery(USER_RETREIVE_PUBLIC, userRetreivePublicSaga);
    yield takeEvery(USER_RETREIVE_PRIVATE, userRetreivePrivateSaga);
    yield takeEvery(USER_REQUEST_PERMISSIONS, permissionsRequestSaga);
}

function* userRetreivePublicSaga() {
    const publicKey: string | null = yield call(getPublicKey);
    if (publicKey !== null) {
        yield put(storePublic(publicKey));
    } else {
        // No key exists, prompt for pass and generate.
        yield put(promptPass("Please enter a new passcode to use when voting", true));
        const { payload: pass }: AppReturnPassAction = yield take(APP_RETURN_PASS);
        const keyPair: ECKeyPair = yield call(generateNewUserKeys, pass);
        const publicKey = keyPair.getPrivate('hex');
        yield put(storePublic(publicKey));
    }
}

function* userRetreivePrivateSaga() {
    const generated: boolean = yield call(areKeysGenerated);
    if (generated) {
        // Key exists, prompt user for password.
        yield put(promptPass("Please enter your passcode"));
        const { payload: pass }: AppReturnPassAction = yield take(APP_RETURN_PASS);
        const privateKey: string | null = yield call(getPrivateKey, pass);
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
    let endpoint: string | null = yield select(getEndpoint);
    // if no endpoint saved, error
    if (endpoint === null) {
        yield put(permissionRequestFailure());
        return;
    }
    try {
        yield call(axios.post, `${endpoint}/permissions`, action.payload);
        yield put(permissionRequestSuccessful());
    } catch(e) {
        yield put(permissionRequestFailure());
    }
}