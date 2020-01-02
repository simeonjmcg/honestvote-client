import { Dimensions } from 'react-native';
import { generateSecureRandom } from 'react-native-securerandom';

/** get width and height of viewport */
export function getDimensions(): { width: number, height: number } {
    return Dimensions.get("window");
}

/** Generate cryptographically random list of bytes */
export async function cryptoRandomBytes(bytes: number) {
    return await generateSecureRandom(bytes);
}