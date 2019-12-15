import { AppId } from "./datatypes/types";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { RouteChildrenProps } from "react-router";

type ParamProps = NavigationStackScreenProps & RouteChildrenProps;

/** Utility function to get a parameter from either react router or react navigator */
export function getParamFromProps <P extends ParamProps>({match, navigation}: P, field: string) {
    if (match != undefined) {
        const params = match.params as {[key: string]: any};
        if (params[field]) {
            return params[field];
        }
    }
    if (navigation != undefined) {
        return navigation.getParam(field, undefined);
    }
    return undefined;
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