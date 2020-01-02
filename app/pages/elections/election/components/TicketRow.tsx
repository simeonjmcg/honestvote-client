import React from 'react';
import { createUseStyles } from 'react-jss';
import { Text } from '~/components';

export interface TicketRowProps {
    index?: number;
    children: React.ReactNode;
    info: React.ReactNode;
}

const useStyles = createUseStyles({
    ticketRow: {
        padding: 4,
        display: "flex",
        justifyContent: "space-between",
    },
    ticketRowIndex: {
        padding: 2,
        paddingRight: 4,
        textAlign: "right",
        width: 20,
    },
    ticketRowChildren: {
        padding: 2,
        paddingRight: 4,
        paddingLeft: 4,
        flexGrow: 1,
    },
    ticketRowInfo: {
        paddingLeft: 4,
        padding: 2,
    },
});

export function TicketRow ({ index, children, info }: TicketRowProps) {
    const styles = useStyles();
    return (
        <div className={styles.ticketRow}>
            {index != undefined ? 
                <div className={styles.ticketRowIndex}>
                    <Text>{ index + 1 }</Text>
                </div> : undefined }
            <div className={styles.ticketRowChildren}>
                { children }
            </div>
            <div className={styles.ticketRowInfo}>
                { info }
            </div>
        </div>
    );
}