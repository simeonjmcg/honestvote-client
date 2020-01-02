import AsyncStorage from '@react-native-community/async-storage';

/** gets an item from persistant storage from key */
export async function getItem(key: string) {
    return AsyncStorage.getItem(key);
}

/** sets an item in persistant storage by key */
export async function setItem(key: string, value: string) {
    return AsyncStorage.setItem(key, value);
}
