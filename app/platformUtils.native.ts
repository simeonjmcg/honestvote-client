import { Dimensions } from 'react-native';
export function getDimensions(): { width: number, height: number } {
    return Dimensions.get("window");
}