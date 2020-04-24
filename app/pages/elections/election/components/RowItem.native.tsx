import React from "react";
import { StyleSheet, View } from "react-native";
import { RowItemProps } from "./RowItem";

const styles = StyleSheet.create({
    ticketRow: {
        padding: 4,
        flexDirection: "row",
        flexGrow: 1,
    },
    ticketRowLeft: {
        padding: 2,
        paddingRight: 4,
        textAlign: "right",
        width: 20,
    },
    ticketRowChildren: {
        padding: 2,
        paddingRight: 8,
        paddingLeft: 8,
        flexGrow: 1,
    },
    ticketRowRight: {
        paddingLeft: 8,
        padding: 2,
        textAlign: "right",
    },
});

export function RowItem ({ left, children, right }: RowItemProps) {
    return (
        <View style={styles.ticketRow}>
            {left != undefined ? 
                <View style={styles.ticketRowLeft}>
                    { left }
                </View> : undefined}
            <View style={styles.ticketRowChildren}>
                {children}
            </View>
            {right != undefined ?
                <View style={styles.ticketRowRight}>
                    { right }
                </View> : undefined }
        </View>
    );
}