import React from 'react';
import {Card as NativeCard } from 'react-native-elements';

export interface CardProps {
    children?: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
    return (
        <NativeCard>
            { children }
        </NativeCard>
    );
}