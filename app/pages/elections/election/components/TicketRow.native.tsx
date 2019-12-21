import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../../../components';

export interface TicketRowProps {
    index?: number;
    children: React.ReactNode;
    info: React.ReactNode;
}

const styles = StyleSheet.create({
    ticketRow: {
        padding: 4,
        flexDirection: "row",
    },
    ticketRowIndex: {
        padding: 2,
        paddingRight: 4,
        textAlign: "right",
        width: 20,
    },
    ticketRowChildren: {
        padding: 2,
        flexGrow: 1,
    },
    ticketRowInfo: {
        padding: 2,
    },
});

export function TicketRow ({ index, children, info }: TicketRowProps) {
    return (
        <View style={styles.ticketRow}>
            {index != undefined ? 
                <View style={styles.ticketRowIndex}>
                    <Text>{ index+1 }</Text>
                </View> : undefined }
            <View style={styles.ticketRowChildren}>
                { children }
            </View>
            <View style={styles.ticketRowInfo}>
                { info }
            </View>
        </View>
    );
}