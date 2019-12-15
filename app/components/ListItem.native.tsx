import React from 'react';
import { View } from 'react-native';
import { ListItemProps } from './ListItem'

export const ListItem = ({ children }: ListItemProps) =>
    <View>{ children }</View>;