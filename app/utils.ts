import { AppId } from "./datatypes/types";
import { NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";
import { match } from "react-router";

export type ScreenFC<T> = React.FC<T> & { navigationOptions?: NavigationStackOptions }

/** Utility function to get a parameter from either react router or react navigator */
export function getParamFromProps (match: match | null, navigation: NavigationStackProp, field: string) {
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