import React from 'react';
import { View as NativeView } from 'react-native';
import { ViewProps } from './View';

/** User interface View */
export const View = ({ children }: ViewProps) => <NativeView>{ children }</NativeView>;
