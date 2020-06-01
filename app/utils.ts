import {AppId} from "./datatypes/types";
import {NavigationStackProp} from "react-navigation-stack";

export interface RouteMatch {
    params: {
        [key: string]: string;
    };
    isExact: boolean;
    path: string;
    url: string;
}

/** Utility function to get a parameter from either react router or react navigator */
export function getParamFromProps (match: RouteMatch | null, navigation: NavigationStackProp, field: string): string | undefined{
    return match?.params[field] ??
           navigation?.getParam(field);
}

/** Used to filter undefined values from an array */
export function notUndefined<T>(x: T | undefined): x is T {
    return x !== undefined;
}

/** some object with an id field */
export interface IdObject {
    id: AppId;
}

/** higher-order function for filtering or finding objects of given id */
export function ofId<T extends IdObject>(id: AppId) {
    return (item: T) => item.id === id;
}

/** find array element of given id */
export function findId<T extends IdObject>(array: T[], id: AppId) {
    return array.find(ofId(id));
}

/** return the array without the item with given id */
export function withoutId<T extends IdObject>(array: T[], id: AppId) {
    return array.filter(item => item.id !== id);
}

export function updateIdArray<T extends IdObject>(array: T[], item: T) {
    return [...withoutId(array, item.id), item];
}

/** map idArray to the correct ids from array */
export function mapIdList<T extends IdObject>(idArray: AppId[], array: T[]) {
    return idArray.map(pid => findId(array, pid))
        .filter(notUndefined);
}

/** takes a list of string-number maps and returns a map with the values of given key are summed. */
export function sumMapValues(mapList: {[key: string]: number}[]) {
    return mapList.reduce((map, item) => {
        for (const k in item) map[k] = (map[k] || 0) + item[k];
        return map;
    }, {});
}

/** takes map and transformation function and returns a list determined by function */
export function mapMapArray<T1, T2>(map: {[key: string]: T1}, fn: (value: T1, key: string, index: number) => T2) {
    return Object.keys(map).map((key, index) => fn(map[key], key, index));
}

/** takes array and transformation function and returns map determined by function */
export function mapKey<T1, T2>(array: T1[], fn: (value: T1, index: number) => { value: T2, key: string }) {
    return array.reduce<{[key: string]: T2}>((map, value, index) => {
        const r = fn(value, index);
        map[r.key] = r.value;
        return map;
    }, {});
}

/** takes map and transformation function and returns new map, with both key and value remapped */
export function mapKeyValueMap<T1, T2>(map: {[key: string]: T1}, fn: (value: T1, key: string) => {key: string, value: T2}) {
    return Object.keys(map).reduce<{[key: string]: T2}>((newmap, key) => {
        const r = fn(map[key], key);
        newmap[r.key] = r.value;
        return newmap;
    }, {});
}

/** takes map and transformation function and returns new map, with a given value remapped to given key */
export function mapValueMap<T1, T2>(map: {[key: string]: T1}, fn: (item: T1, key: string) => T2) {
    return mapKeyValueMap(map, (value, key) => ({value: fn(value, key), key}));
}

/** Accessor function for id */
export function getId<T extends IdObject>(obj: T) { return obj.id; }

/** Maps list to map by id */
export function groupById<T>(list: T[], accessor: (object: T) => AppId) {
    const byId: {[key: string]: T[]} = {};
    list.forEach(item => {
        const id = accessor(item);
        if (!(id in byId)) byId[id] = [];
        byId[id].push(item);
    });
    return byId;
} 

/** takes a string and returns a slugified version */
export function slugify(input: string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
    const p = new RegExp(a.split('').join('|'), 'g');

    return input.toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}
