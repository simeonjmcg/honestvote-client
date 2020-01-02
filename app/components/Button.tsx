import React from 'react';
import {Button as MaterialButton } from '@material-ui/core';

export interface ButtonProps {
    children?: string;
    onPress?: () => void;
}

export function Button ({ children, onPress }: ButtonProps) {
    return (
        <MaterialButton onClick={onPress}>
            {children}
        </MaterialButton>
    );
}
