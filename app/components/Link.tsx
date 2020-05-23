import React from "react";
import {Link as RouterLink} from "react-router-dom";

export interface LinkProps {
    children: string;
    to: string;
    route: string;
    params: {[key: string]: string};
}

export function Link ({to, children}: LinkProps) {
    return <RouterLink to={to}>{ children }</RouterLink>;
}
