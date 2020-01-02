/** get width and height of viewport */
export function getDimensions(): { width: number, height: number } {
    return { width: window.innerWidth, height: window.innerHeight };
}

/** Generate cryptographically random list of bytes */
export async function cryptoRandomBytes(bytes: number) {
    return crypto.getRandomValues(new Uint8Array(bytes));
}