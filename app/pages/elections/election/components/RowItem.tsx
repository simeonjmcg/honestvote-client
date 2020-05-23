import React from "react";
import {createUseStyles} from "react-jss";

export interface RowItemProps {
    left?: React.ReactNode;
    children: React.ReactNode;
    right?: React.ReactNode;
}

const useStyles = createUseStyles({
    rowItem: {
        padding: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexGrow: 1,
    },
    rowItemLeft: {
        padding: 2,
        paddingRight: 4,
        textAlign: "right",
    },
    rowItemChildren: {
        padding: 2,
        paddingRight: 4,
        paddingLeft: 4,
        flexGrow: 1,
    },
    rowItemRight: {
        textAlign: "right",
        paddingLeft: 4,
        padding: 2,
    },
});

export function RowItem ({left, children, right}: RowItemProps) {
    const styles = useStyles();
    return (
        <div className={styles.rowItem}>
            {left != undefined ? 
                <div className={styles.rowItemLeft}>
                    { left }
                </div> : undefined }
            <div className={styles.rowItemChildren}>
                { children }
            </div>
            {right != undefined ?
                <div className={styles.rowItemRight}>
                    { right }
                </div> : undefined }
        </div>
    );
}