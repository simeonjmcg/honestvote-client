import React from 'react';
import { makeStyles } from '@material-ui/core';

export interface ButtonGroupProps {
    children?: React.ReactNode;
}

const useStyles = makeStyles({
    buttonGroup: {
        display: "flex",
        flexDirection: "row",
    }
});

export function ButtonGroup ({ children }: ButtonGroupProps) {
    const style = useStyles();
    return (
        <div className={style.buttonGroup}>
            {children}
        </div>
    );
}

