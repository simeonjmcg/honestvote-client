import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlexWrapBoxProps } from './FlexWrapBox';

const style = StyleSheet.create({
    flexBox: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
});

export const FlexWrapBox = ({ children }: FlexWrapBoxProps) => {
    return (
        <View style={style.flexBox}>
            { children }
        </View>
    );
}