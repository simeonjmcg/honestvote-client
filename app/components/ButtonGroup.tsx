import React from "react";
import {createUseStyles} from "react-jss";

export interface ButtonGroupProps {
    children?: React.ReactNode;
}

const useStyles = createUseStyles({
    buttonGroup: {
        display: "flex",
        flexDirection: "row",
    },
});

export function ButtonGroup ({children}: ButtonGroupProps) {
    const style = useStyles();
    return (
        <div className={style.buttonGroup}>
            {children}
        </div>
    );
}

