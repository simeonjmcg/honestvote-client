import React, {useEffect} from "react";
import {createUseStyles} from "react-jss";

/** Properties of View */
export interface ViewProps {
    children?: React.ReactNode;
    wrap?: boolean;
    direction?: "row" | "column";
    width?: number | string;
    stretch?: boolean;
    centerSelf?: boolean;
    onResize?: () => void;
}

const useStyles = createUseStyles ({
    view: {
        display: "flex",
    },
});

/** User interface View */
export function View ({children, wrap, stretch, direction, width, centerSelf, onResize}: ViewProps) {
    const style = useStyles();
    if (onResize) {
        useEffect(() => {
            window.addEventListener("resize", onResize);
            return () => {
                window.removeEventListener("resize", onResize);
            };
        });
    }
    return (
        <div
            className={style.view} 
            style={{
                flexWrap: wrap ? "wrap" : "nowrap",
                flexDirection: direction ? direction : "column",
                alignContent: stretch ? "stretch" : undefined,
                alignSelf: centerSelf ? "center" : undefined,
                width,
            }}>{ children }</div>
    );
}
