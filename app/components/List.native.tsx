import React from 'react';
import { FlatList } from 'react-native';
import { ListProps } from './List';

export const List = <D extends {}>({ data, keyExtractor, renderRow }: ListProps<D>) =>
    <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={({item, index}) => renderRow(item, index)} />;