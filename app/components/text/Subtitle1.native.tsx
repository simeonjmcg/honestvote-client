import React from 'react';
import { Text as NativeText } from 'react-native';

export interface Subtitle1Props {
    children?: React.ReactNode;
}

export const Subtitle1 = (props: Subtitle1Props) => <NativeText>{ props.children }</NativeText>;