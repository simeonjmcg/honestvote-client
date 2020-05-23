import React from "react";
import {
    Dialog as MaterialDialog, 
    DialogTitle, DialogContent, DialogActions,
} from "@material-ui/core";

export interface DialogProps {
    title?: React.ReactNode;
    children?: React.ReactNode;
    actions?: React.ReactNode;
    open: boolean;
    onClose?: () => void;
}

export function Dialog ({title, children, actions, open, onClose}: DialogProps) {
    return (
        <MaterialDialog open={open} onClose={onClose}>
            {title != undefined ?
                <DialogTitle>{title}</DialogTitle> : undefined }
            <DialogContent>{ children }</DialogContent>
            {actions != undefined ?
                <DialogActions>{ actions }</DialogActions> : undefined }
        </MaterialDialog>
    );
}
