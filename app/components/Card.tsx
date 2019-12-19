import React from 'react';
import {Card as MaterialCard, CardHeader, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export interface CardProps {
    title?: string | React.ReactElement;
    children?: React.ReactNode;
}


const useStyles = makeStyles({
    card: {
        padding: 16,
        margin: 5,
    },
});
export const Card = ({ title, children }: CardProps) => {
    const style = useStyles();
    return (
        <MaterialCard className={style.card}>
            <CardHeader title={title}/>
            <CardContent>{ children }</CardContent>
        </MaterialCard>
    );
}