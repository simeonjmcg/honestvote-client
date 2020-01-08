import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    ListItem as ListItemMaterial,
    ListItemText, ListItemIcon, ListItemSecondaryAction,
} from '@material-ui/core';

export interface ListItemLinkProps {
    title: string | React.ReactElement;
    description?: string | React.ReactElement;
    left?: React.ReactElement;
    right?: string | React.ReactElement;
    to: string;
    route: string;
    params?: {[key: string]: string};
}

export function ListItemLink ({ title, description, to, left, right }: ListItemLinkProps) {
    return <ListItemMaterial button component={RouterLink} to={to}>
        {left != undefined ?
            <ListItemIcon>{ left }</ListItemIcon> : undefined}
        <ListItemText primary={title} secondary={description} />
        {right != undefined ?
            <ListItemSecondaryAction>{ right }</ListItemSecondaryAction> : undefined}
    </ListItemMaterial>;
}