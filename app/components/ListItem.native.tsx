import React from 'react';
import { ListItem as ListItemNative } from 'react-native-elements';
import { ListItemProps } from './ListItem'

export function ListItem ({ children }: ListItemProps) {
    return <ListItemNative title={children}></ListItemNative>;
}