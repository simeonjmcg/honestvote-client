import React from 'react';
import { makeStyles } from '@material-ui/styles';

export interface CardProps {
    title?: string | React.ReactElement;
    children?: React.ReactNode;
    minWidth?: number;
    width?: number | string;
}

const useStyles = makeStyles({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        margin: 5,
        borderRadius: 4,
        boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    cardHeader: {
        marginBottom: 16,
    },
    cardContent: {

    },
});
export function Card ({ title, children, minWidth, width }: CardProps) {
    const style = useStyles();
    return (
        <div className={style.card} style={{ minWidth, width }}>
            <div className={style.cardHeader}>{ title }</div>
            <div className={style.cardContent}>{ children }</div>
        </div>
    );
}