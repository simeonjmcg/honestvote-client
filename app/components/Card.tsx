import React from 'react';
import {Card as NativeCard } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export interface CardProps {
    children?: React.ReactNode;
}


const useStyles = makeStyles({
    card: {
        padding: 16,
        margin: 5,
    },
});
export const Card = ({ children }: CardProps) => {
    const style = useStyles();
    return (
        <NativeCard className={style.card} >
            { children }
        </NativeCard>
    );
}