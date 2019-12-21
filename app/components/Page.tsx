import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export interface PageProps {
    children?: React.ReactNode;
}

const useStyles = makeStyles({
    page: {
        padding: 16,
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