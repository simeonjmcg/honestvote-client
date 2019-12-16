import React from 'react';
import { ListItem as ListItemMaterial } from '@material-ui/core';

export interface ListItemProps {
    children?: string | React.ReactElement;
}

export const ListItem = ({ children }: ListItemProps) =>
    <ListItemMaterial>{ children }</ListItemMaterial>;