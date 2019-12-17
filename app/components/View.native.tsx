import React from 'react';
import { View as NativeView } from 'react-native';

/** Properties of View */
export interface ViewProps {
    children?: React.ReactNode;
}


/** User interface View */
export const View = (props: ViewProps) => <NativeView>{ props.children }</NativeView>;
