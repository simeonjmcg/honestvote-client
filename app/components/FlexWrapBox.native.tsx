import React from 'react';
import { View } from 'react-native';

export interface FlexWrapBoxProps {
    children?: React.ReactNode;
}

export const FlexWrapBox = ({ children }: FlexWrapBoxProps) => {
    return (
        <View>
            { children }
        </View>
    );
}