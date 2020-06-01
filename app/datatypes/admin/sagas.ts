import {takeEvery, put, take, call} from "@redux-saga/core/effects";
import { 
    ADMIN_RETREIVE_PUBLIC, ADMIN_RETREIVE_PRIVATE, ADMIN_SAVE_PRIVATE,
    storeAdminPublic,
    AdminSavePrivateAction,
    returnAdminPrivate, returnAdminPrivateFailed,
} from ".";
import {promptPass, APP_RETURN_PASS, AppReturnPassAction} from "../app";
import {areKeysGenerated, loadPrivateKey, loadPublicKey, saveNewKeyPair, getEncodedPublic} from "~/encryption";
import {ECKeyPair} from "~/elliptic";

export function* adminSaga() {
    yield takeEvery(ADMIN_RETREIVE_PUBLIC, adminRetreivePublicSaga);
    yield takeEvery(ADMIN_RETREIVE_PRIVATE, adminRetreivePrivateSaga);
    yield takeEvery(ADMIN_SAVE_PRIVATE, adminSavePrivateSaga);
}

function* adminRetreivePublicSaga() {
    const publicKey: string | null = yield call(loadPublicKey, true);
    yield put(storeAdminPublic(publicKey));
}

function* adminSavePrivateSaga(action: AdminSavePrivateAction) {
    // prompt user for password.
    yield put(promptPass("Please enter a new passcode for your administrator keypair", true));
    const {payload: pass}: AppReturnPassAction = yield take(APP_RETURN_PASS);
    const priv = action.payload;
    const keyPair: ECKeyPair = yield call(saveNewKeyPair, pass, priv, true);
    const publicKey = getEncodedPublic(keyPair);
    yield put(storeAdminPublic(publicKey));
}

function* adminRetreivePrivateSaga() {
    const generated: boolean = yield call(areKeysGenerated, true);
    if (generated) {
        // Key exists, test for empty
        const emptyPassPriv: string | null = yield call(loadPrivateKey, "", true);
        if (emptyPassPriv !== null) {
            yield put(returnAdminPrivate(emptyPassPriv));
        } else {
            // Pass not empty, prompt user for password.
            yield put(promptPass("Please enter your administrator passcode"));
            const {payload: pass}: AppReturnPassAction = yield take(APP_RETURN_PASS);
            const privateKey: string | null = yield call(loadPrivateKey, pass, true);
            if (privateKey !== null) {
                yield put(returnAdminPrivate(privateKey));
            } else {
                // either invalid data was stored in localStorage, or pass was incorrect.
                yield put(returnAdminPrivateFailed());
            }
        }
    } else {
        // No key exists, return private failed
        yield put(returnAdminPrivateFailed());
    }
}