import React from 'react';
import { Typography } from '@material-ui/core';

export interface Subtitle1Props {
    children?: React.ReactNode;
}

export const Subtitle1 = (props: Subtitle1Props) => <Typography variant="subtitle1">{ props.children }</Typography>;
