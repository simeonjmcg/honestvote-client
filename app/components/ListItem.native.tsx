import React from "react";
import { List } from "react-native-paper";
import { ListItemProps } from "./ListItem";

export function ListItem ({ title, description, left, right }: ListItemProps) {
    return (
        <List.Item title={title} description={description}
            left={left != undefined ? () => left : undefined}
            right={right != undefined ? () => right : undefined} />
    );
}