import React from 'react';
import { Text as NativeText } from 'react-native';

export interface Header6Props {
    children?: React.ReactNode;
}

export const Header6 = (props: Header6Props) => <NativeText>{ props.children }</NativeText>;