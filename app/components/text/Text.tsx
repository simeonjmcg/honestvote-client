import React from 'react';
import { Typography } from '@material-ui/core';

export interface TextProps {
    children?: React.ReactNode;
}

export const Text = (props: TextProps) => <Typography variant="body1">{ props.children }</Typography>;
