import React from 'react';
import { Typography } from '@material-ui/core';

export interface TextProps {
    children?: React.ReactNode;
    color?: string;
}

export function Text ({ children, color }: TextProps) {
    return <Typography variant="body1" style={{ color }}>{ children }</Typography>;
}