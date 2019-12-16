import React from 'react';
import { ListItem as ListItemNative } from 'react-native-elements';
import { ListItemProps } from './ListItem'

export const ListItem = ({ children }: ListItemProps) =>
    <ListItemNative title={children}></ListItemNative>;