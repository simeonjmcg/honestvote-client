/** gets an item from persistant storage from key */
export async function getItem(key: string) {
    return localStorage.getItem(key);
}

/** sets an item in persistant storage by key */
export async function setItem(key: string, value: string) {
    return localStorage.setItem(key, value);
}