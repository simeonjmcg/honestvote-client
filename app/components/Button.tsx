import React from "react";
import { Button as MaterialButton } from "@material-ui/core";
import { createUseStyles } from "react-jss";

export interface ButtonProps {
    children?: string;
    onPress?: () => void;
    type?: ButtonType;
    color?: ButtonColor;
}

export type ButtonType = "text" | "contained" | "outlined";
export type ButtonColor = "primary" | "secondary" | undefined;

const useStyles = createUseStyles({
    button: {
        margin: "3px !important",
    }
});

export function Button ({ children, onPress, type, color }: ButtonProps) {
    const styles = useStyles();
    return (
        <MaterialButton className={styles.button} onClick={onPress} variant={type} color={color} >
            {children}
        </MaterialButton>
    );
}
