import React from "react";
import { Typography } from "@material-ui/core";

export interface Header5Props {
    children?: React.ReactNode;
}

export function Header5 ({ children }: Header5Props) {
    return <Typography variant="h5">{ children }</Typography>;
}
