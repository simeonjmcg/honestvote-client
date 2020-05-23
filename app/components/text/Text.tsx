import React from "react";
import {Typography} from "@material-ui/core";

export interface TextProps {
    children?: React.ReactNode;
    color?: string;
    onPress?: () => void;
}

export function Text ({children, color, onPress}: TextProps) {
    return <Typography variant="body1" style={{color}} onClick={onPress}>{ children }</Typography>;
}