import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ListItem as ListItemMaterial } from '@material-ui/core';

export interface ListItemLinkProps {
    children?: string | React.ReactElement;
    to: string;
    route: string;
    params?: {[key: string]: any};
}

export function ListItemLink ({ children, to }: ListItemLinkProps) {
    return <ListItemMaterial button component={RouterLink} to={to}>{ children }</ListItemMaterial>;
}