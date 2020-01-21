import { AppId } from "./datatypes/types";
import { NavigationStackProp } from "react-navigation-stack";
import { match } from "react-router";
import { Vote, Candidate } from "./datatypes";

/** Utility function to get a parameter from either react router or react navigator */
export function getParamFromProps (match: match<any> | null, navigation: NavigationStackProp, field: string): string | undefined{
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
    return [ ...withoutId(array, item.id), item ];
}

/** map idArray to the correct ids from array */
export function mapIdList<T extends IdObject>(idArray: AppId[], array: T[]) {
    return idArray.map(pid => findId(array, pid))
                  .filter(notUndefined);
}

/** Utility function to count votes */
export function countVotes(votes: Vote[]) {
    return votes.length;
}

/** Accessor function for id */
export function getId<T extends IdObject>(obj: T) { return obj.id; }

/** Maps list to map by id */
export function groupById<T>(list: T[], accessor: (o: T) => AppId) {
    const byId: {[key: string]: T[]} = {};
    list.forEach(v => {
        const id = accessor(v);
        if (!(id in byId)) byId[id] = [];
        byId[id].push(v);
    });
    return byId;
} 

/** Sort candidates according to votes */
export function sortCandidatesByVotes(candidates: Candidate[], votes: {[key: string]: Vote[]}) {
    return candidates.sort((t1, t2) => votes[t2.id].length - votes[t1.id].length);
}