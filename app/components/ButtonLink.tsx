import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ButtonProps } from './Button';

export interface ButtonLinkProps extends ButtonProps {
    children?: string;
    to: string;
    route: string;
    params?: {[key: string]: any};
}

export function ButtonLink ({ children, to, onPress, type }: ButtonLinkProps) {
    return <Button component={RouterLink} to={to} onClick={onPress} variant={type}>{ children }</Button>;
}
