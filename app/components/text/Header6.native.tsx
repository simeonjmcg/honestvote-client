import React from 'react';
import { Text as NativeText } from 'react-native-elements';
import { Header6Props } from './Header6';

export const Header6 = (props: Header6Props) => <NativeText h4>{ props.children }</NativeText>;