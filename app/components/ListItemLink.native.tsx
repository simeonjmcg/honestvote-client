import React from "react";
import {List} from "react-native-paper";
import {ListItemLinkProps} from "./ListItemLink";
import {useNavigation} from "react-navigation-hooks";

export function ListItemLink ({title, description, route, params, left, right}: ListItemLinkProps) {
    const navigation = useNavigation();
    return (
        <List.Item title={title} description={description}
            onPress={() => {navigation?.navigate?.(route, params);}}
            left={left != undefined ? () => left : undefined}
            right={right != undefined ? () => right : undefined} />
    );
}