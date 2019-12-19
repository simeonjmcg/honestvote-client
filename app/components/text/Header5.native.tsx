import React from 'react';
import { Text as NativeText } from 'react-native-elements';
import { Header5Props } from './Header5';

export const Header5 = (props: Header5Props) => <NativeText h3>{ props.children }</NativeText>;