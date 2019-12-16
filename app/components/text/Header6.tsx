import React from 'react';
import { Typography } from '@material-ui/core';

export interface Header6Props {
    children?: React.ReactNode;
}

export const Header6 = (props: Header6Props) => <Typography variant="h6">{ props.children }</Typography>;
