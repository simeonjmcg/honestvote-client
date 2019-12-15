import React from 'react';
import { Text as NativeText } from 'react-native';

export interface TextProps {
    children?: React.ReactNode;
}

export const Text = (props: TextProps) => <NativeText>{ props.children }</NativeText>;