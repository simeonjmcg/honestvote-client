import {Dimensions} from "react-native";
import {generateSecureRandom} from "react-native-securerandom";
import {useNavigation} from "react-navigation-hooks";

/** get width and height of viewport */
export function getDimensions(): { width: number, height: number } {
    return Dimensions.get("window");
}

/** Generate cryptographically random list of bytes */
export async function cryptoRandomBytes(bytes: number) {
    return await generateSecureRandom(bytes);
}

/** Redirect to link */
export function useRedirect({route, params}: {to: string, route: string, params: {[key: string]: string} }) {
    const navigation = useNavigation();
    return () => {
        navigation.navigate(route, params);
    };
}