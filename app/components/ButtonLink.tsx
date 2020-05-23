import React from "react";
import {Link as RouterLink} from "react-router-dom";
import {Button} from "@material-ui/core";
import {ButtonProps} from "./Button";

export interface ButtonLinkProps<T> extends ButtonProps {
    children?: string;
    to: string;
    route: string;
    params?: T;
}

export function ButtonLink<T> ({children, to, onPress, type}: ButtonLinkProps<T>) {
    return <Button component={RouterLink} to={to} onClick={onPress} variant={type}>{ children }</Button>;
}
