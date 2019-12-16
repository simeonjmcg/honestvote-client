import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface LinkProps {
    children: string;
    to: string;
    route: string;
    params: {[key: string]: any};
}

export const Link = ({ to, children }: LinkProps) =>
    <RouterLink to={to}>{ children }</RouterLink>;
