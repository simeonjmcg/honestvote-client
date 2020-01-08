import React from 'react';
import {Button as MaterialButton } from '@material-ui/core';

export interface ButtonProps {
    children?: string;
    onPress?: () => void;
    type?: ButtonType;
    color?: ButtonColor;
}

export type ButtonType = "text" | "contained" | "outlined";
export type ButtonColor = "primary" | "secondary" | undefined;

export function Button ({ children, onPress, type, color }: ButtonProps) {
    return (
        <MaterialButton onClick={onPress} variant={type} color={color} >
            {children}
        </MaterialButton>
    );
}
