import React from 'react';
import { Container } from '@material-ui/core';
import { createUseStyles } from 'react-jss';

export interface PageProps {
    children?: React.ReactNode;
}

const useStyles = createUseStyles({
    page: {
        paddingTop: 16,
    },
});

export function Page ({ children }: PageProps) {
    const { page } = useStyles();
    return (
        <Container maxWidth="md" className={page}>
            { children }
        </Container>
    );
}