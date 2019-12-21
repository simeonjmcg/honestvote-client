import React from 'react';
import { Typography } from '@material-ui/core';

export interface Header6Props {
    children?: React.ReactNode;
}

export function Header6 ({ children }: Header6Props) {
    return <Typography variant="h6">{ children }</Typography>;
}
