import React from "react";
import {createUseStyles} from "react-jss";
import {SECONDARY_COLOR} from "../theme";

export interface ProgressProps {
    width?: number | string;
    progress: number;
}

const useStyles = createUseStyles({
    progress: {
        position: "relative",
        margin: 5,
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        height: 5,
        alignSelf: "center",
    },
    progressInner: {
        position: "absolute",
        left: -1,
        top:-1,
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        backgroundColor: SECONDARY_COLOR,
        height: 5,
    },
});

export function Progress ({width, progress}: ProgressProps) {
    const style = useStyles();
    return (
        <div className={style.progress} style={{width}}>
            <div className={style.progressInner} style={{width: progress * 100 + "%"}} />
        </div>
    );
}