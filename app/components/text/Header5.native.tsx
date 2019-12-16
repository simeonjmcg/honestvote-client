import React from 'react';
import { Text as NativeText } from 'react-native';

export interface Header5Props {
    children?: React.ReactNode;
}

export const Header5 = (props: Header5Props) => <NativeText>{ props.children }</NativeText>;