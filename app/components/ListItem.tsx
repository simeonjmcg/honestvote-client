import React from "react";
import {
    ListItem as ListItemMaterial,
    ListItemText, ListItemIcon, ListItemSecondaryAction
} from "@material-ui/core";

export interface ListItemProps {
    title: string | React.ReactElement;
    description?: string | React.ReactElement;
    left?: React.ReactElement;
    right?: string | React.ReactElement;
}

export function ListItem ({ title, description, left, right }: ListItemProps) {
    return <ListItemMaterial>
        {left != undefined ?
            <ListItemIcon>{ left }</ListItemIcon> : undefined}
        <ListItemText primary={title} secondary={description} />
        {right != undefined ?
            <ListItemSecondaryAction>{ right }</ListItemSecondaryAction> : undefined}
    </ListItemMaterial>;
}