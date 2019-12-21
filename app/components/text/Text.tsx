import React from 'react';
import { Typography } from '@material-ui/core';

export interface TextProps {
    children?: React.ReactNode;
}

export function Text (props: TextProps) {
    return <Typography variant="body1">{ props.children }</Typography>;
}
