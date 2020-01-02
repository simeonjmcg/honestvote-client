import React from 'react';
import { Text as NativeText } from 'react-native-elements';
import { TextProps } from './Text';

export function Text ({ children, color }: TextProps) {
    return <NativeText style={{ color }}>{ children }</NativeText>;
}