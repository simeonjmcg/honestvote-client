import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroupProps } from './ButtonGroup';

const style = StyleSheet.create({
    buttonGroup: {
        flexDirection: "row"
    }
})

export function ButtonGroup ({ children }: ButtonGroupProps) {
    return (
        <View style={style.buttonGroup}>
            {children}
        </View>
    );
}

