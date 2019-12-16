import React from 'react';
import { makeStyles } from '@material-ui/styles';

export interface FlexWrapBoxProps {
    children?: React.ReactNode;
}

const useStyles = makeStyles({
    flexWrapBox: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
    },
});

export const FlexWrapBox = ({ children }: FlexWrapBoxProps) => {
    const { flexWrapBox } = useStyles();
    return (
        <div className={flexWrapBox}>
            { children }
        </div>
    );
}