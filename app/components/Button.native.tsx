import React from 'react';
import { Button as NativeButton } from 'react-native-elements';
import { ButtonProps } from './Button';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    button: {
        padding: 3
    }
});

export function Button ({ children, onPress }: ButtonProps) {
    return (
        <NativeButton type="clear" containerStyle={style.button} onPress={onPress} title={children} />
    );
}
