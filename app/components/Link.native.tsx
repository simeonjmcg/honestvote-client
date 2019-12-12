import React from 'react';
import { FlatList } from 'react-native';

export interface ListProps<Data = any> {
    data: Data[];
    renderRow: (row: Data, index?: number) => React.ReactElement | null;
}

export const List = <D extends {}>(props: ListProps<D>): React.ReactElement =>
    <FlatList data={props.data} renderItem={({item, index}) => props.renderRow(item, index)} />;