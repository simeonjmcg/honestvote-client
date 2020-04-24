import React from "react";
import { FlatList } from "react-native";
import { ListProps } from "./List";

export function List <D extends {}>({ data, keyExtractor, renderRow }: ListProps<D>) {
    return (
        <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={({ item, index }) => renderRow(item, index)} />
    );
}