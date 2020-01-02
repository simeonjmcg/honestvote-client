import { AppId } from "./datatypes/types";
import { NavigationStackProp } from "react-navigation-stack";
import { match } from "react-router";
import { Vote, Ticket } from "./datatypes";

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

/** sum votes for a given ticket */
export function sumTicketsVotes(tickets: Ticket[]) {
    return tickets.map(t => countVotes(t.votes))
                  .reduce((a, v) => a + v, 0); // sum
}

/** Sort tickets according to votes */
export function sortTickets(tickets: Ticket[]) {
    return tickets.sort((t1, t2) => countVotes(t2.votes) - countVotes(t1.votes));
}