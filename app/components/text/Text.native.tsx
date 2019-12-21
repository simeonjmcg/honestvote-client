import React from 'react';
import { Text as NativeText } from 'react-native-elements';

export interface TextProps {
    children?: React.ReactNode;
}

export function Text (props: TextProps) {
    return <NativeText>{ props.children }</NativeText>;
}