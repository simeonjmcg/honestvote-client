import React from "react";
import { Dialog as NativeDialog } from "react-native-paper";
import { DialogProps } from "./Dialog";

export function Dialog ({ title, children, actions, open, onClose }: DialogProps) {
    return (
        <NativeDialog visible={open} onDismiss={onClose}>
            {title != undefined ?
                <NativeDialog.Title>{title}</NativeDialog.Title> : undefined }
            <NativeDialog.Content>{ children }</NativeDialog.Content>
            {actions != undefined ?
                <NativeDialog.Actions>{ actions }</NativeDialog.Actions> : undefined }
        </NativeDialog>
    );
}

