import {ec as EC, ECKeyPair} from "elliptic";
import {scrypt} from "scrypt-js";
import {Buffer} from "buffer";
import {ModeOfOperation} from "aes-js";
import {getItem, setItem} from "~/storage";
import {cryptoRandomBytes} from "~/platformUtils";
import {StorageKeys} from "./datatypes";

// initialize elliptic key encryption object
export const ec = new EC("p256");

/** Generate a key from pass and salt for use in symmetric encryption */
export async function generateSymmetricKey(pass: string, salt: Uint8Array) {
    const dkLen = 16;
    const passBytes = Buffer.from(pass.normalize("NFKC"));
    const N = 1024, r = 8, p = 1; // parameters to scrypt
    const key = await scrypt(passBytes, salt, N, r, p, dkLen);
    return key;
}

/** encrypt data based off of key and iv */
export function aesEncrypt(key: Uint8Array, iv: Uint8Array) {
    const aesCbc = new ModeOfOperation.cbc(key, iv);
    return (data: Uint8Array | number[]) => aesCbc.encrypt(data);
}

/** decrypt data from key and iv */
export function aesDecrypt(key: Uint8Array, iv: Uint8Array) {
    const aesCbc = new ModeOfOperation.cbc(key, iv);
    
    return (data: Uint8Array | number[]) => aesCbc.decrypt(data);
}

// Convert a hex string to a byte array
function hexToBytes(hex: string) {
    const bytes = new Uint8Array(Math.ceil(hex.length / 2));
    for (let c = 0; c < hex.length; c += 2)
        bytes[c / 2] = parseInt(hex.substr(c, 2), 16);
    return bytes;
}

// Convert a byte array to a hex string
function bytesToHex(bytes: Uint8Array) {
    const hex = [];
    for (let i = 0; i < bytes.length; i++) {
        const current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join("");
}

// retreive public key from persistent storage
export async function loadPublicKey (admin?: boolean) {
    return await getItem(admin ? StorageKeys.AdminPublicKey : StorageKeys.PublicKey);
}

// retreive private key from persistent storage given the passcode
export async function loadPrivateKey(pass: string, admin?: boolean) {
    const salt = await getItem(admin ? StorageKeys.AdminPassSalt : StorageKeys.PassSalt);
    const passCheck = await getItem(admin ? StorageKeys.AdminPassCheck : StorageKeys.PassCheck);
    const encryptedPrivateKey = await getItem(admin ? StorageKeys.AdminPrivateKeyEncrypted : StorageKeys.PrivateKeyEncrypted);
    const initializationVector = await getItem(admin ? StorageKeys.AdminInitializationVector : StorageKeys.InitializationVector);
    if (salt === null || passCheck === null || encryptedPrivateKey === null || initializationVector === null) {
        return null; // something was not properly stored
    }
    const saltBytes = hexToBytes(salt);
    const passCheckBytes = hexToBytes(passCheck);
    const encryptedPrivateKeyBytes = hexToBytes(encryptedPrivateKey);
    const initializationVectorBytes = hexToBytes(initializationVector);

    const key = await generateSymmetricKey(pass, saltBytes);

    const passCheckDecryptedBytes = aesDecrypt(key, initializationVectorBytes)(passCheckBytes);
    if (bytesToHex(passCheckDecryptedBytes) !== "00000000000000000000000000000000") {
        return null; // Pass was incorrect
    }

    const privateKeyBytes = aesDecrypt(key, initializationVectorBytes)(encryptedPrivateKeyBytes);
    const privateKey = bytesToHex(privateKeyBytes);
    return privateKey;
}

/** checks if passCheck is stored in persistent storage */
export async function areKeysGenerated(admin?: boolean) {
    return await getItem(admin ? StorageKeys.AdminPassCheck : StorageKeys.PassCheck) !== null;
}

/** generate a new public/private keypair and encrypt private using given passcode */
export async function saveNewKeyPair(pass: string, privateKey?: string, admin?: boolean) {
    const keyPair = privateKey ? ec.keyFromPrivate(privateKey, 'hex') : ec.genKeyPair({
        entropy: await cryptoRandomBytes(192),
    });

    // generate key for ESA
    const saltBytes = await cryptoRandomBytes(16);
    const symmetricKey = await generateSymmetricKey(pass, saltBytes);

    // generate iv, encrypt private key
    const initializationVectorBytes = await cryptoRandomBytes(16);
    const privateBytes = keyPair.getPrivate().toArray();
    const encryptedPrivateKeyBytes = aesEncrypt(symmetricKey, initializationVectorBytes)(privateBytes);

    // encrypt passcode check for later verification
    const checkBytes = new Uint8Array(16);
    const passCheckBytes = aesEncrypt(symmetricKey, initializationVectorBytes)(checkBytes);

    // convert components to hex string for storage
    const salt = bytesToHex(saltBytes);
    const passCheck = bytesToHex(passCheckBytes);
    const publicKey = getEncodedPublic(keyPair);
    const encryptedPrivateKey = bytesToHex(encryptedPrivateKeyBytes);
    const initializationVector = bytesToHex(initializationVectorBytes);

    // store data in persistent storage
    setItem(admin ? StorageKeys.AdminPassSalt : StorageKeys.PassSalt, salt);
    setItem(admin ? StorageKeys.AdminPassCheck : StorageKeys.PassCheck, passCheck);
    setItem(admin ? StorageKeys.AdminPublicKey : StorageKeys.PublicKey, publicKey);
    setItem(admin ? StorageKeys.AdminPrivateKeyEncrypted : StorageKeys.PrivateKeyEncrypted, encryptedPrivateKey);
    setItem(admin ? StorageKeys.AdminInitializationVector : StorageKeys.InitializationVector, initializationVector);
    return keyPair;
}

export function getEncodedPublic(keyPair: ECKeyPair) {
    return keyPair.getPublic(true, "hex");
}
