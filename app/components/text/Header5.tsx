import React from 'react';
import { Typography } from '@material-ui/core';

export interface Header5Props {
    children?: React.ReactNode;
}

export const Header5 = (props: Header5Props) => <Typography variant="h5">{ props.children }</Typography>;
