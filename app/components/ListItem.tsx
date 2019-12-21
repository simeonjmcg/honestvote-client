import React from 'react';
import { ListItem as ListItemMaterial } from '@material-ui/core';

export interface ListItemProps {
    children?: string | React.ReactElement;
}

export function ListItem ({ children }: ListItemProps) {
    return <ListItemMaterial>{ children }</ListItemMaterial>;
}