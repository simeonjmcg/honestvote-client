import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface FlexWrapBoxProps {
    children?: React.ReactNode;
}

const style = StyleSheet.create({
    flexWrapBox: {
        flex: 1,
        flexDirection: "row",
    },
});

export const FlexWrapBox = ({ children }: FlexWrapBoxProps) => {
    return (
        <View style={style.flexWrapBox}>
            { children }
        </View>
    );
}