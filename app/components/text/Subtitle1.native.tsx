import React from 'react';
import { Text, StyleSheet } from 'react-native';

export interface Subtitle1Props {
    children?: React.ReactNode;
}

const style = StyleSheet.create({
    subtitle1: {
        fontSize: 16,
    },
});

export function Subtitle1 (props: Subtitle1Props) {
    return <Text style={style.subtitle1}>{ props.children }</Text>;
}